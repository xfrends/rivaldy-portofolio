import type { APIRoute } from 'astro';
import {
	createAdminSession,
	hasAdminConfig,
	setAdminSession,
	validateAdminCredentials,
} from '../../../lib/adminAuth';
import { getRuntimeEnv } from '../../../lib/cloudflare';
import { withBase } from '../../../lib/urls';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
	const adminPath = withBase('admin');
	const runtimeEnv = getRuntimeEnv(locals);
	const form = await request.formData();
	const username = String(form.get('username') || '');
	const password = String(form.get('password') || '');

	if (!hasAdminConfig(runtimeEnv)) {
		return redirect(`${adminPath}?error=config`);
	}

	if (!validateAdminCredentials(username, password, runtimeEnv)) {
		return redirect(`${adminPath}?error=login`);
	}

	setAdminSession(cookies, await createAdminSession(username, runtimeEnv));
	return redirect(adminPath);
};
