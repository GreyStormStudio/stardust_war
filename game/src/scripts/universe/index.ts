import { Application, Text, Texture } from "pixi.js";
import { useUserInfoStore } from "../../store";
import { defineComponent, ref, getCurrentInstance } from "vue";

function useSocket() {
    const instance = getCurrentInstance();
    return instance?.appContext.config.globalProperties.$socket;
}

export default defineComponent({

})