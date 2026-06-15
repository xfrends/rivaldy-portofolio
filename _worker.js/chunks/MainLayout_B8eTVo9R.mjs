globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, c as createAstro, m as maybeRenderHead, s as spreadAttributes, d as addAttribute, o as renderSlot, b as renderTemplate, r as renderComponent, e as renderScript, p as renderHead } from './astro/server_C894EArb.mjs';
/* empty css                         */
import { w as withBase } from './urls_Bz0TJc3Q.mjs';

const $$Astro$5 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$;
  const size = Astro2.props.size;
  const cls = Astro2.props.class;
  const name = Astro2.props.iconName;
  delete Astro2.props.size;
  delete Astro2.props.class;
  delete Astro2.props.iconName;
  const props = Object.assign({
    "xmlns": "http://www.w3.org/2000/svg",
    "stroke-width": 2,
    "width": size ?? 24,
    "height": size ?? 24,
    "stroke": "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "fill": "none",
    "viewBox": "0 0 24 24"
  }, Astro2.props);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(["lucide", { [`lucide-${name}`]: name }, cls], "class:list")}> ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/node_modules/lucide-astro/dist/.Layout.astro", void 0);

const $$Astro$4 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$Instagram = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Instagram;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "instagram", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect> <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path> <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/node_modules/lucide-astro/dist/Instagram.astro", void 0);

const $$Astro$3 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$MessageCircle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MessageCircle;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "message-circle", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path> ` })}`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/node_modules/lucide-astro/dist/MessageCircle.astro", void 0);

const siteConfig = {
  title: "Rivaldy Ahnaf Abida",
  favicon: "favicon.svg",
  owner: "A Photo by Rvldy",
  profileImage: "profile.webp",
  socialLinks: [
    {
      name: "WhatsApp",
      url: "https://wa.me/6289519033751",
      icon: $$MessageCircle
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/rivaldy.abida",
      icon: $$Instagram
    }
  ]
};

const $$Astro$2 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$SocialIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SocialIcon;
  const { socialLink } = Astro2.props;
  const Icon = socialLink.icon;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(socialLink.url, "href")} target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-800 transition-colors duration-200"${addAttribute(socialLink.name, "aria-label")}> ${renderComponent($$result, "Icon", Icon, { "size": 20 })} </a>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/SocialIcon.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const owner = siteConfig.owner;
  const socialLinks = siteConfig.socialLinks;
  return renderTemplate`${maybeRenderHead()}<footer class="py-10 border-t border-gray-100 mt-auto"> <div class="container mx-auto transition-all duration-1000 ease-out" x-data="{ shown: false }" x-intersect.once="shown = true" :class="shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"> <div class="flex flex-col md:flex-row justify-between items-center"> <div class="flex flex-col items-center md:items-start text-sm font-sans text-gray-500 mb-4 md:mb-0"> <div>
© ${year} <span class="font-brand font-semibold text-black">${owner}</span>. All rights reserved.
</div> <div class="text-[11px] text-gray-400 mt-1 opacity-50 hover:opacity-100 transition-opacity">
Developed by <a href="https://frendi.web.id" target="_blank" rel="noopener noreferrer" class="hover:text-black">Frendi</a> </div> </div> <div class="flex space-x-6"> ${socialLinks.map((socialLink) => renderTemplate`${renderComponent($$result, "SocialIcon", $$SocialIcon, { "socialLink": socialLink })}`)} </div> </div> </div> </footer>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro("https://rivaldy-portfolio.pages.dev");
const $$NavBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NavBar;
  const { navTheme = "light" } = Astro2.props;
  const title = siteConfig.title;
  const menuItems = [
    { name: "Home", link: withBase("") },
    { name: "Gallery", link: withBase("collections") },
    { name: "About", link: withBase("about") }
  ];
  return renderTemplate`<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet">${maybeRenderHead()}<nav${addAttribute(`{ isOpen: false, scrolled: false, theme: '${navTheme}' }`, "x-data")} @scroll.window="scrolled = window.scrollY > 50" class="fixed top-0 left-0 w-full z-50 transition-all duration-300" :class="scrolled ? 'py-3 bg-white shadow-sm text-gray-900' : (theme === 'dark' ? 'py-5 bg-transparent text-white' : 'py-5 bg-transparent text-gray-900')"> <div class="container mx-auto flex justify-between items-center"> <a${addAttribute(withBase(""), "href")} id="logo" class="text-2xl md:text-4xl font-semibold tracking-tight"> ${title} </a> <!-- Desktop Menu --> <div class="hidden md:flex space-x-8"> ${menuItems.map((item) => renderTemplate`<a${addAttribute(item.link, "href")} class="nav-link relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 hover:after:w-full transition-all" :class="scrolled ? 'after:bg-black hover:text-black' : (theme === 'dark' ? 'after:bg-white hover:text-gray-200' : 'after:bg-black hover:text-black')"> ${item.name} </a>`)} </div> <!-- Mobile Menu Button --> <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none" :class="scrolled ? 'text-gray-800' : (theme === 'dark' ? 'text-white' : 'text-gray-800')"> <svg x-show="!isOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <svg x-show="isOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <!-- Mobile Menu --> <div x-show="isOpen" class="md:hidden absolute top-full left-0 w-full bg-white shadow-md text-gray-900"> <div class="flex flex-col py-4 px-6 space-y-4"> ${menuItems.map((item) => renderTemplate`<a${addAttribute(item.link, "href")} class="text-lg" @click="isOpen = false"> ${item.name} </a>`)} </div> </div> </nav>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/NavBar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title = siteConfig.title,
    description = siteConfig.owner,
    ogImage = siteConfig.profileImage,
    navTheme = "light"
  } = Astro2.props;
  const favicon = siteConfig.favicon;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="h-full"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>", '</title><meta name="description"', '><!-- Open Graph / Social Meta Tags --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:type" content="website">', "</head> <body> ", " <main> ", " </main> ", ' <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"><\/script> <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"><\/script> ', "</body></html>"])), addAttribute(withBase(favicon), "href"), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(withBase(ogImage), "content"), renderHead(), renderComponent($$result, "NavBar", $$NavBar, { "navTheme": navTheme }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderScript($$result, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts"));
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, $$ as a, siteConfig as s };
