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
    const map = generater.GenerateNoiseMap(edge)
    const finalmap = generater.OptimizeMap(map)
    const grayscalemap = generater.GenerateGrayscaleMap(finalmap)
    console.log('灰度表')
    console.log(grayscalemap)
    for (let x = 0; x < edge; x++) {
        for (let y = 0; y < edge; y++) {
            obj1.rect(x,y,1,1)
            /*if(finalmap[x][y]>0.7){
                obj1.fill({color:'0xffffff'})
            }
            else{
                obj1.fill({color:grayscalemap[x][y]})
            }*/
            obj1.fill({color:grayscalemap[x][y]})
            app.stage.addChild(obj1);
        }
    }
}
export default defineComponent({
    setup(){
        drawmap()
    }
})