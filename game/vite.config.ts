import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: resolve(__dirname, '../config/.env') })
const port = process.env.GAME_PORT
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    envDir: '../config',
    server: {
        port:1145,
        proxy: {
            '/ws':{
                target:`ws://localhost:${port}`,
                changeOrigin:true,
                ws: true,
            }
        }
    }
})
