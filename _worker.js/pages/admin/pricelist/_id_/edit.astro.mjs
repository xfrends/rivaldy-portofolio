globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_DBcCZzNC.mjs';
import { $ as $$MainLayout } from '../../../../chunks/MainLayout_ed7hj2LY.mjs';
import { $ as $$AdminHeader, a as $$AdminAlerts, b as $$AdminNav } from '../../../../chunks/AdminNav_CBzmzen8.mjs';
import { $ as $$PricelistForm } from '../../../../chunks/PricelistForm_Bh5rWhje.mjs';
import { i as isAdminAuthenticated } from '../../../../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getRuntimeEnv } from '../../../../chunks/cloudflare_Dxf-Pucn.mjs';
import { a as getPricelistPackageById } from '../../../../chunks/siteCms_DgJO4Dqu.mjs';
import { w as withBase } from '../../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const runtimeEnv = getRuntimeEnv(Astro2.locals);
  if (!await isAdminAuthenticated(Astro2.cookies, runtimeEnv)) return Astro2.redirect(withBase("admin?error=session"));
  const pkg = await getPricelistPackageById(String(Astro2.params.id || ""), runtimeEnv);
  if (!pkg) return Astro2.redirect(withBase("admin/pricelist?error=Paket pricelist tidak ditemukan."));
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-zinc-50 px-4 py-20 md:px-6"> <div class="mx-auto max-w-7xl"> ${renderComponent($$result2, "AdminHeader", $$AdminHeader, {})} ${renderComponent($$result2, "AdminAlerts", $$AdminAlerts, { "error": Astro2.url.searchParams.get("error"), "success": null })} <div class="grid gap-6 lg:grid-cols-[220px_1fr]"> ${renderComponent($$result2, "AdminNav", $$AdminNav, { "active": "pricelist" })} <main class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <h2 class="mb-5 text-2xl font-semibold">Edit Pricelist Package</h2> ${renderComponent($$result2, "PricelistForm", $$PricelistForm, { "mode": "update", "pkg": pkg })} </main> </div> </div> </section> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/pricelist/[id]/edit.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/pricelist/[id]/edit.astro";
const $$url = "/admin/pricelist/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Edit,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
