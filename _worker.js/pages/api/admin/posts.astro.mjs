globalThis.process ??= {}; globalThis.process.env ??= {};
import { i as isAdminAuthenticated } from '../../../chunks/adminAuth_DcI6vYvm.mjs';
import { g as getRuntimeEnv } from '../../../chunks/cloudflare_Bbc2K49a.mjs';
import { a as createPost, b as updatePost, e as deletePost } from '../../../chunks/galleryCms_BqZ0DBxM.mjs';
import { w as withBase } from '../../../chunks/urls_Bz0TJc3Q.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect, locals }) => {
  const adminPath = withBase("admin/posts");
  const runtimeEnv = getRuntimeEnv(locals);
  if (!await isAdminAuthenticated(cookies, runtimeEnv)) {
    return redirect(`${withBase("admin")}?error=session`);
  }
  const form = await request.formData();
  const action = String(form.getAll("action").at(-1) || "");
  const images = form.getAll("images").filter((item) => item instanceof File);
  const collectionIds = form.getAll("collections").map(String);
  const thumbnailValue = form.get("thumbnail");
  const thumbnail = thumbnailValue instanceof File ? thumbnailValue : null;
  try {
    if (action === "create") {
      await createPost({
        thumbnail,
        images,
        collectionIds,
        title: String(form.get("title") || ""),
        description: String(form.get("description") || ""),
        featured: form.get("featured") === "on",
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=post-created`);
    }
    if (action === "update") {
      await updatePost({
        id: String(form.get("id") || ""),
        thumbnail,
        images,
        selectedThumbnail: String(form.get("selectedThumbnail") || ""),
        removeImages: form.getAll("removeImages").map(String),
        collectionIds,
        title: String(form.get("title") || ""),
        description: String(form.get("description") || ""),
        featured: form.get("featured") === "on",
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=post-updated`);
    }
    if (action === "delete") {
      await deletePost({
        id: String(form.get("id") || ""),
        env: runtimeEnv
      });
      return redirect(`${adminPath}?success=post-deleted`);
    }
    throw new Error("Action tidak dikenal.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Post gagal diproses.";
    return redirect(`${adminPath}?error=${encodeURIComponent(message)}`);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
