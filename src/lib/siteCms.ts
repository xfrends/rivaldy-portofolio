import type { D1DatabaseLike, RuntimeEnv } from './cloudflare';

const uploadPrefix = 'site-content';
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export interface SiteContent {
	heroTitle: string;
	heroTagline: string;
	heroImage: string;
	aboutImage: string;
	aboutText: string;
	pricelist: PricelistPackage[];
	hasDb: boolean;
	hasBucket: boolean;
}

export interface PricelistPackage {
	id: string;
	name: string;
	price: string;
	features: string[];
	popular: boolean;
	enabled: boolean;
	sortOrder: number;
}

export interface UpdateSiteContentInput {
	heroTitle: string;
	heroTagline: string;
	heroImage: File | null;
	aboutImage: File | null;
	aboutText: string;
	env?: RuntimeEnv;
}

export interface PricelistInput {
	id?: string;
	name: string;
	price: string;
	features: string[];
	popular: boolean;
	enabled: boolean;
	sortOrder: number;
	env?: RuntimeEnv;
}

export interface UpdatePricelistInput extends PricelistInput {
	originalId: string;
}

export interface DeletePricelistInput {
	id: string;
	env?: RuntimeEnv;
}

interface SiteContentRow {
	key: string;
	value: string;
}

interface PricelistRow {
	id: string;
	name: string;
	price: string;
	features_json: string;
	popular: number;
	enabled: number;
	sort_order: number;
}

const defaultSiteContent: SiteContent = {
	heroTitle: 'A Photo by Rvldy',
	heroTagline: [
		'Your Graduation Story',
		'Merayakan Gelar, Mengabadikan Moment',
		'Frame Your Achievement',
	].join('\n'),
	heroImage: 'https://rivaldy.pages.dev/api/gallery/image/site-content/hero/1000411107-1781550259330-879382e5-2764-49c4-93b8-94bc9135946c.webp',
	aboutImage: '/images/profile.webp',
	aboutText: [
		"Hi, I'm Sara Richard.",
		'',
		"I've been a photographer for over 10 years, focusing primarily on landscape and portrait photography. My journey began with a simple point-and-shoot camera while traveling through the mountains of Colorado, which sparked a passion that has taken me across the globe.",
		'',
		'My approach to photography centers on finding the extraordinary in ordinary moments. I believe that beauty exists everywhere in urban streets, remote wilderness, and human connections.',
	].join('\n'),
	pricelist: [
		{
			id: 'basic',
			name: 'Basic',
			price: '275K',
			features: [
				'Photo session 1 jam (Include foto keluarga, foto teman, foto individu - lebih banyak foto individu)',
				'Best Soft file & selection edited send by Google Drive (same day)',
			],
			popular: false,
			enabled: true,
			sortOrder: 10,
		},
		{
			id: 'premium',
			name: 'Premium',
			price: '330K',
			features: [
				'Photo Session 1 jam (Include foto keluarga, foto teman, foto individu)',
				'All soft file mentahan & Edited Request send by Google Drive',
			],
			popular: false,
			enabled: true,
			sortOrder: 20,
		},
		{
			id: 'pertamax',
			name: 'Pertamax',
			price: '380K',
			features: [
				'Photo Session 1 Jam 45 menit',
				'All soft file mentahan & Req edit send by Google Drive',
			],
			popular: true,
			enabled: true,
			sortOrder: 30,
		},
		{
			id: 'exclusive',
			name: 'Exclusive',
			price: '550K',
			features: [
				'Photo Session Fleksibel',
				'Fotografer membawa aksesoris 2 Lightning, 1 Balon Fire',
				'Include Foto keluarga, foto dengan teman, foto individu',
			],
			popular: false,
			enabled: true,
			sortOrder: 40,
		},
	],
	hasDb: false,
	hasBucket: false,
};

export async function getSiteContent(env?: RuntimeEnv): Promise<SiteContent> {
	if (!env?.DB) {
		return {
			...defaultSiteContent,
			hasBucket: Boolean(env?.GALLERY_BUCKET),
		};
	}

	try {
		await ensureSiteContentSchema(env.DB);
		await ensurePricelistSchema(env.DB);
		const result = await env.DB.prepare('select key, value from site_content').all<SiteContentRow>();
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
			hasBucket: Boolean(env.GALLERY_BUCKET),
		};
	} catch (error) {
		console.warn(`[WARN] Failed to load site content from D1: ${getErrorMessage(error)}`);
		return {
			...defaultSiteContent,
			hasBucket: Boolean(env.GALLERY_BUCKET),
		};
	}
}

