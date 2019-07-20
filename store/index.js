import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const general = {
    state: {
        isLoggedIn: true,
        editMode: false
    },
    mutations: {
      SET_EDIT_MODE(state, mode) {
        state.editMode = mode;
      }
    },
    actions: {
      ACT_EDIT_MODE({ commit }, mode) {
        commit('SET_EDIT_MODE', mode);
      }
    },
    getters: {
      editMode: state => state.editMode
    }
}

const createStore = () => new Vuex.Store({
  modules: {
    general
  }
})

export default createStore;