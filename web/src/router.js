import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/index.vue'
import { getCookie, delCookie } from './utils/util';
import { autoLogin } from './actions/interface.js';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/register.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let username = getCookie('username') || '';
  if(username){
    if(to.name !== 'home'){
      next({path: '/'})
    }else{
      //自动登录
      autoLogin(username).then(res => {
        if (res && res.state === "success") {
          router.app.$store.state.socket.emit("autoLogin", {
            avatar: res.data.avatar,
            username: res.data.username
          });
          next();
        } else {
          router.app.$store.commit("setUsername", '');
          router.app.$store.commit("setToken", '');
          delCookie('username');
          delCookie('token');
          next({path: '/login'})
          throw new Error(res && res.msg);
        }
      }).catch(e => {
          console.log(e.message);
      });
    }
  }else{
    //未登录
    if(to.name === 'register' || to.name === 'login'){
      next();
    }else{
      next({path: '/login'})
    }
  }
})

export default router;