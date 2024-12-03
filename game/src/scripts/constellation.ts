import { Application, Graphics } from "pixi.js";
import { useGameInfoStore, useUserInfoStore } from "../store";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent } from 'vue';
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
    socket.emit('ReadData', username, true);
    socket.once('ReadDataResult', (result: any) => {
        store.value.energy = result.gameinfo.storage.energy;
        store.value.mineral = result.gameinfo.storage.mineral;
        store.value.metal = result.gameinfo.storage.metal;
    });
    socket.once('ShipInfo', (username: string, sinfo: any) => {
        info.p = sinfo.position
        info.v = sinfo.velocity
        info.a = sinfo.acceleration
    })
    /*socket.emit('GetShipInfo', 11)
    socket.once('GetShipInfoResult', (result: any) => {
        console.log(result)
    })*/
}

export default defineComponent({
    setup() {
        const store = ref(useGameInfoStore().getStorage);
        const info = { p: { x: 0, y: 0 }, v: { x: 0, y: 0 }, a: { x: 0, y: 0 } }
        const intervalId = ref();
        const socket = useSocket();
        onMounted(async () => {
            intervalId.value = setInterval(() => {
                fetchData(socket, store, info);
                if (store.value.energy > 5000) {//测试,资源太多直接归零
                    socket.emit('clearStorage', useUserInfoStore().getUsername)
                }
            }, 1000 / 60);
            await initApp()
        });
        onBeforeUnmount(() => {
            if (intervalId.value) {
                clearInterval(intervalId.value);
            }
        });
        return {
            store,
            info
        }
    }

})
