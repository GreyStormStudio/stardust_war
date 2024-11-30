export const OK = 0; //没问题
export const PASSWORD_INCORRECT = -1; //密码错误
export const USERNAME_NOT_FOUND = -2; //用户名不存在
export const USERNAME_EXISTS = -3; //用户名已存在
export const EMAIL_EXISTS = -4; //邮箱已存在

export const ERROR_UNDEFINED = -99; //未定义错误

export const USER_KEY = 'User:';
export const EMAIL_KEY = 'Email:';
export const CONSTELLATION_KEY = 'Constellation:'

export const MapEdge = 512;
export const SpriteEdge = 64;

//舰船方块定义包含:花费,能量产出,护盾值,生命值,伤害,亚空间航速,超空间航速
export const BLOCKS = {
    CORE: {
        CORE1: { cost: { energy: 1000, mineral: 5000 }, power: 600, hits: 1000, mass: 1000 },
        CORE2: { cost: { energy: 4000, mineral: 20000 }, power: 3000, hits: 2000, mass: 2000 },
        CORE3: { cost: { energy: 16000, mineral: 80000 }, power: 16000, hits: 4000, mass: 4000 }
    },
    BODY: {
        BODY1: { cost: { mineral: 500 }, power: 0, hits: 500, mass: 500 },
        BODY2: { cost: { mineral: 1000 }, power: 0, hits: 1000, mass: 1000 },
        BODY3: { cost: { mineral: 2000 }, power: 0, hits: 2000, mass: 2000 }
    },
    POWER: {
        POWER1: { cost: { mineral: 750 }, power: 100, hits: 50, mass: 100 },
        POWER2: { cost: { mineral: 1500 }, power: 400, hits: 50, mass: 200 },
        POWER3: { cost: { mineral: 3000 }, power: 1600, hits: 50, mass: 400 }
    },
    ARMOR: {
        ARMOR1: { cost: { mineral: 750 }, power: 0, hits: 1500, mass: 1500 },
        ARMOR2: { cost: { mineral: 1500 }, power: 0, hits: 4000, mass: 2500 },
        ARMOR3: { cost: { mineral: 3000 }, power: 0, hits: 10000, mass: 3000 }
    },
    SHIELD: {
        SHIELD1: { cost: { energy: 500, mineral: 500 }, power: -250, shield: 500, hits: 100, range: 3, mass: 250 },
        SHIELD2: { cost: { energy: 1000, mineral: 1000 }, power: -500, shield: 1500, hits: 300, range: 5, mass: 500 },
        SHIELD3: { cost: { energy: 2000, mineral: 2000 }, power: -2000, shield: 4500, hits: 900, range: 7, mass: 1000 }
    },
    ENGINE: {
        SUBSPACE: {
            ENGINE_SUB1: { cost: { energy: 1500, mineral: 500 }, power: -100, fouce_sub: 100, hits: 100, mass: 500 },
            ENGINE_SUB2: { cost: { energy: 3000, mineral: 1000 }, power: -500, fouce_sub: 400, hits: 200, mass: 1000 },
            ENGINE_SUB3: { cost: { energy: 6000, mineral: 2000 }, power: -2500, fouce_sub: 1600, hits: 400, mass: 2000 }
        },
        HYPERSPACE: {
            ENGINE_HYP1: { cost: { energy: 3000, mineral: 1500, metal: 500 }, power: -500, speed_hyper: 0.1, hits: 200, mass: 1500 },
            ENGINE_HYP2: { cost: { energy: 6000, mineral: 3000, metal: 1000 }, power: -1500, speed_hyper: 0.3, hits: 400, mass: 3000 },
            ENGINE_HYP3: { cost: { energy: 12000, mineral: 6000, metal: 2000 }, power: -4500, speed_hyper: 0.9, hits: 800, mass: 6000 }
        }
    },
    WEAPON: {
        WEAPON1: { cost: { energy: 1000, mineral: 1000 }, power: -100, hits: 150, attack: 150, range: 4, mass: 1000 },
        WEAPON2: { cost: { energy: 2000, mineral: 2000 }, power: -500, hits: 450, attack: 450, range: 7, mass: 2000 },
        WEAPON3: { cost: { energy: 4000, mineral: 4000 }, power: -1000, hits: 1500, attack: 1500, range: 10, mass: 4000 }
    }
}

export type blocktype = 'CORE' | 'BODY' | 'POWER' | 'ARMOR' | 'SHIELD' | 'ENGINE' | 'WEAPON'

interface block {
    type: blocktype,
    block: any,
    level: number,
    x: number,
    y: number
}
export interface SHIP {
    Ship_Blocks: {
        blocks: block[]
    },
    Ship_info: {
        hits: number,
        shield: number,
        power: number,
        fouce_sub: number,
        mass: number,
        speed_hyper: number
    }
}

export const SHIP_ZERO: SHIP = {
    Ship_Blocks: {
        blocks: [
            { type: 'CORE', level: 1, block: BLOCKS.CORE.CORE1, x: 0, y: 0 },//核心限制一个,位置(0,0),其他方块记录相对于核心的位置左上--,右下++
            { type: 'ARMOR', level: 1, block: BLOCKS.ARMOR.ARMOR1, x: -1, y: -1 },
            { type: 'SHIELD', level: 1, block: BLOCKS.SHIELD.SHIELD1, x: 0, y: -1 },
            { type: 'ARMOR', level: 1, block: BLOCKS.ARMOR.ARMOR1, x: 1, y: -1 },
            { type: 'WEAPON', level: 1, block: BLOCKS.WEAPON.WEAPON1, x: -1, y: 0 },
            { type: 'WEAPON', level: 1, block: BLOCKS.WEAPON.WEAPON1, x: 1, y: 0 },
            { type: 'BODY', level: 1, block: BLOCKS.BODY.BODY1, x: -1, y: 1 },
            { type: 'ENGINE', level: 1, block: BLOCKS.ENGINE.SUBSPACE.ENGINE_SUB1, x: 0, y: 1 },
            { type: 'BODY', level: 1, block: BLOCKS.BODY.BODY1, x: 1, y: 1 }
        ]
    },
    Ship_info: {
        hits: 5500,
        shield: 500,
        power: 50,
        fouce_sub: 100,
        mass: 7750,
        speed_hyper: 0
    }
}
