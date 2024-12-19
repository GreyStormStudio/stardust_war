import { Texture, Sprite, Assets, Text } from "pixi.js";
import { BLOCK_RES_PATH, SpriteEdge } from "../../../../share/CONSTANT";
import { MyContainer } from "../ContainerControl";

interface ExtendedSprite extends Sprite {
    originalX?: number;
    originalY?: number;
}
function onSpriteHover(sprite: ExtendedSprite, bodycontainer: MyContainer) {
    let clone: Sprite | null = null;

    const handleMouseEnter = () => {
        clone = new Sprite(sprite.texture);
        clone.anchor.set(sprite.anchor.x, sprite.anchor.y);
        clone.position.set(SpriteEdge / 4, sprite.y - sprite.height);
        sprite.y -= sprite.height / 7;
        bodycontainer.addChild(clone);
    };

    const handleMouseLeave = () => {
        if (clone && clone.parent) {
            clone.parent.removeChild(clone);
            clone.destroy();
            clone = null;
        }
        sprite.y = sprite.originalY!;
    };

    sprite.on('pointerover', handleMouseEnter);
    sprite.on('pointerout', handleMouseLeave);
    sprite.on('click', () => {
        alert('你点你马呢');
    });
    sprite.eventMode = 'static';
}
function createBody(texture: Texture, positionX: number, bodycontainer: MyContainer) {
    const sprite: ExtendedSprite = new Sprite(texture);
    sprite.scale.set(1)
    sprite.position.set(positionX, 0);
    sprite.originalX = sprite.x;
    sprite.originalY = sprite.y;
    onSpriteHover(sprite, bodycontainer);
    bodycontainer.addChild(sprite);
}
async function createToggleButton() {
    const switch_off = await Assets.load(BLOCK_RES_PATH + 'switch_off.png');
    const switch_on = await Assets.load(BLOCK_RES_PATH + 'switch_on.png');
    const button: Sprite & { switch_off?: Texture, switch_on?: Texture } = new Sprite(switch_on);
    button.interactive = true;
    button.switch_off = switch_off;
    button.switch_on = switch_on;
    return button;
}
async function loadSprites(socket: any, username: string, uicontainer: MyContainer, bodycontainer: MyContainer) {
    uicontainer.addChild(bodycontainer)
    socket.emit('RequestData', username, 'shipblocks');
    socket.once('RequestDataResult', async (result: any) => {
        let imageUrls: string[] = result.map((block: any) => `BLOCK_${block.type}${block.level}.png`);
        let spacing = 0;
        if (uicontainer.con_width < imageUrls.length * SpriteEdge) {
            spacing = (uicontainer.con_width - (SpriteEdge * imageUrls.length) - SpriteEdge / 4) / (imageUrls.length - 1);
        }
        const textures = await Promise.all(imageUrls.map(url => Assets.load(BLOCK_RES_PATH + url)));
        textures.forEach((texture, i) => {
            const positionX = SpriteEdge / 4 + i * (SpriteEdge + spacing);
            createBody(texture, positionX, bodycontainer);
        });
    });

    const toggleButton = await createToggleButton();
    toggleButton.position.set(0, uicontainer.con_height - SpriteEdge);
    uicontainer.addChild(toggleButton);
    toggleButton.on('pointerdown', () => {
        bodycontainer.visible = !bodycontainer.visible;
        toggleButton.texture = toggleButton.texture === toggleButton.switch_on! ? toggleButton.switch_off! : toggleButton.switch_on!;
    });
}

function createResTable(texture: Texture, container: Texture, positionY: number, rescontainer: MyContainer) {
    const sprite: Sprite = new Sprite(texture);
    const containerSprite: Sprite = new Sprite(container)
    sprite.scale.set(0.5)
    containerSprite.scale.set(0.5)
    sprite.position.set(0, positionY);
    containerSprite.position.set(sprite.width, positionY)
    const resourceText = new Text({ text: '', style: { fontSize: 20, fill: 'black' } });
    resourceText.position.set(sprite.width + 20, positionY + 3);
    rescontainer.addChild(sprite, containerSprite, resourceText);
    return resourceText
}
async function loadResUI(uicontainer: MyContainer, rescontainer: MyContainer) {
    uicontainer.addChild(rescontainer)
    const textures = await Promise.all(Array.from({ length: 3 }, (_, i) => `RES_${i + 1}.png`).map(url => Assets.load(BLOCK_RES_PATH + url)));
    const container = await Assets.load(BLOCK_RES_PATH + 'CONTAINER.png')
    const text: Text[] = []
    textures.forEach((textures, i) => {
        text.push(createResTable(textures, container, i * SpriteEdge / 2, rescontainer))
    })
    return text
}


export {
    loadSprites,
    loadResUI
}
