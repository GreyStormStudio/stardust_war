import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
//初始界面(啥都没有)
import Empty from '../App.vue'

import Login from '../view/起始页/Login.vue'
import Register from '../view/起始页/Register.vue'
import Forget from '../view/起始页/Forget.vue'

import GameBase from '../view/游戏页/GameBase.vue'
import Universe from '../view/游戏页/Universe.vue'
import Constellation from '../view/游戏页/Constellation.vue'
import Technology from '../view/游戏页/Technology.vue'
import Bonus from '../view/游戏页/Bonus.vue'
import Rank from '../view/游戏页/Rank.vue'
import UserInfo from '../view/游戏页/UserInfo.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '',
        component: Empty
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/forget',
        name: 'forget',
        component: Forget
    },
    {
        path: '/game',
        name: 'game',
        component: GameBase,
        children: [
            { path: '/universe', name: 'universe', component: Universe },
            { path: '/constellation', name: 'constellation', component: Constellation },
            { path: '/technology', name: 'technology', component: Technology },
            { path: '/bonus', name: 'bonus', component: Bonus },
            { path: '/rank', name: 'rank', component: Rank },
            { path: '/userinfo', name: 'userinfo', component: UserInfo },
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
