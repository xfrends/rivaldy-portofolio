globalThis.process ??= {}; globalThis.process.env ??= {};
const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://rivaldy-portfolio.pages.dev", "SSR": true};
function getRuntimeEnv(locals) {
  return locals?.runtime?.env ?? {};
}
function getEnvString(env, key) {
  const value = env?.[key];
  if (typeof value === "string") return value;
  const fallback = Object.assign(__vite_import_meta_env__, {})[key];
  return typeof fallback === "string" ? fallback : "";
}

export { getEnvString as a, getRuntimeEnv as g };
