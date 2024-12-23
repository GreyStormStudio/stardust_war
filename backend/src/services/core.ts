import { SHIP, CAPACITY } from '../../../share/CONSTANT';
import { RigidBody, Engine, Vector2 } from '../scripts/PhysicsEngine';
import { getKey, updateData, getData, putData } from '../db/db'
/**
 * init()从db中读取数据到内存中
 * saveAlldata()将数据全部存到db中
 * 1.更新资源
 * 2.更新物理状态
 * 3.
 */
export async function init() {
    const data = await getData('Engine')
    console.log('read data...')
    Engine.importBodies(data)
    console.log('done...')
}
export function saveAlldata() {
    const data = Engine.exportAllBodies()
    console.log('save data...')
    putData('Engine', data)
    console.log('done...')
}


export function addShip(ship: SHIP, px: number, py: number, username: string) {
    const sinfo = { power: 0, hits: 0, mass: 0, thrust: 0, speed_hyper: 0, id: 0 };
    ship.Ship_Blocks.blocks.forEach(block => {//获取整船的宏观信息
        const { power, hits, mass } = block.block[block.level].baseAttribute;
        sinfo.power += power;
        sinfo.hits += hits;
        sinfo.mass += mass;
        const specialAttributes = block.block[block.level].specialAttributes || {};
        sinfo.thrust += specialAttributes.thrust || 0;
        sinfo.speed_hyper += specialAttributes.speed_hyper || 0;
    })
    const Ship = new RigidBody(new Vector2(px, py), sinfo.mass, username)
    Ship.thrust = sinfo.thrust
    Engine.addrigidbody(Ship)
    // 返回Ship信息
    return sinfo;
}
export function updataEngine() {
    if (Engine.getRigidBodyByLabel('User001')) {
        Engine.getRigidBodyByLabel('User001')!.applyforce(Engine.getRigidBodyByLabel('User001')!.thrust * 1, Math.PI * 1)
    }
    //每帧更新一次物理引擎
    Engine.update(1 / 60)
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
                storage.energy += resIncrease.energy; if (storage.energy > CAPACITY) { storage.energy = CAPACITY; }
                storage.mineral += resIncrease.mineral; if (storage.mineral > CAPACITY) { storage.mineral = CAPACITY; }
                storage.metal += resIncrease.metal; if (storage.metal > CAPACITY) { storage.metal = CAPACITY; }
                userData.gameinfo.storage = storage;
                await updateData(key, userData);
            }
        }
    }
}