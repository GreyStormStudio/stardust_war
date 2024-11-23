import { Application, Graphics, Text } from "pixi.js";
import { GenerateMap } from "../快捷函数/CreateMap";
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { ReadData } from "../快捷函数/InitorReadData";
import { updateData } from "../db/db";
import store from "@/store";
const username = store.getters.playerName
//如果没有Appliaction对象就创建一个该对象,否则读取该对象
let appInstance: Application;
async function initApp(): Promise<Application> {
    appInstance = new Application();
    const container = document.querySelector('.map') as HTMLElement;
    await appInstance.init({
        width: container.clientWidth,
        height: container.clientHeight,
    });
    container.appendChild(appInstance.canvas);
    return appInstance;
}
const edge = 31
function createMap(app: Application, seed: number, scale: number) {//显示地图
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

export default defineComponent({
    setup() {

        const energystore = ref(store.getters.playerStoredResources.energy)
        const mineralstore = ref(store.getters.playerStoredResources.mineral)
        const metalstore = ref(store.getters.playerStoredResources.metal)
        const energyproduce = ref(10)
        const mineralproduce = ref(5)
        const metalproduce = ref(0)

        const updateResources = () => {
            energystore.value += energyproduce.value
            mineralstore.value += mineralproduce.value
            metalstore.value += metalproduce.value
            store.dispatch('updataPlayerStore', {
                energy: energystore.value,
                mineral: mineralstore.value,
                metal: metalstore.value
            });
        }

        const uploaddata = () => {
            updateData("Users:" + store.getters.playerName, {
                storedResources: {
                    energy: energystore.value,
                    mineral: mineralstore.value,
                    metal: metalstore.value
                }
            });
        }
        onMounted(async () => {
            const app = await initApp();
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
                    updateResources();
                    console.log(store.getters.playerStoredResources)
                }

                if (currentTime - lastUploadTime >= uploadInterval) {
                    lastUploadTime = currentTime;
                    uploaddata();
                }
            });

        });
        onBeforeUnmount(() => {
            appInstance.ticker.destroy()
        });
        return {
            energystore,
            mineralstore,
            metalstore,
            energyproduce,
            mineralproduce,
            metalproduce
        }
    }
})