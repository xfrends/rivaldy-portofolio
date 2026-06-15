globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DBcCZzNC.mjs';
import { $ as $$MainLayout } from '../../../chunks/MainLayout_CivlJigz.mjs';
import { $ as $$AdminHeader, a as $$AdminAlerts, b as $$AdminNav } from '../../../chunks/AdminNav_CBzmzen8.mjs';
import { $ as $$PostForm } from '../../../chunks/PostForm_ChBMEpMp.mjs';
import { i as isAdminAuthenticated } from '../../../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Dxf-Pucn.mjs';
import { g as getAdminGalleryState } from '../../../chunks/galleryCms_BqZ0DBxM.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Create = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Create;
  const runtimeEnv = getRuntimeEnv(Astro2.locals);
  if (!await isAdminAuthenticated(Astro2.cookies, runtimeEnv)) return Astro2.redirect(withBase("admin?error=session"));
  const state = await getAdminGalleryState(runtimeEnv);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-zinc-50 px-4 py-20 md:px-6"> <div class="mx-auto max-w-7xl"> ${renderComponent($$result2, "AdminHeader", $$AdminHeader, {})} ${renderComponent($$result2, "AdminAlerts", $$AdminAlerts, { "error": Astro2.url.searchParams.get("error"), "success": null })} <div class="grid gap-6 lg:grid-cols-[220px_1fr]"> ${renderComponent($$result2, "AdminNav", $$AdminNav, { "active": "posts" })} <main class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <h2 class="mb-5 text-2xl font-semibold">Create Post</h2> ${renderComponent($$result2, "PostForm", $$PostForm, { "mode": "create", "collections": state.collections })} </main> </div> </div> </section> ` })} ${renderScript($$result, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/posts/create.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/posts/create.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/posts/create.astro";
const $$url = "/admin/posts/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Create,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
