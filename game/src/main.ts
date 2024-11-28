import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)
app.use(store)//使用pinia储存
app.use(router)//使用vue-router路由

app.mount('#app')

