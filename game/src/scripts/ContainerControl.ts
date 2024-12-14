import { Container } from 'pixi.js';

export class MyContainer extends Container {
    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
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
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.interactive = interactive;
        this.zIndex = zIndex
    }
}