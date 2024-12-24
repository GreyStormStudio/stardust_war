import { Application, Text, Texture } from "pixi.js";
import { useUserInfoStore } from "../../store";
import { defineComponent, ref, getCurrentInstance } from "vue";

function useSocket() {
    const instance = getCurrentInstance();
    return instance?.appContext.config.globalProperties.$socket;
}

function fetchData(socket: any, x: number, y: number) {
    const username = useUserInfoStore().getUsername;
    socket.emit("RequireMap", x, y);
    socket.once("RequireMapResult",)

    const generateMap = (result: any) => {
        
    }
}

export default defineComponent({

})