import { Application } from "pixi.js";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent } from 'vue';
import { CAPACITY, SpriteEdge } from "../../../../share/CONSTANT";
import { loadSprites, loadUI, updateProgressBar } from "./ui";
//import { create, initbackground, rotation } from "./map";
import { createViewport } from "./map";
import { useUserInfoStore } from "../../store";
import { MyContainer } from "../ContainerControl";

export async function initApp(socket: any, start: { x: number, y: number, angle: number }) {
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
    const PosContainer = new MyContainer();

    MapContainer.set(0, 0, base.clientWidth, base.clientHeight);
    UIContainer.set(0, 0, base.clientWidth, base.clientHeight);
    BodyContainer.set(0, UIContainer.con_height - SpriteEdge, UIContainer.con_width, SpriteEdge);
    ResContainer.set(0, 0, SpriteEdge / 2, SpriteEdge / 2 * 3);
    PosContainer.set(0, 0, SpriteEdge / 2, SpriteEdge / 2)

    const { viewport, shipSprite } = await createViewport(app.renderer, MapContainer, start);
    await loadSprites(socket, useUserInfoStore().getUsername, UIContainer, BodyContainer);
    const { text, fillbar } = await loadUI(UIContainer, ResContainer, PosContainer);

    app.stage.addChild(viewport, UIContainer, PosContainer);
    return { text, fillbar, shipSprite };
}

function useSocket() {
    const instance = getCurrentInstance();
    return instance?.appContext.config.globalProperties.$socket;
}

function fetchData(socket: any, text: any, fillbar: any, info: any) {
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
        text[3].text = sinfo.position.x.toFixed(3)
        text[4].text = sinfo.position.y.toFixed(3)
        text[5].text = ((sinfo.velocity.x ** 2 + sinfo.velocity.y ** 2) ** 0.5).toFixed(3)
        text[6].text = ((sinfo.acceleration.x ** 2 + sinfo.acceleration.y ** 2) ** 0.5).toFixed(3)
        updateProgressBar(fillbar[0], Number(((sinfo.velocity.x ** 2 + sinfo.velocity.y ** 2) ** 0.5 / sinfo.thrust ** 0.5).toFixed(3)))
        updateProgressBar(fillbar[1], Number(((sinfo.acceleration.x ** 2 + sinfo.acceleration.y ** 2) ** 0.5 / (sinfo.thrust / sinfo.mass) / 2).toFixed(3)))
        info.value = { ...sinfo }
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
            const { text, shipSprite, fillbar } = await initApp(socket, { x: info.value.position.x, y: info.value.position.y, angle: Math.atan2(info.value.velocity.y, info.value.velocity.x) });
            const update = () => {
                requestAnimationFrame(update);
            };
            update();

            intervalId.value = setInterval(() => {
                fetchData(socket, text, fillbar, info);
                shipSprite.position.set(info.value.position.x, info.value.position.y)
                shipSprite.rotation = Math.atan2(info.value.velocity.y, info.value.velocity.x)
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