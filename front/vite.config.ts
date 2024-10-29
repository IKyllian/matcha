import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '10.11.11.4',
    port: 5173
  },
  resolve: {
    alias: {
      'front': path.resolve(__dirname, './src'),
      'styled-system': path.resolve(__dirname, './styled-system')
    },
    dedupe: ['react'],
  },
})
