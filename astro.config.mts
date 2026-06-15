import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

const site = process.env.SITE_URL || 'https://rivaldy-portfolio.pages.dev';

// https://astro.build/config
export default defineConfig({
	site,
	base: '/',
	output: 'server',
	adapter: cloudflare({
		imageService: 'passthrough',
	}),
	vite: {
		plugins: [tailwindcss()],
	},
});
