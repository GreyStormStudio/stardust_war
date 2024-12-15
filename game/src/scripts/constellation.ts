import { Application, Texture, Container, Graphics, Sprite, Assets } from "pixi.js";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent, watch } from 'vue';
import { BLOCK_RES_PATH, SpriteEdge, CAPACITY } from "../../../share/CONSTANT";
import { useUserInfoStore } from "../store";
import { MyContainer } from "./ContainerControl";

let app: Application
const UIContainer = new MyContainer()
const MapContainer = new MyContainer()

interface ExtendedSprite extends Sprite {
    originalX?: number;
    originalY?: number;
}

function onSpriteHover(sprite: ExtendedSprite) {
    let clone: Sprite | null = null;
    const handleMouseEnter = () => {
        clone = new Sprite(sprite.texture);
        clone.anchor.set(sprite.anchor.x, sprite.anchor.y);
        clone.scale.set(sprite.scale.x, sprite.scale.y);
        clone.y = -sprite.height
        sprite.y = sprite.originalY! - sprite.height / 7
        UIContainer.addChild(clone);
    };

    const handleMouseLeave = () => {
        if (clone && clone.parent) {
            // 移除副本
            clone.parent.removeChild(clone);
            clone.destroy(); // 销毁副本以释放资源
            clone = null;
        }
        sprite.y = sprite.originalY!
    };

    sprite.on('mouseenter', handleMouseEnter);
    sprite.on('mouseleave', handleMouseLeave);
    sprite.on('click', () => {
        alert('你点你马呢');
    });
    sprite.eventMode = 'static';
}

async function createSpriteFromTexture(texture: Texture, positionX: number) {
    const sprite: ExtendedSprite = new Sprite(texture);
    sprite.width = sprite.height = 64;
    sprite.position.set(positionX, 0);
    sprite.originalX = sprite.x;
    sprite.originalY = sprite.y;
    onSpriteHover(sprite);
    UIContainer.addChild(sprite);
}

function loadSprites(socket: any) {
    const username = useUserInfoStore().getUsername;
    socket.emit('RequestData', username, 'shipblocks');
    socket.once('RequestDataResult', async (result: any[]) => {
        let imageUrls: string[] = [];
        for (let i = 0; i < 9; i++) {
            result.forEach((block: any) => {
                imageUrls.push(`BLOCK_${block.type}${block.level}.png`);
            });
        }
        /*result.forEach((block: any) => {
            imageUrls.push(`BLOCK_${block.type}${block.level}.png`);
        });*/
        let spacing = 0;
        const containerWidth = app!.canvas.width;
        if (containerWidth < imageUrls.length * SpriteEdge) {
            spacing = (containerWidth - (SpriteEdge * imageUrls.length)) / (imageUrls.length - 1);
        }
        for (let i = imageUrls.length - 1; i >= 0; i--) {
            const texture = await Assets.load(BLOCK_RES_PATH + imageUrls[i]);
            const positionX = i * (SpriteEdge + spacing);
            await createSpriteFromTexture(texture, positionX);
        }
    });
}

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

    loadSprites(socket)

    /*const graphics2 = new Graphics();
    graphics2.rect(0, 0, base.clientWidth, base.clientHeight - 64); // 绘制矩形
    graphics2.fill({ color: 0x1f2f3f });
    MapContainer.addChild(graphics2);*/

    UIContainer.set(0, base.clientHeight - 64, base.clientWidth, 64)
    MapContainer.set(0, 0, base.clientWidth, base.clientHeight - 64)

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

    app.stage.addChild(MapContainer)
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
