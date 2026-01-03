import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
      alias: {
        '@': '/src',
        '@root': '/'
      },
    },
  plugins: [tailwindcss(),react(), VitePWA()],
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 3000, // 可选：指定端口号
    proxy: {
      '/api': {
        target: 'http://192.168.1.11:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
