import { Texture, Sprite, Assets, Text, Graphics } from "pixi.js";
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

function createResTable(restable: Sprite, positionY: number, rescontainer: MyContainer) {
    const resourceText = new Text({ text: '', style: { fontSize: 20, fill: '00FF00' } });
    resourceText.position.set(restable.height / 3 + 20, positionY + 3);
    rescontainer.addChild(resourceText);
    return resourceText
}
function createPosTable(positionY: number, poscontainer: MyContainer, i: number) {
    let text = ""
    switch (i) {
        case 0:
            text = "x"
            break
        case 1:
            text = "y"
            break
        case 2:
            text = "v"
            break
        case 3:
            text = "a"
            break
    }
    const titletext = new Text({ text: text, style: { fontSize: 20, fill: '000000' } });
    titletext.position.set(10, positionY)
    const posText = new Text({ text: '-1', style: { fontSize: 20, fill: 'ffff00' } });

    if (i > 1) {
        posText.position.set(SpriteEdge / 4, 3);
        const progressBarContainer = new MyContainer();
        progressBarContainer.position.set(SpriteEdge / 2 + 2, positionY);
        const progressBarBackground = new Graphics();
        progressBarBackground.rect(0, 0, 247 / 2, 56 / 2);
        progressBarBackground.fill({ alpha: 0, color: 0x000000 });
        const progressBarFill = new Graphics();
        progressBarFill.rect(0, 0, 0, 30);
        progressBarFill.fill({ color: 0x00f0f0 });

        progressBarContainer.addChild(progressBarBackground);
        progressBarContainer.addChild(progressBarFill, posText);
        poscontainer.addChild(titletext, progressBarContainer);
        return { posText, progressBarFill }
    }
    else {
        posText.position.set(SpriteEdge * 0.75, positionY + 3);
        poscontainer.addChild(titletext, posText);
        return { posText }
    }



}

function updateProgressBar(progressBarFill: Graphics, progress: number) {
    progressBarFill.clear();
    const fillWidth = progress * 124;
    progressBarFill.rect(0, 2, fillWidth, 28);
    progressBarFill.fill({ color: 0x00f0f0 });
}

async function loadUI(uicontainer: MyContainer, rescontainer: MyContainer, poscontainer: MyContainer) {
    uicontainer.addChild(rescontainer)
    const img1 = await Assets.load(BLOCK_RES_PATH + 'UI_RESOURCES.png')
    const img2 = await Assets.load(BLOCK_RES_PATH + 'UI_POSITION.png')
    const restable: Sprite = new Sprite(img1);
    const postable: Sprite = new Sprite(img2);
    restable.scale.set(0.5)
    postable.scale.set(0.5)
    restable.position.set(0, 0);
    postable.position.set(0, restable.height)
    rescontainer.addChild(restable)
    poscontainer.addChild(postable)
    const text = []
    const fillbar = []
    for (let i = 0; i < 3; i++) {
        text.push(createResTable(restable, i * SpriteEdge / 2, rescontainer))
    }
    for (let i = 0; i < 4; i++) {
        const { posText, progressBarFill } = createPosTable(i * SpriteEdge / 2 + restable.height, poscontainer, i)
        text.push(posText)
        if (progressBarFill) fillbar.push(progressBarFill)
    }
    return { text, fillbar }
}


export {
    loadSprites,
    updateProgressBar,
    loadUI
}
