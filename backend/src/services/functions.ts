import { getData, putData, updateData } from '../db/db'
import { Md5 } from 'ts-md5'
import * as c from '../CONSTANT'

//User:{userinfo:{email:string,password:hex(经过md5加密)},gameinfo:{未定义}}
//Email:{username:string,password:string}

/**
 * 
 * @param username 用户名
 * @param password 密码
 * @returns 用户名不存在|密码错误|登录成功
 */
async function CheckLogin(username: string, password: string) {
    const info = await getData(c.USER_KEY + username)
    if (info == null) {//用户名不存在
        return c.USERNAME_NOT_FOUND
    }
    if (info.userinfo.password != Md5.hashStr(password)) {//密码错误
        return c.PASSWORD_INCORRECT
    }
    return c.OK
    //只检测是否正确,数据读取什么的再说
}

/**
 * 
 * @param email 邮箱
 * @param username 用户名
 * @param password 密码
 * @returns 用户名已存在|邮箱已注册|写入错误|注册成功
 */
async function CheckRegister(email: string, username: string, password: string) {
    const ckusername = await getData(c.USER_KEY + username)
    if (ckusername != null) {
        return c.USERNAME_EXISTS//用户名已经存在
    }
    const ckemail = await getData(c.EMAIL_KEY + email)
    if (ckemail != null) {
        return c.EMAIL_EXISTS//邮箱已经注册
    }
    try {
        //将用户名和邮箱分别作为key存入数据库中
        putData(c.USER_KEY + username, { userinfo: { email: email, password: Md5.hashStr(password) }, gameinfo: {} })
        putData(c.EMAIL_KEY + email, { username: username, password: Md5.hashStr(password) })
    }
    catch (e) {
        //万一发生写入错误(不知道为什么,总之兜个底)
        console.log('ERROR! Data Writing Error!', e)
        return c.ERROR_UNDEFINED
    }
    return c.OK
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
    ReadData,
    UpdateData
}