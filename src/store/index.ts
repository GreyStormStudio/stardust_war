import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

interface PlayerState {
  name: string;
  score: number;
}

const state: PlayerState = {
  name: '',
  score: 0
};

const mutations = {
  setPlayerName(state: PlayerState, name: string) {
    state.name = name;
  },
  setPlayerScore(state: PlayerState, score: number) {
    state.score = score;
  }
};

const actions = {
  updatePlayerName({ commit }: { commit: (mutation: string, payload: any) => void }, name: string) {
    commit('setPlayerName', name);
  },
  updatePlayerScore({ commit }: { commit: (mutation: string, payload: any) => void }, score: number) {
    commit('setPlayerScore', score);
  }
};

const getters = {
  playerName: (state: PlayerState) => state.name,
  playerScore: (state: PlayerState) => state.score
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
  plugins: [createPersistedState()] // 使用 vuex-persistedstate 插件持久化状态
});
