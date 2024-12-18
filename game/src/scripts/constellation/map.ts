import { Sprite, Assets } from "pixi.js";
import { BLOCK_RES_PATH } from "../../../../share/CONSTANT";
import { MyContainer } from "../ContainerControl";



async function createShipSprite(mapcontainer: MyContainer) {
    const texture = await Assets.load(BLOCK_RES_PATH + 'Ship.png')//还没画舰船的图标,先拿一个临时的代替一下
    const shipSprite = new Sprite(texture);
    shipSprite.anchor.set(0.5);
    //shipSprite.width = shipSprite.height = SpriteEdge;
    shipSprite.scale.set(0.5)
    shipSprite.position.set(mapcontainer.con_width / 2, mapcontainer.con_height / 2)
    mapcontainer.addChild(shipSprite);
    return shipSprite;
}

function rotation(shipSprite: Sprite) {
    shipSprite.rotation = shipSprite.rotation + Math.PI / 36
    shipSprite.position.x += 1
}

export {
    createShipSprite,
    rotation
}
