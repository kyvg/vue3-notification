import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      name: 'resolver',
      entry:  path.resolve(__dirname, './auto-import-resolver/index.ts'),
      fileName: (type) => `index.${type}.js`,
    },
    emptyOutDir: false,
    outDir: 'dist/auto-import-resolver',
  },
  plugins: [
    dts({ 
      entryRoot: './auto-import-resolver',
    }),
  ],
});
