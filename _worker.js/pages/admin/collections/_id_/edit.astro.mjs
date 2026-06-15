globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_C894EArb.mjs';
import { $ as $$MainLayout } from '../../../../chunks/MainLayout_CK3zHkNE.mjs';
import { $ as $$AdminHeader, a as $$AdminAlerts, b as $$AdminNav } from '../../../../chunks/AdminNav_D6x2hMDL.mjs';
import { $ as $$CollectionForm } from '../../../../chunks/CollectionForm_BZB4FZvC.mjs';
import { i as isAdminAuthenticated } from '../../../../chunks/adminAuth_DcI6vYvm.mjs';
import { g as getRuntimeEnv } from '../../../../chunks/cloudflare_Bbc2K49a.mjs';
import { g as getAdminGalleryState } from '../../../../chunks/galleryCms_BqZ0DBxM.mjs';
import { w as withBase } from '../../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const runtimeEnv = getRuntimeEnv(Astro2.locals);
  if (!await isAdminAuthenticated(Astro2.cookies, runtimeEnv)) return Astro2.redirect(withBase("admin?error=session"));
  const collection = (await getAdminGalleryState(runtimeEnv)).collections.find((item) => item.id === Astro2.params.id);
  if (!collection) return Astro2.redirect(withBase("admin/collections?error=Collection tidak ditemukan."));
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-zinc-50 px-4 py-20 md:px-6"> <div class="mx-auto max-w-7xl"> ${renderComponent($$result2, "AdminHeader", $$AdminHeader, {})} ${renderComponent($$result2, "AdminAlerts", $$AdminAlerts, { "error": Astro2.url.searchParams.get("error"), "success": null })} <div class="grid gap-6 lg:grid-cols-[220px_1fr]"> ${renderComponent($$result2, "AdminNav", $$AdminNav, { "active": "collections" })} <main class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <h2 class="mb-5 text-2xl font-semibold">Edit Collection</h2> ${renderComponent($$result2, "CollectionForm", $$CollectionForm, { "mode": "update", "collection": collection })} </main> </div> </div> </section> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/collections/[id]/edit.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/collections/[id]/edit.astro";
const $$url = "/admin/collections/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Edit,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
