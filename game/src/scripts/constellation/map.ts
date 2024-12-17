import { Application, Texture, Sprite, Assets, Text, TextStyle } from "pixi.js";
import { BLOCK_RES_PATH, SpriteEdge } from "../../../../share/CONSTANT";
import { MyContainer } from "../ContainerControl";

const MapContainer = new MyContainer()

async function createShipSprite(texture: Texture) {
    const shipSprite = new Sprite(texture);
    shipSprite.anchor.set(0.5);
    shipSprite.width = shipSprite.height = 16;
    MapContainer.addChild(shipSprite);
    return shipSprite;
}

