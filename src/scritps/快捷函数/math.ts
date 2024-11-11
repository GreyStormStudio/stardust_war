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

/*
*如果isdegree为false:生成一个由seed生成的count个伪随机数列
*如果isdegree为true:生成一个由seed生成的count个伪随机单位向量[2n,2n+1] [x,y]的上的向量为[x+y*edge][x+y*edge+1]
*/
export function randomlist(seed:number,count:number,isdegree=false){
    let randomlist:Float32Array = new Float32Array(isdegree?count*2:count)
    const g = lcg(seed)
    for (let n = 0; n < count; n++) {
        if(isdegree){
            let theta = g()*Math.PI*2
            randomlist[2*n]=Math.cos(theta)
            randomlist[2*n+1]=Math.sin(theta)
        }
        else{
            randomlist[n]=g()
        }
    }
    return randomlist
}

//计算(x1,y1)与(x2,y2)的距离
export function distance(pos1:{x:number,y:number},pos2:{x:number,y:number}){return (pos1.x-pos2.x)**2+(pos1.y-pos2.y)**2}

//二维数组内容统计
export function MatrixStatistics(Matrix:number[][],min:number,max:number){
    let n = 0;
    Matrix.forEach(row=>{row.forEach(unit=>{if(min<=unit*256&&unit*256<max){n++;}})})
    return n;
}