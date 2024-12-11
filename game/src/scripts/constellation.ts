import { Application, Texture, Container, Sprite, Assets } from "pixi.js";
import { useUserInfoStore } from "../store";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent, watch } from 'vue';
import { BLOCK_RES_PATH, SpriteEdge } from "../../../share/CONSTANT";
import { CAPACITY } from "../../../share/CONSTANT";

let app: Application | null
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
        clone.y = app!.canvas.height - clone.height * 2;
        sprite.y = sprite.originalY! - sprite.height / 7
        app!.stage.addChild(clone);
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

async function createShipSprite(texture: Texture, app: Application) {
    const shipSprite = new Sprite(texture);
    shipSprite.anchor.set(0.5);
    shipSprite.width = shipSprite.height = 16;
    app.stage.addChild(shipSprite);
    return shipSprite;
}

function updateShipPosition(shipSprite: Sprite, positionX: number, positionY: number) {
    shipSprite.x = app!.canvas.width / 2;
    shipSprite.y = app!.canvas.height / 2;
    //app!.stage.x = -positionX * (app!.canvas.width / 2);
    //app!.stage.y = -positionY * (app!.canvas.height / 2);
}

async function createSpriteFromTexture(texture: Texture, positionX: number, container: Container) {
    const sprite: ExtendedSprite = new Sprite(texture);
    sprite.width = sprite.height = 64;
    sprite.position.set(positionX, 0);
    sprite.originalX = sprite.x;
    sprite.originalY = sprite.y;
    onSpriteHover(sprite);
    container.addChild(sprite);
}

function loadSprites(socket: any, container: Container) {
    const username = useUserInfoStore().getUsername;
    socket.emit('RequestData', username, 'shipblocks');
    socket.once('RequestDataResult', async (result: any[]) => {
        let imageUrls: string[] = [];
        /*for (let i = 0; i < 9; i++) {
            result.forEach((block: any) => {
                imageUrls.push(`BLOCK_${block.type}${block.level}.png`);
            });
        }*/
        result.forEach((block: any) => {
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

async function initApp(socket: any, UIContainer: Container) {
    if (!app) {
        app = new Application();
    }
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
    UIContainer.position.set(0, app.canvas.height - 64); // 设置容器位置在canvas底部
    loadSprites(socket, UIContainer);
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
        const UIContainer = new Container();//用于存放UI的容器,不随stage变化而变化
        const shipSprite = ref<Sprite | null>(null);
        const capacity = CAPACITY;
        const store = ref({ energy: 0, mineral: 0, metal: 0 });
        const info = ref({ mass: 0, label: '', position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, acceleration: { x: 0, y: 0 }, thrust: 40000 });
        const intervalId = ref();
        const socket = useSocket();
        onMounted(async () => {
            initApp(socket, UIContainer)//初始化UI画布
            const shipTexture = await Assets.load(BLOCK_RES_PATH + 'BLOCK_CORE1.png');
            shipSprite.value = await createShipSprite(shipTexture, app!);
            intervalId.value = setInterval(() => {
                fetchData(socket, store, info);
                updateShipPosition((shipSprite.value as Sprite), info.value.position.x, info.value.position.y)
            }, 16.667);

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
