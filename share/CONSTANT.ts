export const OK = 0; //没问题
export const PASSWORD_INCORRECT = -1; //密码错误
export const USERNAME_NOT_FOUND = -2; //用户名不存在
export const USERNAME_EXISTS = -3; //用户名已存在
export const EMAIL_EXISTS = -4; //邮箱已存在

export const ERROR_UNDEFINED = -99; //未定义错误

export const USER_KEY = 'User:';
export const EMAIL_KEY = 'Email:';
export const CONSTELLATION_KEY = 'Constellation:'

//舰船方块定义包含:花费,能量产出,护盾值,生命值,伤害,亚空间航速,超空间航速
export const BLOCKS = {
    CORE: {
        CORE1: { cost: { energy: 1000, mineral: 5000 }, power: 500, hits: 1000 },
        CORE2: { cost: { energy: 4000, mineral: 20000 }, power: 3000, hits: 2000 },
        CORE3: { cost: { energy: 16000, mineral: 80000 }, power: 16000, hits: 4000 }
    },
    BODY: {
        BODY1: { cost: { mineral: 500 }, power: 0, hits: 500 },
        BODY2: { cost: { mineral: 1000 }, power: 0, hits: 1000 },
        BODY3: { cost: { mineral: 2000 }, power: 0, hits: 2000 }
    },
    POWER: {
        POWER1: { cost: { mineral: 750 }, power: 100, hits: 50 },
        POWER2: { cost: { mineral: 1500 }, power: 400, hits: 50 },
        POWER3: { cost: { mineral: 3000 }, power: 1600, hits: 50 }
    },
    ARMOR: {
        ARMOR1: { cost: { mineral: 750 }, power: 0, hits: 1500 },
        ARMOR2: { cost: { mineral: 1500 }, power: 0, hits: 4000 },
        ARMOR3: { cost: { mineral: 3000 }, power: 0, hits: 10000 }
    },
    SHIELD: {
        SHIELD1: { cost: { energy: 500, mineral: 500 }, power: -250, shield: 500, hits: 100 },
        SHIELD2: { cost: { energy: 1000, mineral: 1000 }, power: -500, shield: 1500, hits: 300 },
        SHIELD3: { cost: { energy: 2000, mineral: 2000 }, power: -2000, shield: 4500, hits: 900 }
    },
    ENGINE: {
        SUBSPACE: {
            ENGINE_SUB1: { cost: { energy: 1500, mineral: 500 }, power: -100, speed_sub: 10, hits: 100 },
            ENGINE_SUB2: { cost: { energy: 3000, mineral: 1000 }, power: -500, speed_sub: 20, hits: 200 },
            ENGINE_SUB3: { cost: { energy: 6000, mineral: 2000 }, power: -2500, speed_sub: 40, hits: 400 }
        },
        HYPERSPACE: {
            ENGINE_HYP1: { cost: { energy: 3000, mineral: 1500, metal: 500 }, power: -500, speed_hyper: 0.1, hits: 200 },
            ENGINE_HYP2: { cost: { energy: 6000, mineral: 3000, metal: 1000 }, power: -1500, speed_hyper: 0.3, hits: 400 },
            ENGINE_HYP3: { cost: { energy: 12000, mineral: 6000, metal: 2000 }, power: -4500, speed_hyper: 0.9, hits: 800 }
        }
    },
    WEAPON: {
        WEAPON1: { cost: { energy: 1000, mineral: 1000 }, power: -100, hits: 150, attack: 150 },
        WEAPON2: { cost: { energy: 2000, mineral: 2000 }, power: -500, hits: 450, attack: 450 },
        WEAPON3: { cost: { energy: 4000, mineral: 4000 }, power: -1000, hits: 1500, attack: 1500 }
    }
}


/**初始送给玩家的船
 * 结构为:
 * 甲盾甲
 * 武核武
 * 身擎身
 */
export const SHIP_ZERO = {
    Ship_Blocks: {
        blocks: [
            { type: 'ARMOR', block: BLOCKS.ARMOR.ARMOR1, id: 'ARMOR1_1', x: 0, y: 0 },
            { type: 'SHIELD', block: BLOCKS.SHIELD.SHIELD1, id: 'SHIELD1_1', x: 1, y: 0 },
            { type: 'ARMOR', block: BLOCKS.ARMOR.ARMOR1, id: 'ARMOR1_2', x: 2, y: 0 },
            { type: 'WEAPON', block: BLOCKS.WEAPON.WEAPON1, id: 'WEAPON1_1', x: 0, y: 1 },
            { type: 'CORE', block: BLOCKS.CORE.CORE1, id: 'CORE1_1', x: 1, y: 1 },
            { type: 'WEAPON', block: BLOCKS.WEAPON.WEAPON1, id: 'WEAPON1_2', x: 2, y: 1 },
            { type: 'BODY', block: BLOCKS.BODY.BODY1, id: 'BODY1_1', x: 0, y: 2 },
            { type: 'ENGINE', block: BLOCKS.ENGINE.SUBSPACE.ENGINE_SUB1, id: 'ENGINE_SUB1_1', x: 1, y: 2 },
            { type: 'BODY', block: BLOCKS.BODY.BODY1, id: 'BODY1_2', x: 2, y: 2 }
        ],
        connectlist: [
            { id1: 'ARMOR1_1', id2: 'SHIELD1_1' },
            { id1: 'SHIELD1_1', id2: 'ARMOR1_2' },
            { id1: 'ARMOR1_1', id2: 'WEAPON1_1' },
            { id1: 'SHIELD1_1', id2: 'CORE1_1' },
            { id1: 'ARMOR1_2', id2: 'WEAPON1_2' },
            { id1: 'WEAPON1_1', id2: 'CORE1_1' },
            { id1: 'WEAPON1_1', id2: 'BODY1_1' },
            { id1: 'WEAPON1_2', id2: 'CORE1_1' },
            { id1: 'WEAPON1_2', id2: 'BODY1_2' },
            { id1: 'CORE1_1', id2: 'ENGINE_SUB1_1' },
            { id1: 'BODY1_1', id2: 'ENGINE_SUB1_1' },
            { id1: 'BODY1_2', id2: 'ENGINE_SUB1_1' }
        ]
    }
};

export interface SHIP{
    Ship_Blocks: {
        blocks:block[],
        connectlist:connect[]
    }
}
interface block{
    type:'CORE'|'BODY'|'POWER'|'ARMOR'|'SHIELD'|'ENGINE'|'WEAPON',
    block:any,
    id:string,
    x:number,
    y:number
}
interface connect{
    id1:string,id2:string
}