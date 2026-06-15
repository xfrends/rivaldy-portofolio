import type { APIRoute } from 'astro';
import { isAdminAuthenticated } from '../../../lib/adminAuth';
import { getRuntimeEnv } from '../../../lib/cloudflare';
import { createCollection, deleteCollection, updateCollection } from '../../../lib/galleryCms';
import { withBase } from '../../../lib/urls';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
	const adminPath = withBase('admin/collections');
	const runtimeEnv = getRuntimeEnv(locals);

	if (!(await isAdminAuthenticated(cookies, runtimeEnv))) {
		return redirect(`${withBase('admin')}?error=session`);
	}

	const form = await request.formData();
	const action = String(form.getAll('action').at(-1) || '');

	try {
		if (action === 'create') {
			await createCollection({
				id: String(form.get('id') || ''),
				name: String(form.get('name') || ''),
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=collection-created`);
		}

		if (action === 'update') {
			await updateCollection({
				originalId: String(form.get('originalId') || ''),
				id: String(form.get('id') || ''),
				name: String(form.get('name') || ''),
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=collection-updated`);
		}

		if (action === 'delete') {
			await deleteCollection({
				id: String(form.get('id') || ''),
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=collection-deleted`);
		}

		throw new Error('Action tidak dikenal.');
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Collection gagal diproses.';
		return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
	}
};
