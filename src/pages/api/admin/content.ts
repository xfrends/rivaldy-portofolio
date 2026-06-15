import type { APIRoute } from 'astro';
import { isAdminAuthenticated } from '../../../lib/adminAuth';
import { getRuntimeEnv } from '../../../lib/cloudflare';
import { updateSiteContent } from '../../../lib/siteCms';
import { withBase } from '../../../lib/urls';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
	const adminPath = withBase('admin/content');
	const runtimeEnv = getRuntimeEnv(locals);

	if (!(await isAdminAuthenticated(cookies, runtimeEnv))) {
		return redirect(`${withBase('admin')}?error=session`);
	}

	const form = await request.formData();
	const heroImageValue = form.get('heroImage');
	const aboutImageValue = form.get('aboutImage');

	try {
		await updateSiteContent({
			heroTitle: String(form.get('heroTitle') || ''),
			heroTagline: String(form.get('heroTagline') || ''),
			heroImage: heroImageValue instanceof File ? heroImageValue : null,
			aboutImage: aboutImageValue instanceof File ? aboutImageValue : null,
			aboutText: String(form.get('aboutText') || ''),
			env: runtimeEnv,
		});
		return redirect(`${adminPath}?success=content-updated`);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Content gagal diproses.';
		return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
	}
};
