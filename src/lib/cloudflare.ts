export interface R2ObjectBodyLike {
	body: ReadableStream;
	httpMetadata?: {
		contentType?: string;
	};
}

export interface R2BucketLike {
	get(key: string): Promise<R2ObjectBodyLike | null>;
	put(
		key: string,
		value: ArrayBuffer | ArrayBufferView | ReadableStream | string,
		options?: {
			httpMetadata?: {
				contentType?: string;
			};
		},
	): Promise<unknown>;
	delete?(key: string): Promise<unknown>;
}

export interface KVNamespaceLike {
	get(key: string): Promise<string | null>;
	put(key: string, value: string): Promise<unknown>;
	list?(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{
		keys: Array<{ name: string }>;
		list_complete: boolean;
		cursor?: string;
	}>;
}

export interface D1Result<T = unknown> {
	results?: T[];
	success?: boolean;
	meta?: unknown;
}

export interface D1PreparedStatementLike {
	bind(...values: unknown[]): D1PreparedStatementLike;
	first<T = unknown>(): Promise<T | null>;
	all<T = unknown>(): Promise<D1Result<T>>;
	run<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1DatabaseLike {
	prepare(query: string): D1PreparedStatementLike;
	batch?<T = unknown>(statements: D1PreparedStatementLike[]): Promise<Array<D1Result<T>>>;
}

export interface RuntimeEnv {
	ADMIN_USERNAME?: string;
	ADMIN_PASSWORD?: string;
	ADMIN_SESSION_SECRET?: string;
	GALLERY_BUCKET?: R2BucketLike;
	ANALYTICS?: KVNamespaceLike;
	DB?: D1DatabaseLike;
}

export function getRuntimeEnv(locals: unknown): RuntimeEnv {
	return (
		(locals as { runtime?: { env?: RuntimeEnv } } | undefined)?.runtime?.env ??
		{}
	);
}

export function getEnvString(env: RuntimeEnv | undefined, key: keyof RuntimeEnv): string {
	const value = env?.[key];
	if (typeof value === 'string') return value;

	const fallback = import.meta.env[key];
	return typeof fallback === 'string' ? fallback : '';
}
