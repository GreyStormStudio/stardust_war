import { randomlist } from "./math";

export class PerlinNoise2D {
    edge: number
    scale: number//瓦片大小
    seed: number
    private rand_list: Float32Array
    constructor(
        seed: number,
        edge: number
    ) {
        this.edge = edge
        this.scale = 8
        this.seed = seed
        this.rand_list = randomlist(seed, this.edge * this.edge)//256个0-1之间的伪随机数
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
            p[i] = i
        }
        for (let i = 0; i < 256; i++) {
            //const j = Math.floor(Math.random() * (i + 1));

            const rd = this.rand_list[i];
            const j = Math.floor(rd * (i + 1));
            [p[i], p[j]] = [p[j], p[i]];
        }
        return p;
    }

    perlinNoise2D() {
        const perm = this.generatePermutationVector();
        const result = new Float32Array(this.edge * this.edge)

        for (let y = 0; y < this.edge; y++) {
            for (let x = 0; x < this.edge; x++) {
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
                result[y * this.edge + x] = Math.max(Math.floor((this.lerp(v, x1, x2) + 1) * 128), 0);
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
    createGaussianKernel(kernelsize: number, sigma: number) {
        const kernel = new Float32Array(kernelsize * kernelsize);
        const mean = Math.floor(kernelsize / 2);
        let sum = 0;

        for (let x = 0; x < kernelsize; x++) {
            for (let y = 0; y < kernelsize; y++) {
                const xDist = x - mean;
                const yDist = y - mean;
                kernel[x * kernelsize + y] = Math.exp(-(xDist * xDist + yDist * yDist) / (2 * sigma * sigma));
                sum += kernel[x * kernelsize + y];
            }
        }
        for (let i = 0; i < kernel.length; i++) {
            kernel[i] /= sum;
        }

        return kernel;
    }
    applyGaussianBlur(input: Float32Array, kernelsize: number, sigma: number) {
        const output = new Float32Array(this.edge * this.edge);
        const kernel = this.createGaussianKernel(kernelsize, sigma);
        const halfKernelSize = Math.floor(kernelsize / 2);

        for (let y = 0; y < this.edge; y++) {
            for (let x = 0; x < this.edge; x++) {
                let sum = 0;
                for (let ky = -halfKernelSize; ky <= halfKernelSize; ky++) {
                    for (let kx = -halfKernelSize; kx <= halfKernelSize; kx++) {
                        const sampleX = Math.min(Math.max(x + kx, 0), this.edge - 1);
                        const sampleY = Math.min(Math.max(y + ky, 0), this.edge - 1);
                        sum += input[sampleY * this.edge + sampleX] * kernel[(ky + halfKernelSize) * kernelsize + (kx + halfKernelSize)];
                    }
                }
                output[y * this.edge + x] = sum;
            }
        }

        return output;
    }
}

/*const noise = new PerlinNoise2D(1145)
const mp1 = noise.perlinNoise2D()
const gymp = noise.GenerateGrayscaleMap(mp1)*/
// const noise = perlinNoise2D(rand_vect, width, height, scale);
// console.log(noise);
