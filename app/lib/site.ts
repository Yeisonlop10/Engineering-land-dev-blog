const DEFAULT_SITE_URL = "https://example.com";

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/$/,
  ""
);

export const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION || "";

export const BING_SITE_VERIFICATION =
  process.env.BING_SITE_VERIFICATION || "";

export function withBasePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}

export function getCanonicalUrl(path: string) {
  return `${SITE_URL}${withBasePath(path)}`;
}
