import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const general = {
    state: {
        isLoggedIn: false
    },
    mutations: {},
    actions: {},
    getters: {}
}

const createStore = () => new Vuex.Store({
  modules: {
    general
  }
})

export default createStore;