export async function updateSiteContent(input: UpdateSiteContentInput): Promise<void> {
	if (!input.env?.DB) throw new Error('D1 binding DB belum tersedia.');

	const db = input.env.DB;
	await ensureSiteContentSchema(db);
	const current = await getSiteContent(input.env);
	const heroImage = input.heroImage && input.heroImage.size > 0
		? await replaceContentImage(input.env, 'hero', input.heroImage, current.heroImage)
		: current.heroImage;
	const aboutImage = input.aboutImage && input.aboutImage.size > 0
		? await replaceContentImage(input.env, 'about', input.aboutImage, current.aboutImage)
		: current.aboutImage;

	await Promise.all([
		upsertContentValue(db, 'hero_title', input.heroTitle.trim() || defaultSiteContent.heroTitle),
		upsertContentValue(db, 'hero_tagline', input.heroTagline.trim() || defaultSiteContent.heroTagline),
		upsertContentValue(db, 'hero_image', heroImage),
		upsertContentValue(db, 'about_image', aboutImage),
		upsertContentValue(db, 'about_text', input.aboutText.trim() || defaultSiteContent.aboutText),
	]);
}

export async function getPricelistPackages(env?: RuntimeEnv): Promise<PricelistPackage[]> {
	if (!env?.DB) return defaultSiteContent.pricelist;

	await ensureSiteContentSchema(env.DB);
	await ensurePricelistSchema(env.DB);
	const legacyJson = await env.DB.prepare('select value from site_content where key = ?')
		.bind('pricelist_json')
		.first<{ value: string }>();
	return readPricelistFromD1(env.DB, legacyJson?.value);
}

export async function createPricelistPackage(input: PricelistInput): Promise<void> {
	const db = await writablePricelistDb(input.env);
	const pkg = normalizePricelistPackage(input);
	if (await getPricelistPackageById(pkg.id, input.env)) throw new Error('Paket pricelist sudah ada.');

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
		pkg.sortOrder,
	).run();
	await markPricelistInitialized(db);
}

export async function updatePricelistPackage(input: UpdatePricelistInput): Promise<void> {
	const db = await writablePricelistDb(input.env);
	const current = await getPricelistPackageById(input.originalId, input.env);
	if (!current) throw new Error('Paket pricelist tidak ditemukan.');

	const pkg = normalizePricelistPackage(input);
	if (pkg.id !== input.originalId && await getPricelistPackageById(pkg.id, input.env)) {
		throw new Error('Paket pricelist sudah ada.');
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
		input.originalId,
	).run();
	await markPricelistInitialized(db);
}

export async function deletePricelistPackage(input: DeletePricelistInput): Promise<void> {
	const db = await writablePricelistDb(input.env);
	const current = await getPricelistPackageById(input.id, input.env);
	if (!current) throw new Error('Paket pricelist tidak ditemukan.');

	await db.prepare('delete from pricelist_packages where id = ?').bind(input.id).run();
	await markPricelistInitialized(db);
}

export async function getPricelistPackageById(
	id: string,
	env?: RuntimeEnv,
): Promise<PricelistPackage | null> {
	if (!env?.DB) return defaultSiteContent.pricelist.find((pkg) => pkg.id === id) || null;

	await ensurePricelistSchema(env.DB);
	const row = await env.DB.prepare('select * from pricelist_packages where id = ?')
		.bind(id)
		.first<PricelistRow>();
	return row ? toPricelistPackage(row) : null;
}

async function ensureSiteContentSchema(db: D1DatabaseLike): Promise<void> {
	await db.prepare(`
		create table if not exists site_content (
			key text primary key,
			value text not null,
			updated_at text not null default current_timestamp
		)
	`).run();
}

