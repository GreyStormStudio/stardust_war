import { Application, Graphics, Container, Sprite, Assets } from "pixi.js";
import { useUserInfoStore } from "../store";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent } from 'vue';
import { BLOCK_RES_PATH, SpriteEdge } from "../../../share/CONSTANT";
import { CAPACITY } from "../../../share/CONSTANT";
let app: Application | null
async function initApp(socket: any) {
    if (!app) {//没有Application就实例化一个
        app = new Application()
    }
    const mapContainer = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: mapContainer.clientWidth,
        height: mapContainer.clientHeight,
        backgroundColor: "909090"
    });
    mapContainer.appendChild(app.canvas);
    const bottomContainer = new Container();
    bottomContainer.position.set(0, app.canvas.height - 64); // 设置容器位置在canvas底部
    app.stage.addChild(bottomContainer);
    const containerWidth = app.canvas.width;
    const username = useUserInfoStore().getUsername;
    socket.emit('RequestData', username, 'shipblocks');
    let imageUrls: string[] = []
    socket.once('RequestDataResult', async (result: any) => {
        result.forEach((block: any) => {
            imageUrls.push(`BLOCK_${block.type}${block.level}.png`)
        })
        let spacing = 0
        if (containerWidth < imageUrls.length * SpriteEdge) {
            spacing = (containerWidth - (SpriteEdge * imageUrls.length)) / (imageUrls.length - 1);
        }
        for (let i = imageUrls.length - 1; i >= 0; i--) {
            const texture = await Assets.load(BLOCK_RES_PATH + imageUrls[i])
            const sprite = new Sprite(texture);
            sprite.width = sprite.height = 64;
            sprite.position.set((i * (SpriteEdge + spacing)), 0); // 设置精灵位置
            bottomContainer.addChild(sprite);
        }
    })
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
        const store = ref({ energy: 0, mineral: 0, metal: 0 });
        const info = ref({ mass: 0, label: '', position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, acceleration: { x: 0, y: 0 }, thrust: 40000 });
        const intervalId = ref();
        const socket = useSocket();
        onMounted(async () => {
            //socket.emit('clearStorage', useUserInfoStore().getUsername)//开始先清除资源
            intervalId.value = setInterval(() => {
                fetchData(socket, store, info);
            }, 16.667);
            await initApp(socket)
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
