globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as getEnvString } from './cloudflare_Bbc2K49a.mjs';

const cookieName = "rivaldy_admin_session";
function hasAdminConfig(env) {
  return Boolean(
    getEnvString(env, "ADMIN_USERNAME") && getEnvString(env, "ADMIN_PASSWORD") && getEnvString(env, "ADMIN_SESSION_SECRET")
  );
}
function validateAdminCredentials(username, password, env) {
  return safeEqual(username, getEnvString(env, "ADMIN_USERNAME")) && safeEqual(password, getEnvString(env, "ADMIN_PASSWORD"));
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
    return session.username === getEnvString(env, "ADMIN_USERNAME");
  } catch {
    return false;
  }
}
async function sign(payload, env) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getEnvString(env, "ADMIN_SESSION_SECRET")),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export { clearAdminSession as a, createAdminSession as c, hasAdminConfig as h, isAdminAuthenticated as i, setAdminSession as s, validateAdminCredentials as v };
