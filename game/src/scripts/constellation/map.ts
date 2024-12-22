import { Sprite, Assets, Renderer } from "pixi.js";
import { Viewport } from "pixi-viewport"
import { BLOCK_RES_PATH } from "../../../../share/CONSTANT";
import { MyContainer } from "../ContainerControl";
export async function createViewport(renderer: Renderer, mapcontainer: MyContainer, start: { x: number, y: number, angle: number }) {
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

    const shipSprite = await createShipSprite(start)

    mapcontainer.addChild(shipSprite);

    viewport.follow(shipSprite, { speed: 1e7 });

    return { viewport, shipSprite };
}

async function createShipSprite(start: { x: number, y: number, angle: number }) {
    const texture = await Assets.load(BLOCK_RES_PATH + 'OBJECT_SHIP_GREEN.png');
    const shipSprite = new Sprite(texture);
    shipSprite.anchor.set(0.5);
    shipSprite.scale.set(0.5, 1);
    shipSprite.position.set(start.x, start.y);
    shipSprite.rotation = start.angle
    return shipSprite;
}
