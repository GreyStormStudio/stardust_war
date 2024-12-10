import { Application, Texture, Container, Sprite, Assets } from "pixi.js";
import { useUserInfoStore } from "../store";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent } from 'vue';
import { BLOCK_RES_PATH, SpriteEdge } from "../../../share/CONSTANT";
import { CAPACITY } from "../../../share/CONSTANT";

let app: Application | null
interface ExtendedSprite extends Sprite {
    originalY?: number;
}

function onSpriteHover(sprite: ExtendedSprite) {
    let timeoutId: number | undefined;
    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
            sprite.y = sprite.originalY! - sprite.height / 3; // 向上移动半个sprite的距离
        }, 10);
    };

    const handleMouseLeave = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
            sprite.y = sprite.originalY!; // 恢复原始位置
        }, 75);
    };

    sprite.on('mouseenter', handleMouseEnter);
    sprite.on('mouseleave', handleMouseLeave);
    sprite.on('click', () => {
        alert('你点你马呢');
    });
    sprite.eventMode = 'static';
}

async function createSpriteFromTexture(texture: Texture, positionX: number, container: Container) {
    const sprite: ExtendedSprite = new Sprite(texture);
    sprite.width = sprite.height = 64;
    sprite.position.set(positionX, 0);
    sprite.originalY = sprite.y;
    onSpriteHover(sprite);
    container.addChild(sprite);
}

function loadSprites(socket: any, container: Container) {
    const username = useUserInfoStore().getUsername;
    socket.emit('RequestData', username, 'shipblocks');
    socket.once('RequestDataResult', async (result: any[]) => {
        let imageUrls: string[] = [];
        result.forEach((block: any) => {
            imageUrls.push(`BLOCK_${block.type}${block.level}.png`);
            imageUrls.push(`BLOCK_${block.type}${block.level}.png`);
        });
        let spacing = 0;
        const containerWidth = app!.canvas.width;
        if (containerWidth < imageUrls.length * SpriteEdge) {
            spacing = (containerWidth - (SpriteEdge * imageUrls.length)) / (imageUrls.length - 1);
        }
        for (let i = imageUrls.length - 1; i >= 0; i--) {
            const texture = await Assets.load(BLOCK_RES_PATH + imageUrls[i]);
            const positionX = i * (SpriteEdge + spacing);
            await createSpriteFromTexture(texture, positionX, container);
        }
    });
}

async function initApp(socket: any) {
    if (!app) {
        app = new Application();
    }
    const mapContainer = document.querySelector('.map') as HTMLElement;
    await app.init({
        width: mapContainer.clientWidth,
        height: mapContainer.clientHeight,
        backgroundColor: "909090"
    });
    document.addEventListener('contextmenu', (event) => {
        // 阻止默认的右键菜单
        event.preventDefault();
    });
    mapContainer.appendChild(app.canvas);
    const bottomContainer = new Container();
    bottomContainer.position.set(0, app.canvas.height - 64); // 设置容器位置在canvas底部
    app.stage.addChild(bottomContainer);
    await loadSprites(socket, bottomContainer);
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
