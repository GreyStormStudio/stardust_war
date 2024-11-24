import { createApp } from 'vue'
import App from '@game/App.vue'
import router from '@game/src/router/'
import store from '@game/src/store/'

createApp(App).use(store).use(router).mount('#app')