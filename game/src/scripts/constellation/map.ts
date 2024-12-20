import { Sprite, Assets, Renderer } from "pixi.js";
import { Viewport } from "pixi-viewport"
import { BLOCK_RES_PATH } from "../../../../share/CONSTANT";
import { MyContainer } from "../ContainerControl";
export async function createViewport(renderer: Renderer, mapcontainer: MyContainer) {
    const viewport = new Viewport({
        events: renderer.events,
        screenWidth: mapcontainer.con_width,
        screenHeight: mapcontainer.con_height,
    });
    viewport.wheel().clampZoom({
        minScale: 0.25,
        maxScale: 1
    });
    viewport.fit()
    viewport.addChild(mapcontainer);

    const shipSprites = await Promise.all([
        createShipSprite(viewport),
        createShipSprite(viewport)
    ]);

    shipSprites.forEach(shipSprite => mapcontainer.addChild(shipSprite));

    viewport.follow(shipSprites[0], { speed: 0 });

    return { viewport, shipSprites };
}

async function initBackground(mapcontainer: MyContainer) {
    const texture = await Assets.load('/src/public/背景/bg6.jpg');
    const bg = new Sprite(texture);
    const containerWidth = mapcontainer.con_width;
    const containerHeight = mapcontainer.con_height;
    const spriteAspectRatio = texture.width / texture.height;
    const containerAspectRatio = containerWidth / containerHeight;

    bg.width = containerAspectRatio > spriteAspectRatio
        ? containerWidth
        : containerHeight * spriteAspectRatio;
    bg.height = containerAspectRatio > spriteAspectRatio
        ? containerWidth / spriteAspectRatio
        : containerHeight;

    bg.anchor.set(0, 0);
    mapcontainer.addChild(bg);
}

async function createShipSprite(viewport: Viewport) {
    const texture = await Assets.load(BLOCK_RES_PATH + 'OBJECT_SHIP_GREEN.png');
    const shipSprite = new Sprite(texture);
    shipSprite.anchor.set(0.5);
    shipSprite.scale.set(0.5, 1);
    shipSprite.position.set(viewport.screenWidth / 2, viewport.screenHeight / 2);
    return shipSprite;
}

function testAction(shipSprite: Sprite) {
    const n = Math.round(Date.now() / 1000) % 2 ? 1 : -1;
    shipSprite.position.x += n * 5;
    shipSprite.rotation = Math.PI / 2;
}

export {
    createShipSprite,
    initBackground,
    testAction
}
