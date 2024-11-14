import {building,ConstellationBuildings,ColonyBuildings,weapon,ship} from './泛用类'

let 护卫舰=new ship('护卫舰',1,[],-1,100,50,300,{x:0,y:0},10,0.6,200,0)
let 驱逐舰=new ship('驱逐舰',2,[],-1,300,200,600,{x:0,y:0},15,0.4,175,0)
let 巡洋舰=new ship('巡洋舰',4,[],-1,500,500,1000,{x:0,y:0},25,0.3,150,0)
let 战列舰=new ship('战列舰',8,[],-1,750,1000,1500,{x:0,y:0},30,0.2,100,0)
let 星域堡垒ship=new ship('星域堡垒',16,[],-1,2500,2500,2000,{x:0,y:0},45,0,0,0)

let 自动采集器 = new building('自动采集器',[{type:'mineral',number:200},{type:'energy',number:10}],[{type:'energy',number:0.125}],[{type:'mineral',number:1}])
let 光伏电池   = new building('光伏电池',[{type:'mineral',number:50}],[],[{type:'energy',number:0.5}])
let 矿物精炼厂 = new building('矿物精炼厂',[{type:'metal',number:1000},{type:'energy',number:500}],[{type:'mineral',number:4},{type:'energy',number:1}],[{type:'metal',number:1}])
let 星域堡垒building   = new building('星域堡垒',[],[],[])