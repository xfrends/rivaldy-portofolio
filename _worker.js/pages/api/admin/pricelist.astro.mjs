globalThis.process ??= {}; globalThis.process.env ??= {};
import { i as isAdminAuthenticated } from '../../../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Dxf-Pucn.mjs';
import { c as createPricelistPackage, b as updatePricelistPackage, d as deletePricelistPackage } from '../../../chunks/siteCms_DgJO4Dqu.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect, locals }) => {
  const adminPath = withBase("admin/pricelist");
  const runtimeEnv = getRuntimeEnv(locals);
  if (!await isAdminAuthenticated(cookies, runtimeEnv)) {
    return redirect(`${withBase("admin")}?error=session`);
  }
  const form = await request.formData();
  const action = String(form.getAll("action").at(-1) || "");
  try {
    if (action === "create") {
      await createPricelistPackage({
        ...pricelistInputFrom(form),
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=pricelist-created`);
    }
    if (action === "update") {
      await updatePricelistPackage({
        ...pricelistInputFrom(form),
        originalId: String(form.get("originalId") || ""),
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=pricelist-updated`);
    }
    if (action === "delete") {
      await deletePricelistPackage({
        id: String(form.get("originalId") || ""),
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=pricelist-deleted`);
    }
    throw new Error("Action tidak dikenal.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pricelist gagal diproses.";
    return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
  }
};
function pricelistInputFrom(form) {
  return {
    id: String(form.get("id") || ""),
    name: String(form.get("name") || ""),
    price: String(form.get("price") || ""),
    features: String(form.get("features") || "").split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean),
    popular: form.get("popular") === "on",
    enabled: form.get("enabled") === "on",
    sortOrder: Number(form.get("sortOrder") || 0)
  };
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
