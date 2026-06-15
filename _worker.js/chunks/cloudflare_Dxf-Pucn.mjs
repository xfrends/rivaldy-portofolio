globalThis.process ??= {}; globalThis.process.env ??= {};
const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://rivaldy-portfolio.pages.dev", "SSR": true};
function getRuntimeEnv(locals) {
  return locals?.runtime?.env ?? {};
}
function getEnvString(env, key) {
  const value = env?.[key];
  if (typeof value === "string") return value;
  const fallback = Object.assign(__vite_import_meta_env__, { USER: process.env.USER, _: process.env._ })[key];
  return typeof fallback === "string" ? fallback : "";
}
function getAppConfig(env) {
  const adminPassword = getEnvString(env, "ADMIN_PASSWORD").trim();
  return {
    adminUsername: getEnvString(env, "ADMIN_USERNAME").trim() || "admin",
    adminPassword,
    adminSessionSecret: getEnvString(env, "ADMIN_SESSION_SECRET").trim() || adminPassword,
    siteUrl: getEnvString(env, "SITE_URL").trim() || "https://rivaldy-portfolio.pages.dev"
  };
}

export { getAppConfig as a, getRuntimeEnv as g };
