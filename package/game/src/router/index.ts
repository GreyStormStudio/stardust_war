import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
//初始界面(啥都没有)
import Empty from '@game/App.vue'
//登录注册界面
import LoginView from '@game/src/views/起始页/Login.vue'
import ForgetView from '@game/src/views/起始页/Forget.vue'
import RegisterView from '@game/src/views/起始页/Register.vue'
//游戏内容界面
import GameView from '@game/src/views/游戏页/GameBase.vue'
import UserInfo from '@game/src/views/游戏页/UserInfo.vue'
import GameUniverseView from '@game/src/views/游戏页/Universe.vue'
import GameConstellationView from '@game/src/views/游戏页/Constellation.vue'
import GameRankView from '@game/src/views/游戏页/Rank.vue'
import GameTechnologyView from '@game/src/views/游戏页/Technology.vue'
import GameBonusView from '@game/src/views/游戏页/Bonus.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: Empty
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/forget',
    name: 'forget',
    component: ForgetView
  },
  {
    path: '/game',
    component: GameView,
    children: [
      { path: '/userinfo', name: 'userinfo', component: UserInfo },
      { path: '/universe', name: 'universe', component: GameUniverseView },
      { path: '/constellation', name: 'constellation', component: GameConstellationView },
      { path: '/technology', name: 'technology', component: GameTechnologyView },
      { path: '/bonus', name: 'bonus', component: GameBonusView },
      { path: '/rank', name: 'rank', component: GameRankView },]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
