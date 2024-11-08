import { Sprite } from "pixi.js"

class Fleet{
    模型:Sprite
    船体值:number
    护盾值:number
    装甲值:number
    武器:Weapon[]
    闪避率:number
    坐标:[number,number]
    移速:number//用于分组
    舰容:1|2|4|8|16//舰容=武器槽数量
    
    constructor(
        模型:Sprite,
        船体值:number,
        护盾值:number,
        装甲值:number,
        武器:Weapon[],
        闪避率:number,
        坐标:[number,number],
        移速:number,
        舰容:1|2|4|8|16,
        
    ){
        this.模型=模型
        this.船体值=船体值
        this.护盾值=护盾值
        this.装甲值=装甲值
        this.武器=武器
        this.闪避率=闪避率
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
    
    命中(命中率:number,闪避率:number):0|1{
        Math.random()
        return Math.random()>Math.max(命中率-闪避率,0.05) ? 0 :1
    }

    攻击(敌方fleet:Fleet){
        this.武器.forEach(wep=>{
            if(wep.冷却时间==0){
                //#region 处理对护盾的伤害 破盾时将把溢出的伤害乘0.5直接附加到船体上 --护盾过载
                if(敌方fleet.护盾值>0){
                    敌方fleet.护盾值-=wep.能量伤害*wep.能量伤害基础乘数*this.命中(wep.命中率,敌方fleet.闪避率)
                }
                if(敌方fleet.护盾值<0){
                    敌方fleet.船体值+=敌方fleet.护盾值*0.5
                    敌方fleet.护盾值=0
                }
                //#endregion
                if(敌方fleet.装甲值>0){
                    
                }
            }
        })
    }
}

class Weapon{
    //#region 勾石平衡
    /*在有护盾时
    能量伤害对护盾造成1.0倍基础伤害
    动能武器造成0.0倍基础伤害
    护盾过载一瞬间对船体值直接造成0.5倍的溢出伤害
    */

    /*在没有护盾时，但有装甲时
    能量伤害对装甲造成0.25倍基础伤害，同时对船体造成0.25倍基础伤害
    动能武器对装甲造成1.25倍基础伤害
    溢出伤害不计 装爆反了(确信
    */

    /*在完全没有防护时
    能量武器对船体造成1.0倍伤害
    动能武器对船体造成1.0倍伤害
    最低闪避系数从0.05提升到0.1(完全没有命中率加成的武器将从0.05概率命中提升到0.1概率命中
    */
    //#endregion
    能量伤害:number
    动能伤害:number
    能量伤害基础乘数:number
    动能伤害基础乘数:number
    射程:number
    冷却:number//发射后得加个CD
    冷却时间:number
    命中率:number
    constructor(
        能量伤害:number,
        动能伤害:number,
        能量伤害基础乘数:number,
        动能伤害基础乘数:number,
        射程:number,
        冷却:number,
        命中率:number,
    ){
        this.能量伤害=能量伤害
        this.动能伤害=动能伤害
        this.能量伤害基础乘数=能量伤害基础乘数
        this.动能伤害基础乘数=动能伤害基础乘数
        this.射程=射程
        this.冷却=冷却
        this.冷却时间=0
        this.命中率=命中率
    }
}
export default {}