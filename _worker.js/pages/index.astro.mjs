globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, c as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_DBcCZzNC.mjs';
import { a as $$, s as siteConfig, $ as $$MainLayout } from '../chunks/MainLayout_ed7hj2LY.mjs';
import { w as withBase } from '../chunks/urls_Bz0TJc3Q.mjs';
/* empty css                                 */
import { a as getImages, f as featuredCollectionId, $ as $$PhotoGrid } from '../chunks/imageStore_BEn4EGd3.mjs';
import { g as getRuntimeEnv } from '../chunks/cloudflare_Dxf-Pucn.mjs';
import { g as getSiteContent } from '../chunks/siteCms_DgJO4Dqu.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$4 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$ChevronDown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ChevronDown;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "chevron-down", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="m6 9 6 6 6-6"></path> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/node_modules/lucide-astro/dist/ChevronDown.astro", void 0);

const $$Astro$3 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$LandingHero2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LandingHero2;
  const { content } = Astro2.props;
  const heroSubtitles = content.heroTagline.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const title = content.heroTitle;
  return renderTemplate`<!-- Full Screen Hero Image Background -->${maybeRenderHead()}<div class="absolute inset-0 z-0 overflow-hidden" data-astro-cid-uvdrwbr5> <div class="absolute inset-0 scale-105 animate-[slowZoom_20s_ease-out_forwards]"${addAttribute({
    backgroundImage: `url(${withBase(content.heroImage)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }, "style")} data-astro-cid-uvdrwbr5></div> <!-- Dark Overlay to make text pop --> <div class="absolute inset-0 bg-black/50 pointer-events-none" data-astro-cid-uvdrwbr5></div> <!-- Cinematic Vignette / Overlay --> <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" data-astro-cid-uvdrwbr5></div> </div> <!-- Content --> <div class="container-custom relative z-10 w-full h-full flex flex-col items-center justify-center text-center pt-32 pb-40" data-astro-cid-uvdrwbr5> <div class="mb-6 flex items-center justify-center gap-4 animate-fade-in-up" data-astro-cid-uvdrwbr5> <div class="h-[1px] w-8 md:w-16 bg-white/70" data-astro-cid-uvdrwbr5></div> <span class="text-xs md:text-sm tracking-[0.3em] uppercase text-white/90 font-light" data-astro-cid-uvdrwbr5>Portfolio</span> <div class="h-[1px] w-8 md:w-16 bg-white/70" data-astro-cid-uvdrwbr5></div> </div> <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 font-playfair tracking-tight text-white drop-shadow-2xl animate-fade-in-up" style="animation-delay: 0.2s;" data-astro-cid-uvdrwbr5> ${title} </h1> <div class="h-12 relative overflow-hidden mb-12 w-full animate-fade-in-up" style="animation-delay: 0.4s;" data-astro-cid-uvdrwbr5> <div class="hero-subtitle-rotator text-lg md:text-2xl text-gray-200 font-light italic font-playfair drop-shadow-md" data-astro-cid-uvdrwbr5> ${heroSubtitles.map((subtitle) => renderTemplate`<span data-astro-cid-uvdrwbr5>${subtitle}</span>`)} </div> </div> <a${addAttribute(withBase("collections"), "href")} class="group inline-flex items-center gap-4 text-sm tracking-[0.15em] uppercase font-medium text-white hover:text-gray-300 transition-colors animate-fade-in-up" style="animation-delay: 0.6s;" data-astro-cid-uvdrwbr5> <span class="border-b border-white/50 pb-1 group-hover:border-white transition-colors" data-astro-cid-uvdrwbr5>Explore Gallery</span> <svg class="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-uvdrwbr5> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-astro-cid-uvdrwbr5></path> </svg> </a> </div> `;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/LandingHero-2.astro", void 0);

