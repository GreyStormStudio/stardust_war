/*

*/

//线性同余随机数（伪随机）
export function lcg(seed:number){
    return function(){
        seed = (107374182 * seed + 123456789) % 0x80000000
        return seed / 0x80000000
    }
}

//根据seed种子,生成固定的count个随机数
export function random(seed: number, count: number) {
    const g = lcg(seed)
    let result = 0
    for (let i = 0; i < count; i++) {
      result = g()
    }
    return result
}

//计算(x1,y1)与(x2,y2)的距离
export function distance(x1:number,y1:number,x2:number,y2:number){return (x1-x2)**2+(y1-y2)**2}

//
export function name(){}