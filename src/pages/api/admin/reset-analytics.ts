import type { APIRoute } from 'astro';
import { getRuntimeEnv } from '../../../lib/cloudflare';
import { isAdminAuthenticated } from '../../../lib/adminAuth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
	const env = getRuntimeEnv(locals);
	
	// Ensure the user is logged in as an admin
	if (!(await isAdminAuthenticated(cookies, env))) {
		return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { 
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	let body;
	try {
		body = await request.json();
	} catch (e) {
		return new Response(JSON.stringify({ success: false, error: 'Invalid JSON body' }), { status: 400 });
	}

	const adminPassword = env?.ADMIN_PASSWORD;
	if (!adminPassword || body.password !== adminPassword) {
		return new Response(JSON.stringify({ success: false, error: 'Password salah' }), { 
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (!env?.ANALYTICS) {
		return new Response(JSON.stringify({ success: false, error: 'ANALYTICS KV binding not found' }), { 
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		// List all keys in the ANALYTICS KV
		let cursor: string | undefined;
		let totalDeleted = 0;

		do {
			const result = await env.ANALYTICS.list({ limit: 1000, cursor });
			
			// Delete all keys found in this batch
			if (result.keys.length > 0) {
				await Promise.all(result.keys.map(key => env.ANALYTICS.delete(key.name)));
				totalDeleted += result.keys.length;
			}
			
			cursor = result.cursor;
			if (result.list_complete) break;
		} while (cursor);

		return new Response(JSON.stringify({ 
			success: true, 
			message: `Successfully reset ${totalDeleted} analytics records.` 
		}), { 
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});

	} catch (error) {
		return new Response(JSON.stringify({ 
			success: false, 
			error: error instanceof Error ? error.message : 'Unknown error occurred' 
		}), { 
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
