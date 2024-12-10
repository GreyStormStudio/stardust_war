import { createPinia, defineStore } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const useUserInfoStore = defineStore('userInfo', {
    state: () => {
        return {
            username: '',
        }
    },
    actions: {
        setUserInfo(userInfo: any) {
            this.username = userInfo.username;
        }
    },
    getters: {
        getUsername(state) {
            return state.username
        }
    },
    persist: true//持久化储存

})

export {
    useUserInfoStore
}
export default pinia
