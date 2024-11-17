import { Application, Sprite, Assets, Graphics } from "pixi.js";
import { GenerateMap } from "./快捷函数/CreateMap";
import { 护卫舰,驱逐舰,巡洋舰,战列舰,星域堡垒ship } from "./类/实例化类";
import { defineComponent,onMounted } from "vue";
import { ship, weapon } from "./类/泛用类";

const shiptype = [护卫舰,驱逐舰,巡洋舰,战列舰,星域堡垒ship]
const app = new Application();

async function initApp() {
    
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

async function showMap() {
    const app = await initApp();
    shiptype[4].shipsprite.position.set(256,256)
    app.stage.addChild(shiptype[4].shipsprite)
    app.canvas.addEventListener('contextmenu',(event)=>{
        event.preventDefault();
    })
}

let ships:ship[]=[]

function attack(){
    const s1 = shiptype[0]
    if(ships.length<2){console.log('low')}
    if(ships.length<2){
        
        s1.ship武器=new weapon('能量武器','激光',10,1,10,1,1,0)
        s1.ship坐标.x=128
        s1.ship坐标.y=128
        s1.ship生命=1145
        s1.shipsprite.position.set(128,128)
        ships.push(s1)
        app.stage.addChild(s1.shipsprite)
    }
    else{
        ships[1].attack敌舰(ships[0])
        if(ships[0].ship生命<=0){
            ships[0].ship生命=1000
            return
        }
        ships[0].attack敌舰(ships[1])
        if(ships[1].ship生命<=0){
            ships[1].ship生命=1000
            return
        }
    }
    requestAnimationFrame(attack);
}

export default defineComponent({
    mounted() {
        showMap();
    },
    beforeUnmount() {
        (document.querySelector('.map') as HTMLElement).style.display = 'none';
    },
    setup(){
        onMounted(async ()=>{
            attack()
        })
    }
});
