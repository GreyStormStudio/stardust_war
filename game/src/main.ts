import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import { io } from 'socket.io-client';

const socket = io('', { path: '/ws' });
const app = createApp(App)
app.use(pinia).use(router)
app.config.globalProperties.$socket = socket;//全局挂载socket

app.mount('#app')

