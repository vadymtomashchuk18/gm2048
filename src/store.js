/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: [],
  },
  plugins: [createPersistedState()],
  mutations: {
    saveGameBoard(state, savingBoard) {
      state.board = savingBoard;
    },
  },
  // actions: {
  // saveGameBoard(context, savingBoard) {
  //   context.commit('saveGameBoard', savingBoard);
  // },
  // },
});
