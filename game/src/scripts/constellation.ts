import { Application, Graphics, Text } from "pixi.js";
import { useGameInfoStore, useUserInfoStore } from "../store";
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent } from 'vue';

function useSocket() {
    const instance = getCurrentInstance();
    return instance!.appContext.config.globalProperties.$socket;
}

// 获取资源
function fetchData(socket: any, store: any) {
    const username = useUserInfoStore().getUsername;
    socket.emit('ReadData', username, true);
    socket.once('ReadDataResult', (result: any) => {
        store.value.energy = result.gameinfo.storage.energy;
        store.value.mineral = result.gameinfo.storage.mineral;
        store.value.metal = result.gameinfo.storage.metal;
    });
}

export default defineComponent({
    setup() {
        const store = ref(useGameInfoStore().getStorage);
        const intervalId = ref();
        const socket = useSocket();
        onMounted(() => {
            intervalId.value = setInterval(() => fetchData(socket, store), 1000 / 60);
        });
        onBeforeUnmount(() => {
            if (intervalId.value) {
                clearInterval(intervalId.value);
            }
        });
        return {
            store
        }
    },

})
