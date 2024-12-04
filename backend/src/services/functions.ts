import db, { getData, putData, updateData } from '../db/db'
import { Md5 } from 'ts-md5'
import { addShip } from './core'
import * as c from '../../../share/CONSTANT'

//User:{userinfo:{email:string,password:hex(经过md5加密)},gameinfo:{storage:{energy:number,mineral:number,metal:number},ship:{Ship结构,Ship位置:{x,y,constellation},sinfo}}}
//Email:{username:string,password:string}

/**
 * 
 * @param username 用户名
 * @param password 密码
 * @returns rep 用户名不存在|密码错误|登录成功, val null|游戏数据
 */
async function CheckLogin(username: string, password: string) {
    const info = await getData(c.USER_KEY + username)
    if (info == null) {//用户名不存在
        return { rep: c.USERNAME_NOT_FOUND, val: null }
    }
    if (info.userinfo.password != Md5.hashStr(password)) {//密码错误
        return { rep: c.PASSWORD_INCORRECT, val: null }
    }
    addShip(info.gameinfo.ship.object, info.gameinfo.ship.pos.x, info.gameinfo.ship.pos.y, username)
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
        const seed = Math.floor(Math.random() * 128) % 128 //目前只开放128个星域
        const { x, y } = { x: Math.random() * 5000 + 60, y: Math.random() * 5000 + 60 }
        const sinfo = addShip(c.SHIP_ZERO, x, y, username)
        putData(c.USER_KEY + username, {
            userinfo: { email: email, password: Md5.hashStr(password) },
            gameinfo: { storage: { energy: 1000, mineral: 500, metal: 0 }, ship: { object: c.SHIP_ZERO, pos: { x, y, constellation: seed }, sinfo: sinfo } }
        })//占用用户名
        putData(c.EMAIL_KEY + email, { username: username, password: Md5.hashStr(password) })//占用邮箱
        return c.OK
    }
    catch (e) {
        console.log(e, 'ERROR! Writing Data Error!')
        return c.ERROR_UNDEFINED
    }
}

/**
 * 
 * @param username 用户名
 * @param isgameInfo (默认false)是否读取游戏数据
 * @returns 用户账户信息|用户游戏信息
 */
async function ReadData(username: string) {
    //const info = await 
    const info = await getData(c.USER_KEY + username)
    return info
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

async function RequestData(username: string, key: string) {
    try {
        const Data = await getData(c.USER_KEY + username);
        switch (key) {
            case 'storage':
                return Data.gameinfo.storage
            case 'shipinfo':
                return Data.gameinfo.ship.sinfo
            default:
                return Data.gameinfo
        }
    }
    catch(e){
        console.log(e,'Error!')
        return c.ERROR_UNDEFINED
    }
    
    
}

async function clearStorage(username: string) {
    const data = await getData(c.USER_KEY + username)
    data.gameinfo.storage.energy = 0
    data.gameinfo.storage.mineral = 0
    data.gameinfo.storage.metal = 0
    await updateData(c.USER_KEY + username, data);
}

async function deldb() {
    await db.clear()
}

export {
    CheckLogin,
    CheckRegister,
    Register,
    RequestData,
    UpdateData,
    clearStorage,
    deldb
}