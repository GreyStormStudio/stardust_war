import { randomlist } from "./math";

export class PerlinNoise2D{
    width:number
    height:number
    scale:number
    seed:number
    private rand_list:Float32Array
    constructor(
        seed:number
    ){
        this.width=128
        this.height=128
        this.scale=8
        this.seed=seed
        this.rand_list=randomlist(seed,16384)//256个0-1之间的伪随机数
    }

    fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t: number, a: number, b: number): number {
        return a + t * (b - a);
    }

    grad(hash: number, x: number, y: number): number {
        const h = hash & 7; // Take the last 3 bits
        const u = h < 4 ? x : y;
        const v = h < 4 ? y : x;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    permute(p: Float32Array, i: number): number {
        return p[i];
    }

    generatePermutationVector(): Float32Array {
        const p = new Float32Array(256);
        for (let i = 0; i < 256; i++) {
            p[i]=i
        }
        for (let i = 0; i < 256; i++) {
            //const j = Math.floor(Math.random() * (i + 1));
            
            const rd = this.rand_list[i];
            const j = Math.floor(rd*(i+1));
            [p[i], p[j]] = [p[j], p[i]];
        }
        return p;
    }

    perlinNoise2D(){
        const perm = this.generatePermutationVector();
        const result= new Float32Array(this.width*this.height)

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const xi = Math.floor(x / this.scale);
                const yi = Math.floor(y / this.scale);
                const xf = (x / this.scale) - xi;
                const yf = (y / this.scale) - yi;
                const u = this.fade(xf);
                const v = this.fade(yf);
                const n00 = this.dotGridGradient(perm, xi, yi, xf, yf);
                const n01 = this.dotGridGradient(perm, xi, yi + 1, xf, yf - 1);
                const n10 = this.dotGridGradient(perm, xi + 1, yi, xf - 1, yf);
                const n11 = this.dotGridGradient(perm, xi + 1, yi + 1, xf - 1, yf - 1);
                const x1 = this.lerp(u, n00, n10);
                const x2 = this.lerp(u, n01, n11);
                result[y * this.width + x] = Math.max(Math.floor((this.lerp(v, x1, x2)+1)*128),0);
            }
        }
        return result;
    }
    
    dotGridGradient(p: Float32Array, ix: number, iy: number, x: number, y: number): number {
        const gx = x - Math.floor(x);
        const gy = y - Math.floor(y);
        const g00 = this.grad(this.permute(p, this.permute(p, ix + this.permute(p, iy))), gx, gy);
        const g10 = this.grad(this.permute(p, this.permute(p, ix + this.permute(p, iy + 1))), gx, gy - 1);
        const g01 = this.grad(this.permute(p, this.permute(p, ix + 1) + this.permute(p, iy)), gx - 1, gy);
        const g11 = this.grad(this.permute(p, this.permute(p, ix + 1) + this.permute(p, iy + 1)), gx - 1, gy - 1);
        return this.lerp(gx, this.lerp(gy, g00, g01), this.lerp(gy, g10, g11));
    }

    GenerateGrayscaleMap(map:Float32Array){//将map转化为灰度图
        const edge = map.length**0.5
        let grayscalemap = new Float32Array(map.length)
        for (let x = 0; x < edge; x++) {
            for (let y = 0; y < edge; y++) {
                let grey1 = Math.floor(map[x+y*edge]*256)
                grayscalemap[x+y*edge]=grey1
            }
        }
        return grayscalemap
    }
}

/*const noise = new PerlinNoise2D(1145)
const mp1 = noise.perlinNoise2D()
const gymp = noise.GenerateGrayscaleMap(mp1)*/
// const noise = perlinNoise2D(rand_vect, width, height, scale);
// console.log(noise);
