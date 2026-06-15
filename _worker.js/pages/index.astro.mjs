globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, c as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_C894EArb.mjs';
import { a as $$, s as siteConfig, $ as $$MainLayout } from '../chunks/MainLayout_CK3zHkNE.mjs';
import { w as withBase } from '../chunks/urls_Bz0TJc3Q.mjs';
/* empty css                                 */
import { a as getImages, f as featuredCollectionId, $ as $$PhotoGrid } from '../chunks/imageStore_D7uUB0-D.mjs';
import { g as getRuntimeEnv } from '../chunks/cloudflare_Bbc2K49a.mjs';
import { g as getSiteContent } from '../chunks/siteCms_FRQACgl6.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$ChevronDown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ChevronDown;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "chevron-down", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="m6 9 6 6 6-6"></path> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/node_modules/lucide-astro/dist/ChevronDown.astro", void 0);

const $$Astro$2 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$LandingHero2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LandingHero2;
  const { content } = Astro2.props;
  const heroSubtitles = content.heroTagline.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const title = content.heroTitle;
  const subtitleLabel = heroSubtitles.join(", ");
  return renderTemplate`${maybeRenderHead()}<div class="absolute top-[80px] bottom-[120px] left-0 right-0 z-0"${addAttribute({
    backgroundImage: `url(${withBase(content.heroImage)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.6
  }, "style")} data-astro-cid-uvdrwbr5></div> <div class="container text-left mb-32 relative z-10" data-astro-cid-uvdrwbr5> <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" data-astro-cid-uvdrwbr5> <span class="font-brand" data-astro-cid-uvdrwbr5>${title}</span> </h1> <p class="hero-subtitle-rotator mt-4 text-base md:text-lg text-gray-700"${addAttribute(subtitleLabel, "aria-label")} data-astro-cid-uvdrwbr5> ${heroSubtitles.map((subtitle) => renderTemplate`<span data-astro-cid-uvdrwbr5>${subtitle}</span>`)} </p> <a${addAttribute(withBase("collections"), "href")} class="mt-8 inline-block px-6 py-3 border-2 border-black rounded-md
                      hover:bg-black hover:text-white transition-all duration-300
                      text-sm md:text-base font-medium
                      transform hover:scale-105 active:scale-95" data-astro-cid-uvdrwbr5>
View Gallery
</a> </div> `;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/LandingHero-2.astro", void 0);

const $$Astro$1 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$FeaturedGallery = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturedGallery;
  const images = await getImages({
    collection: featuredCollectionId,
    runtimeEnv: getRuntimeEnv(Astro2.locals)
  });
  return renderTemplate`${maybeRenderHead()}<div class="max-w-2xl mx-auto text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold mb-4">Best Works Selection</h2> <p class="text-gray-600">A selection of my best photographs from moments of achievement and celebration</p> </div> <div class="p-4"> ${renderComponent($$result, "PhotoGrid", $$PhotoGrid, { "images": images })} </div>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/FeaturedGallery.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$FeaturedWorkScroll = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div id="featured-gallery-scroll" class="absolute bottom-10 left-0 right-0 flex justify-center transition-opacity duration-300"> <button onclick="scrollToContent();" class="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors hover:cursor-pointer" aria-label="Scroll down to see featured work"> <span class="text-sm mb-2">Best Graduation Picture</span> ', " </button> </div> <script>\n	const scrollToContent = () => {\n		window.scrollTo({\n			top: window.innerHeight,\n			behavior: 'smooth',\n		});\n	};\n\n	document.addEventListener('DOMContentLoaded', () => {\n		const button = document.getElementById('featured-gallery-scroll');\n\n		window.addEventListener('scroll', () => {\n			if (window.scrollY > 100) {\n				button.style.opacity = 0;\n				button.style.visibility = 'hidden';\n			} else {\n				button.style.visibility = 'visible';\n				button.style.opacity = 1;\n			}\n		});\n	});\n<\/script>"])), maybeRenderHead(), renderComponent($$result, "ChevronDown", $$ChevronDown, { "size": 24 }));
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/FeaturedWorkScroll.astro", void 0);

