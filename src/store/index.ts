import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        playerName: '',
    },
    mutations: {
        setPlayerName(state, name) {
            state.playerName = name;
        }
    },
    actions: {
        updatePlayerName({ commit }, name) {
            commit('setPlayerName', name);
        }
    },
    getters: {
        playerName: (state) => state.playerName,
    },
    plugins: [createPersistedState()] // 添加这一行来启用持久化
});
