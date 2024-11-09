import { Application,Graphics } from "pixi.js";
import { generatePerlinNoiseMap,smoothPerlinNoiseMap,BlockDivision } from "./快捷函数/CreateMap";
import { defineComponent } from "vue";
const size = 128;
const app = new Application();

await app.init({
        width:size*2,
        height:size,
        backgroundColor:'0xFFF0F0'
    });
    document.body.appendChild(app.canvas)
let obj1 = new Graphics();
function drawmap(size:number,seed:number){
    const map = generatePerlinNoiseMap(size,seed);
    const smoothedMap1 = smoothPerlinNoiseMap(map,2)
    const Blocks =BlockDivision(smoothedMap1)
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let grey1 = Math.floor(smoothedMap1[x][y]*256)
            let color1;
            if(grey1<150){
                color1 = '0xF6FF00'
            }
            else if(grey1<173){
                color1 = '0xFF0000'
            }
            else if(grey1<178){
                color1 = '0x0000FF'
            }
            else if(grey1<184){
                color1 = '0x00FF00'
            }
            else{
                color1 = '0xFFFFF0'
            }
            obj1.rect(x,y,1,1)
            obj1.fill({color:color1})
            app.stage.addChild(obj1);
        }
    }
    console.log(Blocks)
    for(let x = 0;x < 8; x++){
        for(let y = 0;y < 8; y++){
            obj1.rect(x*16+128,y*16,32,32)
            obj1.fill({color:Blocks[x][y]})
            app.stage.addChild(obj1)
        }
    }
}
export default defineComponent({
    setup(){
        
        drawmap(size,0)
    }
})