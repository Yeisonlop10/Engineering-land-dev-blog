import type { MetadataRoute } from "next";

import { getAllPostsMeta, PILLARS } from "@/app/lib/posts";
import { getCanonicalUrl } from "@/app/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsMeta();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getCanonicalUrl("/about/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const pillarRoutes: MetadataRoute.Sitemap = PILLARS.map((pillar) => ({
    url: getCanonicalUrl(`/pillars/${pillar.slug}/`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: getCanonicalUrl(`/blog/${post.slug}/`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...pillarRoutes, ...postRoutes];
}
