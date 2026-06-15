#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const prefix = 'rivaldy';
const resources = {
	d1Name: `${prefix}-portfolio-cms`,
	r2Name: `${prefix}-gallery`,
	sessionKvTitle: `${prefix}-session`,
	analyticsKvTitle: `${prefix}-analytics`,
};

function runWrangler(args, options = {}) {
	const output = execFileSync('npx', ['wrangler', ...args], {
		encoding: 'utf8',
		stdio: options.stdio || ['ignore', 'pipe', 'pipe'],
	});
	return typeof output === 'string' ? output.trim() : '';
}

function parseJsonOutput(output, fallback) {
	try {
		return JSON.parse(output);
	} catch {
		return fallback;
	}
}

function parseResourceId(output) {
	const uuidMatch = output.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
	if (uuidMatch) return uuidMatch[0];

	const quotedIdMatch = output.match(/id\s*=\s*"([^"]+)"/i) || output.match(/"id"\s*:\s*"([^"]+)"/i);
	return quotedIdMatch?.[1] || '';
}

function ensureD1Database(name) {
	const listOutput = runWrangler(['d1', 'list', '--json']);
	const databases = parseJsonOutput(listOutput, []);
	const existing = databases.find((database) => database.name === name);
	if (existing?.uuid) return existing.uuid;

	console.log(`Creating D1 database: ${name}`);
	const createOutput = runWrangler(['d1', 'create', name]);
	const createdId = parseResourceId(createOutput);
	if (!createdId) throw new Error(`Could not read D1 database id from Wrangler output:\n${createOutput}`);
	return createdId;
}

function ensureKvNamespace(title) {
	const listOutput = runWrangler(['kv', 'namespace', 'list']);
	const namespaces = parseJsonOutput(listOutput, []);
	const existing = namespaces.find((namespace) => namespace.title === title);
	if (existing?.id) return existing.id;

	console.log(`Creating KV namespace: ${title}`);
	const createOutput = runWrangler(['kv', 'namespace', 'create', title]);
	const createdId = parseResourceId(createOutput);
	if (!createdId) throw new Error(`Could not read KV namespace id from Wrangler output:\n${createOutput}`);
	return createdId;
}

function ensureR2Bucket(name) {
	const listOutput = runWrangler(['r2', 'bucket', 'list']);
	if (!listOutput.includes(name)) {
		console.log(`Creating R2 bucket: ${name}`);
		runWrangler(['r2', 'bucket', 'create', name], { stdio: 'inherit' });
	}
	return name;
}

function writeWranglerConfig({ d1DatabaseId, sessionKvId, analyticsKvId, r2BucketName }) {
	const config = {
		$schema: 'node_modules/wrangler/config-schema.json',
		name: 'rivaldy-portfolio',
		compatibility_date: '2026-01-14',
		pages_build_output_dir: './dist',
		kv_namespaces: [
			{
				binding: 'SESSION',
				id: sessionKvId,
			},
			{
				binding: 'ANALYTICS',
				id: analyticsKvId,
			},
		],
		r2_buckets: [
			{
				binding: 'GALLERY_BUCKET',
				bucket_name: r2BucketName,
			},
		],
		d1_databases: [
			{
				binding: 'DB',
				database_name: resources.d1Name,
				database_id: d1DatabaseId,
			},
		],
	};

	writeFileSync('wrangler.jsonc', `${JSON.stringify(config, null, '\t')}\n`);
}

console.log(`Using Cloudflare resource prefix: ${prefix}`);
const d1DatabaseId = ensureD1Database(resources.d1Name);
const sessionKvId = ensureKvNamespace(resources.sessionKvTitle);
const analyticsKvId = ensureKvNamespace(resources.analyticsKvTitle);
const r2BucketName = ensureR2Bucket(resources.r2Name);

writeWranglerConfig({
	d1DatabaseId,
	sessionKvId,
	analyticsKvId,
	r2BucketName,
});

console.log('\nCloudflare resources are ready.');
console.log(`D1 DB binding DB -> ${resources.d1Name} (${d1DatabaseId})`);
console.log(`KV binding SESSION -> ${resources.sessionKvTitle} (${sessionKvId})`);
console.log(`KV binding ANALYTICS -> ${resources.analyticsKvTitle} (${analyticsKvId})`);
console.log(`R2 binding GALLERY_BUCKET -> ${r2BucketName}`);
console.log('\nUpdated wrangler.jsonc. Commit this file before Cloudflare Pages Git deploy.');
