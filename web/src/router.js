import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { getCookie } from './utils/util';

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
    //已登录
    if(to.name !== 'home'){
      next({path: '/'})
    }else{
      next()
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