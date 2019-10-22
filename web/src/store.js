import Vue from 'vue'
import Vuex from 'vuex'
import { getCookie } from './utils/util.js';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: getCookie('username') ? getCookie('username') : '',
    token: getCookie('token') ? getCookie('token') : '',
  },
  mutations: {
    setUsername(state, value) {
      state.username = value;
    },
    setToken(state, value) {
      state.token = value;
    }
  },
  actions: {

  }
})
