import { SHIP } from '../../../share/CONSTANT'
export function addBlockWithConnections(ship:SHIP,newBlock: {
    type: 'CORE'|'BODY'|'POWER'|'ARMOR'|'SHIELD'|'ENGINE'|'WEAPON';
    block: any;
    x: number;
    y: number;
}) {

    const blockCount = ship.Ship_Blocks.blocks.filter(b => b.type === newBlock.type).length + 1;
    const newBlockId = `${newBlock.type}_${blockCount}`;

    // 创建新方块对象并添加ID
    const newBlockData: typeof ship.Ship_Blocks.blocks[0] = {
        ...newBlock,
        id: newBlockId
    };
    // 添加方块到 blocks 数组
    ship.Ship_Blocks.blocks.push(newBlockData);

    // 获取当前所有方块以检查连接
    const blocks = ship.Ship_Blocks.blocks;

    // 查找并添加连接关系
    for (const existingBlock of blocks) {
        // 检查新方块是否与现有方块相邻
        if (Math.abs(existingBlock.x - newBlock.x) <= 1 && Math.abs(existingBlock.y - newBlock.y) <= 1) {
            // 确保不是同一个方块
            if (existingBlock.id !== newBlockData.id) {
                // 添加连接关系
                ship.Ship_Blocks.connectlist.push({
                    id1: existingBlock.id,
                    id2: newBlockData.id
                });
            }
        }
    }
}

/*
addBlockWithConnections(ship,{
    type: 'POWER',
    block: BLOCKS.POWER.POWER1,
    x: 1, 假设这是方块的 x 坐标
    y: 3 假设这是方块的 y 坐标
});*/
