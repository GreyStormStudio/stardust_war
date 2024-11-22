import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        playerName: '',
        seed: 1,
        energystore: 0,
        mineralstore: 0,
        metalstore: 0,
        buildings: {
            energybuilding: 0,
            mineralbuilding: { low: 0, mid: 0, high: 0 },
            metalbuilding: 0
        }
    },
    mutations: {
        setPlayerName(state, name) {
            state.playerName = name;
        },
        setPlayerData(state, data) {
            state.seed = data.seed;
            state.energystore = data.energystore;
            state.mineralstore = data.mineralstore;
            state.metalstore = data.metalstore;
            state.buildings = data.buildings;
        },
        updataPlayerStore(state, data) {
            state.energystore = data.energystore;
            state.mineralstore = data.mineralstore;
            state.metalstore = data.metalstore
        },

    },
    actions: {
        setPlayerName({ commit }, name) {
            commit('setPlayerName', name);
        },
        setPlayerData({ commit }, datas) {
            commit('setPlayerData', datas)
        },
        updataPlayerStore({ commit }, data) {
            commit('updataPlayerStore', data)
        },
    },
    getters: {
        playerName: (state) => state.playerName,
        playerSeed: (state) => state.seed,
        playerEnergyStore: (state) => state.energystore,
        playerMineralStore: (state) => state.mineralstore,
        playerMetalStore: (state) => state.metalstore,
        playerBuildings: (state) => state.buildings
    },
    plugins: [createPersistedState()] // 添加这一行来启用持久化
});
