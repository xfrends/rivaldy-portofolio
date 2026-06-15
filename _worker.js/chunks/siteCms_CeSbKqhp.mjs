globalThis.process ??= {}; globalThis.process.env ??= {};
const uploadPrefix = "site-content";
const allowedMimeTypes = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp"]);
const defaultSiteContent = {
  heroTitle: "A Photo by Rvldy",
  heroTagline: [
    "Your Graduation Story",
    "Merayakan Gelar, Mengabadikan Moment",
    "Frame Your Achievement"
  ].join("\n"),
  heroImage: "/images/profile.webp",
  aboutImage: "/images/profile.webp",
  aboutText: [
    "Hi, I'm Sara Richard.",
    "",
    "I've been a photographer for over 10 years, focusing primarily on landscape and portrait photography. My journey began with a simple point-and-shoot camera while traveling through the mountains of Colorado, which sparked a passion that has taken me across the globe.",
    "",
    "My approach to photography centers on finding the extraordinary in ordinary moments. I believe that beauty exists everywhere in urban streets, remote wilderness, and human connections."
  ].join("\n"),
  pricelist: [
    {
      id: "basic",
      name: "Basic",
      price: "275K",
      features: [
        "Photo session 1 jam (Include foto keluarga, foto teman, foto individu - lebih banyak foto individu)",
        "Best Soft file & selection edited send by Google Drive (same day)"
      ],
      popular: false,
      enabled: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "330K",
      features: [
        "Photo Session 1 jam (Include foto keluarga, foto teman, foto individu)",
        "All soft file mentahan & Edited Request send by Google Drive"
      ],
      popular: false,
      enabled: true
    },
    {
      id: "pertamax",
      name: "Pertamax",
      price: "380K",
      features: [
        "Photo Session 1 Jam 45 menit",
        "All soft file mentahan & Req edit send by Google Drive"
      ],
      popular: true,
      enabled: true
    },
    {
      id: "exclusive",
      name: "Exclusive",
      price: "550K",
      features: [
        "Photo Session Fleksibel",
        "Fotografer membawa aksesoris 2 Lightning, 1 Balon Fire",
        "Include Foto keluarga, foto dengan teman, foto individu"
      ],
      popular: false,
      enabled: true
    }
  ],
  hasDb: false,
  hasBucket: false
};
async function getSiteContent(env) {
  if (!env?.DB) {
    return {
      ...defaultSiteContent,
      hasBucket: Boolean(env?.GALLERY_BUCKET)
    };
  }
  try {
    await ensureSiteContentSchema(env.DB);
    const result = await env.DB.prepare("select key, value from site_content").all();
    const values = Object.fromEntries((result.results || []).map((row) => [row.key, row.value]));
    return {
      heroTitle: values.hero_title || defaultSiteContent.heroTitle,
      heroTagline: values.hero_tagline || defaultSiteContent.heroTagline,
      heroImage: values.hero_image || defaultSiteContent.heroImage,
      aboutImage: values.about_image || defaultSiteContent.aboutImage,
      aboutText: values.about_text || defaultSiteContent.aboutText,
      pricelist: parsePricelist(values.pricelist_json),
      hasDb: true,
      hasBucket: Boolean(env.GALLERY_BUCKET)
    };
  } catch (error) {
    console.warn(`[WARN] Failed to load site content from D1: ${getErrorMessage(error)}`);
    return {
      ...defaultSiteContent,
      hasBucket: Boolean(env.GALLERY_BUCKET)
    };
  }
}
async function updateSiteContent(input) {
  if (!input.env?.DB) throw new Error("D1 binding DB belum tersedia.");
  const db = input.env.DB;
  await ensureSiteContentSchema(db);
  const current = await getSiteContent(input.env);
  const heroImage = input.heroImage && input.heroImage.size > 0 ? await replaceContentImage(input.env, "hero", input.heroImage, current.heroImage) : current.heroImage;
  const aboutImage = input.aboutImage && input.aboutImage.size > 0 ? await replaceContentImage(input.env, "about", input.aboutImage, current.aboutImage) : current.aboutImage;
  await Promise.all([
    upsertContentValue(db, "hero_title", input.heroTitle.trim() || defaultSiteContent.heroTitle),
    upsertContentValue(db, "hero_tagline", input.heroTagline.trim() || defaultSiteContent.heroTagline),
    upsertContentValue(db, "hero_image", heroImage),
    upsertContentValue(db, "about_image", aboutImage),
    upsertContentValue(db, "about_text", input.aboutText.trim() || defaultSiteContent.aboutText)
  ]);
}
async function updatePricelist(input) {
  if (!input.env?.DB) throw new Error("D1 binding DB belum tersedia.");
  await ensureSiteContentSchema(input.env.DB);
  const packages = normalizePricelist(input.packages);
  await upsertContentValue(input.env.DB, "pricelist_json", JSON.stringify(packages));
}
async function ensureSiteContentSchema(db) {
  await db.prepare(`
		create table if not exists site_content (
			key text primary key,
			value text not null,
			updated_at text not null default current_timestamp
		)
	`).run();
}
async function upsertContentValue(db, key, value) {
  await db.prepare(`
		insert into site_content (key, value, updated_at)
		values (?, ?, current_timestamp)
		on conflict(key) do update set value = excluded.value, updated_at = current_timestamp
	`).bind(key, value).run();
}
async function replaceContentImage(env, field, file, currentPath) {
  validateImageFile(file);
  const nextPath = await saveContentFile(env, field, file);
  await deleteR2Path(env, currentPath);
  return nextPath;
}
async function saveContentFile(env, field, file) {
  if (!env?.GALLERY_BUCKET) throw new Error("R2 binding GALLERY_BUCKET belum tersedia.");
  const filename = uniqueFilename(safeFilename(file.name));
  const key = `${uploadPrefix}/${field}/${filename}`;
  await env.GALLERY_BUCKET.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type }
  });
  return `/api/gallery/image/${key}`;
}
async function deleteR2Path(env, imagePath) {
  if (!env?.GALLERY_BUCKET?.delete) return;
  const marker = "/api/gallery/image/";
  const markerIndex = imagePath.indexOf(marker);
  if (markerIndex < 0) return;
  await env.GALLERY_BUCKET.delete(imagePath.slice(markerIndex + marker.length));
}
function validateImageFile(file) {
  if (!allowedMimeTypes.has(file.type)) throw new Error("Format foto harus JPG, PNG, atau WebP.");
}
function safeFilename(filename) {
  const extension = fileExtension(filename);
  const base = slugify(filenameBase(filename)) || "image";
  return `${base}${extension}`;
}
function uniqueFilename(filename) {
  const extension = fileExtension(filename);
  const base = filenameBase(filename);
  return `${base}-${Date.now()}-${crypto.randomUUID()}${extension}`;
}
function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function fileExtension(filename) {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : "";
}
function filenameBase(filename) {
  const basename = filename.split(/[\\/]/).pop() || "image";
  const dotIndex = basename.lastIndexOf(".");
  return dotIndex >= 0 ? basename.slice(0, dotIndex) : basename;
}
function getErrorMessage(error) {
  return error instanceof Error ? error.message : "Unknown error";
}
function parsePricelist(value) {
  if (!value) return defaultSiteContent.pricelist;
  try {
    return normalizePricelist(JSON.parse(value));
  } catch {
    return defaultSiteContent.pricelist;
  }
}
function normalizePricelist(value) {
  if (!Array.isArray(value)) return defaultSiteContent.pricelist;
  const packages = value.map((item, index) => {
    if (!item || typeof item !== "object") return null;
    const record = item;
    const name = String(record.name || "").trim();
    const price = String(record.price || "").trim();
    const features = Array.isArray(record.features) ? record.features.map((feature) => String(feature).trim()).filter(Boolean) : [];
    if (!name || !price || features.length === 0) return null;
    return {
      id: slugify(String(record.id || name)) || `package-${index + 1}`,
      name,
      price,
      features,
      popular: Boolean(record.popular),
      enabled: record.enabled !== false
    };
  }).filter((item) => Boolean(item));
  return packages.length > 0 ? packages : defaultSiteContent.pricelist;
}

export { updatePricelist as a, getSiteContent as g, updateSiteContent as u };
