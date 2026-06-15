globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, m as maybeRenderHead, b as renderTemplate, r as renderComponent, d as addAttribute, F as Fragment } from '../chunks/astro/server_DBcCZzNC.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CivlJigz.mjs';
import { a as $$AdminAlerts, $ as $$AdminHeader, b as $$AdminNav } from '../chunks/AdminNav_CBzmzen8.mjs';
import { i as isAdminAuthenticated, h as hasAdminConfig, g as getAdminUsername } from '../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getAnalyticsSnapshot, a as getAnalyticsDateRange } from '../chunks/analytics_BHCbq6dd.mjs';
import { g as getRuntimeEnv } from '../chunks/cloudflare_Dxf-Pucn.mjs';
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
  const adminUsername = getAdminUsername(runtimeEnv);
  const state = isAuthenticated ? await getAdminGalleryState(runtimeEnv) : void 0;
  const analytics = isAuthenticated && state ? await getAnalyticsSnapshot(runtimeEnv, state.collections, state.posts) : void 0;
  const dateFilter = Astro2.url.searchParams.get("dateFilter") || "all";
  const startDateStr = Astro2.url.searchParams.get("start") || "";
  const endDateStr = Astro2.url.searchParams.get("end") || "";
  let filteredTotalViews = analytics?.totalViews || 0;
  if (isAuthenticated && dateFilter !== "all" && runtimeEnv?.ANALYTICS) {
    const endObj = /* @__PURE__ */ new Date();
    let startObj = /* @__PURE__ */ new Date();
    let validRange = true;
    if (dateFilter === "today") ; else if (dateFilter === "week") {
      startObj.setDate(endObj.getDate() - 7);
    } else if (dateFilter === "month") {
      startObj.setDate(endObj.getDate() - 30);
    } else if (dateFilter === "custom" && startDateStr && endDateStr) {
      startObj = new Date(startDateStr);
      const endParsed = new Date(endDateStr);
      if (!isNaN(endParsed.getTime()) && !isNaN(startObj.getTime())) {
        endObj.setTime(endParsed.getTime());
      } else {
        validRange = false;
      }
    } else {
      validRange = false;
    }
    if (validRange) {
      const startStr = startObj.toISOString().split("T")[0];
      const endStr = endObj.toISOString().split("T")[0];
      filteredTotalViews = await getAnalyticsDateRange(runtimeEnv, startStr, endStr);
    }
  }
  const error = Astro2.url.searchParams.get("error");
  const success = Astro2.url.searchParams.get("success");
  const formatter = new Intl.NumberFormat("id-ID");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-zinc-50 px-4 py-20 md:px-6"> <div class="mx-auto max-w-7xl"> ${!isAuthenticated ? renderTemplate`<form${addAttribute(withBase("api/admin/login"), "action")} method="post" class="mx-auto mt-12 max-w-xl space-y-5 rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <h1 class="text-3xl font-bold">Admin Login</h1> ${!hasConfig && renderTemplate`<p class="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
Tambahkan ADMIN_PASSWORD di environment variable sebelum login.
</p>`} ${renderComponent($$result2, "AdminAlerts", $$AdminAlerts, { "error": error === "login" ? "Username atau password salah." : error, "success": success })} <label class="block"> <span class="text-sm font-medium text-zinc-800">Username</span> <input name="username" type="text"${addAttribute(adminUsername, "value")} autocomplete="username" required class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> <label class="block"> <span class="text-sm font-medium text-zinc-800">Password</span> <input name="password" type="password" autocomplete="current-password" required class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> <button type="submit" class="w-full rounded-md bg-zinc-950 px-4 py-3 text-base font-semibold text-white">Login</button> </form>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "AdminHeader", $$AdminHeader, {})} ${renderComponent($$result3, "AdminAlerts", $$AdminAlerts, { "error": error, "success": success })} <div class="grid gap-6 lg:grid-cols-[220px_1fr]"> ${renderComponent($$result3, "AdminNav", $$AdminNav, { "active": "dashboard" })} <main class="space-y-6"> ${state && !state.hasDb && renderTemplate`<p class="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
D1 binding DB belum tersedia. CRUD CMS membutuhkan binding ini.
</p>`} ${analytics && !analytics.hasAnalytics && renderTemplate`<p class="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
KV binding ANALYTICS belum tersedia atau belum bisa dibaca.
</p>`} ${state && analytics && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2"> <h2 class="text-lg font-semibold">Dashboard Overview</h2> <div class="flex flex-wrap items-center gap-3"> <form method="get" class="flex flex-wrap items-center gap-3"${addAttribute(`{ filter: '${dateFilter}' }`, "x-data")}> <select name="dateFilter" x-model="filter" class="rounded-md border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-900 bg-white" onchange="if(this.value !== 'custom') this.form.submit()"> <option value="all">All Time</option> <option value="today">Today</option> <option value="week">This Week</option> <option value="month">This Month</option> <option value="custom">Custom Range</option> </select> <div x-show="filter === 'custom'" class="flex items-center gap-2" style="display: none;"> <input type="date" name="start"${addAttribute(startDateStr, "value")} class="rounded-md border border-zinc-300 px-2 py-1 text-sm outline-none focus:border-zinc-900"> <span class="text-zinc-500 text-sm">to</span> <input type="date" name="end"${addAttribute(endDateStr, "value")} class="rounded-md border border-zinc-300 px-2 py-1 text-sm outline-none focus:border-zinc-900"> <button type="submit" class="rounded-md bg-zinc-900 px-3 py-1 text-sm text-white hover:bg-zinc-800">Apply</button> </div> </form> <button @click="$dispatch('open-reset-modal')" class="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg>
Reset
</button> </div> </div> <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> <div class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm relative overflow-hidden"> <p class="text-sm text-zinc-500">Website Visitors <span class="text-xs text-zinc-400">(${dateFilter})</span></p> <p class="mt-3 text-3xl font-semibold">${formatter.format(filteredTotalViews)}</p> </div> <div class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <p class="text-sm text-zinc-500">Collections</p> <p class="mt-3 text-3xl font-semibold">${formatter.format(state.collections.length)}</p> </div> <div class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <p class="text-sm text-zinc-500">CMS posts</p> <p class="mt-3 text-3xl font-semibold">${formatter.format(state.posts.length)}</p> </div> <div class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> <p class="text-sm text-zinc-500">Gallery items</p> <p class="mt-3 text-3xl font-semibold">${formatter.format(state.imageCount)}</p> </div> </div> <div class="grid gap-6 xl:grid-cols-2"> ${renderComponent($$result4, "MetricPanel", $$MetricPanel, { "title": "Views per page", "metrics": analytics.pageViews, "empty": "Belum ada page view." })} ${renderComponent($$result4, "MetricPanel", $$MetricPanel, { "title": "Views per collection", "metrics": analytics.collectionViews, "empty": "Belum ada collection view." })} ${renderComponent($$result4, "MetricPanel", $$MetricPanel, { "title": "Views per post", "metrics": analytics.postViews, "empty": "Belum ada post view." })} </div> ` })}`} </main> </div>  <div x-data="{ open: false, password: '', loading: false }" @open-reset-modal.window="open = true" x-show="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" style="display: none;"> <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6" @click.away="if(!loading) open = false"> <h3 class="text-xl font-bold text-red-600 mb-2">Peringatan!</h3> <p class="text-zinc-600 mb-4 text-sm">
Anda yakin ingin menghapus <strong>SEMUA</strong> data analytics? Aksi ini bersifat permanen dan tidak dapat dibatalkan.
</p> <label class="block mb-4"> <span class="text-sm font-medium text-zinc-800">Masukkan Password Admin</span> <input x-model="password" type="password" placeholder="Password..." class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-2 text-base outline-none focus:border-red-500"> </label> <div class="flex justify-end gap-3 mt-6"> <button @click="open = false; password = ''" :disabled="loading" class="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors">
Batal
</button> <button @click="async () => {
											if(!password) { alert('Password wajib diisi!'); return; }
											loading = true;
											try {
												const response = await fetch('/api/admin/reset-analytics', {
													method: 'POST',
													headers: { 'Content-Type': 'application/json' },
													body: JSON.stringify({ password })
												});
												const result = await response.json();
												if (result.success) {
													alert(result.message);
													window.location.reload();
												} else {
													alert('Gagal: ' + result.error);
													loading = false;
													password = '';
												}
											} catch(e) {
												alert('Terjadi kesalahan: ' + e.message);
												loading = false;
											}
										}" :disabled="loading" class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed" x-text="loading ? 'Resetting...' : 'Konfirmasi Reset'"></button> </div> </div> </div> ` })}`} </div> </section> ` })}`;
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
