import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      name: 'resolver',
      entry:  path.resolve(__dirname, './src/auto-import-resolver.ts'),
      fileName: 'auto-import-resolver.js',
    },
    emptyOutDir: false,
  },
  base: './',
  
});
