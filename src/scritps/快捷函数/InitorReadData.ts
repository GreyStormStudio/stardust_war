import store from "@/store";
import { getData, putData } from "../db/db";
import { PlayerStorage, ConstellationSeed } from "../类/interfaces";
import { PasswordMd5 } from "./PED";//用md5加密密码
/**
 * 储存结构:
 * 玩家名称:{账户信息:{邮箱:string,密码:string},储存的资源:{能量:number,矿物:number,金属:number},占领的星域种子:number[]}
 * 星域种子:{占领该星域的玩家:名称,已建造的建筑:建筑[]} 建筑类的添加再说吧
 */
async function InitData(username: string, password: string, email: string) {//注册时初始化用户的基础数据
    const Pinit: PlayerStorage = {
        accountInfo: {
            email: email,
            password: PasswordMd5(password)
        },
        storedResources: [
            { type: '能量', amount: 100 },
            { type: '矿物', amount: 50 },
            { type: '金属', amount: 0 }
        ],
        occupiedConstellations: []
    };
    const Cinit: ConstellationSeed = {
        occupiedByPlayer: null,
        constructedBuildings: []
    }
    let Pdata = { ...Pinit }
    let Cdata = { ...Cinit }
    while (1) {//找个空的星域给新用户
        const seed = Math.floor(Math.random() * 16384).toString()//先开放16384个地址,避免碰不到人
        if (await getData(seed) == null && Number(seed) % 128 != 0) {//找一个没人的星 128倍数的种子留给NPC
            Pdata.occupiedConstellations.push(Number(seed))
            Cdata.occupiedByPlayer = username
            putData('Users:' + username, Pdata)//上传用户初始化数据
            putData('Constellation:' + seed, Cdata)//占用该种子
            break
        }
    }
    store.dispatch('setPlayerData', Pdata)//存到vuex里
}

async function ReadData(username: string) {//登录时读取用户的所有数据
    try {
        const value = await getData('Users:' + username)
        store.dispatch('setPlayerData', value)
    }
    catch (e) {
        console.log('err', e)
        alert('发生未知错误,读取失败')
    }
}

export {
    InitData,
    ReadData
}
