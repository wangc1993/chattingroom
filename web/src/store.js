import Vue from 'vue'
import Vuex from 'vuex'
import { getCookie } from './utils/util.js';
import io from "socket.io-client";
/*全双工通信-地址需要根据后端ip更新*/
const socket = io("http://192.168.0.101:3005");
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: getCookie('username') ? getCookie('username') : '',
    token: getCookie('token') ? getCookie('token') : '',
    showUploadVisible: false,
    showUploadPicVisible: false,
    socket
  },
  mutations: {
    setUsername(state, value) {
      state.username = value;
    },
    setAvatar(state, value) {
      state.avatar = value;
    },
    setToken(state, value) {
      state.token = value;
    },
    //控制上传弹窗是否显示
    setUploadModal(state, bool){
      state.showUploadVisible = bool;
    },
    //控制上传图片是否显示
    setUploadPicModal(state, bool){
      state.showUploadPicVisible = bool;
    }
  },
  actions: {

  }
})
