import CreateMap from "./快捷函数/CreateMap-new";
import { GenerateResource,GenerateResourceMap } from "./快捷函数/CreateMap-new";
import { Application, Graphics, Text } from "pixi.js";
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { updateData,getData } from "./db/db";
import store from "@/store";

let app: Application;
const edge = 128

function createMap(app: Application, seed: number, scale: number) {
    const noise = new CreateMap(seed,edge)
    noise.GenerateNoiseMap(edge/5)
    const map0 = noise.GenerateGrayScaleMap()
    const map = GenerateResourceMap(map0)
    const res = GenerateResource(map0)
    const gcs = new Graphics();
    for (let n = 0; n < map.length; n++) {
        gcs.rect(n % edge * scale, Math.floor(n / edge) * scale, scale, scale);
        gcs.fill(0xFFFFFF*map[n]);
    }
    app.stage.addChild(gcs);
    return {energy:res[0],mineral:res[1]}
}

async function initApp() {
    app = new Application();
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
        const energystore = ref(store.getters.playerStoredResources.energy);
        const mineralstore = ref(store.getters.playerStoredResources.mineral);
        const metalstore = ref(store.getters.playerStoredResources.metal);
        const energyproduce = ref(0);
        const mineralproduce = ref(0);
        const metalproduce = ref(0);

        onMounted(async () => {
            const app = await initApp();
            const scale = app.canvas.height / edge;
            const res = createMap(app, store.getters.playerOccupiedConstellations[0], scale);
            energyproduce.value = res.energy
            mineralproduce.value = res.mineral
        });
        onBeforeUnmount(() => {
            app.destroy()
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
