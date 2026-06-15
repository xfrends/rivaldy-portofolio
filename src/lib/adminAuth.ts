import type { AstroCookies } from 'astro';
import { getEnvString, type RuntimeEnv } from './cloudflare';

const cookieName = 'rivaldy_admin_session';
const defaultAdminUsername = 'admin';

export function hasAdminConfig(env?: RuntimeEnv): boolean {
	return Boolean(getAdminPassword(env));
}

export function validateAdminCredentials(
	username: string,
	password: string,
	env?: RuntimeEnv,
): boolean {
	return (
		safeEqual(username.trim(), getAdminUsername(env)) &&
		safeEqual(password.trim(), getAdminPassword(env))
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
		return session.username === getAdminUsername(env);
	} catch {
		return false;
	}
}

async function sign(payload: string, env?: RuntimeEnv): Promise<string> {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(getSessionSecret(env)),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	);
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
	return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export function getAdminUsername(env?: RuntimeEnv): string {
	return getEnvString(env, 'ADMIN_USERNAME').trim() || defaultAdminUsername;
}

function getAdminPassword(env?: RuntimeEnv): string {
	return getEnvString(env, 'ADMIN_PASSWORD').trim();
}

function getSessionSecret(env?: RuntimeEnv): string {
	return getEnvString(env, 'ADMIN_SESSION_SECRET').trim() || getAdminPassword(env);
}

function safeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;

	let result = 0;
	for (let i = 0; i < a.length; i += 1) {
		result |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return result === 0;
}
