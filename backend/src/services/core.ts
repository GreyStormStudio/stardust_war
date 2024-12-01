import { getKey, updateData, getData } from '../db/db'
import Matter from 'matter-js';

const { Engine, Runner, Composite } = Matter
const engine = Engine.create({
    gravity: { scale: 0 },
    enableSleeping: true
})
export {Engine,engine}
//更新所有玩家的储存
const resIncrease = { energy: 100, mineral: 50, metal: 1 }//每个资源每时刻的增长量
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