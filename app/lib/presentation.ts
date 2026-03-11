import type { CSSProperties } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function resolveAssetUrl(path?: string) {
  if (!path) {
    return undefined;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${basePath}${path}`;
}

export function getPosterStyle(path?: string): CSSProperties {
  const resolved = resolveAssetUrl(path);
  const layers = [
    "radial-gradient(circle at top right, rgba(45, 212, 191, 0.28), transparent 32%)",
    "radial-gradient(circle at bottom left, rgba(217, 119, 6, 0.26), transparent 28%)",
    "linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(17, 94, 89, 0.78) 48%, rgba(245, 158, 11, 0.34) 125%)",
  ];

  if (resolved) {
    layers.push(`url("${resolved}")`);
  }

  return {
    backgroundImage: layers.join(", "),
  };
}
