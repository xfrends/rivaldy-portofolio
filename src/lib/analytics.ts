import type { AdminCollection, AdminPost } from './galleryCms';
import type { RuntimeEnv } from './cloudflare';

const totalKey = 'analytics:total';
const pagePrefix = 'analytics:page:';
const collectionPrefix = 'analytics:collection:';
const postPrefix = 'analytics:post:';

export interface AnalyticsSnapshot {
	totalViews: number;
	pageViews: AnalyticsMetric[];
	collectionViews: AnalyticsMetric[];
	postViews: AnalyticsMetric[];
	hasAnalytics: boolean;
	error?: string;
}

export interface AnalyticsMetric {
	id: string;
	label: string;
	count: number;
}

export interface TrackViewInput {
	path?: string;
	collectionId?: string;
	postId?: string;
	env?: RuntimeEnv;
}

export async function trackView(input: TrackViewInput): Promise<void> {
	const kv = input.env?.ANALYTICS;
	if (!kv) return;

	const increments = [totalKey];
	if (input.path) increments.push(`${pagePrefix}${normalizeMetricId(input.path)}`);
	if (input.collectionId) increments.push(`${collectionPrefix}${normalizeMetricId(input.collectionId)}`);
	if (input.postId) increments.push(`${postPrefix}${normalizeMetricId(input.postId)}`);

	try {
		await Promise.all(increments.map((key) => incrementCounter(input.env, key)));
	} catch (error) {
		console.warn(`[WARN] Failed to track analytics view: ${getErrorMessage(error)}`);
	}
}

export async function getAnalyticsSnapshot(
	env: RuntimeEnv | undefined,
	collections: AdminCollection[],
	posts: AdminPost[],
): Promise<AnalyticsSnapshot> {
	if (!env?.ANALYTICS) {
		return emptyAnalyticsSnapshot(collections, posts, false);
	}

	try {
		const totalViews = await getCounter(env, totalKey);
		const pageViews = await getMetricsByPrefix(env, pagePrefix);

		return {
			totalViews,
			pageViews,
			collectionViews: await Promise.all(
				collections.map(async (collection) => ({
					id: collection.id,
					label: collection.name,
					count: await getCounter(env, `${collectionPrefix}${normalizeMetricId(collection.id)}`),
				})),
			),
			postViews: await Promise.all(
				posts.map(async (post) => ({
					id: post.id,
					label: post.title,
					count: await getCounter(env, `${postPrefix}${normalizeMetricId(post.id)}`),
				})),
			),
			hasAnalytics: true,
		};
	} catch (error) {
		console.warn(`[WARN] Failed to load analytics snapshot: ${getErrorMessage(error)}`);
		return {
			...emptyAnalyticsSnapshot(collections, posts, false),
			error: getErrorMessage(error),
		};
	}
}

async function incrementCounter(env: RuntimeEnv | undefined, key: string): Promise<void> {
	const current = await getCounter(env, key);
	await env?.ANALYTICS?.put(key, String(current + 1));
}

async function getCounter(env: RuntimeEnv | undefined, key: string): Promise<number> {
	const value = await env?.ANALYTICS?.get(key);
	const count = Number(value || 0);
	return Number.isFinite(count) ? count : 0;
}

async function getMetricsByPrefix(
	env: RuntimeEnv | undefined,
	prefix: string,
): Promise<AnalyticsMetric[]> {
	const kv = env?.ANALYTICS;
	if (!kv?.list) return [];

	const metrics: AnalyticsMetric[] = [];
	let cursor: string | undefined;

	do {
		const result = await kv.list({ prefix, limit: 100, cursor });
		metrics.push(
			...(await Promise.all(
				result.keys.map(async ({ name }) => {
					const id = name.slice(prefix.length);
					return {
						id,
						label: decodeMetricId(id),
						count: await getCounter(env, name),
					};
				}),
			)),
		);
		cursor = result.cursor;
		if (result.list_complete) break;
	} while (cursor);

	return metrics.sort((a, b) => b.count - a.count);
}

function emptyAnalyticsSnapshot(
	collections: AdminCollection[],
	posts: AdminPost[],
	hasAnalytics: boolean,
): AnalyticsSnapshot {
	return {
		totalViews: 0,
		pageViews: [],
		collectionViews: collections.map((collection) => ({
			id: collection.id,
			label: collection.name,
			count: 0,
		})),
		postViews: posts.map((post) => ({
			id: post.id,
			label: post.title,
			count: 0,
		})),
		hasAnalytics,
	};
}

function normalizeMetricId(value: string): string {
	return encodeURIComponent(value.trim() || '/');
}

function decodeMetricId(value: string): string {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

function getErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : 'Unknown error';
}
