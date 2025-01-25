import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: './',
    server: {
      host: env.VITE_FRONT_URL,
      port: 5173,
      watch: {
        usePolling: true
      },
    },
    define: {
      'process.env.VITE_FRONT_URL': JSON.stringify(env.VITE_FRONT_URL),
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL)
    },
    resolve: {
      alias: {
        'front': path.resolve(__dirname, './src'),
        'styled-system': path.resolve(__dirname, './styled-system')
      },
      dedupe: ['react'],
    }
  }

})
