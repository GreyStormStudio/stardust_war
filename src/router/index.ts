import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainView from '../vue/起始页/Main.vue'
import RegisterView from '../vue/起始页/Register.vue'
import GameMainView from '../vue/游戏页/GameMain.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'start',
    component:MainView
  },
  {
    path: '/register',
    name: 'register',
    component:RegisterView
  },
  {
    path: '/game',
    name: 'game',
    component:GameMainView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
