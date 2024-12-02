import { SHIP, SpriteEdge } from '../../../share/CONSTANT';
import { getKey, updateData, getData } from '../db/db'
import Matter from 'matter-js';

const { Engine, Composite, Body } = Matter
const engine = Engine.create({
    gravity: { scale: 0 },
    enableSleeping: true
})
export { Engine, engine, Body }
function addObject(object: Matter.Body) {//将物体添加到世界中
    Composite.add(engine.world, object)
}

export function addShip(ship: SHIP, px: number, py: number) {
    const sinfo = { power: 0, hits: 0, mass: 0, thrust: 0, speed_hyper: 0 };
    const ShipObject: Matter.Body[] = [Matter.Body.create(Matter.Bodies.rectangle(px, py, SpriteEdge, SpriteEdge))]//芝士核心
    ship.Ship_Blocks.blocks.forEach(block => {//获取整船的宏观信息
        const { power, hits, mass } = block.block[block.level].baseAttribute;
        const { x, y } = block.block
        ShipObject.push(Matter.Body.create(Matter.Bodies.rectangle(px + x * SpriteEdge, py + y * SpriteEdge, SpriteEdge, SpriteEdge)))
        sinfo.power += power;
        sinfo.hits += hits;
        sinfo.mass += mass;
        const specialAttributes = block.block[block.level].specialAttributes || {};
        sinfo.thrust += specialAttributes.thrust || 0;
        sinfo.speed_hyper += specialAttributes.speed_hyper || 0;
    })
    const Ship = Matter.Body.create({ parts: ShipObject })
    addObject(Ship)//加到世界中
    // 返回Ship信息
    return sinfo;
}

//更新所有玩家的储存
const resIncrease = { energy: 100, mineral: 50, metal: 1 }//每个资源每时刻的增长量 测试固定值
export async function updataResource() {
    const keys = await getKey('User:')
    if (keys) {
        for (const key of keys) {
            let userData = await getData(key);
            if (userData && userData.gameinfo && userData.gameinfo.storage) {
                const storage = userData.gameinfo.storage;
                storage.energy += resIncrease.energy;
                storage.mineral += resIncrease.mineral;
                storage.metal += resIncrease.metal;
                userData.gameinfo.storage = storage;
                await updateData(key, userData);
            }
        }
    }
}