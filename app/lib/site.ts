const DEFAULT_SITE_URL = "https://example.com";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. Please configure it in production to avoid incorrect canonical URLs."
    );
  } else if (typeof console !== "undefined" && console.warn) {
    console.warn(
      `NEXT_PUBLIC_SITE_URL is not set. Falling back to default SITE_URL (${DEFAULT_SITE_URL}).`
    );
  }
}

export const SITE_URL = rawSiteUrl.replace(/\/$/, "");

const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export const BASE_PATH =
  rawBasePath === ""
    ? ""
    : rawBasePath.startsWith("/")
      ? rawBasePath
      : `/${rawBasePath}`;

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
