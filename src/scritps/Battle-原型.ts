import { Application, Sprite, Assets } from 'pixi.js'
import { onMounted, defineComponent } from 'vue';
let n = 10
let speed = 0.5
const app = new Application();
await app.init({
    width: 1000,
    height: 500,
    backgroundColor: "#FFF0F0",
    hello: false,
});
document.body.appendChild(app.canvas)
let sprites: Sprite[] = []
let Aim: number[][] = []
for (let index = 0; index < n; index++) {
    Aim.push([Math.random() * 1000, Math.random() * 500])
}
async function createSprites(num: number) {
    try {
        await Assets.load('../战斗单位/text1.png');
    }
    catch (e) {
        console.log("PNG not load");
        console.log(e);
    }
    for (let index = 0; index < num; index++) {
        sprites[index] = Sprite.from('../战斗单位/text1.png');
        sprites[index].position.set(500, 250)
        sprites[index].anchor.set(0.5, 0.5)
        sprites[index].scale.set(0.2, 0.2)
        app.stage.addChild(sprites[index])
    }

}
function MoveTo(index: number, x: number, y: number) {
    let dx = x - sprites[index].x
    let dy = y - sprites[index].y
    if ((sprites[index].x - x) ** 2 + (sprites[index].y - y) ** 2 < speed) {
        Aim[index][0] = -1
        sprites[index].position.set(x, y)
        return
    }
    sprites[index].x += Math.sin(Math.atan2(dx, dy)) * speed
    sprites[index].y += Math.cos(Math.atan2(dx, dy)) * speed
}
function test() {
    for (let index = 0; index < n; index++) {
        if (Aim[index][0] == -1) {
            Aim[index][0] = Math.random() * 1000
            Aim[index][1] = Math.random() * 500
        }
        else {
            MoveTo(index, Aim[index][0], Aim[index][1])
        }

    }
    requestAnimationFrame(test);
}
export default defineComponent({
    setup() {
        onMounted(async () => {
            await createSprites(n)
            test()
        })
    }
})
