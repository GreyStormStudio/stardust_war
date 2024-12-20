import { Application } from "pixi.js";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent } from 'vue';
import { CAPACITY, SpriteEdge } from "../../../../share/CONSTANT";
import { loadSprites, loadResUI } from "./ui";
//import { create, initbackground, rotation } from "./map";
import { createViewport, testAction } from "./map";
import { useUserInfoStore } from "../../store";
import { MyContainer } from "../ContainerControl";

export async function initApp(socket: any) {
    const app = new Application();
    const base = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: base.clientWidth,
        height: base.clientHeight,
        backgroundColor: 0x2c2c2c
    });

    document.addEventListener('contextmenu', (event) => event.preventDefault());
    base.appendChild(app.canvas);

    const MapContainer = new MyContainer();
    const UIContainer = new MyContainer();
    const BodyContainer = new MyContainer();
    const ResContainer = new MyContainer();

    MapContainer.set(0, 0, base.clientWidth, base.clientHeight);
    UIContainer.set(0, 0, base.clientWidth, base.clientHeight);
    BodyContainer.set(0, UIContainer.con_height - SpriteEdge, UIContainer.con_width, SpriteEdge);
    ResContainer.set(0, 0, SpriteEdge / 2, SpriteEdge / 2 * 3);

    const { viewport, shipSprites } = await createViewport(app.renderer, MapContainer);
    await loadSprites(socket, useUserInfoStore().getUsername, UIContainer, BodyContainer);
    const text = await loadResUI(UIContainer, ResContainer);

    app.stage.addChild(viewport, UIContainer);

    return { viewport, text, shipSprites };
}

function useSocket() {
    const instance = getCurrentInstance();
    return instance?.appContext.config.globalProperties.$socket;
}

function fetchData(socket: any, text: any, info: any) {
    const username = useUserInfoStore().getUsername;
    socket.emit('RequestData', username, 'storage');
    socket.emit('RequestShipData', username);

    const handleRequestDataResult = (result: any) => {
        text[0].text = result.energy;
        text[1].text = result.mineral;
        text[2].text = result.metal;

        if (result.energy >= CAPACITY) {
            socket.emit('clearStorage', username);
        }
    };

    const handleShipInfo = (sinfo: any) => {
        info.value = { ...sinfo };
    };

    socket.once('RequestDataResult', handleRequestDataResult);
    socket.once('RequestShipDataResult', handleShipInfo);
}

export default defineComponent({
    setup() {
        const info = ref({
            mass: 0,
            label: '',
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
            thrust: 40000
        });
        const intervalId = ref<NodeJS.Timeout>();
        const socket = useSocket();

        onMounted(async () => {
            const { text, shipSprites } = await initApp(socket);

            const update = () => {
                requestAnimationFrame(update);
            };
            update();

            intervalId.value = setInterval(() => {
                fetchData(socket, text, info);
                testAction(shipSprites[0]);
            }, 16.667);
        });

        onBeforeUnmount(() => {
            if (intervalId.value) {
                clearInterval(intervalId.value);
            }
        });

        return { info };
    }
});