async function ensurePricelistSchema(db: D1DatabaseLike): Promise<void> {
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

async function upsertContentValue(db: D1DatabaseLike, key: string, value: string): Promise<void> {
	await db.prepare(`
		insert into site_content (key, value, updated_at)
		values (?, ?, current_timestamp)
		on conflict(key) do update set value = excluded.value, updated_at = current_timestamp
	`).bind(key, value).run();
}

async function replaceContentImage(
	env: RuntimeEnv | undefined,
	field: 'hero' | 'about',
	file: File,
	currentPath: string,
): Promise<string> {
	validateImageFile(file);
	const nextPath = await saveContentFile(env, field, file);
	await deleteR2Path(env, currentPath);
	return nextPath;
}

async function saveContentFile(
	env: RuntimeEnv | undefined,
	field: 'hero' | 'about',
	file: File,
): Promise<string> {
	if (!env?.GALLERY_BUCKET) throw new Error('R2 binding GALLERY_BUCKET belum tersedia.');

	const filename = uniqueFilename(safeFilename(file.name));
	const key = `${uploadPrefix}/${field}/${filename}`;
	await env.GALLERY_BUCKET.put(key, await file.arrayBuffer(), {
		httpMetadata: { contentType: file.type },
	});
	return `/api/gallery/image/${key}`;
}

async function deleteR2Path(env: RuntimeEnv | undefined, imagePath: string): Promise<void> {
	if (!env?.GALLERY_BUCKET?.delete) return;
	const marker = '/api/gallery/image/';
	const markerIndex = imagePath.indexOf(marker);
	if (markerIndex < 0) return;
	await env.GALLERY_BUCKET.delete(imagePath.slice(markerIndex + marker.length));
}

function validateImageFile(file: File): void {
	if (!allowedMimeTypes.has(file.type)) throw new Error('Format foto harus JPG, PNG, atau WebP.');
}

function safeFilename(filename: string): string {
	const extension = fileExtension(filename);
	const base = slugify(filenameBase(filename)) || 'image';
	return `${base}${extension}`;
}

function uniqueFilename(filename: string): string {
	const extension = fileExtension(filename);
	const base = filenameBase(filename);
	return `${base}-${Date.now()}-${crypto.randomUUID()}${extension}`;
}

function slugify(value: string): string {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function fileExtension(filename: string): string {
	const dotIndex = filename.lastIndexOf('.');
	return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : '';
}

function filenameBase(filename: string): string {
	const basename = filename.split(/[\\/]/).pop() || 'image';
	const dotIndex = basename.lastIndexOf('.');
	return dotIndex >= 0 ? basename.slice(0, dotIndex) : basename;
}

function getErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : 'Unknown error';
}

async function writablePricelistDb(env?: RuntimeEnv): Promise<D1DatabaseLike> {
	if (!env?.DB) throw new Error('D1 binding DB belum tersedia.');

	await ensureSiteContentSchema(env.DB);
	await ensurePricelistSchema(env.DB);
	return env.DB;
}

async function readPricelistFromD1(
	db: D1DatabaseLike,
	legacyJson: string | undefined,
): Promise<PricelistPackage[]> {
	const initialized = await db.prepare('select value from site_content where key = ?')
		.bind('pricelist_initialized')
		.first<{ value: string }>();
	const result = await db.prepare('select * from pricelist_packages order by sort_order asc, name asc')
		.all<PricelistRow>();
	const rows = result.results || [];

	if (rows.length > 0) return rows.map(toPricelistPackage);
	if (initialized) return [];

	const seedPackages = parsePricelist(legacyJson);
	await Promise.all(seedPackages.map((pkg) =>
		db.prepare(`
			insert or ignore into pricelist_packages (id, name, price, features_json, popular, enabled, sort_order, created_at, updated_at)
			values (?, ?, ?, ?, ?, ?, ?, current_timestamp, current_timestamp)
		`).bind(
			pkg.id,
			pkg.name,
			pkg.price,
			JSON.stringify(pkg.features),
			pkg.popular ? 1 : 0,
			pkg.enabled ? 1 : 0,
			pkg.sortOrder,
		).run(),
	));
	await markPricelistInitialized(db);
	return seedPackages;
}

async function markPricelistInitialized(db: D1DatabaseLike): Promise<void> {
	await upsertContentValue(db, 'pricelist_initialized', '1');
}

function parsePricelist(value: string | undefined): PricelistPackage[] {
	if (!value) return defaultSiteContent.pricelist;

	try {
		return normalizePricelist(JSON.parse(value));
	} catch {
		return defaultSiteContent.pricelist;
	}
}

function normalizePricelist(value: unknown): PricelistPackage[] {
	if (!Array.isArray(value)) return defaultSiteContent.pricelist;

	const packages = value
		.map((item, index): PricelistPackage | null => {
			if (!item || typeof item !== 'object') return null;
			const record = item as Partial<PricelistPackage>;
			const name = String(record.name || '').trim();
			const price = String(record.price || '').trim();
			const features = Array.isArray(record.features)
				? record.features.map((feature) => String(feature).trim()).filter(Boolean)
				: [];

			if (!name || !price || features.length === 0) return null;

			return {
				id: slugify(String(record.id || name)) || `package-${index + 1}`,
				name,
				price,
				features,
				popular: Boolean(record.popular),
				enabled: record.enabled !== false,
				sortOrder: Number.isFinite(Number(record.sortOrder)) ? Number(record.sortOrder) : (index + 1) * 10,
			};
		})
		.filter((item): item is PricelistPackage => Boolean(item));

	return packages.length > 0 ? packages : defaultSiteContent.pricelist;
}

function normalizePricelistPackage(input: PricelistInput): PricelistPackage {
	const id = slugify(input.id || input.name);
	const name = input.name.trim();
	const price = input.price.trim();
	const features = input.features.map((feature) => feature.trim()).filter(Boolean);
	const sortOrder = Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 0;

	if (!id) throw new Error('ID paket wajib diisi.');
	if (!name) throw new Error('Nama paket wajib diisi.');
	if (!price) throw new Error('Harga paket wajib diisi.');
	if (features.length === 0) throw new Error('Minimal satu fitur wajib diisi.');

	return {
		id,
		name,
		price,
		features,
		popular: input.popular,
		enabled: input.enabled,
		sortOrder,
	};
}

function toPricelistPackage(row: PricelistRow): PricelistPackage {
	return {
		id: row.id,
		name: row.name,
		price: row.price,
		features: parseFeatures(row.features_json),
		popular: Boolean(row.popular),
		enabled: Boolean(row.enabled),
		sortOrder: row.sort_order,
	};
}

function parseFeatures(value: string): string[] {
	try {
		const features = JSON.parse(value);
		if (Array.isArray(features)) {
			return features.map((feature) => String(feature).trim()).filter(Boolean);
		}
	} catch {
		// Fall through to newline parser for manually repaired records.
	}

	return value.split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean);
}
