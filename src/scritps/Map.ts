import { Application,Graphics } from "pixi.js";
import {GenerateMap} from './快捷函数/CreateMap-new'
import { defineComponent } from "vue";


const seed = 16
const edge = 128

const app = new Application();
await app.init({
    width:edge+10,
    height:edge,
    backgroundColor:'0xFFF0F0'
});
document.body.appendChild(app.canvas)
let obj1 = new Graphics();

function drawmap(){
    const generater = new GenerateMap(seed)
    const map = generater.GenerateNoiseMap()
    const grayscalemap = generater.GenerateGrayscaleMap(map)
    for (let x = 0; x < edge; x++) {
        for (let y = 0; y < edge; y++) {
            let gray = grayscalemap[x+y*edge]
            let color:string
            if(gray>100){
                color='0xFFFFFF'
            }
            else if(gray>85){
                color='0x00FF00'
            }
            else if(gray>65){
                color='0x0000FF'
            }
            else{
                color='0xFF0000'
            }
            obj1.rect(x,y,1,1)
            obj1.fill({color:color})
            app.stage.addChild(obj1);
        }
    }
    //console.log(grayscalemap)
}
export default defineComponent({
    setup(){
        drawmap()
    }
})