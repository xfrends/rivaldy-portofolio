globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_DBcCZzNC.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CivlJigz.mjs';
import { g as getRuntimeEnv } from '../chunks/cloudflare_Dxf-Pucn.mjs';
import { g as getSiteContent } from '../chunks/siteCms_DgJO4Dqu.mjs';
import { w as withBase } from '../chunks/urls_Bz0TJc3Q.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const content = await getSiteContent(getRuntimeEnv(Astro2.locals));
  const aboutParagraphs = content.aboutText.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `About - ${content.heroTitle}`, "data-astro-cid-kh7btl4r": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-white pt-32 pb-32" data-astro-cid-kh7btl4r> <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl" data-astro-cid-kh7btl4r> <div class="flex flex-col items-center text-center" data-astro-cid-kh7btl4r> <div class="max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ease-out" x-data="{ shown: false }" x-intersect.once="shown = true" :class="shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'" data-astro-cid-kh7btl4r> <h2 class="text-3xl md:text-4xl font-playfair font-normal mb-4 tracking-wide text-black" data-astro-cid-kh7btl4r>About the Photographer</h2> <div class="w-12 h-[1px] bg-black mx-auto mb-6" data-astro-cid-kh7btl4r></div> <p class="text-gray-500 font-light text-lg" data-astro-cid-kh7btl4r>My journey behind the lens</p> </div> <!-- Pure, unstyled image focusing only on the photo --> <div class="w-full max-w-2xl mb-20 animate-fade-in-up" data-astro-cid-kh7btl4r> <img${addAttribute(withBase(content.aboutImage), "src")} alt="Portrait of the Photographer" class="w-full h-auto object-cover" width="800" height="1000" data-astro-cid-kh7btl4r> </div> <!-- Artist Statement / Bio --> <div class="max-w-2xl mx-auto text-center animate-fade-in-up" style="animation-delay: 0.2s;" data-astro-cid-kh7btl4r> <div class="prose prose-lg text-gray-800 leading-loose font-light mx-auto" data-astro-cid-kh7btl4r> ${aboutParagraphs.map((paragraph) => renderTemplate`<p class="mb-8 font-sans" data-astro-cid-kh7btl4r> ${paragraph} </p>`)} </div> <div class="mt-16 flex justify-center" data-astro-cid-kh7btl4r> <div class="w-12 h-[1px] bg-black" data-astro-cid-kh7btl4r></div> </div> </div> </div> </div> </section> ` })} `;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/about.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
