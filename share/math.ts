//线性同余随机数（伪随机）
export function lcg(seed: number) {
    return function () {
        seed = (107374182 * seed + 123456789) % 0x80000000
        return seed / 0x80000000
    }
}

/**
 * 
 * @param seed 种子
 * @param count 生成次数
 * @returns 随机数
 */
export function random(seed: number, count: number) {
    const g = lcg(seed)
    let result = 0
    for (let i = 0; i < count; i++) {
        result = g()
    }
    return result
}

/*
*如果isdegree为false:生成一个由seed生成的count个伪随机数列
*如果isdegree为true:生成一个由seed生成的count个伪随机单位向量[2n,2n+1] [x,y]的上的向量为[x+y*edge][x+y*edge+1]
*/
export function randomlist(seed: number, count: number, isdegree = false) {
    let randomlist: Float32Array = new Float32Array(isdegree ? count * 2 : count)
    const g = lcg(seed)
    for (let n = 0; n < count; n++) {
        if (isdegree) {
            let theta = g() * Math.PI * 2
            randomlist[2 * n] = Math.cos(theta)
            randomlist[2 * n + 1] = Math.sin(theta)
        }
        else {
            randomlist[n] = g()
        }
    }
    return randomlist
}

//计算(x1,y1)与(x2,y2)的距离
export function distance(pos1: { x: number, y: number }, pos2: { x: number, y: number }) {
    return (pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2
}

//根据x,y生成哈希值作为每个x,y区块的唯一种子
export function hashCoordinates(x: number, y: number): number {
    // 使用字符串拼接和内置的Math.imul来创建一个基于x和y的哈希值
    let hash = 0;
    const stringifiedCoordinates = `${x},${y}`;
    for (let i = 0; i < stringifiedCoordinates.length; i++) {
        const char = stringifiedCoordinates.charCodeAt(i);
        hash = Math.imul(31, hash) + char | 0; // 使用31作为乘数，| 0是为了将结果转换为32位整数
    }
    return hash;
}