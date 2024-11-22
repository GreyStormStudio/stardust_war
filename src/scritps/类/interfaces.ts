// 定义资源类型
type ResourceType = '能量' | '矿物' | '金属';

// 定义资源结构
interface Resource {
    type: ResourceType;
    amount: number;
}

// 定义建筑类型结构
interface BuildingType {
    name: string;
    maintenanceCost: Resource[];
    outputResource: Resource[];
}

// 定义建筑结构
interface Building {
    type: BuildingType;
    quantity: number;
}

// 定义星域种子结构
interface StarDomainSeed {
    occupiedByPlayer: string;
    constructedBuildings: Building[];
}

// 定义玩家账户信息结构
interface AccountInfo {
    email: string;
    password: string;
}

// 定义玩家储存结构
interface PlayerStorage {
    accountInfo: AccountInfo;
    storedResources: Resource[];
    occupiedStarDomains: number[];
}

// 定义玩家名称到玩家储存的映射
type Players = Record<string, PlayerStorage>;

// 定义星域种子种子到星域的映射
type Constellations = Record<number, StarDomainSeed>;

// 导出建筑类型,用户数据,星域数据,以便外部定义具体的建筑
export { BuildingType, Players, Constellations };
