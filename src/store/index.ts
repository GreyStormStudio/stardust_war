import { createStore } from 'vuex'

export default createStore({
  state: {
    isgame:false
  },
  getters: {
  },
  mutations: {
    setIsGame(state, value) {
      state.isgame = value;
    }
  },
  actions: {
    updateIsGame({ commit }, value) {
      commit('setIsGame', value);
    }
  },
  modules: {
  }
})
