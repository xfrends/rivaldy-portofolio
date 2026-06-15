import type { AstroCookies } from 'astro';
import { getEnvString, type RuntimeEnv } from './cloudflare';

const cookieName = 'rivaldy_admin_session';

export function hasAdminConfig(env?: RuntimeEnv): boolean {
	return Boolean(
		getEnvString(env, 'ADMIN_USERNAME') &&
			getEnvString(env, 'ADMIN_PASSWORD') &&
			getEnvString(env, 'ADMIN_SESSION_SECRET'),
	);
}

export function validateAdminCredentials(
	username: string,
	password: string,
	env?: RuntimeEnv,
): boolean {
	return (
		safeEqual(username, getEnvString(env, 'ADMIN_USERNAME')) &&
		safeEqual(password, getEnvString(env, 'ADMIN_PASSWORD'))
	);
}

export async function createAdminSession(username: string, env?: RuntimeEnv): Promise<string> {
	const issuedAt = Date.now().toString();
	const payload = btoa(JSON.stringify({ username, issuedAt }));
	const signature = await sign(payload, env);
	return `${payload}.${signature}`;
}

export function setAdminSession(cookies: AstroCookies, token: string): void {
	cookies.set(cookieName, token, {
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secure: import.meta.env.PROD,
		maxAge: 60 * 60 * 24 * 7,
	});
}

export function clearAdminSession(cookies: AstroCookies): void {
	cookies.delete(cookieName, { path: '/' });
}

export async function isAdminAuthenticated(
	cookies: AstroCookies,
	env?: RuntimeEnv,
): Promise<boolean> {
	const token = cookies.get(cookieName)?.value;
	if (!token) return false;

	const [payload, signature] = token.split('.');
	if (!payload || !signature || !safeEqual(signature, await sign(payload, env))) return false;

	try {
		const session = JSON.parse(atob(payload)) as {
			username?: string;
			issuedAt?: string;
		};
		return session.username === getEnvString(env, 'ADMIN_USERNAME');
	} catch {
		return false;
	}
}

async function sign(payload: string, env?: RuntimeEnv): Promise<string> {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(getEnvString(env, 'ADMIN_SESSION_SECRET')),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	);
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
	return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

function safeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;

	let result = 0;
	for (let i = 0; i < a.length; i += 1) {
		result |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return result === 0;
}
