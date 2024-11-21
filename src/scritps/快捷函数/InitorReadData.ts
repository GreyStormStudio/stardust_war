import store from "@/store";
import { getData,putData } from "../db/db";

async function InitData(username:string,password:string,email:string){//注册时初始化用户的基础数据
    let datas:{
        password:string,
        email:string,
        seed:number,
        energystore:number,
        mineralstore:number,
        metalstore:number,
        buildings:{energybuilding:number,
            mineralbuilding:{low:number,mid:number,high:number},
            metalbuilding:number
        }} = {password:password,
            email:email,
            seed:-1,
            energystore:500,
            mineralstore:500,
            metalstore:0,
            buildings:{energybuilding:1,
                mineralbuilding:{low:1,mid:0,high:0},
                metalbuilding:0}
            }
    while(1){//循环找空星给新用户
        const seed=Math.floor(Math.random()*0x80000000).toString()
        if(await getData(seed)==null&&Number(seed)%64!=0){//找一个没人的星
            datas.seed = Number(seed)
            break
        }
    }
    putData(username,datas)//把数据先上传了
    putData(datas.seed.toString(),username)//占用该种子
    store.dispatch('setPlayerData',datas)//存到vuex里
}

async function ReadData(username:string) {//登录时读取用户的所有数据
    try{
        const value = await getData(username)
        store.dispatch('setPlayerData',value)
    }
    catch(e){
        console.log('err',e)
        alert('发生未知错误,读取失败')
    }
    
}

export {
    InitData,
    ReadData
}
