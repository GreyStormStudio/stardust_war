/*

*/

//线性同余随机数（伪随机）
export function lcg(seed:number){
    return function(){
        seed = (107374182 * seed + 123456789) % 0x80000000
        return seed / 0x80000000
    }
}

//根据seed种子,生成count次随机数
export function random(seed: number, count: number) {
    const g = lcg(seed)
    let result = 0
    for (let i = 0; i < count; i++) {
      result = g()
    }
    return result
}

//计算(x1,y1)与(x2,y2)的距离
export function distance(pos1:[number,number],pos2:[number,number]){return (pos1[0]-pos2[0])**2+(pos1[1]-pos2[1])**2}

//二维数组内容统计
export function MatrixStatistics(Matrix:number[][],min:number,max:number){
    let n = 0;
    Matrix.forEach(row=>{row.forEach(unit=>{if(min<=unit*256&&unit*256<max){n++;}})})
    return n;
}