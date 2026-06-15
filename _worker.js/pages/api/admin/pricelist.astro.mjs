globalThis.process ??= {}; globalThis.process.env ??= {};
import { i as isAdminAuthenticated } from '../../../chunks/adminAuth_DcI6vYvm.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Bbc2K49a.mjs';
import { a as updatePricelist } from '../../../chunks/siteCms_CeSbKqhp.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect, locals }) => {
  const adminPath = withBase("admin/pricelist");
  const runtimeEnv = getRuntimeEnv(locals);
  if (!await isAdminAuthenticated(cookies, runtimeEnv)) {
    return redirect(`${withBase("admin")}?error=session`);
  }
  const form = await request.formData();
  try {
    await updatePricelist({
      packages: form.getAll("indexes").map((value) => {
        const index = String(value);
        const name = String(form.get(`name-${index}`) || "").trim();
        return {
          id: String(form.get(`id-${index}`) || name),
          name,
          price: String(form.get(`price-${index}`) || "").trim(),
          features: String(form.get(`features-${index}`) || "").split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean),
          popular: form.get(`popular-${index}`) === "on",
          enabled: form.get(`enabled-${index}`) === "on"
        };
      }),
      env: runtimeEnv
    });
    return redirect(`${adminPath}?success=pricelist-updated`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pricelist gagal diproses.";
    return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