const $$Astro$2 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$FeaturedGallery = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FeaturedGallery;
  const images = await getImages({
    collection: featuredCollectionId,
    runtimeEnv: getRuntimeEnv(Astro2.locals)
  });
  return renderTemplate`${maybeRenderHead()}<div class="container-custom py-24"> <div class="max-w-3xl mx-auto text-center mb-20 transition-all duration-1000 ease-out" x-data="{ shown: false }" x-intersect.once="shown = true" :class="shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"> <h2 class="text-3xl md:text-4xl font-playfair font-normal mb-4 tracking-wide text-black">Selected Works</h2> <div class="w-12 h-[1px] bg-black mx-auto mb-6"></div> <p class="text-gray-500 font-light text-lg">A selection of my best photographs from moments of achievement and celebration.</p> </div> <!-- Adding a subtle fade-in animation on scroll --> <div x-data="{ shown: false }" x-intersect.once="shown = true" :class="shown ? 'opacity-100' : 'opacity-0'" class="transition-opacity duration-1000 ease-in-out"> ${renderComponent($$result, "PhotoGrid", $$PhotoGrid, { "images": images })} </div> </div>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/FeaturedGallery.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$FeaturedWorkScroll = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div id="featured-gallery-scroll" class="absolute bottom-10 left-0 right-0 flex justify-center transition-opacity duration-300"> <button onclick="scrollToContent();" class="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors hover:cursor-pointer" aria-label="Scroll down to see featured work"> <span class="text-sm mb-2">Best Graduation Picture</span> ', " </button> </div> <script>\n	const scrollToContent = () => {\n		window.scrollTo({\n			top: window.innerHeight,\n			behavior: 'smooth',\n		});\n	};\n\n	document.addEventListener('DOMContentLoaded', () => {\n		const button = document.getElementById('featured-gallery-scroll');\n\n		window.addEventListener('scroll', () => {\n			if (window.scrollY > 100) {\n				button.style.opacity = 0;\n				button.style.visibility = 'hidden';\n			} else {\n				button.style.visibility = 'visible';\n				button.style.opacity = 1;\n			}\n		});\n	});\n<\/script>"])), maybeRenderHead(), renderComponent($$result, "ChevronDown", $$ChevronDown, { "size": 24 }));
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/FeaturedWorkScroll.astro", void 0);

const $$Astro$1 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$Pricelist = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pricelist;
  const { packages } = Astro2.props;
  const visiblePackages = packages.filter((pkg) => pkg.enabled);
  const waLinkStr = siteConfig.socialLinks.find((link) => link.name === "WhatsApp")?.url || "https://wa.me/";
  const getWaLink = (paket, harga) => {
    const message = `Halo, saya tertarik dengan paket foto ${paket} (${harga}). Bisa minta info lebih lanjut?`;
    return `${waLinkStr}?text=${encodeURIComponent(message)}`;
  };
  return renderTemplate`${maybeRenderHead()}<section class="py-20 md:py-24 bg-white" id="pricelist"> <div class="container-custom"> <div class="max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ease-out" x-data="{ shown: false }" x-intersect.once="shown = true" :class="shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"> <h2 class="text-3xl md:text-4xl font-playfair font-normal mb-4 tracking-wide text-black">Our Packages</h2> <div class="w-12 h-[1px] bg-black mx-auto mb-6"></div> <p class="text-gray-500 font-light text-lg">Choose the perfect photography package for your special moments.</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" x-data="{ shown: false }" x-intersect.once="shown = true"> ${visiblePackages.map((pkg, index) => renderTemplate`<div${addAttribute(`flex flex-col p-8 rounded-lg transition-all duration-700 ease-out ${pkg.popular ? "relative transform border-2 border-black bg-gray-50 hover:-translate-y-2 hover:shadow-xl" : "border border-gray-200 bg-white hover:border-black hover:-translate-y-1 hover:shadow-lg"}`, "class")} :class="shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"${addAttribute(`transition-delay: ${index * 150}ms;`, "style")}> ${pkg.popular && renderTemplate`<div class="absolute top-0 right-0 rounded-bl-lg bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
Popular
</div>`} <div${addAttribute(`mb-6 border-b pb-6 text-center ${pkg.popular ? "border-gray-200" : "border-gray-100"}`, "class")}> <h3 class="mb-2 text-xl font-semibold text-black">${pkg.name}</h3> <div class="font-playfair text-3xl font-bold">${pkg.price}</div> </div> <ul${addAttribute(`mb-8 flex flex-grow flex-col gap-4 text-sm ${pkg.popular ? "text-gray-700" : "text-gray-600"}`, "class")}> ${pkg.features.map((feature) => renderTemplate`<li class="flex items-start gap-3"> <svg class="mt-0.5 h-5 w-5 shrink-0 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>${feature}</span> </li>`)} </ul> <a${addAttribute(getWaLink(pkg.name, pkg.price), "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`w-full rounded-md border-2 border-black px-6 py-3 text-center text-sm font-medium transition-all duration-300 md:text-base ${pkg.popular ? "bg-black text-white shadow-md hover:border-gray-800 hover:bg-gray-800" : "hover:bg-black hover:text-white"}`, "class")}>
Book ${pkg.name} </a> </div>`)} </div> </div> </section>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/Pricelist.astro", void 0);

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const content = await getSiteContent(getRuntimeEnv(Astro2.locals));
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "ogImage": content.heroImage, "navTheme": "dark" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative min-h-screen items-center flex py-20 md:py-16 overflow-hidden"> ${renderComponent($$result2, "LandingHero", $$LandingHero2, { "content": content })} ${renderComponent($$result2, "FeaturedWorkScroll", $$FeaturedWorkScroll, {})} </section> <section class="featured-section py-20"> ${renderComponent($$result2, "FeaturedGallery", $$FeaturedGallery, {})} </section> ${renderComponent($$result2, "Pricelist", $$Pricelist, { "packages": content.pricelist })} ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
