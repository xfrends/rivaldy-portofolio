import type { APIRoute } from 'astro';
import { trackView } from '../../../lib/analytics';
import { getRuntimeEnv } from '../../../lib/cloudflare';

export const POST: APIRoute = async ({ request, locals }) => {
	const runtimeEnv = getRuntimeEnv(locals);

	try {
		const payload = await request.json();
		await trackView({
			path: typeof payload.path === 'string' ? payload.path : undefined,
			collectionId: typeof payload.collectionId === 'string' ? payload.collectionId : undefined,
			postId: typeof payload.postId === 'string' ? payload.postId : undefined,
			env: runtimeEnv,
		});
	} catch {
		return new Response(null, { status: 204 });
	}

	return new Response(null, { status: 204 });
};
