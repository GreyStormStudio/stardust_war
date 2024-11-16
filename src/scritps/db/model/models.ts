export interface PlayerData{//玩家数据:名称、分数、储存资源、建筑等级数量、位置(用种子编号反推坐标)
    name:string
    score:number
    storage:PlayerResourceStorageData
    builds:PlayerBuildsData
    Position:number
}

interface PlayerResourceStorageData{//玩家储存的资源
    energyStorage:number
    mineralStorage:number
    metalStorage:number
    darkmatterStorage:number
}

interface PlayerBuildsData{//玩家的建筑类型等级数量
    buildType:string[]
    buildLevel:Float32Array
    buildNumber:Float32Array
}