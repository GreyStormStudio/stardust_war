import { distance } from "../快捷函数/math"
export interface rescources{
    type:'energy'|'mineral'|'metal'
    number:number
}

export class building{
    constructor(
        public name:string,//名称
        public cost:rescources[],//建造消耗的资源
        public consume:rescources,//产出目标资源所消耗的资源
        public production:rescources//产出目标资源
    ){}
    
}

export class ConstellationBuildings{
    constructor(
        public Buildings能量:number,
        public Buildings能量最大:number,
        public rate能量:number,
        public Buildings矿物:number,
        public Buildings矿物最大:number,
        public rate矿物:number,
        //金属的限制貌似不在这里
        // public Buildings金属:number,
        // public Buildings金属最大:number,
        // public rate金属:number
    ){}
}

export class PlayerStorage{
    constructor(
        public energy:number,
        public mineral:number,
        public metal:number
        //应该还有其他的资源,先放着
    ){}
}

export class weapon{
    
    constructor(
        public weapon类型:'能量武器'|'动能武器',
        public weapon名称:string,
        public weapon伤害:number,
        public weapon伤害倍率:number=1,
        public weapon射程:number,
        public weapon射速:number,
        public weapon命中率:number,
        public weapon冷却:number=0//武器内置冷却标志
    ) {}

}

export class ship{
    
    constructor(
        //固定值
        public ship类型:'护卫舰'|'驱逐舰'|'巡洋舰'|'战列舰'|'战争巨像',
        public ship武器:weapon[],
        public shipuuid:number,
        //经常变的值
        public ship护盾:number,
        public ship装甲:number,
        public ship生命:number,
        public ship坐标:{x:number,y:number},
        //偶尔变的值
        public ship最大射程:number = 0,
        public ship闪避率:number,
        public ship移速:number,
        public ship失踪:number
    ){}

    find最近敌舰(hostileship:ship[]){//找到最近的敌方舰船           输入应该是一个字典{shipuuid:ship},这个不急,晚点再改
        let min距离 = Infinity
        let closest敌舰uuid = null
        hostileship.forEach(ship=>{
            let now距离 = distance(ship.ship坐标,this.ship坐标)
            if(min距离>now距离)closest敌舰uuid=ship.shipuuid
        })
        return closest敌舰uuid
    }

    move位置(pos:{x:number,y:number}):void{//舰船移动到pos点的位置
        if(distance(pos,this.ship坐标)<this.ship移速){
            this.ship坐标=pos
            return
        }
        let theta = Math.atan2(pos.y-this.ship坐标.y,pos.x-this.ship坐标.x)
        this.ship坐标.x+=Math.cos(theta)*this.ship移速
        this.ship坐标.y+=Math.sin(theta)*this.ship移速
    }
    
    attack敌舰(hostileship:ship){//攻击敌方逻辑(先移动到最大射程内)
        if(distance(hostileship.ship坐标,this.ship坐标)>this.ship最大射程){
            this.move位置(hostileship.ship坐标)
            return -1
        }
        let damages:{h1:number,h2:number,h3:number}={h1:hostileship.ship护盾,h2:hostileship.ship装甲,h3:hostileship.ship生命}
        this.CausingDamage(hostileship)
        damages.h1-=hostileship.ship护盾
        damages.h2-=hostileship.ship装甲
        damages.h3-=hostileship.ship生命
        console.log(`你的舰船对敌方舰船的护盾造成了:${damages.h1}点伤害,对装甲造成了:${damages.h2},对船体造成:${damages.h3}`)

    }

    escape逃跑(edge:number,失踪时长:number){//找到离边界最近的路(不考虑速度减成地块)然后失踪{失踪时长}时刻
        let toedge = {top:Infinity,bottom:Infinity,left:Infinity,right:Infinity,min:Infinity}
        toedge.top = this.ship坐标.x
        toedge.left = this.ship坐标.y
        toedge.bottom = edge - this.ship坐标.x
        toedge.right = edge - this.ship坐标.y
        toedge.min = Math.min(toedge.top,toedge.left,toedge.bottom,toedge.right)
        if(this.ship坐标.x==edge || this.ship坐标.x==0||this.ship坐标.y==0||this.ship坐标.y==edge){this.ship失踪=失踪时长;return;}
        if(toedge.min==toedge.top){this.move位置({x:this.ship坐标.x,y:0});return;}
        if(toedge.min==toedge.left){this.move位置({x:0,y:this.ship坐标.y});return;}
        if(toedge.min==toedge.bottom){this.move位置({x:this.ship坐标.x,y:edge});return;}
        if(toedge.min==toedge.right){this.move位置({x:edge,y:this.ship坐标.y});return;}
    }

    private 命中(命中率:number,闪避率:number,最低闪避系数=0.05){//随机数生成武器是否命中敌方舰船
        return Math.random()>Math.max(命中率-闪避率,最低闪避系数)?1:0
    }

    private CausingDamage(hostileship:ship){//对敌方舰船造成伤害
        this.ship武器.forEach(wp=>{
            if(wp.weapon冷却==0){
                let 命中 = this.命中(wp.weapon命中率,hostileship.ship闪避率)
                //处理对存在时护盾的伤害
                if(hostileship.ship护盾>0){
                    if(wp.weapon类型=='动能武器'){//如果是动能武器打护盾则直接跳过，反正不造成伤害
                        return
                    }
                    hostileship.ship护盾-=wp.weapon伤害*wp.weapon伤害倍率*命中
                    if(hostileship.ship护盾<0){//护盾的溢出伤害的50%直接施加到船体上
                        hostileship.ship生命+=hostileship.ship护盾*0.5
                        hostileship.ship护盾=0
                    }
                }
                //处理只存在装甲的伤害
                else if(hostileship.ship装甲>0){
                    
                    if(wp.weapon类型=='能量武器'){
                        hostileship.ship装甲-=wp.weapon伤害*wp.weapon伤害倍率*命中*0.25
                        hostileship.ship生命-=wp.weapon伤害*wp.weapon伤害倍率*命中*0.25
                    }
                    else{
                        hostileship.ship装甲-=wp.weapon伤害*wp.weapon伤害倍率*命中*1.25
                    }
                }
                //处理没有防护的伤害
                else{
                    hostileship.ship生命-=wp.weapon伤害*wp.weapon伤害倍率*this.命中(wp.weapon命中率,hostileship.ship闪避率,0.1)
                }
            }
        })
    }

}