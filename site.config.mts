import type { AstroInstance } from 'astro';
import { Instagram, MessageCircle } from 'lucide-astro';

export interface SocialLink {
	name: string;
	url: string;
	icon: AstroInstance;
}

export default {
	title: 'Rivaldy Ahnaf Abida',
	favicon: 'favicon.ico',
	owner: 'A Photo by Rvldy',
	profileImage: 'profile.webp',
	socialLinks: [
		{
			name: 'WhatsApp',
			url: 'https://wa.me/6289519033751',
			icon: MessageCircle,
		} as SocialLink,
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/rivaldy.abida',
			icon: Instagram,
		} as SocialLink,
	],
};
