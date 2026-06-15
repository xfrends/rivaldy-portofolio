globalThis.process ??= {}; globalThis.process.env ??= {};
import { i as isAdminAuthenticated } from '../../../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Dxf-Pucn.mjs';
import { u as updateSiteContent } from '../../../chunks/siteCms_B1R7PNz1.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect, locals }) => {
  const adminPath = withBase("admin/content");
  const runtimeEnv = getRuntimeEnv(locals);
  if (!await isAdminAuthenticated(cookies, runtimeEnv)) {
    return redirect(`${withBase("admin")}?error=session`);
  }
  const form = await request.formData();
  const heroImageValue = form.get("heroImage");
  const aboutImageValue = form.get("aboutImage");
  try {
    await updateSiteContent({
      heroTitle: String(form.get("heroTitle") || ""),
      heroTagline: String(form.get("heroTagline") || ""),
      heroImage: heroImageValue instanceof File ? heroImageValue : null,
      aboutImage: aboutImageValue instanceof File ? aboutImageValue : null,
      aboutText: String(form.get("aboutText") || ""),
      env: runtimeEnv
    });
    return redirect(`${adminPath}?success=content-updated`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Content gagal diproses.";
    return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
