import { Sprite, Assets, Container } from "pixi.js";
import { SHIP, BLOCK_RES_PATH } from "../../../share/CONSTANT";

async function generateShipSprite(Object: SHIP) {
    const shipContainer = new Container();
    // 使用 Promise.all 并行加载所有纹理
    const blockTextures = await Promise.all(
        Object.Ship_Blocks.blocks.map(async (block) => {
            const textureName = `BLOCK_${block.type}${block.level}.png`;
            return Assets.load(BLOCK_RES_PATH + textureName);
        })
    );

    // 创建 Sprite 并添加到容器中
    blockTextures.forEach((texture, index) => {
        const sprite = new Sprite(texture);
        const block = Object.Ship_Blocks.blocks[index];
        sprite.anchor.set(0.5);
        sprite.x = block.x * sprite.width;
        sprite.y = block.y * sprite.height;
        shipContainer.addChild(sprite);
    });

    return shipContainer;
}

function ShipInfo(ship: SHIP) {
    const sinfo = { power: 0, hits: 0, mass: 0, thrust: 0, speed_hyper: 0 };

    ship.Ship_Blocks.blocks.forEach((block) => {
        const { power, hits, mass } = block.block[block.level].baseAttribute;
        sinfo.power += power;
        sinfo.hits += hits;
        sinfo.mass += mass;

        const specialAttributes = block.block[block.level].specialAttributes || {};
        sinfo.thrust += specialAttributes.thrust || 0;
        sinfo.speed_hyper += specialAttributes.speed_hyper || 0;
    });

    return sinfo;
}

export async function generateShip(ship: SHIP) {
    const sprite = await generateShipSprite(ship);
    const info = ShipInfo(ship);
    return { sprite, info };
}
