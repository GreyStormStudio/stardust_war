import { Application } from "pixi.js";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent, watch } from 'vue';
import { CAPACITY } from "../../../../share/CONSTANT";
import { UIContainer, loadSprites } from "./ui";
import { useUserInfoStore } from "../../store";

let app: Application

async function initApp(socket: any) {
    app = new Application();
    const base = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: base.clientWidth,
        height: base.clientHeight,
        backgroundColor: "FFF"
    });
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
    base.appendChild(app.canvas);

    loadSprites(socket, useUserInfoStore().getUsername, app)
    UIContainer.set(0, base.clientHeight - 64, base.clientWidth, 64)
    //MapContainer.set(0, 0, base.clientWidth, base.clientHeight - 64)

    /*const texture = await Assets.load('/src/public/背景/bg5.jpg');
    const bg = new Sprite(texture)

    const containerWidth = base.clientWidth;
    const containerHeight = base.clientHeight - 64;

    const spriteAspectRatio = texture.width / texture.height;
    const containerAspectRatio = containerWidth / containerHeight;

    if (spriteAspectRatio < containerAspectRatio) {
        bg.width = containerWidth;
        bg.height = containerWidth / spriteAspectRatio;
    } else {
        bg.height = containerHeight;
        bg.width = containerHeight * spriteAspectRatio;
    }

    bg.anchor.set(0, 0);

    MapContainer.addChild(bg)*/

    //app.stage.addChild(MapContainer)
    app.stage.addChild(UIContainer)
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
        const store = ref({ energy: 0, mineral: 0, metal: 0 });
        const info = ref({ mass: 0, label: '', position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, acceleration: { x: 0, y: 0 }, thrust: 40000 });
        const intervalId = ref();
        const socket = useSocket();
        onMounted(async () => {
            intervalId.value = setInterval(() => {
                fetchData(socket, store, info);
            }, 16.667);
            initApp(socket)
        });
        onBeforeUnmount(() => {
            //app.destroy()
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
