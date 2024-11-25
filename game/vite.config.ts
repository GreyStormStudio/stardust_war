import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
      '/api': {
        target: 'http://localhost:7777',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
