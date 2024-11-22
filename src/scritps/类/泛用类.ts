import { Sprite } from "pixi.js"
import { distance } from "../快捷函数/math"
export interface rescources {
    type: 'energy' | 'mineral' | 'metal'
    number: number
}
/**
 * @param name:string 建筑名称
 * @param const:resources[] 建造消耗的资源
 * @param consume:rescources[] 产出目标资源所消耗的原料
 * @param production:rescources[] 产出的目标资源
 */
export class building {
    constructor(
        public name: string,
        public cost: rescources[],
        public consume: rescources[],
        public production: rescources[]
    ) { }

}

export class ConstellationBuildings {//星域建筑:自动采集器(矿物),光伏电池(能量)
    constructor(
        public Buildings能量: number,
        public Buildings能量最大: number,
        public rate能量: number = 1,
        public Buildings矿物: { low: number, mid: number, high: number },
        public Buildings矿物最大: { low: number, mid: number, high: number },
        public rate矿物: number = 1,
        //public resource产出:rescources[]=[{type:'energy',number:this.Buildings能量*this.rate能量},{type:'mineral',number:this.Buildings矿物.low*this.rate矿物+this.Buildings矿物.mid*this.rate矿物+this.Buildings矿物.high*this.rate矿物}]
        //金属的限制貌似不在这里
        // public Buildings金属:number,
        // public Buildings金属最大:number,
        // public rate金属:number
    ) { }
}

export class ColonyBuildings {
    constructor(
        public maxBuilding: number
    ) { }
}

export class PlayerStorage {
    constructor(
        public energy: number,
        public mineral: number,
        public metal: number
        //应该还有其他的资源,先放着
    ) { }
}

export class weapon {

    constructor(
        public weapon类型: '能量武器' | '动能武器',
        public weapon名称: string,
        public weapon伤害: number,
        public weapon伤害倍率: number = 1,
        public weapon射击间隔: number = 5,
        public weapon命中率: number,
        public CD: number = 0//武器内置冷却标志
    ) { }

}

export class ship {

    constructor(
        //固定值
        public ship类型: '护卫舰' | '驱逐舰' | '巡洋舰' | '战列舰' | '星域堡垒',
        public ship舰容: 1 | 2 | 4 | 8,//特殊值 代表宽度和伤害直接乘数
        public ship武器: weapon | null,
        public shipuuid: number,
        public shipsprite: Sprite,
        //经常变的值
        public ship护盾: number,
        public ship装甲: number,
        public ship生命: number,
        //偶尔变的值
        public ship射程: 2 | 3 | 4 | 5,//护卫舰射程2，驱逐舰射程3，巡洋舰射程4，战列舰射程5，星域堡垒单独战斗,全覆盖射程需求为3
        public ship闪避率: number,
    ) { }

    private 命中(命中率: number, 闪避率: number, 最低闪避系数 = 0.05) {//随机数生成武器是否命中敌方舰船
        return Math.random() > Math.max(命中率 - 闪避率, 最低闪避系数) ? 1 : 0
    }

    private CausingDamage(hostileship: ship) {//对敌方舰船造成伤害
        if (this.ship武器 && this.ship武器.CD == 0) {
            this.ship武器.CD = this.ship武器.weapon射击间隔;//先设置冷却
            let 命中 = this.命中(this.ship武器.weapon命中率, hostileship.ship闪避率)
            //处理对存在时护盾的伤害
            if (hostileship.ship护盾 > 0) {
                if (this.ship武器.weapon类型 == '动能武器') {//如果是动能武器打护盾则直接跳过，反正不造成伤害
                    return
                }
                hostileship.ship护盾 -= this.ship武器.weapon伤害 * this.ship武器.weapon伤害倍率 * 命中
                if (hostileship.ship护盾 < 0) {//护盾的溢出伤害的50%直接施加到船体上
                    hostileship.ship生命 += hostileship.ship护盾 * 0.5
                    hostileship.ship护盾 = 0
                }
            }
            //处理只存在装甲的伤害
            else if (hostileship.ship装甲 > 0) {
                if (this.ship武器.weapon类型 == '能量武器') {
                    hostileship.ship装甲 -= this.ship武器.weapon伤害 * this.ship武器.weapon伤害倍率 * 命中 * 0.25
                    hostileship.ship生命 -= this.ship武器.weapon伤害 * this.ship武器.weapon伤害倍率 * 命中 * 0.25
                }
                else {
                    hostileship.ship装甲 -= this.ship武器.weapon伤害 * this.ship武器.weapon伤害倍率 * 命中 * 1.25
                }
            }
            //处理没有防护的伤害
            else {
                hostileship.ship生命 -= this.ship武器.weapon伤害 * this.ship武器.weapon伤害倍率 * this.命中(this.ship武器.weapon命中率, hostileship.ship闪避率, 0.1)
            }
        }
    }

}