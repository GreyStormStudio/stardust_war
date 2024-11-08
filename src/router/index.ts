import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import StartView from '../vue/起始页/Start.vue'
import HomeView from '../vue/起始页/Home.vue'
import AboutView from '../vue/起始页/About.vue'
import LoginView from '../vue/起始页/Login.vue'
import RegisterView from '../vue/起始页/Register.vue'
import GameMainView from '../vue/游戏页/GameMain.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'start',
    component:StartView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component:LoginView
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
