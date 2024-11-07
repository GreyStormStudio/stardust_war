import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    isgame: true,
    isLogin: false,
  },
  mutations: {
    setIsGame(state, value) {
        state.isgame = value;
    },
    setIsLogin(state,value){
        state.isLogin= value;
    }
  },
  actions: {
    updateIsGame({ commit }, value) {
      commit('setIsGame', value);
    },
    updateIsLogin({ commit }, value) {
        commit('setIsLogin', value);
    }
  }
});
