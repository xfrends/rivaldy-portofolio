globalThis.process ??= {}; globalThis.process.env ??= {};
import { i as isAdminAuthenticated } from '../../../chunks/adminAuth_B8QQQr4y.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Bbc2K49a.mjs';
import { f as uploadGalleryImages } from '../../../chunks/galleryCms_BqZ0DBxM.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect, locals }) => {
  const adminPath = withBase("admin");
  const runtimeEnv = getRuntimeEnv(locals);
  if (!await isAdminAuthenticated(cookies, runtimeEnv)) {
    return redirect(`${adminPath}?error=session`);
  }
  const form = await request.formData();
  const files = form.getAll("photos").filter((item) => item instanceof File);
  try {
    const count = await uploadGalleryImages({
      files,
      collectionId: String(form.get("collectionId") || ""),
      collectionName: String(form.get("collectionName") || ""),
      title: String(form.get("title") || ""),
      description: String(form.get("description") || ""),
      featured: form.get("featured") === "on",
      env: runtimeEnv
    });
    return redirect(`${adminPath}?uploaded=${count}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload gagal.";
    return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
