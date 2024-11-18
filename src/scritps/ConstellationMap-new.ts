import { Application, Sprite, Assets, Graphics } from "pixi.js";
import { GenerateMap } from "./快捷函数/CreateMap";
import { 护卫舰,驱逐舰,巡洋舰,战列舰} from "./类/实例化类";
import { defineComponent,onMounted } from "vue";
import { ship, weapon } from "./类/泛用类";

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


export default defineComponent({
    mounted() {
        
    },
    beforeUnmount() {
        (document.querySelector('.map') as HTMLElement).style.display = 'none';
    },
    setup(){
        onMounted(async ()=>{
            
        })
    }
});
