import { getData, putData, updateData } from '../db/db'
import { Md5 } from 'ts-md5'
import * as c from '../../../share/CONSTANT'

//User:{userinfo:{email:string,password:hex(经过md5加密)},gameinfo:{storage:{energy:number,mineral:number,metal:number},constellations:[]}}
//Email:{username:string,password:string}
//Constellation:{owner:string,builds:{}}

/**
 * 
 * @param username 用户名
 * @param password 密码
 * @returns rep 用户名不存在|密码错误|登录成功, val null|游戏数据
 */
async function CheckLogin(username: string, password: string) {
    console.log(`check username:${username},password:${password}`)
    const info = await getData(c.USER_KEY + username)
    if (info == null) {//用户名不存在
        return { rep: c.USERNAME_NOT_FOUND, val: null }
    }
    if (info.userinfo.password != Md5.hashStr(password)) {//密码错误
        return { rep: c.PASSWORD_INCORRECT, val: null }
    }
    return { rep: c.OK, val: info.gameinfo }
}

/**
 * 
 * @param email 邮箱
 * @param username 用户名
 * @returns 用户名已存在|邮箱已注册|允许注册
 */
async function CheckRegister(email: string, username: string) {
    const ckusername = await getData(c.USER_KEY + username)
    if (ckusername != null) {
        return c.USERNAME_EXISTS//用户名已经存在
    }
    const ckemail = await getData(c.EMAIL_KEY + email)
    if (ckemail != null) {
        return c.EMAIL_EXISTS//邮箱已经注册
    }
    return c.OK
}

/**
 * 
 * @param email 邮箱
 * @param username 用户名
 * @param password 密码
 * @returns 注册成功|发生错误
 */
async function Register(email: string, username: string, password: string) {
    try {
        let constellationseed = -1;
        while (1) {
            const seed = Math.floor(Math.random() * 16834)//先开放16384个星域
            if (seed % 64 == 0) { continue; }//64倍数的星域编号留空给NPC住
            getData(c.CONSTELLATION_KEY + seed.toString()).then(result=>{
                if (result.owner == null) {
                    constellationseed = seed;
                }
            })
            
        }
        putData(c.USER_KEY + username, {
            userinfo: { email: email, password: Md5.hashStr(password) },
            gameinfo: { storage: { energy: 1000, mineral: 500, metal: 0 }, constellations: [constellationseed] }
        })//占用用户名
        putData(c.EMAIL_KEY + email, { username: username, password: Md5.hashStr(password) })//占用邮箱
        putData(c.CONSTELLATION_KEY + constellationseed.toString(), { owner: username, builds: {} })//占用星域种子
        return c.OK
    }
    catch (e) {
        console.log('ERROR! Writing Data Error!')
        return c.ERROR_UNDEFINED
    }
}

/**
 * 
 * @param username 用户名
 * @param isgameInfo (默认false)是否读取游戏数据
 * @returns 用户账户信息|用户游戏信息
 */
async function ReadData(username: string, isgameInfo: false) {
    const info = await getData(c.USER_KEY + username)
    return isgameInfo ? info.gameinfo : info.userinfo
}

/**
 * 
 * @param username 用户名
 * @param data 要更改的数据,包含键和值
 * @returns 更新成功|更新失败
 */
async function UpdateData(username: string, data: any) {
    try {
        const currentUserData = await getData(c.USER_KEY + username);
        const mergedData = {
            ...currentUserData,
            ...data
        };
        await updateData(c.USER_KEY + username, mergedData);
        return c.OK;
    } catch (err) {
        console.error("Error! Updating Data Error!", err);
        return c.ERROR_UNDEFINED;
    }
}

export {
    CheckLogin,
    CheckRegister,
    Register,
    ReadData,
    UpdateData
}