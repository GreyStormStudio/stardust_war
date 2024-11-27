import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
//初始界面(啥都没有)
import Empty from '../App.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '',
        component: Empty
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
