// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	[
		...pluginVue.configs['flat/recommended'],
		{
			rules: {
				'vue/component-definition-name-casing': ['error', 'kebab-case'],
				'vue/component-name-in-template-casing': [
					'error',
					'kebab-case',
					{
						registeredComponentsOnly: true,
						ignores: [],
					},
				],
				'vue/eqeqeq': 'error',
				'vue/html-quotes': ['error', 'double'],
				'vue/match-component-file-name': [
					'error',
					{
						extensions: ['vue'],
						shouldMatchCase: false,
					},
				],
				'vue/max-attributes-per-line': [
					'error',
					{
						singleline: {
							max: 2,
						},
						multiline: {
							max: 1,
						},
					},
				],
				'vue/no-deprecated-scope-attribute': 'error',
				'vue/no-deprecated-slot-scope-attribute': 'error',
				'vue/no-irregular-whitespace': 'error',
				'vue/no-static-inline-styles': 'error',
				'vue/require-name-property': 'error',
				'vue/singleline-html-element-content-newline': 'off',
				'vue/v-slot-style': 'error',
			},
			languageOptions: {
				sourceType: 'module',
				globals: {
					...globals.browser,
				},
			},
		},
	],
);
