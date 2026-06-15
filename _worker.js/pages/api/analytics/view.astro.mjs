globalThis.process ??= {}; globalThis.process.env ??= {};
import { t as trackView } from '../../../chunks/analytics_B7nIbTL1.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Bbc2K49a.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, locals }) => {
  const runtimeEnv = getRuntimeEnv(locals);
  try {
    const payload = await request.json();
    await trackView({
      path: typeof payload.path === "string" ? payload.path : void 0,
      collectionId: typeof payload.collectionId === "string" ? payload.collectionId : void 0,
      postId: typeof payload.postId === "string" ? payload.postId : void 0,
      env: runtimeEnv
    });
  } catch {
    return new Response(null, { status: 204 });
  }
  return new Response(null, { status: 204 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
