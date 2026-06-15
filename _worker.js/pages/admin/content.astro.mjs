globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent, e as renderScript } from '../../chunks/astro/server_DBcCZzNC.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CivlJigz.mjs';
import { $ as $$AdminHeader, a as $$AdminAlerts, b as $$AdminNav } from '../../chunks/AdminNav_CBzmzen8.mjs';
import { w as withBase } from '../../chunks/urls_Bz0TJc3Q.mjs';
import { i as isAdminAuthenticated } from '../../chunks/adminAuth_BPmTUUIX.mjs';
import { g as getRuntimeEnv } from '../../chunks/cloudflare_Dxf-Pucn.mjs';
import { g as getSiteContent } from '../../chunks/siteCms_DgJO4Dqu.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$ContentForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ContentForm;
  const { content } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form${addAttribute(withBase("api/admin/content"), "action")} method="post" enctype="multipart/form-data" data-optimize-images class="space-y-8"> <section class="space-y-5"> <div> <h2 class="text-2xl font-semibold">Hero</h2> <p class="text-sm text-zinc-500">Konten utama di halaman depan.</p> </div> <div class="grid gap-4 md:grid-cols-2"> <label class="block"> <span class="text-sm font-medium text-zinc-800">Title</span> <input name="heroTitle" type="text"${addAttribute(content.heroTitle, "value")} required class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> <label class="block"> <span class="text-sm font-medium text-zinc-800">Hero Image</span> <input name="heroImage" type="file" accept="image/jpeg,image/png,image/webp" class="mt-2 w-full rounded-md border border-dashed border-zinc-300 px-4 py-5 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"> </label> </div> <label class="block"> <span class="text-sm font-medium text-zinc-800">Tagline</span> <textarea name="heroTagline" rows="4" required class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900">${content.heroTagline}</textarea> </label> <div class="max-w-md rounded-md border border-zinc-200 p-3"> <img${addAttribute(withBase(content.heroImage), "src")} alt="Current hero" class="aspect-video w-full rounded object-cover"> <p class="mt-2 text-xs text-zinc-500">Current hero image</p> </div> </section> <section class="space-y-5 border-t border-zinc-200 pt-8"> <div> <h2 class="text-2xl font-semibold">About</h2> <p class="text-sm text-zinc-500">Foto dan teks halaman About.</p> </div> <div class="grid gap-4 md:grid-cols-2"> <label class="block"> <span class="text-sm font-medium text-zinc-800">About Image</span> <input name="aboutImage" type="file" accept="image/jpeg,image/png,image/webp" class="mt-2 w-full rounded-md border border-dashed border-zinc-300 px-4 py-5 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"> </label> <div class="rounded-md border border-zinc-200 p-3"> <img${addAttribute(withBase(content.aboutImage), "src")} alt="Current about" class="aspect-square w-full rounded object-cover"> <p class="mt-2 text-xs text-zinc-500">Current about image</p> </div> </div> <label class="block"> <span class="text-sm font-medium text-zinc-800">About Text</span> <textarea name="aboutText" rows="12" required class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900">${content.aboutText}</textarea> </label> </section> <div class="flex justify-end border-t border-zinc-200 pt-5"> <button type="submit" class="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
Save Content
</button> </div> </form>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/admin/ContentForm.astro", void 0);

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Content = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Content;
  const runtimeEnv = getRuntimeEnv(Astro2.locals);
  if (!await isAdminAuthenticated(Astro2.cookies, runtimeEnv)) return Astro2.redirect(withBase("admin?error=session"));
  const content = await getSiteContent(runtimeEnv);
  const error = Astro2.url.searchParams.get("error");
  const success = Astro2.url.searchParams.get("success");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-zinc-50 px-4 py-20 md:px-6"> <div class="mx-auto max-w-7xl"> ${renderComponent($$result2, "AdminHeader", $$AdminHeader, {})} ${renderComponent($$result2, "AdminAlerts", $$AdminAlerts, { "error": error, "success": success })} <div class="grid gap-6 lg:grid-cols-[220px_1fr]"> ${renderComponent($$result2, "AdminNav", $$AdminNav, { "active": "content" })} <main class="rounded-md border border-zinc-200 bg-white p-5 shadow-sm"> ${!content.hasDb && renderTemplate`<p class="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
D1 binding DB belum tersedia. Content CMS membutuhkan binding ini.
</p>`} ${!content.hasBucket && renderTemplate`<p class="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
R2 binding GALLERY_BUCKET belum tersedia. Upload gambar membutuhkan binding ini.
</p>`} ${renderComponent($$result2, "ContentForm", $$ContentForm, { "content": content })} </main> </div> </div> </section> ` })} ${renderScript($$result, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/content.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/content.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/admin/content.astro";
const $$url = "/admin/content";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Content,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
