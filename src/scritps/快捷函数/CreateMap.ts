import { Color, MSAA_QUALITY } from 'pixi.js';
import {random,MatrixStatistics} from './math'

export function generatePerlinNoiseMap(size:number,seed: number): number[][] {
    const map = new Array(size).fill(0).map(() => new Array(size).fill(0));
    function perlinNoise(x: number, y: number, seed: number): number {
        let noise = random(seed,x+y*size)
        return (noise - Math.floor(noise) + 1) / 2;
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            map[i][j] = perlinNoise(i, j, seed);
        }
    }
    return map;
}
export function smoothPerlinNoiseMap(map: number[][], intensity: number): number[][] {
    const size = map.length;
    const smoothedMap = new Array(size).fill(0).map(() => new Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let sum = 0;
            let count = 0;
            for (let di = -intensity; di <= intensity; di++) {
                for (let dj = -intensity; dj <= intensity; dj++) {
                    const ni = i + di;
                    const nj = j + dj;
                    if (ni >= 0 && ni < size && nj >= 0 && nj < size) {
                        sum += map[ni][nj];
                        count++;
                    }
                }
            }
            smoothedMap[i][j] = sum / count;
        }
    }
    return smoothedMap;
}
export function BlockDivision(map:number[][]){
    let outmap:string[][] = new Array(8).fill('0xffffff').map(() => new Array(8).fill('0xffffff'));
    const blockedge = map.length/8
    const blocksize = blockedge**2
    for(let x=0;x<map.length;x+=blockedge){
        for(let y=0;y<map.length;y+=blockedge){
            const block = map.slice(x,x+blockedge).map(row => row.slice(y, y + blockedge));
            const sp = MatrixStatistics(block,0,150)
            const red = MatrixStatistics(block,150,173)
            const blue = MatrixStatistics(block,173,178)
            const green = MatrixStatistics(block,178,184)
            const empty = MatrixStatistics(block,184,256)
            if(red/blocksize>0.05){
                outmap[Math.floor(x/blockedge)][Math.floor(y/blockedge)]='0xff0000'
            }
            else if(blue/blocksize>0.07){
                outmap[Math.floor(x/blockedge)][Math.floor(y/blockedge)]='0x0000ff'
            }
            else if(green/blocksize>0.15){
                outmap[Math.floor(x/blockedge)][Math.floor(y/blockedge)]='0x00ff00'
            }
            else{
                outmap[Math.floor(x/blockedge)][Math.floor(y/blockedge)]='0xffffff'

            }

        }
    }
    return outmap
}