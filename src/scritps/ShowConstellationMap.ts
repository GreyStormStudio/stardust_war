import { Application, Sprite, Texture, Graphics } from "pixi.js";
import { GenerateMap } from "./快捷函数/CreateMap";
import { defineComponent } from "vue";

function createMap(app: Application, seed: number, scale: number) {
    let gcs = new Graphics();
    const map = new GenerateMap(seed, 128);
    const map1 = map.GenerateNoiseMap();
    const map2 = map.GenerateGrayscaleMap(map1);
    const map3 = map.GenerateResourceMap(map2, true);
    for (let n = 0; n < map3.length; n++) {//x+edge*y=n n%edge
        gcs.fill(map3[n]);
        gcs.rect(n % 128 * scale, Math.floor(n / 128) * scale, scale, scale);
    }
    app.stage.addChild(gcs);
    return gcs;
}

async function initApp() {
    const app = new Application();
    const container = document.querySelector('.content') as HTMLElement;
    await app.init({
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: 0x000000,
    });
    if (container) {
        container.appendChild(app.canvas);
    } else {
        console.error("Container element with class 'context' not found");
    }
    return app;
}

async function showMap() {
    const app = await initApp();
    const gcs = createMap(app, 1145141919810, 32);

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
            gcs.x = dx;
            gcs.y = dy;
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

    app.canvas.addEventListener('wheel', (event) => {
        const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
        gcs.scale.x *= scaleFactor;
        gcs.scale.y *= scaleFactor;
    });
}

export default defineComponent({
    mounted() {
        showMap();
    },
    unmounted(){
        (document.querySelector('canvas') as HTMLElement).remove();
    }
});
