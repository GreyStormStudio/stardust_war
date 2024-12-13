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
}