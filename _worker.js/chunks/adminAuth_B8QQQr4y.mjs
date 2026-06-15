globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as getEnvString } from './cloudflare_Bbc2K49a.mjs';

const cookieName = "rivaldy_admin_session";
const defaultAdminUsername = "admin";
function hasAdminConfig(env) {
  return Boolean(getAdminPassword(env));
}
function validateAdminCredentials(username, password, env) {
  return safeEqual(username.trim(), getAdminUsername(env)) && safeEqual(password.trim(), getAdminPassword(env));
}
async function createAdminSession(username, env) {
  const issuedAt = Date.now().toString();
  const payload = btoa(JSON.stringify({ username, issuedAt }));
  const signature = await sign(payload, env);
  return `${payload}.${signature}`;
}
function setAdminSession(cookies, token) {
  cookies.set(cookieName, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 7
  });
}
function clearAdminSession(cookies) {
  cookies.delete(cookieName, { path: "/" });
}
async function isAdminAuthenticated(cookies, env) {
  const token = cookies.get(cookieName)?.value;
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, await sign(payload, env))) return false;
  try {
    const session = JSON.parse(atob(payload));
    return session.username === getAdminUsername(env);
  } catch {
    return false;
  }
}
async function sign(payload, env) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret(env)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}
function getAdminUsername(env) {
  return getEnvString(env, "ADMIN_USERNAME").trim() || defaultAdminUsername;
}
function getAdminPassword(env) {
  return getEnvString(env, "ADMIN_PASSWORD").trim();
}
function getSessionSecret(env) {
  return getEnvString(env, "ADMIN_SESSION_SECRET").trim() || getAdminPassword(env);
}
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export { clearAdminSession as a, createAdminSession as c, getAdminUsername as g, hasAdminConfig as h, isAdminAuthenticated as i, setAdminSession as s, validateAdminCredentials as v };
