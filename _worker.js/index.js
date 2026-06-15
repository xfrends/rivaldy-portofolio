globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BAXcXlvY.mjs';
import { manifest } from './manifest_CbRE52cT.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/collections/create.astro.mjs');
const _page3 = () => import('./pages/admin/collections/_id_/edit.astro.mjs');
const _page4 = () => import('./pages/admin/collections.astro.mjs');
const _page5 = () => import('./pages/admin/content.astro.mjs');
const _page6 = () => import('./pages/admin/posts/create.astro.mjs');
const _page7 = () => import('./pages/admin/posts/_id_/edit.astro.mjs');
const _page8 = () => import('./pages/admin/posts.astro.mjs');
const _page9 = () => import('./pages/admin.astro.mjs');
const _page10 = () => import('./pages/api/admin/collections.astro.mjs');
const _page11 = () => import('./pages/api/admin/content.astro.mjs');
const _page12 = () => import('./pages/api/admin/login.astro.mjs');
const _page13 = () => import('./pages/api/admin/logout.astro.mjs');
const _page14 = () => import('./pages/api/admin/posts.astro.mjs');
const _page15 = () => import('./pages/api/admin/upload.astro.mjs');
const _page16 = () => import('./pages/api/analytics/view.astro.mjs');
const _page17 = () => import('./pages/api/gallery/image/_---key_.astro.mjs');
const _page18 = () => import('./pages/collections/_---collection_.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/collections/create.astro", _page2],
    ["src/pages/admin/collections/[id]/edit.astro", _page3],
    ["src/pages/admin/collections/index.astro", _page4],
    ["src/pages/admin/content.astro", _page5],
    ["src/pages/admin/posts/create.astro", _page6],
    ["src/pages/admin/posts/[id]/edit.astro", _page7],
    ["src/pages/admin/posts/index.astro", _page8],
    ["src/pages/admin/index.astro", _page9],
    ["src/pages/api/admin/collections.ts", _page10],
    ["src/pages/api/admin/content.ts", _page11],
    ["src/pages/api/admin/login.ts", _page12],
    ["src/pages/api/admin/logout.ts", _page13],
    ["src/pages/api/admin/posts.ts", _page14],
    ["src/pages/api/admin/upload.ts", _page15],
    ["src/pages/api/analytics/view.ts", _page16],
    ["src/pages/api/gallery/image/[...key].ts", _page17],
    ["src/pages/collections/[...collection].astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
