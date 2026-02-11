import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, 'src/entry-client.tsx'),
      },
    },
  },
  ssr: {
    noExternal: ['@tanstack/react-query'],
  },
})
