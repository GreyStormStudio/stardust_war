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

    GenerateResourceMap(map:Float32Array,iscolor:boolean){//将上面的灰度图转为资源地图0空1低2中3高
        let resourcemap = new Float32Array(this.edge*this.edge)
        const type={empty:100,low:85,mid:65,high:256}
        let resources:number[] = [0,0,0,0]
        for (let n = 0; n < this.edge*this.edge; n++) {
            if(map[n]>type.empty){
                resourcemap[n]= iscolor?0xFFFFAF:0
                resources[0]++
            }
            else if(map[n]>type.low){
                resourcemap[n]= iscolor?0x00FF00:1
                resources[1]++
            }
            else if(map[n]>type.mid){
                resourcemap[n]= iscolor?0x0000FF:2
                resources[2]++
            }
            else{
                resourcemap[n]= iscolor?0xFF0000:3
                resources[3]++
            }
        }
        const nums = [2,4,8,16] //2能量/空白地块,4、8、16矿物/资源地块
        //console.log(`产出能量${resources[0]*nums[0]},产出矿物${resources[1]*nums[1]+resources[2]*nums[2]+resources[3]*nums[3]}`)
        return {map:resourcemap,res:{energy:resources[0],mineral:resources[1]*nums[1]+resources[2]*nums[2]+resources[3]*nums[3]}}
    }

}