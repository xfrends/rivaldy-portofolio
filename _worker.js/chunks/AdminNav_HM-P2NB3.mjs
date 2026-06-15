globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, m as maybeRenderHead, b as renderTemplate, d as addAttribute } from './astro/server_C894EArb.mjs';
import { w as withBase } from './urls_Bz0TJc3Q.mjs';

const $$Astro$1 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$AdminAlerts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AdminAlerts;
  const { error, success } = Astro2.props;
  const successText = {
    "collection-created": "Collection berhasil dibuat.",
    "collection-updated": "Collection berhasil diupdate.",
    "collection-deleted": "Collection berhasil dihapus.",
    "post-created": "Post berhasil dibuat.",
    "post-updated": "Post berhasil diupdate.",
    "post-deleted": "Post berhasil dihapus.",
    "content-updated": "Content website berhasil diupdate.",
    "pricelist-updated": "Pricelist berhasil diupdate."
  };
  return renderTemplate`${error && renderTemplate`${maybeRenderHead()}<div class="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">${error}</div>`}${success && successText[success] && renderTemplate`<div class="mb-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">${successText[success]}</div>`}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/admin/AdminAlerts.astro", void 0);

const $$AdminHeader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"> <div> <p class="text-sm uppercase tracking-[0.2em] text-zinc-500">Admin CMS</p> <h1 class="mt-2 text-4xl font-bold">Gallery Management</h1> </div> <form${addAttribute(withBase("api/admin/logout"), "action")} method="post"> <button type="submit" class="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm">
Logout
</button> </form> </div>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/admin/AdminHeader.astro", void 0);

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const $$AdminNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminNav;
  const { active } = Astro2.props;
  const items = [
    { id: "dashboard", label: "Dashboard", href: withBase("admin") },
    { id: "content", label: "Content", href: withBase("admin/content") },
    { id: "pricelist", label: "Pricelist", href: withBase("admin/pricelist") },
    { id: "collections", label: "Collections", href: withBase("admin/collections") },
    { id: "posts", label: "Posts", href: withBase("admin/posts") }
  ];
  return renderTemplate`${maybeRenderHead()}<aside class="rounded-md border border-zinc-200 bg-white p-2 shadow-sm lg:sticky lg:top-24 lg:self-start"> <nav class="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1"> ${items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`rounded-md px-3 py-3 text-center text-sm font-medium transition lg:text-left ${active === item.id ? "bg-zinc-950 text-white" : "text-zinc-700 hover:bg-zinc-100"}`, "class")}> ${item.label} </a>`)} </nav> </aside>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/admin/AdminNav.astro", void 0);

export { $$AdminHeader as $, $$AdminAlerts as a, $$AdminNav as b };
