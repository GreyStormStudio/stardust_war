import { Application, Sprite, Assets, Graphics } from "pixi.js";
import { GenerateMap } from "./快捷函数/CreateMap";
import { defineComponent } from "vue";

function createMap(app: Application, seed: number, scale: number) {
    let gcs = new Graphics();
    const map = new GenerateMap(seed, 128);
    const map1 = map.GenerateNoiseMap();
    const map2 = map.GenerateGrayscaleMap(map1);
    const map3 = map.GenerateResourceMap(map2, true);
    for (let n = 0; n < map3.length; n++) { // x+edge*y=n n%edge
        gcs.fill(map3[n]);
        gcs.rect(n % 128 * scale, Math.floor(n / 128) * scale, scale, scale);
    }
    app.stage.addChild(gcs);
    return gcs;
}

async function initApp() {
    const app = new Application();
    
    const container = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: container.clientWidth,
        height: container.clientHeight,
        
    });
    await Assets.load('./战斗单位/text1.png');
    if (container) {
        container.appendChild(app.canvas);
    } else {
        console.error("Container element with class 'context' not found");
    }
    return app;
}
function showContextMenu(app:Application,event: MouseEvent) {
    if(document.querySelector('#context-menu') as HTMLElement){
        (document.querySelector('#context-menu') as HTMLElement).remove()
    }
    let menu = document.querySelector('#context-menu') as HTMLElement;
    if (!menu) {
        // Create the context menu if it doesn't exist
        const newMenu = document.createElement('div');
        newMenu.id = 'context-menu';
        newMenu.style.position = 'absolute';
        newMenu.style.backgroundColor = 'white';
        newMenu.style.border = '1px solid black';
        newMenu.style.padding = '5px';
        newMenu.innerHTML = `<ul><li id="buildStarFortress">建造星域堡垒</li></ul>`;
        document.body.appendChild(newMenu);
        menu = newMenu;
    }
    const x = event.clientX
    const y = event.clientY
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    document.removeEventListener('click', hideMenu);

    // Add event listener to hide the menu when clicking outside
    function hideMenu(e: MouseEvent) {
        if (menu && !menu.contains(e.target as Node)) {
            menu.remove()
            document.removeEventListener('click', hideMenu);
        }
    }
    document.addEventListener('click', hideMenu);
    // Change style on hover for menu items
    const menuItem = document.getElementById('buildStarFortress');
    if (menuItem) {
        menuItem.addEventListener('mouseover', () => {
            menuItem.style.backgroundColor = 'lightgray';
        });
        menuItem.addEventListener('mouseout', () => {
            menuItem.style.backgroundColor = '';
        });
        menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            buildStarFortress(app,e,x,y);
            menu.remove()
        });
    }
}


function buildStarFortress(app:Application,event: MouseEvent,x:number,y:number) {
    console.log('建造星域堡垒');
    const sprite = Sprite.from('./战斗单位/text1.png');
    sprite.scale = 0.5
    /*sprite.x = event.clientX - sprite.width / 2;
    sprite.y = event.clientY - sprite.height / 2;*/
    sprite.x = x-175;
    sprite.y = y-70;
    app.stage.addChild(sprite);
}

async function showMap() {
    const app = await initApp();
    const gcs = createMap(app, 1145141919810, 16);

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    app.canvas.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
            isDragging = true;
            dragStartX = event.clientX - gcs.x;
            dragStartY = event.clientY - gcs.y;
        }
    });

    app.canvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const dx = event.clientX - dragStartX;
            const dy = event.clientY - dragStartY;
            gcs.x = Math.min(Math.max(dx, app.screen.width - gcs.width), 0);
            gcs.y = Math.min(Math.max(dy, app.screen.height - gcs.height), 0);
        } else {
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
    });

    app.canvas.addEventListener('mouseup', (event) => {
        if (event.button === 0) { // Left mouse button
            isDragging = false;
        }
    });

    app.canvas.addEventListener('contextmenu',(event)=>{
        event.preventDefault();
        showContextMenu(app,event)
    })
}

export default defineComponent({
    mounted() {
        showMap();
    },
    beforeUnmount() {
        (document.querySelector('.map') as HTMLElement).style.display = 'none';
    }
});
