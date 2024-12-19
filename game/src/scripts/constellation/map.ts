import { Sprite, Assets, Renderer } from "pixi.js";
import { Viewport } from "pixi-viewport"
import { BLOCK_RES_PATH } from "../../../../share/CONSTANT";
import { MyContainer } from "../ContainerControl";

async function create(renderer: Renderer, mapcontainer: MyContainer) {
    const viewport = new Viewport({
        events: renderer.events,
        worldWidth: 1000,
        worldHeight: 1000,
        noTicker: true,
    })
    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate();
    const shipSprite = await createShipSprite(mapcontainer)
    mapcontainer.addChild(shipSprite)
    viewport.follow(shipSprite)
    mapcontainer.addChild(viewport)
    return { viewport, shipSprite }
}

async function initbackground(mapcontainer: MyContainer) {
    const texture = await Assets.load('/src/public/背景/bg6.jpg');
    const bg = new Sprite(texture);
    const containerWidth = mapcontainer.con_width
    const containerHeight = mapcontainer.con_height;
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
    mapcontainer.addChild(bg);
}

async function createShipSprite(mapcontainer: MyContainer) {
    const texture = await Assets.load(BLOCK_RES_PATH + 'Ship.png')//还没画舰船的图标,先拿一个临时的代替一下
    const shipSprite = new Sprite(texture);
    shipSprite.anchor.set(0.5);
    shipSprite.scale.set(0.5)
    shipSprite.position.set(mapcontainer.con_width / 2, mapcontainer.con_height / 2)
    /*const texture000 = await Assets.load(BLOCK_RES_PATH + 'BLOCK_BODY3.png')//还没画舰船的图标,先拿一个临时的代替一下
    const shipSprite000 = new Sprite(texture000);
    shipSprite000.anchor.set(0.5);
    shipSprite000.scale.set(0.5)
    shipSprite000.position.set(mapcontainer.con_width / 2, mapcontainer.con_height / 2)
    mapcontainer.addChild(shipSprite, shipSprite000);*/
    return shipSprite;
}

function rotation(shipSprite: Sprite) {
    shipSprite.rotation = shipSprite.rotation + Math.PI / 18
    shipSprite.position.x += Math.cos(shipSprite.rotation) * 10
    shipSprite.position.y += Math.sin(shipSprite.rotation) * 10
}

export {
    createShipSprite,
    initbackground,
    create,
    rotation
}
