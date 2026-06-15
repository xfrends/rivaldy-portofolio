globalThis.process ??= {}; globalThis.process.env ??= {};
const NullGalleryData = {
  collections: [],
  images: []
};

const uploadPrefix = "gallery";
const allowedMimeTypes = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp"]);
async function getAdminGalleryState(env) {
  const cmsGallery = await getCmsGalleryData(env);
  return {
    collections: cmsGallery.collections.map((collection) => ({
      ...collection,
      isCms: true,
      postCount: cmsGallery.images.filter((image) => image.meta.collections.includes(collection.id)).length
    })),
    posts: cmsGallery.images.map(toAdminPost),
    imageCount: cmsGallery.images.length,
    hasBucket: Boolean(env?.GALLERY_BUCKET),
    hasDb: Boolean(env?.DB)
  };
}
async function getCmsGalleryData(env) {
  if (!env?.DB) return NullGalleryData;
  try {
    await ensureCmsSchema(env.DB);
    return await readGalleryFromD1(env.DB);
  } catch (error) {
    console.warn(`[WARN] Failed to load CMS gallery data from D1: ${getErrorMessage(error)}`);
    return NullGalleryData;
  }
}
async function createCollection(input) {
  const db = await writableDb(input.env);
  const collectionId = slugify(input.id || input.name);
  if (!collectionId) throw new Error("Collection wajib diisi.");
  if (collectionExists(await readGalleryFromD1(db), collectionId)) {
    throw new Error("Collection sudah ada.");
  }
  await db.prepare("insert into collections (id, name) values (?, ?)").bind(collectionId, input.name.trim() || titleFromSlug(collectionId)).run();
}
async function updateCollection(input) {
  const db = await writableDb(input.env);
  const current = await db.prepare("select id from collections where id = ?").bind(input.originalId).first();
  if (!current) throw new Error("Collection tidak ditemukan.");
  const nextId = slugify(input.id || input.name);
  if (!nextId) throw new Error("Collection wajib diisi.");
  if (nextId !== input.originalId && collectionExists(await readGalleryFromD1(db), nextId)) {
    throw new Error("Collection sudah ada.");
  }
  await db.prepare("update collections set id = ?, name = ? where id = ?").bind(nextId, input.name.trim() || titleFromSlug(nextId), input.originalId).run();
  await db.prepare("update post_collections set collection_id = ? where collection_id = ?").bind(nextId, input.originalId).run();
}
async function deleteCollection(input) {
  const db = await writableDb(input.env);
  const current = await db.prepare("select id from collections where id = ?").bind(input.id).first();
  if (!current) throw new Error("Collection tidak ditemukan.");
  await db.prepare("delete from post_collections where collection_id = ?").bind(input.id).run();
  await db.prepare("delete from collections where id = ?").bind(input.id).run();
}
async function createPost(input) {
  const db = await writableDb(input.env);
  if (!input.thumbnail || input.thumbnail.size === 0) throw new Error("Thumbnail wajib diisi.");
  validateImageFile(input.thumbnail);
  input.images.filter((file) => file.size > 0).forEach(validateImageFile);
  const postId = crypto.randomUUID();
  const thumbnailPath = await savePostFile(input.env, postId, input.thumbnail);
  const additionalPaths = await Promise.all(
    input.images.filter((file) => file.size > 0).map((file) => savePostFile(input.env, postId, file))
  );
  await db.prepare(`
		insert into posts (id, title, description, thumbnail_path, is_featured)
		values (?, ?, ?, ?, ?)
	`).bind(
    postId,
    input.title.trim() || titleFromSlug(filenameBase(input.thumbnail.name)),
    input.description?.trim() || "",
    thumbnailPath,
    input.featured ? 1 : 0
  ).run();
  await insertPostImages(db, postId, [thumbnailPath, ...additionalPaths]);
  await replacePostCollections(db, postId, input.collectionIds);
}
async function updatePost(input) {
  const db = await writableDb(input.env);
  const post = await db.prepare("select * from posts where id = ?").bind(input.id).first();
  if (!post) throw new Error("Post tidak ditemukan.");
  const currentImages = await getPostImages(db, input.id);
  let thumbnailPath = input.selectedThumbnail && currentImages.includes(input.selectedThumbnail) ? input.selectedThumbnail : post.thumbnail_path;
  const removableImages = new Set(input.removeImages.filter((imagePath) => currentImages.includes(imagePath)));
  if (input.thumbnail && input.thumbnail.size > 0) {
    validateImageFile(input.thumbnail);
    removableImages.add(thumbnailPath);
    thumbnailPath = await savePostFile(input.env, input.id, input.thumbnail);
  }
  removableImages.delete(thumbnailPath);
  await Promise.all(Array.from(removableImages).map((imagePath) => deleteR2Path(input.env, imagePath)));
  const keptImages = currentImages.filter((imagePath) => imagePath !== thumbnailPath && !removableImages.has(imagePath));
  const addedImages = await Promise.all(
    input.images.filter((file) => file.size > 0).map((file) => {
      validateImageFile(file);
      return savePostFile(input.env, input.id, file);
    })
  );
  await db.prepare(`
		update posts
		set title = ?, description = ?, thumbnail_path = ?, is_featured = ?, updated_at = current_timestamp
		where id = ?
	`).bind(
    input.title.trim() || post.title,
    input.description?.trim() || "",
    thumbnailPath,
    input.featured ? 1 : 0,
    input.id
  ).run();
  await db.prepare("delete from post_images where post_id = ?").bind(input.id).run();
  await insertPostImages(db, input.id, [thumbnailPath, ...keptImages, ...addedImages]);
  await replacePostCollections(db, input.id, input.collectionIds);
}
async function deletePost(input) {
  const db = await writableDb(input.env);
  const post = await db.prepare("select id from posts where id = ?").bind(input.id).first();
  if (!post) throw new Error("Post tidak ditemukan.");
  const imagePaths = await getPostImages(db, input.id);
  await Promise.all(imagePaths.map((imagePath) => deleteR2Path(input.env, imagePath)));
  await db.prepare("delete from post_collections where post_id = ?").bind(input.id).run();
  await db.prepare("delete from post_images where post_id = ?").bind(input.id).run();
  await db.prepare("delete from posts where id = ?").bind(input.id).run();
}
async function uploadGalleryImages(input) {
  const [thumbnail, ...images] = input.files.filter((file) => file.size > 0);
  if (input.collectionName && !input.collectionId) {
    await createCollection({ id: input.collectionName, name: input.collectionName, env: input.env });
  }
  await createPost({
    thumbnail: thumbnail || null,
    images,
    collectionIds: [slugify(input.collectionId || input.collectionName)].filter(Boolean),
    title: input.title || "",
    description: input.description,
    featured: input.featured,
    env: input.env
  });
  return 1;
}
async function writableDb(env) {
  if (!env?.DB) throw new Error("D1 binding DB belum tersedia.");
  await ensureCmsSchema(env.DB);
  return env.DB;
}
async function ensureCmsSchema(db) {
  await db.prepare(`
		create table if not exists collections (
			id text primary key,
			name text not null,
			created_at text not null default current_timestamp
		)
	`).run();
  await db.prepare(`
		create table if not exists posts (
			id text primary key,
			title text not null,
			description text not null default '',
			thumbnail_path text not null,
			is_featured integer not null default 0,
			created_at text not null default current_timestamp,
			updated_at text not null default current_timestamp
		)
	`).run();
  await db.prepare(`
		create table if not exists post_images (
			id text primary key,
			post_id text not null,
			path text not null,
			sort_order integer not null default 0
		)
	`).run();
  await db.prepare(`
		create table if not exists post_collections (
			post_id text not null,
			collection_id text not null,
			primary key (post_id, collection_id)
		)
	`).run();
}
async function readGalleryFromD1(db) {
  const [collectionResult, postResult, imageResult, collectionMapResult] = await Promise.all([
    db.prepare("select id, name from collections order by name asc").all(),
    db.prepare("select * from posts order by created_at desc").all(),
    db.prepare("select post_id, path, sort_order from post_images order by sort_order asc").all(),
    db.prepare("select post_id, collection_id from post_collections").all()
  ]);
  const imagesByPost = groupBy(imageResult.results || [], "post_id");
  const collectionsByPost = groupBy(collectionMapResult.results || [], "post_id");
  return {
    collections: collectionResult.results || [],
    images: (postResult.results || []).map((post) => {
      const paths = (imagesByPost.get(post.id) || []).map((image) => image.path);
      const thumbnail = post.thumbnail_path || paths[0] || "";
      const additionalPaths = paths.filter((path) => path !== thumbnail);
      const collections = (collectionsByPost.get(post.id) || []).map((item) => item.collection_id);
      return {
        id: post.id,
        path: thumbnail,
        additionalPaths,
        meta: {
          title: post.title,
          description: post.description || "",
          collections: post.is_featured ? ["featured", ...collections] : collections
        },
        exif: {}
      };
    }).filter((image) => image.path)
  };
}
async function insertPostImages(db, postId, paths) {
  await Promise.all(
    Array.from(new Set(paths)).map(
      (path, index) => db.prepare("insert into post_images (id, post_id, path, sort_order) values (?, ?, ?, ?)").bind(crypto.randomUUID(), postId, path, index).run()
    )
  );
}
async function replacePostCollections(db, postId, collectionIds) {
  await db.prepare("delete from post_collections where post_id = ?").bind(postId).run();
  await Promise.all(
    normalizePostCollections(collectionIds).map(
      (collectionId) => db.prepare("insert or ignore into post_collections (post_id, collection_id) values (?, ?)").bind(postId, collectionId).run()
    )
  );
}
async function getPostImages(db, postId) {
  const result = await db.prepare("select path from post_images where post_id = ? order by sort_order asc").bind(postId).all();
  return (result.results || []).map((row) => row.path);
}
async function savePostFile(env, postId, file) {
  if (!env?.GALLERY_BUCKET) throw new Error("R2 binding GALLERY_BUCKET belum tersedia.");
  const filename = uniqueFilename(safeFilename(file.name));
  const key = `${uploadPrefix}/${postId}/${filename}`;
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
function normalizePostCollections(collectionIds, featured) {
  const normalized = collectionIds.map(slugify).filter(Boolean);
  return Array.from(new Set(normalized));
}
function toAdminPost(image) {
  return {
    id: image.id || image.path,
    title: image.meta.title,
    description: image.meta.description,
    thumbnail: image.path,
    images: image.additionalPaths || [],
    allImages: [image.path, ...image.additionalPaths || []],
    collections: image.meta.collections.filter((id) => id !== "featured"),
    isFeatured: image.meta.collections.includes("featured")
  };
}
function collectionExists(gallery, collectionId) {
  return gallery.collections.some((collection) => collection.id === collectionId);
}
function groupBy(items, key) {
  const map = /* @__PURE__ */ new Map();
  for (const item of items) {
    const group = item[key];
    map.set(group, [...map.get(group) || [], item]);
  }
  return map;
}
function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function titleFromSlug(value) {
  return value.replace(/[-_]+/g, " ").split(" ").filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function safeFilename(filename) {
  const extension = fileExtension(filename);
  const base = slugify(filenameBase(filename)) || "photo";
  return `${base}${extension}`;
}
function uniqueFilename(filename) {
  const extension = fileExtension(filename);
  const base = filenameBase(filename);
  return `${base}-${Date.now()}-${crypto.randomUUID()}${extension}`;
}
function fileExtension(filename) {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : "";
}
function filenameBase(filename) {
  const basename = filename.split(/[\\/]/).pop() || "photo";
  const dotIndex = basename.lastIndexOf(".");
  return dotIndex >= 0 ? basename.slice(0, dotIndex) : basename;
}
function getErrorMessage(error) {
  return error instanceof Error ? error.message : "Unknown error";
}

export { createPost as a, updatePost as b, createCollection as c, deleteCollection as d, deletePost as e, uploadGalleryImages as f, getAdminGalleryState as g, getCmsGalleryData as h, updateCollection as u };
