globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_C894EArb.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_BHIsIH7R.mjs';
import { g as getCollections, a as getImages, $ as $$PhotoGrid } from '../../chunks/imageStore_D7uUB0-D.mjs';
import { g as getRuntimeEnv } from '../../chunks/cloudflare_Bbc2K49a.mjs';
import { w as withBase } from '../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const allCollection = {
    id: void 0,
    name: "All"
  };
  const runtimeEnv = getRuntimeEnv(Astro2.locals);
  const collections = [allCollection, ...await getCollections(void 0, runtimeEnv)];
  const { collection } = Astro2.params;
  const images = await getImages(collection ? { collection, runtimeEnv } : { runtimeEnv });
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-16 pt-24"> <div class="container-custom"> <div class="mb-16 text-center"> <h1 class="text-4xl md:text-5xl font-bold mb-4">Gallery</h1> <p class="text-gray-600 max-w-xl mx-auto">Explore my collection of photographic works</p> </div> <div class="flex justify-center mb-10"> <div class="flex flex-wrap gap-2 justify-center"> ${collections.map((collectionBtn) => renderTemplate`<a${addAttribute(withBase(`collections/${collectionBtn.id ? collectionBtn.id : ""}`), "href")}> <div${addAttribute(`px-4 py-2 border ${collectionBtn.id === collection ? "border-black bg-black text-white" : "border-gray-200 text-gray-700 hover:border-gray-300"} transition-all`, "class")}> ${collectionBtn.name} </div> </a>`)} </div> </div> ${renderComponent($$result2, "PhotoGrid", $$PhotoGrid, { "images": images })} </div> </section> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/collections/[...collection].astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/collections/[...collection].astro";
const $$url = "/collections/[...collection]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
