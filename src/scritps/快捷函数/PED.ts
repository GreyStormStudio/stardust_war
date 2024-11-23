import {Md5} from 'ts-md5'
/**
 * 
 * @param password 待加密的密码
 * @returns 加密后的密码
 */
export function PasswordMd5(password:string){
    return Md5.hashStr(password);
}