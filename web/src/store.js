import Vue from 'vue'
import Vuex from 'vuex'
import { getCookie } from './utils/util.js';
import io from "socket.io-client";
/*全双工通信*/
const socket = io("http://localhost:3006");
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: getCookie('username') ? getCookie('username') : '',
    token: getCookie('token') ? getCookie('token') : '',
    socket
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
