import { Application,Graphics } from "pixi.js";
import {GenerateMap} from './快捷函数/CreateMap-new'
import { defineComponent } from "vue";


const seed = 7
const edge = 128

const app = new Application();
await app.init({
    width:edge*2,
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
            const color2 = `0x${gray.toString(16).padStart(2,'0')}${gray.toString(16).padStart(2,'0')}${gray.toString(16).padStart(2,'0')}`;
            let color = `rgb(${gray},${gray},${gray})`
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