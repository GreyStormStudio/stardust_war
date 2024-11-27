import { io } from 'socket.io-client'
import { defineComponent } from 'vue'
const socket = io('', { path: '' })

export default defineComponent({
    created() {
        socket.on('connect', () => {
            console.log('connect')
        })
    },
})