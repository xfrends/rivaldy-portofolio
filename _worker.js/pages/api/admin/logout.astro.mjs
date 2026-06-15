globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as clearAdminSession } from '../../../chunks/adminAuth_B8QQQr4y.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ cookies, redirect }) => {
  clearAdminSession(cookies);
  return redirect(withBase("admin"));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
