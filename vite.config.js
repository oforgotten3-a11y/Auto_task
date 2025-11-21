import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Allow external access
  },
  build: {
    rollupOptions: {
      external: [], // Ensure no problematic external deps
    },
  },
  optimizeDeps: {
    exclude: [], // Clear any problematic exclusions
  },
})
