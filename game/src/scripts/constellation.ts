import { Application, Texture, Container, Sprite, Assets } from "pixi.js";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent, watch } from 'vue';
import { BLOCK_RES_PATH, SpriteEdge, CAPACITY } from "../../../share/CONSTANT";
import { useUserInfoStore } from "../store";
import { MyContainer } from "./ContainerControl";

let app: Application
const UIContainer = new MyContainer()

interface ExtendedSprite extends Sprite {
    originalX?: number;
    originalY?: number;
}

async function initApp() {
    app = new Application();
    const base = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: base.clientWidth,
        height: base.clientHeight,
        backgroundColor: "909090"
    });
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
    base.appendChild(app.canvas);
    UIContainer.set(0, 0, base.clientWidth, 64)
    app.stage.addChild(UIContainer)//将UI画布添加到stage中
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
