import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { partytownVite } from '@builder.io/partytown/utils';
import { sveltekit } from '@sveltejs/kit/vite';
// ts-ignore
import { join } from "path"
export default defineConfig({
	plugins: [
		sveltekit(),
		enhancedImages(),
		partytownVite({
			dest: join(__dirname, 'dist', '~partytown'),
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		rollupOptions: {
			external: ['@fontsource/poppins']
		}
	},

});
