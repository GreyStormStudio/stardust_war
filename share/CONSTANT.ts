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

export const BLOCK_RES_PATH = '/src/public/BLOCK/'
//舰船方块定义包含:{花费},{能量产出,生命值,质量,},{护盾值,伤害,射程,推力,超空间航速}

export const BLOCKS = {
    CORE: {
        1: {
            cost: { energy: 1000, mineral: 5000 },
            baseAttribute: { power: 600, hits: 1000, mass: 1000 }
        },
        2: {
            cost: { energy: 4000, mineral: 20000 },
            baseAttribute: { power: 3000, hits: 2000, mass: 2000 }
        },
        3: {
            cost: { energy: 16000, mineral: 80000 },
            baseAttribute: { power: 16000, hits: 4000, mass: 4000 }
        }
    },
    BODY: {
        1: {
            cost: { mineral: 500 },
            baseAttribute: { power: 0, hits: 500, mass: 500 }
        },
        2: {
            cost: { mineral: 1000 },
            baseAttribute: { power: 0, hits: 1000, mass: 1000 }
        },
        3: {
            cost: { mineral: 2000 },
            baseAttribute: { power: 0, hits: 2000, mass: 2000 }
        }
    },
    POWER: {
        1: {
            cost: { mineral: 750 },
            baseAttribute: { power: 100, hits: 50, mass: 100 }
        },
        2: {
            cost: { mineral: 1500 },
            baseAttribute: { power: 400, hits: 50, mass: 200 }
        },
        3: {
            cost: { mineral: 3000 },
            baseAttribute: { power: 1600, hits: 50, mass: 400 }
        }
    },
    ARMOR: {
        1: {
            cost: { mineral: 750 },
            baseAttribute: { power: 0, hits: 1500, mass: 1500 }
        },
        2: {
            cost: { mineral: 1500 },
            baseAttribute: { power: 0, hits: 4000, mass: 2500 }
        },
        3: {
            cost: { mineral: 3000 },
            baseAttribute: { power: 0, hits: 10000, mass: 3000 }
        }
    },
    SHIELD: {
        1: {
            cost: { energy: 500, mineral: 500 },
            baseAttribute: { power: -250, hits: 100, mass: 250 },
            specialAttributes: { shield: 500, range: 3, }
        },
        2: {
            cost: { energy: 1000, mineral: 1000 },
            baseAttribute: { power: -500, hits: 300, mass: 500 },
            specialAttributes: { shield: 1500, range: 5, }
        },
        3: {
            cost: { energy: 2000, mineral: 2000 },
            baseAttribute: { power: -2000, hits: 900, mass: 1000 },
            specialAttributes: { shield: 4500, range: 7, }
        }
    },
    ENGINE: {
        SUBSPACE: {
            1: {
                cost: { energy: 1500, mineral: 500 },
                baseAttribute: { power: -100, hits: 100, mass: 500 },
                specialAttributes: { thrust: 1000, }
            },
            2: {
                cost: { energy: 3000, mineral: 1000 },
                baseAttribute: { power: -500, hits: 200, mass: 1000 },
                specialAttributes: { thrust: 4000, }
            },
            3: {
                cost: { energy: 6000, mineral: 2000 },
                baseAttribute: { power: -2500, hits: 400, mass: 2000 },
                specialAttributes: { thrust: 16000, }
            }
        },
        HYPERSPACE: {
            1: {
                cost: { energy: 3000, mineral: 1500, metal: 500 },
                baseAttribute: { power: -500, hits: 200, mass: 1500 },
                specialAttributes: { speed_hyper: 0.1, }
            },
            2: {
                cost: { energy: 6000, mineral: 3000, metal: 1000 },
                baseAttribute: { power: -1500, hits: 400, mass: 3000 },
                specialAttributes: { speed_hyper: 0.3, }
            },
            3: {
                cost: { energy: 12000, mineral: 6000, metal: 2000 },
                baseAttribute: { power: -4500, hits: 800, mass: 6000 },
                specialAttributes: { speed_hyper: 0.9, }
            }
        }
    },
    WEAPON: {
        1: {
            cost: { energy: 1000, mineral: 1000 },
            baseAttribute: { power: -100, hits: 150, mass: 1000 },
            specialAttributes: { attack: 150, range: 4, }
        },
        2: {
            cost: { energy: 2000, mineral: 2000 },
            baseAttribute: { power: -500, hits: 450, mass: 2000 },
            specialAttributes: { attack: 450, range: 7, }
        },
        3: {
            cost: { energy: 4000, mineral: 4000 },
            baseAttribute: { power: -1000, hits: 1500, mass: 4000 },
            specialAttributes: { attack: 1500, range: 10, }
        }
    }

}

export type blocktype = 'CORE' | 'BODY' | 'POWER' | 'ARMOR' | 'SHIELD' | 'ENGINE_SUBSPACE' | 'ENGINE_HYPERSPACE' | 'WEAPON'

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
    }
}

export const SHIP_ZERO: SHIP = {
    Ship_Blocks: {
        blocks: [
            { type: 'CORE', level: 1, block: BLOCKS.CORE, x: 0, y: 0 },//核心限制一个,位置(0,0),其他方块记录相对于核心的位置左上--,右下++
            { type: 'ARMOR', level: 1, block: BLOCKS.ARMOR, x: -1, y: -1 },
            { type: 'SHIELD', level: 1, block: BLOCKS.SHIELD, x: 0, y: -1 },
            { type: 'ARMOR', level: 1, block: BLOCKS.ARMOR, x: 1, y: -1 },
            { type: 'WEAPON', level: 1, block: BLOCKS.WEAPON, x: -1, y: 0 },
            { type: 'WEAPON', level: 1, block: BLOCKS.WEAPON, x: 1, y: 0 },
            { type: 'BODY', level: 1, block: BLOCKS.BODY, x: -1, y: 1 },
            { type: 'ENGINE_SUBSPACE', level: 1, block: BLOCKS.ENGINE.SUBSPACE, x: 0, y: 1 },
            { type: 'BODY', level: 1, block: BLOCKS.BODY, x: 1, y: 1 }
        ]
    }
}
