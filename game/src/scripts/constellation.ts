import { Application, Graphics } from "pixi.js";
import { useGameInfoStore, useUserInfoStore } from "../store";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent } from 'vue';
import { CAPACITY } from "../../../share/CONSTANT";
let app: Application | null
async function initApp() {
    if (!app) {//没有Application就实例化一个
        app = new Application()
    }
    const mapContainer = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: mapContainer.clientWidth,
        height: mapContainer.clientHeight,
    });
    mapContainer.appendChild(app.canvas);
    return
}

function useSocket() {
    const instance = getCurrentInstance();
    return instance!.appContext.config.globalProperties.$socket;
}

// 获取资源
function fetchData(socket: any, store: any, info: any) {
    const username = useUserInfoStore().getUsername;
    socket.emit('RequestData', username, 'storage');
    socket.emit('RequestShipData', username);

    function handleRequestDataResult(result: any) {
        store.value.energy = result.energy;
        store.value.mineral = result.mineral;
        store.value.metal = result.metal;
    }

    function handleShipInfo(sinfo: any) {

        info.value = { ...sinfo };
    }

    socket.once('RequestDataResult', handleRequestDataResult);
    socket.once('RequestShipDataResult', handleShipInfo);
}

export default defineComponent({
    setup() {
        const capacity = CAPACITY;
        const store = ref(useGameInfoStore().getStorage);
        const info = ref({ mass: 0, label: '', position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, acceleration: { x: 0, y: 0 }, thrust: 40000 });
        const intervalId = ref();
        const socket = useSocket();
        onMounted(async () => {
            //socket.emit('clearStorage', useUserInfoStore().getUsername)//开始先清除资源
            intervalId.value = setInterval(() => {
                fetchData(socket, store, info);
            }, 16.667);
            await initApp()
        });
        onBeforeUnmount(() => {
            if (intervalId.value) {
                clearInterval(intervalId.value);
            }
        });
        return {
            store,
            info,
            capacity
        }
    }

})
