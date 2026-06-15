globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_C894EArb.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CxHy3gpz.mjs';
import { g as getRuntimeEnv } from '../chunks/cloudflare_Dxf-Pucn.mjs';
import { g as getSiteContent } from '../chunks/siteCms_DgJO4Dqu.mjs';
import { w as withBase } from '../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const content = await getSiteContent(getRuntimeEnv(Astro2.locals));
  const aboutParagraphs = content.aboutText.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="pt-32 pb-20"> <div class="container-custom"> <div class="max-w-2xl mx-auto text-center mb-16"> <h1 class="text-4xl md:text-5xl font-bold mb-4">About Me</h1> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"> <div> <img${addAttribute(withBase(content.aboutImage), "src")} alt="Profile image" class="w-full h-auto rounded-lg shadow-lg border-8 my-4 border-white md:p-4" width="720" height="720"> </div> <div class="prose text-gray-700 mb-6"> ${aboutParagraphs.map((paragraph) => renderTemplate`<p>${paragraph}</p>`)} </div> </div> </div> </section> ` })}`;
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
