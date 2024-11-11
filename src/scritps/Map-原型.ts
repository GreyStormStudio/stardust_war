import { Application,Graphics } from "pixi.js";
import {GenerateMap} from './快捷函数/CreateMap'
import { defineComponent } from "vue";


//测试，直接输入种子和边长得了
//实际拿星区的坐标x,y来生成种子

const seed = 114514
const edge = 128

const app = new Application();
await app.init({
    width:edge+10,
    height:edge,
    backgroundColor:'0xFFF0F0'
});
document.body.appendChild(app.canvas)
let obj1 = new Graphics();

function drawmap(seed:number){
    const generater = new GenerateMap(seed,edge)
    const map = generater.GenerateNoiseMap()
    const grayscalemap = generater.GenerateGrayscaleMap(map)
    let tj=[0,0,0,0]
    for (let x = 0; x < edge; x++) {
        for (let y = 0; y < edge; y++) {
            let gray = grayscalemap[x+y*edge]
            let color:string
            if(gray>100){
                color='0xFFFFFF'
                tj[0]++
            }
            else if(gray>85){
                color='0x00FF00'
                tj[1]++
            }
            else if(gray>65){
                color='0x0000FF'
                tj[2]++
            }
            else{
                color='0xFF0000'
                tj[3]++
            }
            obj1.rect(x,y,1,1)
            obj1.fill({color:color})
            app.stage.addChild(obj1);
        }
    }
    //console.log(grayscalemap)
    console.log(`星域种子:${seed}\n星域统计:空白地块:${tj[0]}块,低产地块:${tj[1]}块,中产地块:${tj[2]}块,高产地块:${tj[3]}块\n预计产出:${tj[1]+tj[2]*2+tj[3]*4}矿物/时刻,${tj[0]*0.5}能量/时刻`)
}
export default defineComponent({
    setup(){
        console.log(`单位产出: 低产地块:1矿物/时刻,中产地块:2矿物/时刻,高产地块:4矿物/时刻,空白地块:0.5能量/时刻`)
        /*for (let seed = 0; seed < 1; seed++) {
            drawmap(seed)
        }*/
        drawmap(seed)
    }
})