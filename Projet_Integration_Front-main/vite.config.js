import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the output directory is set correctly
  },
  server: {
    port: 5173, // change here
    host: '127.0.0.1', // change here
  },
})
