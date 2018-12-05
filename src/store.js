/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: [],
  },
  mutations: {
    saveGameBoard(state, savingBoard) {
      state.board = savingBoard;
    },
  },
  actions: {
    // saveGameBoard(context, savingBoard) {
    //   context.commit('saveGameBoard', savingBoard);
    // },
  },
});
