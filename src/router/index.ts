import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../起始页/Home.vue'
import AboutView from '../起始页/About.vue'
import LoginView from '../起始页/Login.vue'
import RegisterView from '../起始页/Register.vue'
import GameMainView from '../游戏页/GameMain.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
