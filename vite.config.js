import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin({ useStrictCSP: true })],
  build: {
    lib: {
      name: 'notifications',
      entry:  path.resolve(__dirname, './src/index.ts'),
      fileName: (type) => `index.${type}.js`,
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          return assetInfo.name;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
  },
});
