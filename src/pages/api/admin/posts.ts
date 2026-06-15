import type { APIRoute } from 'astro';
import { isAdminAuthenticated } from '../../../lib/adminAuth';
import { getRuntimeEnv } from '../../../lib/cloudflare';
import { createPost, deletePost, updatePost } from '../../../lib/galleryCms';
import { withBase } from '../../../lib/urls';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
	const adminPath = withBase('admin/posts');
	const runtimeEnv = getRuntimeEnv(locals);

	if (!(await isAdminAuthenticated(cookies, runtimeEnv))) {
		return redirect(`${withBase('admin')}?error=session`);
	}

	const form = await request.formData();
	const action = String(form.getAll('action').at(-1) || '');
	const images = form.getAll('images').filter((item): item is File => item instanceof File);
	const collectionIds = form.getAll('collections').map(String);
	const thumbnailValue = form.get('thumbnail');
	const thumbnail = thumbnailValue instanceof File ? thumbnailValue : null;

	try {
		if (action === 'create') {
			await createPost({
				thumbnail,
				images,
				collectionIds,
				title: String(form.get('title') || ''),
				description: String(form.get('description') || ''),
				featured: form.get('featured') === 'on',
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=post-created`);
		}

		if (action === 'update') {
			await updatePost({
				id: String(form.get('id') || ''),
				thumbnail,
				images,
				selectedThumbnail: String(form.get('selectedThumbnail') || ''),
				removeImages: form.getAll('removeImages').map(String),
				collectionIds,
				title: String(form.get('title') || ''),
				description: String(form.get('description') || ''),
				featured: form.get('featured') === 'on',
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=post-updated`);
		}

		if (action === 'delete') {
			await deletePost({
				id: String(form.get('id') || ''),
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=post-deleted`);
		}

		throw new Error('Action tidak dikenal.');
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Post gagal diproses.';
		return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
	}
};
