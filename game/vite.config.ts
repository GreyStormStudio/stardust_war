import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: resolve(__dirname, '../config/env/.env') })
const port = process.env.GAME_PORT
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    envDir: '../../config/env',
    // 配置开发服务器
    server: {
        // 指定服务器主机名
        host: 'localhost',
        // 指定服务器端口
        port: 7777,
        // 启用 CORS
        cors: true,
        // 配置代理
        
        proxy: {
            // 当请求路径以 '/api' 开头时，将请求代理到另一个服务器地址
            "/ws": {
                target: `ws://localhost:${port}`,
                changeOrigin: true,
                ws: true
            }
        }
        
    }
})
