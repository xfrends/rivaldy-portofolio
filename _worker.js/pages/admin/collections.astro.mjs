globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_C894EArb.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_C2YXzli1.mjs';
import { $ as $$AdminHeader, a as $$AdminAlerts, b as $$AdminNav } from '../../chunks/AdminNav_BX7kbxZT.mjs';
import { i as isAdminAuthenticated } from '../../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getRuntimeEnv } from '../../chunks/cloudflare_Dxf-Pucn.mjs';
import { g as getAdminGalleryState } from '../../chunks/galleryCms_BqZ0DBxM.mjs';
import { w as withBase } from '../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const runtimeEnv = getRuntimeEnv(Astro2.locals);
  if (!await isAdminAuthenticated(Astro2.cookies, runtimeEnv)) return Astro2.redirect(withBase("admin?error=session"));
  const state = await getAdminGalleryState(runtimeEnv);
  const error = Astro2.url.searchParams.get("error");
  const success = Astro2.url.searchParams.get("success");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-zinc-50 px-4 py-20 md:px-6"> <div class="mx-auto max-w-7xl"> ${renderComponent($$result2, "AdminHeader", $$AdminHeader, {})} ${renderComponent($$result2, "AdminAlerts", $$AdminAlerts, { "error": error, "success": success })} <div class="grid gap-6 lg:grid-cols-[220px_1fr]"> ${renderComponent($$result2, "AdminNav", $$AdminNav, { "active": "collections" })} <main class="rounded-md border border-zinc-200 bg-white shadow-sm"> <div class="flex flex-col gap-3 border-b border-zinc-200 px-5 py-4 md:flex-row md:items-center md:justify-between"> <div> <h2 class="text-2xl font-semibold">Collections</h2> <p class="text-sm text-zinc-500">${state.collections.length} total collections</p> </div> <a${addAttribute(withBase("admin/collections/create"), "href")} class="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">
Create Collection
</a> </div> <div class="divide-y divide-zinc-200"> ${state.collections.map((collection) => renderTemplate`<div class="grid gap-3 p-4 md:grid-cols-[1fr_140px_120px] md:items-center"> <div> <p class="font-semibold text-zinc-900">${collection.name}</p> <p class="text-sm text-zinc-500">/${collection.id}</p> </div> <p class="text-sm text-zinc-600">${collection.postCount} posts</p> <a${addAttribute(withBase(`admin/collections/${collection.id}/edit`), "href")} class="rounded-md border border-zinc-300 px-4 py-2 text-center text-sm font-medium text-zinc-800">
Edit
</a> </div>`)} </div> </main> </div> </div> </section> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/collections/index.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/collections/index.astro";
const $$url = "/admin/collections";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
