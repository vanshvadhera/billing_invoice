import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/apiUrl': {
        target: 'https://dev.avidrise.co.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiUrl/, ''),
      },
    },
  },
});
