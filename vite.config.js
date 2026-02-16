// @ts-check
import { defineConfig } from 'vite';
import path from 'node:path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue(), cssInjectedByJsPlugin({ useStrictCSP: true }), dts({ rollupTypes: true })],
	build: {
		lib: {
			name: 'notifications',
			entry: path.resolve(__dirname, './src/index.ts'),
			fileName: (type) => `index.${type}.js`,
		},
		emptyOutDir: true,
		rollupOptions: {
			external: ['vue'],
			output: {
				exports: 'named',
				globals: {
					vue: 'Vue',
				},
				assetFileNames: (assetInfo) => {
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
