import { createPinia, defineStore } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const useGameInfoStore = defineStore('gameInfo', {
    state: () => {
        return {
            storage: {
                energy:0,
                mineral:0,
                metal:0,
            },
            constellations:[],
        }
    },
    actions:{
        setGameInfo(gameinfo:any){
            this.storage = gameinfo.storage
            this.constellations = gameinfo.constellations
        }
    },
    persist: true//持久化储存
})

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
    persist: true//持久化储存

})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export {
    useGameInfoStore,
    useUserInfoStore
}
export default pinia
