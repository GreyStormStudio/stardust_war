import { Container } from 'pixi.js';

export class MyContainer extends Container {
    con_width: number
    con_height: number
    constructor() {
        super();
        this.con_width = 0;
        this.con_height = 0;
        this.interactive = true;
        this.zIndex = 1;
    }
    /**
     * 
     * @param x x
     * @param y y
     * @param width 宽度
     * @param height 高度
     * @param interactive 可交互性
     * @param zIndex 图层
     */
    public set(x: number, y: number, width: number, height: number, interactive: boolean = true, zIndex: number = 1): void {
        this.position.set(x, y)
        this.con_width = width
        this.con_height = height
        this.interactive = interactive;
        this.zIndex = zIndex
    }
}