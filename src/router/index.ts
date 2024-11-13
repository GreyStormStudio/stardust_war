import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
//初始界面(啥都没有)
import Empty from '../App.vue'
//登录注册界面
import LoginView from '../vue/起始页/Login.vue'
import RegisterView from '../vue/起始页/Register.vue'
//游戏内容界面
import GameView from '../vue/游戏页/GameBase.vue'
import GameUniverseView from '../vue/游戏页/Universe.vue'
import GameConstellationView from '../vue/游戏页/Constellation.vue'
import GameRankView from '../vue/游戏页/Rank.vue'
import GameTechnologyView from '../vue/游戏页/Technology.vue'
import GameBonusView from '../vue/游戏页/Bonus.vue'

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
    component:GameView,
    children:[
      {path:'/universe',name:'universe',component:GameUniverseView},
      {path:'/constellation',name:'constellation',component:GameConstellationView},
      {path:'/technology',name:'technology',component:GameTechnologyView},
      {path:'/bonus',name:'bonus',component:GameBonusView},
      {path:'/rank',name:'rank',component:GameRankView},]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
