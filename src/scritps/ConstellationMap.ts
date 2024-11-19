import { Application, Sprite, Assets, Graphics,Text,Texture } from "pixi.js";
import { GenerateMap } from "./快捷函数/CreateMap";
import { defineComponent } from "vue";
import { getData,putData } from "./db/db";
import store from "@/store";
import { loadAssets } from "./类/实例化类";
const edge = 31

function createMap(app: Application, seed: number, scale: number) {
    let gcs = new Graphics();
    const map = new GenerateMap(seed, edge);
    const map1 = map.GenerateNoiseMap();
    const map2 = map.GenerateGrayscaleMap(map1);
    const map3 = map.GenerateResourceMap(map2, true);
    for (let n = 0; n < map3.map.length; n++) { // x+edge*y=n n%edge
        gcs.rect(n % edge * scale, Math.floor(n / edge) * scale, scale, scale);
        gcs.fill(map3.map[n]);
    }
    app.stage.addChild(gcs);
    return map3.res;
}

async function initApp() {
    const app = new Application();
    const container = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: container.clientWidth,
        height: container.clientHeight,
        
    });
    if (container) {
        container.appendChild(app.canvas);
    } else {
        console.error("Container element with class 'context' not found");
    }
    
    return app;
}

async function showMap(seed:number) {
    const app = await initApp();
    //地图适配屏幕,先放着不做
    /*const ch = (document.querySelector('.map') as HTMLElement).clientHeight;
    const cw = (document.querySelector('.map') as HTMLElement).clientWidth;
    let scaleWindows:number;
    if(ch>cw){
        scaleWindows = cw
    }
    else{
        scaleWindows = ch
    }*/
    let scaleWindows:number = (document.querySelector('.map') as HTMLElement).clientHeight;
    const scale = scaleWindows/31
    let rs = [0,0]
    const res = createMap(app, seed, scale);
    const canvas = app.renderer.extract.canvas(app.stage);
    const texture = Texture.from(canvas);
    const map = new Sprite(texture)
    app.stage.addChild(map)
    //putData('p',{map:map,seed:seed})
    let text1 = new Text({text:'FPS:0',style:{fill:0x000000,fontSize: 18}})
    let text2 = new Text({text:'能量储存:0,矿物储存:0',style:{fill:0x000000,fontSize: 18}})
    let text3 = new Text({text:`地图种子:${seed}`,style:{fill:0x000000,fontSize: 18}})
    app.ticker.maxFPS=60
    text2.y = text1.height
    text3.x = text1.width+60
    app.stage.addChild(text1)
    app.stage.addChild(text2)
    app.stage.addChild(text3)
    let lt = 0
    const dt = 1000
    app.ticker.add((time)=>{
        text1.text = `FPS: ${Math.round(app.ticker.FPS)}`;
        const currentTime = performance.now();
        if (currentTime - lt >= dt) {
            lt = currentTime;
            rs[0]+=res[0],rs[1]+=res[1]
            text2.text = `能量储存:${rs[0]}\n矿物储存:${rs[1]}`
        }
    })
}

export default defineComponent({
    mounted() {
        const seed = 114514
        showMap(seed);
    },
    beforeUnmount() {
        (document.querySelector('.map') as HTMLElement).style.display = 'none';
    }
});
