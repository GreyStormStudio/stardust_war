import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Empty from '../App.vue'

import LoginView from '../vue/起始页/Login.vue'
import RegisterView from '../vue/起始页/Register.vue'

import GameView from '../vue/游戏页/GameBase.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'',
    component:Empty
  },
  {
    path:'/login',
    name:'Login',
    component:LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component:RegisterView
  },
  {
    path: '/game',
    name: 'Game',
    component:GameView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
