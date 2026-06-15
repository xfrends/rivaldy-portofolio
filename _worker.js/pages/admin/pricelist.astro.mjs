globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DBcCZzNC.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_BU8nfYAa.mjs';
import { $ as $$AdminHeader, a as $$AdminAlerts, b as $$AdminNav } from '../../chunks/AdminNav_CBzmzen8.mjs';
import { i as isAdminAuthenticated } from '../../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getRuntimeEnv } from '../../chunks/cloudflare_Dxf-Pucn.mjs';
import { g as getSiteContent } from '../../chunks/siteCms_DgJO4Dqu.mjs';
import { w as withBase } from '../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Pricelist = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pricelist;
  const runtimeEnv = getRuntimeEnv(Astro2.locals);
  if (!await isAdminAuthenticated(Astro2.cookies, runtimeEnv)) return Astro2.redirect(withBase("admin?error=session"));
  const content = await getSiteContent(runtimeEnv);
  const error = Astro2.url.searchParams.get("error");
  const success = Astro2.url.searchParams.get("success");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-zinc-50 px-4 py-20 md:px-6"> <div class="mx-auto max-w-7xl"> ${renderComponent($$result2, "AdminHeader", $$AdminHeader, {})} ${renderComponent($$result2, "AdminAlerts", $$AdminAlerts, { "error": error, "success": success })} <div class="grid gap-6 lg:grid-cols-[220px_1fr]"> ${renderComponent($$result2, "AdminNav", $$AdminNav, { "active": "pricelist" })} <main class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> ${!content.hasDb && renderTemplate`<p class="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
D1 binding DB belum tersedia. Pricelist CMS membutuhkan binding ini.
</p>`} <div class="flex flex-col gap-3 border-b border-zinc-200 pb-4 md:flex-row md:items-center md:justify-between"> <div> <h2 class="text-2xl font-semibold">Pricelist</h2> <p class="text-sm text-zinc-500">${content.pricelist.length} packages</p> </div> <a${addAttribute(withBase("admin/pricelist/create"), "href")} class="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">
Create Package
</a> </div> <div class="divide-y divide-zinc-200"> ${content.pricelist.length === 0 ? renderTemplate`<p class="py-8 text-sm text-zinc-500">Belum ada paket pricelist.</p>` : content.pricelist.map((pkg) => renderTemplate`<div class="grid gap-3 py-4 md:grid-cols-[1fr_100px_120px_120px] md:items-center"> <div class="min-w-0"> <div class="flex flex-wrap items-center gap-2"> <p class="font-semibold text-zinc-900">${pkg.name}</p> ${pkg.popular && renderTemplate`<span class="rounded bg-zinc-950 px-2 py-0.5 text-xs font-semibold text-white">Popular</span>`} ${!pkg.enabled && renderTemplate`<span class="rounded bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600">Hidden</span>`} </div> <p class="text-sm text-zinc-500">/${pkg.id}</p> <p class="truncate text-sm text-zinc-500">${pkg.features.length} features</p> </div> <p class="text-sm font-semibold text-zinc-900">${pkg.price}</p> <p class="text-sm text-zinc-500">Order ${pkg.sortOrder}</p> <a${addAttribute(withBase(`admin/pricelist/${pkg.id}/edit`), "href")} class="rounded-md border border-zinc-300 px-4 py-2 text-center text-sm font-medium text-zinc-800">
Edit
</a> </div>`)} </div> </main> </div> </div> </section> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/pricelist.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/pricelist.astro";
const $$url = "/admin/pricelist";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Pricelist,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
