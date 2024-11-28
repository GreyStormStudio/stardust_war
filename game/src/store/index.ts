import { createPinia, defineStore } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const useGameInfoStore = defineStore('gameInfo', {
    state: () => {
        return {
            storage: {
                energy: 0,
                mineral: 0,
                metal: 0,
            },
            constellations: [-1],
        }
    },
    actions: {
        setGameInfo(gameinfo: any) {
            this.storage = gameinfo.storage
            this.constellations = gameinfo.constellations
        },
        setStorage(type: "energy" | "mineral" | "metal", data: number) {
            if (type == "energy") {
                this.storage.energy = data
            }
            if (type == "mineral") {
                this.storage.mineral = data
            }
            if (type == "metal") {
                this.storage.metal = data
            }
        },
        editConstellation(type: "add" | "remove", data: number) {
            if (type == "add") {
                this.constellations.push(data)
            }
            if (type == "remove") {
                this.constellations = this.constellations.filter(number => number != data)
            }
        }
    },
    getters: {
        getStorage(state) {
            return state.storage
        },
        getConstellations(state) {
            return state.constellations
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
    getters: {
        getUsername(state) {
            return state.username
        }
    },
    persist: true//持久化储存

})

export {
    useGameInfoStore,
    useUserInfoStore
}
export default pinia
