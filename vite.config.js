import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

// The app is served from https://brandonjrodgers.com/calendars/
export default defineConfig({
  base: '/calendars/',
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
  },
});
