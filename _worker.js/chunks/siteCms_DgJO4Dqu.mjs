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
  heroImage: "https://rivaldy.pages.dev/api/gallery/image/site-content/hero/1000411107-1781550259330-879382e5-2764-49c4-93b8-94bc9135946c.webp",
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
      enabled: true,
      sortOrder: 10
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
      enabled: true,
      sortOrder: 20
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
      enabled: true,
      sortOrder: 30
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
      enabled: true,
      sortOrder: 40
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
    await ensurePricelistSchema(env.DB);
    const result = await env.DB.prepare("select key, value from site_content").all();
    const values = Object.fromEntries((result.results || []).map((row) => [row.key, row.value]));
    const pricelist = await readPricelistFromD1(env.DB, values.pricelist_json);
    return {
      heroTitle: values.hero_title || defaultSiteContent.heroTitle,
      heroTagline: values.hero_tagline || defaultSiteContent.heroTagline,
      heroImage: values.hero_image || defaultSiteContent.heroImage,
      aboutImage: values.about_image || defaultSiteContent.aboutImage,
      aboutText: values.about_text || defaultSiteContent.aboutText,
      pricelist,
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
async function createPricelistPackage(input) {
  const db = await writablePricelistDb(input.env);
  const pkg = normalizePricelistPackage(input);
  if (await getPricelistPackageById(pkg.id, input.env)) throw new Error("Paket pricelist sudah ada.");
  await db.prepare(`
		insert into pricelist_packages (id, name, price, features_json, popular, enabled, sort_order, created_at, updated_at)
		values (?, ?, ?, ?, ?, ?, ?, current_timestamp, current_timestamp)
	`).bind(
    pkg.id,
    pkg.name,
    pkg.price,
    JSON.stringify(pkg.features),
    pkg.popular ? 1 : 0,
    pkg.enabled ? 1 : 0,
    pkg.sortOrder
  ).run();
  await markPricelistInitialized(db);
}
async function updatePricelistPackage(input) {
  const db = await writablePricelistDb(input.env);
  const current = await getPricelistPackageById(input.originalId, input.env);
  if (!current) throw new Error("Paket pricelist tidak ditemukan.");
  const pkg = normalizePricelistPackage(input);
  if (pkg.id !== input.originalId && await getPricelistPackageById(pkg.id, input.env)) {
    throw new Error("Paket pricelist sudah ada.");
  }
  await db.prepare(`
		update pricelist_packages
		set id = ?, name = ?, price = ?, features_json = ?, popular = ?, enabled = ?, sort_order = ?, updated_at = current_timestamp
		where id = ?
	`).bind(
    pkg.id,
    pkg.name,
    pkg.price,
    JSON.stringify(pkg.features),
    pkg.popular ? 1 : 0,
    pkg.enabled ? 1 : 0,
    pkg.sortOrder,
    input.originalId
  ).run();
  await markPricelistInitialized(db);
}
async function deletePricelistPackage(input) {
  const db = await writablePricelistDb(input.env);
  const current = await getPricelistPackageById(input.id, input.env);
  if (!current) throw new Error("Paket pricelist tidak ditemukan.");
  await db.prepare("delete from pricelist_packages where id = ?").bind(input.id).run();
  await markPricelistInitialized(db);
}
async function getPricelistPackageById(id, env) {
  if (!env?.DB) return defaultSiteContent.pricelist.find((pkg) => pkg.id === id) || null;
  await ensurePricelistSchema(env.DB);
  const row = await env.DB.prepare("select * from pricelist_packages where id = ?").bind(id).first();
  return row ? toPricelistPackage(row) : null;
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
async function ensurePricelistSchema(db) {
  await db.prepare(`
		create table if not exists pricelist_packages (
			id text primary key,
			name text not null,
			price text not null,
			features_json text not null,
			popular integer not null default 0,
			enabled integer not null default 1,
			sort_order integer not null default 0,
			created_at text not null default current_timestamp,
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
async function writablePricelistDb(env) {
  if (!env?.DB) throw new Error("D1 binding DB belum tersedia.");
  await ensureSiteContentSchema(env.DB);
  await ensurePricelistSchema(env.DB);
  return env.DB;
}
async function readPricelistFromD1(db, legacyJson) {
  const initialized = await db.prepare("select value from site_content where key = ?").bind("pricelist_initialized").first();
  const result = await db.prepare("select * from pricelist_packages order by sort_order asc, name asc").all();
  const rows = result.results || [];
  if (rows.length > 0) return rows.map(toPricelistPackage);
  if (initialized) return [];
  const seedPackages = parsePricelist(legacyJson);
  await Promise.all(seedPackages.map(
    (pkg) => db.prepare(`
			insert or ignore into pricelist_packages (id, name, price, features_json, popular, enabled, sort_order, created_at, updated_at)
			values (?, ?, ?, ?, ?, ?, ?, current_timestamp, current_timestamp)
		`).bind(
      pkg.id,
      pkg.name,
      pkg.price,
      JSON.stringify(pkg.features),
      pkg.popular ? 1 : 0,
      pkg.enabled ? 1 : 0,
      pkg.sortOrder
    ).run()
  ));
  await markPricelistInitialized(db);
  return seedPackages;
}
async function markPricelistInitialized(db) {
  await upsertContentValue(db, "pricelist_initialized", "1");
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
      enabled: record.enabled !== false,
      sortOrder: Number.isFinite(Number(record.sortOrder)) ? Number(record.sortOrder) : (index + 1) * 10
    };
  }).filter((item) => Boolean(item));
  return packages.length > 0 ? packages : defaultSiteContent.pricelist;
}
function normalizePricelistPackage(input) {
  const id = slugify(input.id || input.name);
  const name = input.name.trim();
  const price = input.price.trim();
  const features = input.features.map((feature) => feature.trim()).filter(Boolean);
  const sortOrder = Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 0;
  if (!id) throw new Error("ID paket wajib diisi.");
  if (!name) throw new Error("Nama paket wajib diisi.");
  if (!price) throw new Error("Harga paket wajib diisi.");
  if (features.length === 0) throw new Error("Minimal satu fitur wajib diisi.");
  return {
    id,
    name,
    price,
    features,
    popular: input.popular,
    enabled: input.enabled,
    sortOrder
  };
}
function toPricelistPackage(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    features: parseFeatures(row.features_json),
    popular: Boolean(row.popular),
    enabled: Boolean(row.enabled),
    sortOrder: row.sort_order
  };
}
function parseFeatures(value) {
  try {
    const features = JSON.parse(value);
    if (Array.isArray(features)) {
      return features.map((feature) => String(feature).trim()).filter(Boolean);
    }
  } catch {
  }
  return value.split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean);
}

export { getPricelistPackageById as a, updatePricelistPackage as b, createPricelistPackage as c, deletePricelistPackage as d, getSiteContent as g, updateSiteContent as u };
