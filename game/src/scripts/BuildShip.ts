import { SHIP, blocktype } from '../../../share/CONSTANT'

export function addBlocktoShip(ship: SHIP, newblock: { type: blocktype, block: any, x: number, y: number }) {
    ship.Ship_Blocks.blocks.push(
        { type: newblock.type, block: newblock.block, x: newblock.x, y: newblock.y }
    )
}

export function removeBlocktoShip(ship: SHIP, aimblock: { type: blocktype, x: number, y: number }) {
    ship.Ship_Blocks.blocks =
        ship.Ship_Blocks.blocks.filter(b => b.type != aimblock.type && b.x != aimblock.x && b.y != aimblock.y)//排除目标方块
}

