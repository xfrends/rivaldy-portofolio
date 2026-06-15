globalThis.process ??= {}; globalThis.process.env ??= {};
import { i as isAdminAuthenticated } from '../../../chunks/adminAuth_B8QQQr4y.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Bbc2K49a.mjs';
import { c as createCollection, u as updateCollection, d as deleteCollection } from '../../../chunks/galleryCms_BqZ0DBxM.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect, locals }) => {
  const adminPath = withBase("admin/collections");
  const runtimeEnv = getRuntimeEnv(locals);
  if (!await isAdminAuthenticated(cookies, runtimeEnv)) {
    return redirect(`${withBase("admin")}?error=session`);
  }
  const form = await request.formData();
  const action = String(form.getAll("action").at(-1) || "");
  try {
    if (action === "create") {
      await createCollection({
        id: String(form.get("id") || ""),
        name: String(form.get("name") || ""),
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=collection-created`);
    }
    if (action === "update") {
      await updateCollection({
        originalId: String(form.get("originalId") || ""),
        id: String(form.get("id") || ""),
        name: String(form.get("name") || ""),
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=collection-updated`);
    }
    if (action === "delete") {
      await deleteCollection({
        id: String(form.get("id") || ""),
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=collection-deleted`);
    }
    throw new Error("Action tidak dikenal.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Collection gagal diproses.";
    return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
