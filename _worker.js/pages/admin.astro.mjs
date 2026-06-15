globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, m as maybeRenderHead, b as renderTemplate, r as renderComponent, d as addAttribute, F as Fragment } from '../chunks/astro/server_C894EArb.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_Dlz4Tf9e.mjs';
import { a as $$AdminAlerts, $ as $$AdminHeader, b as $$AdminNav } from '../chunks/AdminNav_D6x2hMDL.mjs';
import { i as isAdminAuthenticated, h as hasAdminConfig } from '../chunks/adminAuth_DcI6vYvm.mjs';
import { g as getAnalyticsSnapshot } from '../chunks/analytics_B7nIbTL1.mjs';
import { g as getRuntimeEnv } from '../chunks/cloudflare_Bbc2K49a.mjs';
import { g as getAdminGalleryState } from '../chunks/galleryCms_BqZ0DBxM.mjs';
import { w as withBase } from '../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$MetricPanel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MetricPanel;
  const { title, metrics, empty } = Astro2.props;
  const formatter = new Intl.NumberFormat("id-ID");
  return renderTemplate`${maybeRenderHead()}<section class="rounded-md border border-zinc-200 bg-white shadow-sm"> <div class="border-b border-zinc-200 px-5 py-4"> <h2 class="text-xl font-semibold">${title}</h2> </div> <div class="divide-y divide-zinc-100"> ${metrics.length === 0 ? renderTemplate`<p class="px-5 py-6 text-sm text-zinc-500">${empty}</p>` : metrics.slice(0, 10).map((metric) => renderTemplate`<div class="flex items-center justify-between gap-4 px-5 py-3"> <p class="min-w-0 truncate text-sm font-medium text-zinc-800">${metric.label}</p> <p class="shrink-0 rounded-md bg-zinc-100 px-2 py-1 text-sm font-semibold text-zinc-900"> ${formatter.format(metric.count)} </p> </div>`)} </div> </section>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/admin/MetricPanel.astro", void 0);

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const runtimeEnv = getRuntimeEnv(Astro2.locals);
  const isAuthenticated = await isAdminAuthenticated(Astro2.cookies, runtimeEnv);
  const hasConfig = hasAdminConfig(runtimeEnv);
  const state = isAuthenticated ? await getAdminGalleryState(runtimeEnv) : void 0;
  const analytics = isAuthenticated && state ? await getAnalyticsSnapshot(runtimeEnv, state.collections, state.posts) : void 0;
  const error = Astro2.url.searchParams.get("error");
  const success = Astro2.url.searchParams.get("success");
  const formatter = new Intl.NumberFormat("id-ID");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-zinc-50 px-4 py-20 md:px-6"> <div class="mx-auto max-w-7xl"> ${!isAuthenticated ? renderTemplate`<form${addAttribute(withBase("api/admin/login"), "action")} method="post" class="mx-auto mt-12 max-w-xl space-y-5 rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <h1 class="text-3xl font-bold">Admin Login</h1> ${!hasConfig && renderTemplate`<p class="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
Tambahkan credential admin di file .env sebelum login.
</p>`} ${renderComponent($$result2, "AdminAlerts", $$AdminAlerts, { "error": error === "login" ? "Username atau password salah." : error, "success": success })} <label class="block"> <span class="text-sm font-medium text-zinc-800">Username</span> <input name="username" type="text" autocomplete="username" required class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> <label class="block"> <span class="text-sm font-medium text-zinc-800">Password</span> <input name="password" type="password" autocomplete="current-password" required class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> <button type="submit" class="w-full rounded-md bg-zinc-950 px-4 py-3 text-base font-semibold text-white">Login</button> </form>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "AdminHeader", $$AdminHeader, {})} ${renderComponent($$result3, "AdminAlerts", $$AdminAlerts, { "error": error, "success": success })} <div class="grid gap-6 lg:grid-cols-[220px_1fr]"> ${renderComponent($$result3, "AdminNav", $$AdminNav, { "active": "dashboard" })} <main class="space-y-6"> ${state && !state.hasDb && renderTemplate`<p class="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
D1 binding DB belum tersedia. CRUD CMS membutuhkan binding ini.
</p>`} ${analytics && !analytics.hasAnalytics && renderTemplate`<p class="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
KV binding ANALYTICS belum tersedia atau belum bisa dibaca.
</p>`} ${state && analytics && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> <div class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <p class="text-sm text-zinc-500">Total website views</p> <p class="mt-3 text-3xl font-semibold">${formatter.format(analytics.totalViews)}</p> </div> <div class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <p class="text-sm text-zinc-500">Collections</p> <p class="mt-3 text-3xl font-semibold">${formatter.format(state.collections.length)}</p> </div> <div class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <p class="text-sm text-zinc-500">CMS posts</p> <p class="mt-3 text-3xl font-semibold">${formatter.format(state.posts.length)}</p> </div> <div class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <p class="text-sm text-zinc-500">Gallery items</p> <p class="mt-3 text-3xl font-semibold">${formatter.format(state.imageCount)}</p> </div> </div> <div class="grid gap-6 xl:grid-cols-2"> ${renderComponent($$result4, "MetricPanel", $$MetricPanel, { "title": "Views per page", "metrics": analytics.pageViews, "empty": "Belum ada page view." })} ${renderComponent($$result4, "MetricPanel", $$MetricPanel, { "title": "Views per collection", "metrics": analytics.collectionViews, "empty": "Belum ada collection view." })} ${renderComponent($$result4, "MetricPanel", $$MetricPanel, { "title": "Views per post", "metrics": analytics.postViews, "empty": "Belum ada post view." })} </div> ` })}`} </main> </div> ` })}`} </div> </section> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/index.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
