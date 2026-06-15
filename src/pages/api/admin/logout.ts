import type { APIRoute } from 'astro';
import { clearAdminSession } from '../../../lib/adminAuth';
import { withBase } from '../../../lib/urls';

export const POST: APIRoute = async ({ cookies, redirect }) => {
	clearAdminSession(cookies);
	return redirect(withBase('admin'));
};
