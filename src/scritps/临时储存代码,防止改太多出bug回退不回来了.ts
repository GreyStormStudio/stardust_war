import { Application, Graphics, Text } from "pixi.js";
import { GenerateMap } from "./快捷函数/CreateMap";
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { updateData } from "./db/db";
import store from "@/store";

const edge = 31;
const user = store.getters.playerName;

function createMap(app: Application, seed: number, scale: number) {
    const map = new GenerateMap(seed, edge);
    const map3 = map.GenerateResourceMap(map.GenerateGrayscaleMap(map.GenerateNoiseMap()), true);
    const gcs = new Graphics();
    for (let n = 0; n < map3.map.length; n++) {
        gcs.rect(n % edge * scale, Math.floor(n / edge) * scale, scale, scale);
        gcs.fill(map3.map[n]);
    }
    app.stage.addChild(gcs);
    return map3.res;
}

async function initApp() {
    const app = new Application();
    const container = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: container.clientWidth,
        height: container.clientHeight,

    });
    container.appendChild(app.canvas);
    return app;
}

export default defineComponent({
    setup() {
        const energystore = ref(store.getters.playerEnergyStore);
        const mineralstore = ref(store.getters.playerMineralStore);
        const metalstore = ref(store.getters.playerMetalStore);
        const energyproduce = ref(0);
        const mineralproduce = ref(0);
        const metalproduce = ref(0);

        const updateResources = () => {
            energystore.value += energyproduce.value;
            mineralstore.value += mineralproduce.value;
            metalstore.value += metalproduce.value;
            store.dispatch('updatePlayerStore', {
                energystore: energystore.value,
                mineralstore: mineralstore.value,
                metalstore: metalstore.value
            });
            updateData(user, {
                energystore: energystore.value,
                mineralstore: mineralstore.value
            });
        };

        onMounted(async () => {
            const app = await initApp();
            const scale = app.canvas.height / edge;
            const res = createMap(app, store.getters.playerSeed, scale);
            energyproduce.value = res.energy
            mineralproduce.value = res.mineral
            const text1 = new Text({ text: 'FPS:0', style: { fill: 0x000000, fontSize: 18 } })
            const text2 = new Text({ text: `地图种子:${store.getters.playerSeed}`, style: { fill: 0x000000, fontSize: 18 } })
            text2.x = text1.width + 60;
            app.stage.addChild(text1);
            app.stage.addChild(text2);

            let lastTime = 0;
            const deltaTime = 1000;

            app.ticker.add((time) => {
                text1.text = `FPS: ${app.ticker.FPS.toFixed(0)}`;
                const currentTime = performance.now();
                if (currentTime - lastTime >= deltaTime) {
                    lastTime = currentTime;
                    updateResources();
                }
            });
        });

        onBeforeUnmount(() => {
            const container = document.querySelector('.map') as HTMLElement;
            if (container) {
                container.style.display = 'none';
            }
        });

        return {
            energystore,
            mineralstore,
            metalstore,
            energyproduce,
            mineralproduce,
            metalproduce
        };
    }
});
