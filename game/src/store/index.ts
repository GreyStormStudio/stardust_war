import { createPinia, defineStore } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { SHIP_ZERO } from "../../../share/CONSTANT"

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
            ship: {
                object: SHIP_ZERO,
                pos: {
                    x: 0,
                    y: 0,
                    constellation: -1
                },
                sinfo: {
                    power: 0,
                    hits: 0,
                    mass: 0,
                    thrust: 0,
                    speed_hyper: 0,
                    id: 0
                }
            }

        }
    },
    actions: {
        setGameInfo(gameinfo: any) {
            this.storage = gameinfo.storage
            this.ship = gameinfo.ship
        },
    },
    getters: {
        getStorage(state) {
            return state.storage
        },
        getShipid(state) {
            return state.ship.sinfo.id
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
