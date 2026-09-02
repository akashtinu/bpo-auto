import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Function form - compatible with rolldown/vite 8
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@paypal')) return 'paypal-vendor';
            if (id.includes('lucide-react')) return 'icons-vendor';
            if (id.includes('react-dom') || id.includes('react-router')) return 'react-vendor';
            if (id.includes('react')) return 'react-vendor';
          }
        }
      }
    }
  }
})


