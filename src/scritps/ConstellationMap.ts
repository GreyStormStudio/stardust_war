import { Application, Sprite, Assets, Graphics } from "pixi.js";
import { GenerateMap } from "./快捷函数/CreateMap";
import { defineComponent } from "vue";

const edge = 31

function createMap(app: Application, seed: number, scale: number) {
    let gcs = new Graphics();
    const map = new GenerateMap(seed, edge);
    const map1 = map.GenerateNoiseMap();
    const map2 = map.GenerateGrayscaleMap(map1);
    const map3 = map.GenerateResourceMap(map2, true);
    for (let n = 0; n < map3.length; n++) { // x+edge*y=n n%edge
        gcs.rect(n % edge * scale, Math.floor(n / edge) * scale, scale, scale);
        gcs.fill(map3[n]);
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


function buildStarFortress(app:Application,event: MouseEvent,x:number,y:number) {
    console.log('建造星域堡垒');
    const sprite = Sprite.from('./战斗单位/text1.png');
    sprite.pivot=0.5
    sprite.scale = 0.5
    /*sprite.x = event.clientX - sprite.width / 2;
    sprite.y = event.clientY - sprite.height / 2;*/
    sprite.x = x-175;
    sprite.y = y-70;
    app.stage.addChild(sprite);
}

async function showMap() {
    const app = await initApp();
    const h = (document.querySelector('.map') as HTMLElement).clientHeight;
    const scale = h/31

    const gcs = createMap(app, 1145141919810, scale);
}

export default defineComponent({
    mounted() {
        showMap();
    },
    beforeUnmount() {
        (document.querySelector('.map') as HTMLElement).style.display = 'none';
    }
});
