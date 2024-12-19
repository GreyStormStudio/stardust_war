import { Application } from "pixi.js";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent } from 'vue';
import { CAPACITY, SpriteEdge } from "../../../../share/CONSTANT";
import { loadSprites, loadResUI } from "./ui";
import { createShipSprite, rotation, initbackground } from "./map";
import { useUserInfoStore } from "../../store";
import { MyContainer } from "../ContainerControl";

async function initApp(socket: any) {

    const app = new Application();
    const base = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: base.clientWidth,
        height: base.clientHeight,
        backgroundColor: "000000"
    });
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
    base.appendChild(app.canvas);

    const UIContainer = new MyContainer()
    const BodyContainer = new MyContainer()
    const ResContainer = new MyContainer()
    const MapContainer = new MyContainer()

    UIContainer.set(0, 0, base.clientWidth, base.clientHeight)
    BodyContainer.set(0, UIContainer.con_height - SpriteEdge, UIContainer.con_width, SpriteEdge)
    ResContainer.set(0, 0, SpriteEdge / 2, SpriteEdge / 2 * 3)
    MapContainer.set(0, 0, base.clientWidth, base.clientHeight)

    initbackground(MapContainer)
    const ship = await createShipSprite(MapContainer)
    loadSprites(socket, useUserInfoStore().getUsername, UIContainer, BodyContainer)
    const text = await loadResUI(UIContainer, ResContainer)
    if (!app.stage.children.includes(MapContainer)) {
        app.stage.addChild(MapContainer, UIContainer)
    }
    return { ship, text }

}

function useSocket() {
    const instance = getCurrentInstance();
    return instance!.appContext.config.globalProperties.$socket;
}

// 获取资源
function fetchData(socket: any, text: any, info: any) {
    const username = useUserInfoStore().getUsername;
    socket.emit('RequestData', username, 'storage');
    socket.emit('RequestShipData', username);

    function handleRequestDataResult(result: any) {
        text[0].text = result.energy;
        text[1].text = result.mineral;
        text[2].text = result.metal;
        //#region 测试代码，达到上限就清空
        if (result.energy >= CAPACITY) {
            socket.emit('clearStorage', username)
        }
        //#endregion
    }

    function handleShipInfo(sinfo: any) {

        info.value = { ...sinfo };
    }

    socket.once('RequestDataResult', handleRequestDataResult);
    socket.once('RequestShipDataResult', handleShipInfo);
}

export default defineComponent({
    setup() {
        const info = ref({ mass: 0, label: '', position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, acceleration: { x: 0, y: 0 }, thrust: 40000 });
        const intervalId = ref();
        const socket = useSocket();
        onMounted(async () => {
            const infoa = await initApp(socket)
            intervalId.value = setInterval(() => {
                fetchData(socket, infoa.text, info);
                rotation(infoa.ship)
            }, 16.667);

        });
        onBeforeUnmount(() => {
            if (intervalId.value) {
                clearInterval(intervalId.value);
            }
        });
    }

})
