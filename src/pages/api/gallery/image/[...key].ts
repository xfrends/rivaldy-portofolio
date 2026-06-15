import type { APIRoute } from 'astro';
import { getRuntimeEnv } from '../../../../lib/cloudflare';

export const GET: APIRoute = async ({ params, locals }) => {
	const key = params.key;
	const bucket = getRuntimeEnv(locals).GALLERY_BUCKET;

	if (!key || !bucket) {
		return new Response('Not found', { status: 404 });
	}

	const object = await bucket.get(key);
	if (!object) {
		return new Response('Not found', { status: 404 });
	}

	return new Response(object.body, {
		headers: {
			'Cache-Control': 'public, max-age=31536000, immutable',
			'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
		},
	});
};
