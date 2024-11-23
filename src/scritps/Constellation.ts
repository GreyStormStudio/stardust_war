import { Application, Graphics, Text } from "pixi.js";
import { GenerateMap } from "./快捷函数/CreateMap";
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { ReadData } from "./快捷函数/InitorReadData";
import { updateData } from "./db/db";
import store from "@/store";

let appInstance: Application | null = null; // 外部变量存储app实例
const edge = 31;

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
    if (!appInstance) {
        appInstance = new Application();
        const container = document.querySelector('.map') as HTMLElement;
        await appInstance.init({
            width: container.clientWidth,
            height: container.clientHeight,
        });
        container.appendChild(appInstance.canvas);
    }
    return appInstance;
}

export default defineComponent({
    setup() {
        console.log(store.getters.playerStoredResources)
        const energystore = ref(store.getters.playerStoredResources.energy);
        const mineralstore = ref(store.getters.playerStoredResources.mineral);
        const metalstore = ref(store.getters.playerStoredResources.metal);
        const energyproduce = ref(0);
        const mineralproduce = ref(0);
        const metalproduce = ref(0);

        const updataResources = () => {
            energystore.value += energyproduce.value;
            mineralstore.value += mineralproduce.value;
            metalstore.value += metalproduce.value;
            console.log(energystore.value, mineralstore.value, metalstore.value)
            store.dispatch('updataPlayerStore', {
                energy: energystore.value,
                mineral: mineralstore.value,
                metal: metalstore.value
            });
        };
        const uploaddata = () => {
            updateData("Users:" + store.getters.playerName, {
                energy: energystore.value,
                mineral: mineralstore.value,
                metal: metalstore.value
            });
        }

        onMounted(async () => {
            const app = await initApp();
            console.log(app == null)
            const scale = app.canvas.height / edge;
            const res = createMap(app, store.getters.playerOccupiedConstellations[0], scale);
            energyproduce.value = res.energy
            mineralproduce.value = res.mineral
            const text1 = new Text({ text: 'FPS:0', style: { fill: 0x000000, fontSize: 18 } })
            const text2 = new Text({ text: `地图种子:${store.getters.playerOccupiedConstellations[0]}`, style: { fill: 0x000000, fontSize: 18 } })
            text2.x = text1.width + 60;
            app.stage.addChild(text1);
            app.stage.addChild(text2);

            let lastUpdateTime = 0;
            const updateInterval = 1000; // 每秒更新一次资源
            let lastUploadTime = 0;
            const uploadInterval = 10000; // 每10秒上传一次数据
            //app.ticker.maxFPS = 60;
            app.ticker.add((time) => {
                text1.text = `FPS: ${app.ticker.FPS.toFixed(0)}`;
                const currentTime = performance.now();

                if (currentTime - lastUpdateTime >= updateInterval) {
                    lastUpdateTime = currentTime;
                    updataResources();
                }

                if (currentTime - lastUploadTime >= uploadInterval) {
                    lastUploadTime = currentTime;
                    uploaddata();
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
    },
    methods: {
    }
});
