import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        playerName: '',
        storedResources: {
            energy: 0,
            mineral: 0,
            metal: 0
        },
        occupiedConstellations: []
    },
    mutations: {
        setPlayerName(state, name) {
            state.playerName = name;
        },
        setPlayerData(state, data) {
            state.storedResources = {...data.storedResources};
            state.occupiedConstellations = {...data.occupiedConstellations};
        },
        updataPlayerStore(state, data) {
            state.storedResources = {...data}
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
        playerStoredResources: (state) => state.storedResources,
        playerOccupiedConstellations: (state) => state.occupiedConstellations,
    },
    plugins: [createPersistedState()]
});

