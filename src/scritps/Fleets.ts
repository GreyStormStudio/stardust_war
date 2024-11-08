import { Sprite } from "pixi.js"

class Fleet{
    模型:Sprite
    船体值:number
    护盾值:number
    装甲值:number
    坐标:[number,number]
    移速:number//用于分组
    舰容:1|2|4|8|16
    constructor(
        模型:Sprite,
        船体值:number,
        护盾值:number,
        装甲值:number,
        坐标:[number,number],
        移速:number,
        舰容:1|2|4|8|16
    ){
        this.模型=模型
        this.船体值=船体值
        this.护盾值=护盾值
        this.装甲值=装甲值
        this.坐标=坐标
        this.移速=移速
        this.舰容=舰容
    }

    找到最近敌方fleet(全体敌方fleet:Fleet[]){
        let 最小距离 = Infinity;
        let 最近敌方fleet = null;
        全体敌方fleet.forEach(敌方fleet =>{
            if(敌方fleet.模型!==this.模型){
                let 距离 = (this.坐标[0] - 敌方fleet.坐标[0])**2 + (this.坐标[1] - 敌方fleet.坐标[1])**2;
                if (距离 < 最小距离) {
                    最小距离 = 距离;
                    最近敌方fleet = 敌方fleet;
                }
            }
        })
        return 最近敌方fleet;
    }

    移动(x:number,y:number){
        this.坐标[0]+=Math.sin(Math.atan2(y-this.模型.y,x-this.模型.x))*this.移速
        this.坐标[1]+=Math.sin(Math.atan2(y-this.模型.y,x-this.模型.x))*this.移速
    }
    // 
}
export default {}