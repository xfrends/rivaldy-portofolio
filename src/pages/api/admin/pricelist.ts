import type { APIRoute } from 'astro';
import { isAdminAuthenticated } from '../../../lib/adminAuth';
import { getRuntimeEnv } from '../../../lib/cloudflare';
import { updatePricelist, type PricelistPackage } from '../../../lib/siteCms';
import { withBase } from '../../../lib/urls';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
	const adminPath = withBase('admin/pricelist');
	const runtimeEnv = getRuntimeEnv(locals);

	if (!(await isAdminAuthenticated(cookies, runtimeEnv))) {
		return redirect(`${withBase('admin')}?error=session`);
	}

	const form = await request.formData();

	try {
		await updatePricelist({
			packages: form.getAll('indexes').map((value): PricelistPackage => {
				const index = String(value);
				const name = String(form.get(`name-${index}`) || '').trim();
				return {
					id: String(form.get(`id-${index}`) || name),
					name,
					price: String(form.get(`price-${index}`) || '').trim(),
					features: String(form.get(`features-${index}`) || '')
						.split(/\r?\n/)
						.map((feature) => feature.trim())
						.filter(Boolean),
					popular: form.get(`popular-${index}`) === 'on',
					enabled: form.get(`enabled-${index}`) === 'on',
				};
			}),
			env: runtimeEnv,
		});
		return redirect(`${adminPath}?success=pricelist-updated`);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Pricelist gagal diproses.';
		return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
	}
};
