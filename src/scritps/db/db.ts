import { Level } from "level";
import { PlayerData } from "./model/models";

const db = new Level('db');
/*const keys = db.get('Fredrick_LX',(err,value)=>{
    if (err) {
        console.error('Error retrieving value:', err);
    } else if (value === undefined) {
        console.log('Key does not exist');
    } else {
        console.log(value)
        for (let i = 0; i < value.length; i++) {
            console.log(value[i])
        }
    }
})
console.log(keys)*/
//db.put('李田所','1145141919810')
// 序列化函数
function serialize<T>(data: T): string {
    return JSON.stringify(data);
}

// 反序列化函数
function deserialize<T>(data: string): T {
    return JSON.parse(data) as T;
}

// 插入数据
async function putData(key: string, data:any): Promise<void> {
    const serializedData = serialize(data);
    await db.put(key, serializedData);
}

// 获取数据
async function getData(key: string): Promise<any | null> {
    try {
        const data = await db.get(key);
        return deserialize<any>(data);
    } catch (err) {
        console.error("Error retrieving data:", err);
        return null;
    }
}

export default db;
export { putData, getData };
