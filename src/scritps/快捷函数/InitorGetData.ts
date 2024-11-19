import store from "@/store";
import { getData,putData } from "../db/db";

async function InitData(username:string){//注册时初始化用户的基础数据
    let datas:{seed:number,
        energystore:number,
        mineralstore:number,
        metalstore:number,
        buildings:{energybuilding:number,
            mineralbuilding:{low:number,mid:number,high:number},
            metalbuilding:number
        }} = {seed:-1,
            energystore:500,
            mineralstore:500,
            metalstore:0,
            buildings:{energybuilding:1,
                mineralbuilding:{low:1,mid:0,high:0},
                metalbuilding:0}
            }
    while(1){
        const seed=Math.floor(Math.random()*0x80000000).toString()
        if(await getData(seed)!=null){//找一个没人的星
            datas.seed = Number(seed)
            break
        }
    }
    putData(username,datas)//把数据先上传了
    putData(datas.seed.toString(),username)//占用该种子
}

async function GetData(username:string) {//登录时读取用户的所有数据
    
}