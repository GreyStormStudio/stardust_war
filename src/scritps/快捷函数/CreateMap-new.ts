import { PerlinNoise2D } from './noise-perlin'

export class GenerateMap{
    seed:number
    constructor(
        seed:number,
    ){
        this.seed=seed
    }

    GenerateNoiseMap(){//生成edge*edge,理论最小值为0最大值为1的噪声地图
        const map = new PerlinNoise2D(this.seed).perlinNoise2D()
        return map
    }

    GenerateGrayscaleMap(map:Float32Array){//将map转化为灰度图
        const edge = map.length**0.5
        let grayscalemap = new Float32Array(map.length)
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                let grey1 = Math.floor((map[x+y*edge]+1)*128)
                grayscalemap[x+y*edge]=grey1
            }
        }
        return grayscalemap
    }

    OptimizeMap(map:number[][]){
        return map
    }



}