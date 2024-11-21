import { Level } from "level";

const db = new Level('db');
//db.clear()
// 序列化函数
function serialize<T>(data: T): string {
    return JSON.stringify(data);
}

// 反序列化函数
function deserialize<T>(data: string): T {
    return JSON.parse(data) as T;
}

// 插入数据
async function putData(key: string, data:any): Promise<any> {
    try{
        const serializedData = serialize(data);
        await db.put(key, serializedData);
        return true
    } catch(err) {
        console.error("Error", err)
        return false
    }
}

// 获取数据
async function getData(key: string): Promise<any> {
    try {
        const data = await db.get(key);
        return deserialize<any>(data);
    } catch (err) {
        //console.error("Error", err);
        return null;
    }
}

//更新数据
async function updateData(key: string, partialData: any, mergeFunction?: (oldData: any, newData: any) => any): Promise<any> {
    try {
        // 获取当前数据
        const currentData = await getData(key);
        if (currentData === null) {
            // 如果当前数据不存在，则无法更新，可以抛出错误或返回false
            throw new Error(`No data found for key: ${key}`);
        }

        // 使用提供的合并函数或默认合并逻辑来合并数据
        const mergedData = mergeFunction ? mergeFunction(currentData, partialData) : { ...currentData, ...partialData };

        // 序列化合并后的数据并存储
        const serializedData = serialize(mergedData);
        await db.put(key, serializedData);
        return true;
    } catch (err) {
        console.error("Error updating data:", err);
        return false;
    }
}

export default db;
export { putData, getData,updateData };
