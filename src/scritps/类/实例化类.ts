import {building,ConstellationBuildings,ColonyBuildings,weapon,ship} from './泛用类'
import { Assets,Sprite } from 'pixi.js'
export async function loadAssets() {//导入sprite
    const assets = [
        './舰船堡垒/护卫舰.png',
        './舰船堡垒/驱逐舰.png',
        './舰船堡垒/巡洋舰.png',
        './舰船堡垒/战列舰.png',
        './舰船堡垒/堡垒.png',
    ];
    try {
        const loadedAssets = await Promise.all(assets.map(asset => Assets.load(asset)));
        console.log('All assets loaded successfully:', loadedAssets);
    } catch (error) {
        console.error('Error loading assets:', error);
    }
}
await loadAssets();

const sprite护卫舰 = Sprite.from('./舰船堡垒/护卫舰.png');sprite护卫舰.scale.set(0.15);sprite护卫舰.anchor.set(0.5);
const sprite驱逐舰 = Sprite.from('./舰船堡垒/驱逐舰.png');sprite驱逐舰.scale.set(0.15);sprite驱逐舰.anchor.set(0.5);
const sprite巡洋舰 = Sprite.from('./舰船堡垒/巡洋舰.png');sprite巡洋舰.scale.set(0.15);sprite巡洋舰.anchor.set(0.5);
const sprite战列舰 = Sprite.from('./舰船堡垒/战列舰.png');sprite战列舰.scale.set(0.15);sprite战列舰.anchor.set(0.5);
const sprite堡垒 = Sprite.from('./舰船堡垒/堡垒.png');sprite堡垒.scale.set(0.1);sprite堡垒.anchor.set(0.5);
//以下所有对象都导出
const 护卫舰=new ship('护卫舰',1,null,-1,sprite护卫舰,100,50,300,10,0.6,200)
const 驱逐舰=new ship('驱逐舰',2,null,-1,sprite驱逐舰,300,200,600,15,0.4,175)
const 巡洋舰=new ship('巡洋舰',4,null,-1,sprite巡洋舰,500,500,1000,25,0.3,150)
const 战列舰=new ship('战列舰',8,null,-1,sprite战列舰,750,1000,1500,30,0.2,100)

const 自动采集器 = new building('自动采集器',[{type:'mineral',number:200},{type:'energy',number:10}],[{type:'energy',number:0.125}],[{type:'mineral',number:1}])
const 光伏电池   = new building('光伏电池',[{type:'mineral',number:50}],[],[{type:'energy',number:0.5}])
const 矿物精炼厂 = new building('矿物精炼厂',[{type:'metal',number:1000},{type:'energy',number:500}],[{type:'mineral',number:4},{type:'energy',number:1}],[{type:'metal',number:1}])
const 星域堡垒building   = new building('星域堡垒',[{type:'metal',number:1000},{type:'mineral',number:1500},{type:'energy',number:4000}],[],[{type:'metal',number:4},{type:'energy',number:2}])

export {
    护卫舰,
    驱逐舰,
    巡洋舰,
    战列舰,
}