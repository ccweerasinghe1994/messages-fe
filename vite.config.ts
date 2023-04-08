/// <reference types="vite/client"/>
/// <reference types="vitest"/>

import { defineConfig } from 'vite';
// import { configDefaults } from 'vitest/config';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/cypress/**',
			'**/.{idea,git,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
		],
		setupFiles: './src/setup.Tests.ts',
		environment: 'jsdom',
		coverage: {
			provider: 'c8',
			extension: ['.ts', '.tsx'],
			all: true,
			// include: ['**/src/features/**'],
			branches: 50,
			statements: 50,
			functions: 50,
			lines: 50,
		},
	},
});
