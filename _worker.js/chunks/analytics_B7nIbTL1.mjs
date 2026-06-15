globalThis.process ??= {}; globalThis.process.env ??= {};
const totalKey = "analytics:total";
const pagePrefix = "analytics:page:";
const collectionPrefix = "analytics:collection:";
const postPrefix = "analytics:post:";
async function trackView(input) {
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
async function getAnalyticsSnapshot(env, collections, posts) {
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
          count: await getCounter(env, `${collectionPrefix}${normalizeMetricId(collection.id)}`)
        }))
      ),
      postViews: await Promise.all(
        posts.map(async (post) => ({
          id: post.id,
          label: post.title,
          count: await getCounter(env, `${postPrefix}${normalizeMetricId(post.id)}`)
        }))
      ),
      hasAnalytics: true
    };
  } catch (error) {
    console.warn(`[WARN] Failed to load analytics snapshot: ${getErrorMessage(error)}`);
    return {
      ...emptyAnalyticsSnapshot(collections, posts, false),
      error: getErrorMessage(error)
    };
  }
}
async function incrementCounter(env, key) {
  const current = await getCounter(env, key);
  await env?.ANALYTICS?.put(key, String(current + 1));
}
async function getCounter(env, key) {
  const value = await env?.ANALYTICS?.get(key);
  const count = Number(value || 0);
  return Number.isFinite(count) ? count : 0;
}
async function getMetricsByPrefix(env, prefix) {
  const kv = env?.ANALYTICS;
  if (!kv?.list) return [];
  const metrics = [];
  let cursor;
  do {
    const result = await kv.list({ prefix, limit: 100, cursor });
    metrics.push(
      ...await Promise.all(
        result.keys.map(async ({ name }) => {
          const id = name.slice(prefix.length);
          return {
            id,
            label: decodeMetricId(id),
            count: await getCounter(env, name)
          };
        })
      )
    );
    cursor = result.cursor;
    if (result.list_complete) break;
  } while (cursor);
  return metrics.sort((a, b) => b.count - a.count);
}
function emptyAnalyticsSnapshot(collections, posts, hasAnalytics) {
  return {
    totalViews: 0,
    pageViews: [],
    collectionViews: collections.map((collection) => ({
      id: collection.id,
      label: collection.name,
      count: 0
    })),
    postViews: posts.map((post) => ({
      id: post.id,
      label: post.title,
      count: 0
    })),
    hasAnalytics
  };
}
function normalizeMetricId(value) {
  return encodeURIComponent(value.trim() || "/");
}
function decodeMetricId(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
function getErrorMessage(error) {
  return error instanceof Error ? error.message : "Unknown error";
}

export { getAnalyticsSnapshot as g, trackView as t };
