import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      name: 'resolver',
      entry:  path.resolve(__dirname, './src/auto-import-resolver.ts'),
      fileName: (type) => `auto-import-resolver.${type}.js`,
    },
    emptyOutDir: false,
  },
  base: './',
  
});
