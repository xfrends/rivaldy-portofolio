globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as hasAdminConfig, v as validateAdminCredentials, s as setAdminSession, c as createAdminSession } from '../../../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Dxf-Pucn.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect, locals }) => {
  const adminPath = withBase("admin");
  const runtimeEnv = getRuntimeEnv(locals);
  const form = await request.formData();
  const username = String(form.get("username") || "");
  const password = String(form.get("password") || "");
  if (!hasAdminConfig(runtimeEnv)) {
    return redirect(`${adminPath}?error=config`);
  }
  if (!validateAdminCredentials(username, password, runtimeEnv)) {
    return redirect(`${adminPath}?error=login`);
  }
  setAdminSession(cookies, await createAdminSession(username, runtimeEnv));
  return redirect(adminPath);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
