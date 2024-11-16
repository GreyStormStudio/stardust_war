import { Application,Assets,Graphics,Sprite,Texture } from "pixi.js";//图形处理
import { cacheManager } from "./CacheManager";
import { DefineComponent } from "vue";//vue类
import { mapState, mapActions } from 'vuex';//数据存取
import {AbstractLevel} from 'abstract-level'
import db from'./db/db'
import { GenerateMap } from "./快捷函数/CreateMap";//地图生成

const app = new Application()
async function init(seed:number,edge:number=128) {
    const map = new GenerateMap(seed,edge)
    const map1=map.GenerateNoiseMap()
    const map2=map.GenerateGrayscaleMap(map1)
    const map3 = map.GenerateResourceMap(map2,true)
    const container = document.querySelector('.map') as HTMLElement;//获取父容器对象
    console.log(db.get('田所浩二'))
    await app.init({
        width:container.clientWidth,
        height:container.clientHeight,
        backgroundColor:'0xffff0f'
    })//初始化app的canvas
    await Assets.load('./战斗单位/test1.png') as Texture//导入素材
    await Assets.load('./背景/bg星云.jpg') as Texture
    container.appendChild(app.canvas)
}