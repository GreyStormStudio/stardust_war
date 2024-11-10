import {Noise2D} from './noise'

export class GenerateMap{
    seed:number
    diff:number
    loud:number
    constructor(
        seed:number,
        diff:number,
    ){
        this.seed=seed
        this.diff=diff
        this.loud=1
    }

    GenerateNoiseMap(edge:number){//生成edge*edge,理论最小值为0最大值为1的噪声地图
        const noise = new Noise2D(this.seed,this.diff,this.loud)
        let map = new Array(edge).fill(0).map(() => new Array(edge).fill(0));
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                map[x][y]=(noise.getBuff(x,y)+1)/2
            }
        }
        return map
    }

    GenerateGrayscaleMap(map:number[][]){//将map转化为灰度图
        const edge = map.length
        let grayscalemap = new Array(edge).fill(0).map(() => new Array(edge).fill(0));
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                let grey1 = Math.floor(map[x][y]*256)
                let color1 = `rgb(${grey1}, ${grey1}, ${grey1})`
                grayscalemap[x][y]=color1
            }
        }
        return grayscalemap
    }



}