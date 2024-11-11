import { PerlinNoise2D } from './noise-perlin'

export class GenerateMap{
    seed:number
    edge:number
    constructor(
        seed:number,
        edge:number
    ){
        this.seed=seed
        this.edge=edge
    }

    GenerateNoiseMap(){//生成edge*edge,理论最小值为0最大值为1的噪声地图
        const noise = new PerlinNoise2D(this.seed,this.edge)
        const mp = noise.perlinNoise2D()
        const gaussmap = noise.applyGaussianBlur(mp,11,3)
        return gaussmap
    }

    GenerateGrayscaleMap(map:Float32Array){//将map转化为灰度图
        const edge = map.length**0.5
        let grayscalemap = new Float32Array(map.length)
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                let grey1 = Math.floor((map[x+y*edge]+1))
                grayscalemap[x+y*edge]=grey1
            }
        }
        return grayscalemap
    }

    OptimizeMap(map:number[][]){
        return map
    }



}