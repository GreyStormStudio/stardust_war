import { createNoise2D } from "simplex-noise";
import alea from 'alea'
import { MapEdge } from "./CONSTANT";

const Edge = MapEdge
export class Noise {
    noise: ReturnType<typeof createNoise2D>;
    map: Float32Array;
    seed: number;
    rate: number;

    constructor(
        seed: number, rate: number
    ) {
        this.seed = seed;
        this.rate = rate;
        this.noise = createNoise2D(alea(this.seed))
        this.map = new Float32Array(Edge * Edge)
    }

    getNoise(x: number, y: number) {
        return Math.floor((this.noise(x / this.rate, y / this.rate) + 1) / 2 * 255)
    }

    generateNoise() {
        for (let x = 0; x < Edge; x++) {
            for (let y = 0; y < Edge; y++) {
                this.map[x + y * Edge] = this.getNoise(x, y)
            }
        }
        return this.map
    }

    /*generateDensityMap() {
        this.generateNoise()
        const densitymap = new Float32Array(Edge * Edge)
        const color = { low: 64, mid: 128, high: 192 };
        for (let n = 0; n < Edge * Edge; n++) {
            let value = this.map[n];
            let r = 0, g = 0, b = 0;

            if (value <= color.low) {
                r = 255; g = 255; b = 255; // 白色
            } else if (value <= color.mid) {
                // 从绿色渐变到蓝色
                let ratio = (value - color.low) / (color.mid - color.low);
                r = 0;
                g = Math.floor(255 * (1 - ratio));
                b = 255;
            } else if (value <= color.high) {
                // 从蓝色渐变到红色
                let ratio = (value - color.mid) / (color.high - color.mid);
                r = Math.floor(255 * ratio);
                g = 0;
                b = 255 - Math.floor(255 * ratio);
            } else {
                // 从红色渐变到黄色
                let ratio = (value - color.high) / (255 - color.high);
                r = 255;
                g = Math.floor(255 * ratio);
                b = 0;
            }
            densitymap[n] = 0x000001 * r + 0x000100 * g + 0x010000 * b
        }
        return densitymap
    }*/
}