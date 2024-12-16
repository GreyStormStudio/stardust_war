import { Application, Texture, Sprite, Assets, Text, TextStyle } from "pixi.js";
import { BLOCK_RES_PATH, SpriteEdge } from "../../../../share/CONSTANT";
import { MyContainer } from "../ContainerControl";

const UIContainer = new MyContainer()

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

function loadSprites(socket: any, username: string, app: Application) {
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

    const toggleButton = createToggleButton('隐藏飞船部件', 0x700000);
    toggleButton.position.set(10, 10);
    app.stage.addChild(toggleButton);
    toggleButton.on('pointerdown', () => {
        UIContainer.visible = !UIContainer.visible;
        toggleButton.text = UIContainer.visible ? '隐藏飞船部件' : '显示飞船部件'
        toggleButton.style.fill = UIContainer.visible ? 0x700000 : 0x007000
    });
}

function createToggleButton(label: string, color: number): Text {
    const button = new Text({ text: label, interactive: true, style: { fill: color } });
    return button;
}

export {
    loadSprites,
    UIContainer
}
