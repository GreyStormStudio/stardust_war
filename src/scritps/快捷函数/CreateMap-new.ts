import {Noise2D} from './noise'
import { randomlist } from './math'

export class GenerateMap{
    seed:number
    loud:number
    constructor(
        seed:number,
    ){
        this.seed=seed
        this.loud=1
    }

    GenerateNoiseMap(edge:number){//生成edge*edge,理论最小值为0最大值为1的噪声地图
        const noise = new Noise2D(this.seed,this.loud)
        const rd_lt = randomlist(this.seed,edge*edge)
        let map = new Array(edge).fill(0).map(() => new Array(edge).fill(0));
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                map[x][y]=(noise.getBuff(rd_lt,x,y)+1)/2
            }
        }
        //console.log(map)
        return map
    }

    GenerateGrayscaleMap(map:number[][]){//将map转化为灰度图
        const edge = map.length
        let grayscalemap = new Array(edge).fill(0).map(() => new Array(edge).fill(0));
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                let grey1 = Math.floor(map[x][y]*255)
                let color1 = `rgb(${grey1}, ${grey1}, ${grey1})`
                grayscalemap[x][y]=color1
            }
        }
        return grayscalemap
    }

    SmoothMap(map: number[][]) { // 平滑地图
        const edge = map.length;
        let smoothedMap = new Array(edge).fill(0).map(() => new Array(edge).fill(0));
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                let sum = 0;
                let count = 0;
                for (let i = -1; i <= 1; i+=2) {
                    for (let j = -1; j <= 1; j+=2) {
                        const nx = x + i;
                        const ny = y + j;
                        if (nx >= 0 && nx < edge && ny >= 0 && ny < edge) {
                            sum += map[nx][ny];
                            count++;
                        }
                    }
                }
                smoothedMap[x][y] = sum / count;
            }
        }
        return smoothedMap;
    }

    EnhanceContrast(map: number[][], contrastFactor: number) { // 提高地图对比度
        const edge = map.length;
        let enhancedMap = new Array(edge).fill(0).map(() => new Array(edge).fill(0));
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                enhancedMap[x][y] = Math.pow(map[x][y], contrastFactor);//smoind函数似乎不能在这里用,不知道怎么回事(?)
            }
        }
        return enhancedMap;
    }

    GenerateClusteredMap(map: number[][], threshold: number) { // 生成团块化的地图
        const edge = map.length;
        let clusteredMap = new Array(edge).fill(0).map(() => new Array(edge).fill(0));

        // Apply threshold to separate dark and light areas
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                if (map[x][y] > threshold) {
                    clusteredMap[x][y] = 1; // Dark area
                } else {
                    clusteredMap[x][y] = 0; // Light area
                }
            }
        }

        // Apply morphological operations to form clusters
        clusteredMap = this.applyMorphologicalOperations(clusteredMap);

        return clusteredMap;
    }

    applyMorphologicalOperations(map: number[][]) {
        const edge = map.length;
        let resultMap = new Array(edge).fill(0).map(() => new Array(edge).fill(0));

        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                if (map[x][y] === 1) {
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const nx = x + i;
                            const ny = y + j;
                            if (nx >= 0 && nx < edge && ny >= 0 && ny < edge) {
                                resultMap[nx][ny] = 1;
                            }
                        }
                    }
                }
            }
        }

        // Example of a simple erosion operation to smooth the result
        let tempMap = new Array(edge).fill(0).map(() => new Array(edge).fill(0));
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const nx = x + i;
                        const ny = y + j;
                        if (nx >= 0 && nx < edge && ny >= 0 && ny < edge && resultMap[nx][ny] === 1) {
                            count++;
                        }
                    }
                }
                if (count >= 5) { // Threshold for keeping the cluster
                    tempMap[x][y] = 1;
                }
            }
        }

        return tempMap;
    }

    OptimizeMap(map:number[][]){
        return this.GenerateClusteredMap(this.EnhanceContrast(this.SmoothMap(map),0.3),0.860)
    }



}