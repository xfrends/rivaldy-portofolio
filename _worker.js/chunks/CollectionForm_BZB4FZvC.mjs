globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate } from './astro/server_C894EArb.mjs';
import { w as withBase } from './urls_Bz0TJc3Q.mjs';

const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const $$CollectionForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CollectionForm;
  const { mode, collection } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form${addAttribute(withBase("api/admin/collections"), "action")} method="post" class="space-y-5"> <input type="hidden" name="action"${addAttribute(mode, "value")}> ${collection && renderTemplate`<input type="hidden" name="originalId"${addAttribute(collection.id, "value")}>`} <div class="grid gap-4 md:grid-cols-2"> <label class="block"> <span class="text-sm font-medium text-zinc-800">Slug</span> <input name="id" type="text"${addAttribute(collection?.id || "", "value")} placeholder="prewedding" required class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> <label class="block"> <span class="text-sm font-medium text-zinc-800">Name</span> <input name="name" type="text"${addAttribute(collection?.name || "", "value")} required placeholder="Prewedding" class="mt-2 w-full rounded-md border border-zinc-300 px-4 py-3 text-base outline-none focus:border-zinc-900"> </label> </div> <div class="flex flex-wrap justify-end gap-3"> <a${addAttribute(withBase("admin/collections"), "href")} class="rounded-md border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800">
Cancel
</a> <button type="submit" class="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white"> ${mode === "create" ? "Create Collection" : "Save Collection"} </button> ${mode === "update" && renderTemplate`<button type="submit" name="action" value="delete" class="rounded-md border border-red-200 px-5 py-3 text-sm font-medium text-red-700">
Delete Collection
</button>`} </div> </form>`;
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/admin/CollectionForm.astro", void 0);

export { $$CollectionForm as $ };
