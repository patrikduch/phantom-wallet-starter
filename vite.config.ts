import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { nodePolyfills }  from 'vite-plugin-node-polyfills';
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    global: 'window',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/ws': {
        target: 'ws://localhost:8080', // 👈 WebSocket target
        ws: true,                       // 👈 Must enable ws
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:8080', // 👈 For REST API
        changeOrigin: true,
      },
    },
  },
});
