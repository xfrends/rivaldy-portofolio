globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent } from '../../chunks/astro/server_C894EArb.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_BHIsIH7R.mjs';
import { $ as $$AdminHeader, a as $$AdminAlerts, b as $$AdminNav } from '../../chunks/AdminNav_HM-P2NB3.mjs';
import { w as withBase } from '../../chunks/urls_Bz0TJc3Q.mjs';
import { i as isAdminAuthenticated } from '../../chunks/adminAuth_DcI6vYvm.mjs';
import { g as getRuntimeEnv } from '../../chunks/cloudflare_Bbc2K49a.mjs';
import { g as getSiteContent } from '../../chunks/siteCms_CeSbKqhp.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$PricelistForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PricelistForm;
  const { packages } = Astro2.props;
  const maxPackages = 8;
  const rows = [
    ...packages,
    ...Array.from({ length: Math.max(0, maxPackages - packages.length) }, (_, index) => ({
      id: "",
      name: "",
      price: "",
      features: [],
      popular: false,
      enabled: index === 0 && packages.length === 0
    }))
  ].slice(0, maxPackages);
  return renderTemplate`${maybeRenderHead()}<form${addAttribute(withBase("api/admin/pricelist"), "action")} method="post" class="space-y-5"> <div> <h2 class="text-2xl font-semibold">Pricelist</h2> <p class="text-sm text-zinc-500">Edit paket yang tampil di section pricelist halaman depan.</p> </div> <div class="space-y-4"> ${rows.map((pkg, index) => renderTemplate`<section class="rounded-md border border-zinc-200 p-4"> <input type="hidden" name="indexes"${addAttribute(String(index), "value")}> <input type="hidden"${addAttribute(`id-${index}`, "name")}${addAttribute(pkg.id, "value")}> <div class="mb-4 flex flex-wrap items-center justify-between gap-3"> <h3 class="text-lg font-semibold">${pkg.name || `Package ${index + 1}`}</h3> <div class="flex flex-wrap gap-3"> <label class="flex items-center gap-2 text-sm text-zinc-700"> <input${addAttribute(`enabled-${index}`, "name")} type="checkbox"${addAttribute(pkg.enabled, "checked")} class="accent-zinc-950">
Show
</label> <label class="flex items-center gap-2 text-sm text-zinc-700"> <input${addAttribute(`popular-${index}`, "name")} type="checkbox"${addAttribute(pkg.popular, "checked")} class="accent-zinc-950">
Popular
</label> </div> </div> <div class="grid gap-4 md:grid-cols-2"> <label class="block"> <span class="text-sm font-medium text-zinc-800">Package Name</span> <input${addAttribute(`name-${index}`, "name")} type="text"${addAttribute(pkg.name, "value")} class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> <label class="block"> <span class="text-sm font-medium text-zinc-800">Price</span> <input${addAttribute(`price-${index}`, "name")} type="text"${addAttribute(pkg.price, "value")} placeholder="275K" class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> </div> <label class="mt-4 block"> <span class="text-sm font-medium text-zinc-800">Features</span> <textarea${addAttribute(`features-${index}`, "name")} rows="5" placeholder="Tulis satu fitur per baris" class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900">${pkg.features.join("\n")}</textarea> </label> </section>`)} </div> <div class="flex justify-end"> <button type="submit" class="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
Save Pricelist
</button> </div> </form>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/admin/PricelistForm.astro", void 0);

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
</p>`} ${renderComponent($$result2, "PricelistForm", $$PricelistForm, { "packages": content.pricelist })} </main> </div> </div> </section> ` })}`;
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