const $$Pricelist = createComponent(($$result, $$props, $$slots) => {
  const waLinkStr = siteConfig.socialLinks.find((link) => link.name === "WhatsApp")?.url || "https://wa.me/";
  const getWaLink = (paket, harga) => {
    const message = `Halo, saya tertarik dengan paket foto ${paket} (${harga}). Bisa minta info lebih lanjut?`;
    return `${waLinkStr}?text=${encodeURIComponent(message)}`;
  };
  return renderTemplate`${maybeRenderHead()}<section class="py-20 md:py-24 bg-white" id="pricelist"> <div class="container-custom"> <div class="text-center max-w-3xl mx-auto mb-16"> <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-brand">Pricelist</h2> <p class="text-gray-600 text-lg">Choose the perfect photography package for your special moments.</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">  <div class="flex flex-col p-8 bg-white rounded-lg border border-gray-200 hover:border-black transition-colors duration-300"> <div class="mb-6 text-center border-b border-gray-100 pb-6"> <h3 class="text-xl font-semibold mb-2">Basic</h3> <div class="text-3xl font-bold font-playfair">
275K
</div> </div> <ul class="flex flex-col gap-4 text-gray-600 flex-grow mb-8 text-sm"> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>Photo session 1 jam (Include foto keluarga, foto teman, foto individu - lebih banyak foto individu)</span> </li> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>Best Soft file & selection edited send by Google Drive (same day)</span> </li> </ul> <a${addAttribute(getWaLink("Basic", "275K"), "href")} target="_blank" rel="noopener noreferrer" class="w-full py-3 px-6 text-center border-2 border-black rounded-md hover:bg-black hover:text-white transition-all duration-300 text-sm md:text-base font-medium">Book Basic</a> </div>  <div class="flex flex-col p-8 bg-white rounded-lg border border-gray-200 hover:border-black transition-colors duration-300"> <div class="mb-6 text-center border-b border-gray-100 pb-6"> <h3 class="text-xl font-semibold mb-2">Premium</h3> <div class="text-3xl font-bold font-playfair">
330K
</div> </div> <ul class="flex flex-col gap-4 text-gray-600 flex-grow mb-8 text-sm"> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>Photo Session 1 jam (Include foto keluarga, foto teman, foto individu)</span> </li> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>All soft file mentahan & Edited Request send by Google Drive</span> </li> </ul> <a${addAttribute(getWaLink("Premium", "330K"), "href")} target="_blank" rel="noopener noreferrer" class="w-full py-3 px-6 text-center border-2 border-black rounded-md hover:bg-black hover:text-white transition-all duration-300 text-sm md:text-base font-medium">Book Premium</a> </div>  <div class="flex flex-col p-8 bg-gray-50 rounded-lg border-2 border-black hover:shadow-lg transition-all duration-300 relative transform hover:-translate-y-1"> <div class="absolute top-0 right-0 bg-black text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-bl-lg">
Popular
</div> <div class="mb-6 text-center border-b border-gray-200 pb-6"> <h3 class="text-xl font-semibold mb-2">Pertamax</h3> <div class="text-3xl font-bold font-playfair">
380K
</div> </div> <ul class="flex flex-col gap-4 text-gray-700 flex-grow mb-8 text-sm"> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>Photo Session 1 Jam 45 menit</span> </li> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>All soft file mentahan & Req edit send by Google Drive</span> </li> </ul> <a${addAttribute(getWaLink("Pertamax", "380K"), "href")} target="_blank" rel="noopener noreferrer" class="w-full py-3 px-6 text-center bg-black text-white border-2 border-black rounded-md hover:bg-gray-800 hover:border-gray-800 transition-all duration-300 text-sm md:text-base font-medium shadow-md">Book Pertamax</a> </div>  <div class="flex flex-col p-8 bg-white rounded-lg border border-gray-200 hover:border-black transition-colors duration-300"> <div class="mb-6 text-center border-b border-gray-100 pb-6"> <h3 class="text-xl font-semibold mb-2 text-black">Exclusive</h3> <div class="text-3xl font-bold font-playfair">
550K
</div> </div> <ul class="flex flex-col gap-4 text-gray-600 flex-grow mb-8 text-sm"> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>Photo Session Fleksibel</span> </li> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>Fotografer membawa aksesoris 2 Lightning, 1 Balon Fire</span> </li> <li class="flex items-start gap-3"> <svg class="w-5 h-5 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path> </svg> <span>Include Foto keluarga, foto dengan teman, foto individu</span> </li> </ul> <a${addAttribute(getWaLink("Exclusive", "550K"), "href")} target="_blank" rel="noopener noreferrer" class="w-full py-3 px-6 text-center border-2 border-black rounded-md hover:bg-black hover:text-white transition-all duration-300 text-sm md:text-base font-medium">Book Exclusive</a> </div> </div> </div> </section>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/Pricelist.astro", void 0);

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const content = await getSiteContent(getRuntimeEnv(Astro2.locals));
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "ogImage": content.heroImage }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative min-h-screen items-center flex py-20 md:py-16 overflow-hidden"> ${renderComponent($$result2, "LandingHero", $$LandingHero2, { "content": content })} ${renderComponent($$result2, "FeaturedWorkScroll", $$FeaturedWorkScroll, {})} </section> <section class="featured-section py-20"> ${renderComponent($$result2, "FeaturedGallery", $$FeaturedGallery, {})} </section> ${renderComponent($$result2, "Pricelist", $$Pricelist, {})} ` })}`;
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
