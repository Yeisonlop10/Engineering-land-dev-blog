const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export const BASE_PATH =
  rawBasePath === ""
    ? ""
    : rawBasePath.startsWith("/")
      ? rawBasePath
      : `/${rawBasePath}`;

function resolveSiteUrl() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (rawSiteUrl) {
    return rawSiteUrl.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required in production so canonical URLs, sitemap.xml, and robots.txt point to the real site."
    );
  }

  const localSiteUrl = `http://localhost:3000${BASE_PATH}`;

  if (typeof console !== "undefined" && console.warn) {
    console.warn(
      `NEXT_PUBLIC_SITE_URL is not set. Falling back to ${localSiteUrl} for local development.`
    );
  }

  return localSiteUrl;
}

export const SITE_URL = resolveSiteUrl();

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
