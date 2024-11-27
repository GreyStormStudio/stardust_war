import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: resolve(__dirname, '../config/env') })
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    envDir: '../config/env',
    server: {
        host: 'localhost',
        port: 7777,
        cors: true,
        proxy: {
            '/api': {
                target: 'http://localhost:7777',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            },
            '/ws':{
                target:'ws://localhost:7777',
                changeOrigin:true,
                ws: true,
            }
        }
    }
})
