import type { APIRoute } from 'astro';
import { isAdminAuthenticated } from '../../../lib/adminAuth';
import { getRuntimeEnv } from '../../../lib/cloudflare';
import {
	createPricelistPackage,
	deletePricelistPackage,
	updatePricelistPackage,
} from '../../../lib/siteCms';
import { withBase } from '../../../lib/urls';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
	const adminPath = withBase('admin/pricelist');
	const runtimeEnv = getRuntimeEnv(locals);

	if (!(await isAdminAuthenticated(cookies, runtimeEnv))) {
		return redirect(`${withBase('admin')}?error=session`);
	}

	const form = await request.formData();
	const action = String(form.getAll('action').at(-1) || '');

	try {
		if (action === 'create') {
			await createPricelistPackage({
				...pricelistInputFrom(form),
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=pricelist-created`);
		}

		if (action === 'update') {
			await updatePricelistPackage({
				...pricelistInputFrom(form),
				originalId: String(form.get('originalId') || ''),
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=pricelist-updated`);
		}

		if (action === 'delete') {
			await deletePricelistPackage({
				id: String(form.get('originalId') || ''),
				env: runtimeEnv,
			});
			return redirect(`${adminPath}?success=pricelist-deleted`);
		}

		throw new Error('Action tidak dikenal.');
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Pricelist gagal diproses.';
		return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
	}
};

function pricelistInputFrom(form: FormData) {
	return {
		id: String(form.get('id') || ''),
		name: String(form.get('name') || ''),
		price: String(form.get('price') || ''),
		features: String(form.get('features') || '')
			.split(/\r?\n/)
			.map((feature) => feature.trim())
			.filter(Boolean),
		popular: form.get('popular') === 'on',
		enabled: form.get('enabled') === 'on',
		sortOrder: Number(form.get('sortOrder') || 0),
	};
}
