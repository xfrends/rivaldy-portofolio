import type { APIRoute } from 'astro';
import { isAdminAuthenticated } from '../../../lib/adminAuth';
import { getRuntimeEnv } from '../../../lib/cloudflare';
import { uploadGalleryImages } from '../../../lib/galleryCms';
import { withBase } from '../../../lib/urls';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
	const adminPath = withBase('admin');
	const runtimeEnv = getRuntimeEnv(locals);

	if (!(await isAdminAuthenticated(cookies, runtimeEnv))) {
		return redirect(`${adminPath}?error=session`);
	}

	const form = await request.formData();
	const files = form.getAll('photos').filter((item): item is File => item instanceof File);

	try {
		const count = await uploadGalleryImages({
			files,
			collectionId: String(form.get('collectionId') || ''),
			collectionName: String(form.get('collectionName') || ''),
			title: String(form.get('title') || ''),
			description: String(form.get('description') || ''),
			featured: form.get('featured') === 'on',
			env: runtimeEnv,
		});
		return redirect(`${adminPath}?uploaded=${count}`);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Upload gagal.';
		return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
	}
};
