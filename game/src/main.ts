import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const app = createApp(App)

// 可以在这里设置 axios 的基础配置，例如基地址
axios.defaults.baseURL = 'http://localhost:7777'

app.use(store).use(router)

app.mount('#app')

// 在应用挂载后发送请求
axios.get('/').catch(error => {
    console.error('Error fetching data:', error);
});

