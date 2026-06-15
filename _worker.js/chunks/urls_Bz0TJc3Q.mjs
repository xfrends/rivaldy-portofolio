globalThis.process ??= {}; globalThis.process.env ??= {};
function withBase(path) {
  const base = "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}${normalizedPath}`;
}

export { withBase as w };
