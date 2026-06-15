globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getRuntimeEnv } from '../../../../chunks/cloudflare_Bbc2K49a.mjs';
export { renderers } from '../../../../renderers.mjs';

const GET = async ({ params, locals }) => {
  const key = params.key;
  const bucket = getRuntimeEnv(locals).GALLERY_BUCKET;
  if (!key || !bucket) {
    return new Response("Not found", { status: 404 });
  }
  const object = await bucket.get(key);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(object.body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": object.httpMetadata?.contentType || "application/octet-stream"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
