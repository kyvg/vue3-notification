import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  root: 'demo',
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, './docs'),
    emptyOutDir: true,
  },
  base: './',
});
