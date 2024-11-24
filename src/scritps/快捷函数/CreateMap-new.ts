import { createNoise2D } from 'simplex-noise';
import alea from 'alea';

class CreateMap {
    private noise: ReturnType<typeof createNoise2D>;
    private map: Float32Array;

    constructor(public seed: number, public edge: number) {
        this.noise = createNoise2D(alea(this.seed));
        this.map = new Float32Array(this.edge * this.edge);
    }

    GenerateNoiseMap(scale:number) {
        for (let x = 0; x < this.edge; x++) {
            for (let y = 0; y < this.edge; y++) {
                const val = this.noise(x/scale, y/scale);
                this.map[x + y * this.edge] = (val + 1) / 2; // 将 [-1, 1] 范围转换为 [0, 1]
            }
        }
        return this.map
    }

    GenerateGrayScaleMap(): Uint8Array {
        const grayScaleMap = new Uint8Array(this.edge * this.edge);
        for (let i = 0; i < this.map.length; i++) {
            // 将 [0, 1] 范围的浮点数转换为 [0, 255] 范围的整数
            grayScaleMap[i] = Math.round(this.map[i] * 255);
        }
        return grayScaleMap;
    }


}
//#region 绘制颜色地图
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r as number * 255, g as number * 255, b as number * 255];
}

function rgbToHex(r: number, g: number, b: number): number {
    return ((r << 16) | (g << 8) | b) >>> 0;
}

function GenerateColorfulMap(map: Uint8Array): Float32Array {
    const heightMap = new Float32Array(map.length);
    const maxVal = 255; // Assuming the input map values are in the range [0, 255]

    for (let i = 0; i < map.length; i++) {
        const value = map[i] / maxVal; // Normalize the value to the range [0, 1]
        const hue = value; // Use the normalized value as hue
        const saturation = 1; // Full saturation
        const brightness = 1; // Full brightness

        // Convert HSV to RGB
        const [r, g, b] = hsvToRgb(hue, saturation, brightness);

        // Convert RGB to Hex and store in the heightMap
        heightMap[i] = rgbToHex(r, g, b);
    }

    return heightMap;
}
//#endregion
function GenerateResourceMap(map: Uint8Array){
    const resMap = new Float32Array(map.length);
    const maxVal = 255; // 灰度值的最大值

    // 根据灰度值设置资源含量
    for (let i = 0; i < map.length; i++) {
        const grayValue = map[i];

        if (grayValue > maxVal*0.5) {
            // 有资源地块
            resMap[i] = 0.9;
        }else {
            // 无资源地块
            resMap[i] = 1;
        }
    }
    //对resMap求和再输出
    return resMap;
}
//#region 设置资源
function GenerateResource(map: Uint8Array){
    const resMap = new Float32Array(map.length);
    const maxVal = 255; // 灰度值的最大值
    let sum = [0,0];

    // 根据灰度值设置资源含量
    for (let i = 0; i < map.length; i++) {
        const grayValue = map[i];

        if (grayValue > maxVal*0.5) {
            // 有资源地块
            resMap[i] = 1;
        }else {
            // 无资源地块
            resMap[i] = 0;
        }
        sum[resMap[i]]++;
    }
    //对resMap求和再输出
    return sum;
}
//#endregion


export default CreateMap;
export {
    GenerateColorfulMap,
    GenerateResourceMap,
    GenerateResource
}