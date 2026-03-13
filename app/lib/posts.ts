import matter from "gray-matter";
import { LOCAL_POSTS_BY_SLUG, LOCAL_POSTS_META } from "@/app/content/posts";
import type { Post, PostMeta } from "@/app/content/posts/types";

export type { Post, PostMeta } from "@/app/content/posts/types";

export type Pillar = {
  slug: string;
  title: string;
  description: string;
};

export const PILLARS: Pillar[] = [
  {
    slug: "engineering-leadership",
    title: "Engineering Leadership",
    description:
      "Practical insights on leading engineering teams, building trust, and creating clarity at scale.",
  },
  {
    slug: "architecture-infrastructure",
    title: "Architecture / Infrastructure",
    description:
      "Patterns for building resilient platforms, making sound architectural decisions, and scaling reliably.",
  },
  {
    slug: "career-growth",
    title: "Career Growth for Senior Engineers",
    description:
      "Navigating the path from senior engineer to staff, principal, and beyond — growing without losing craft.",
  },
  {
    slug: "renewable-energy",
    title: "Renewable Energy",
    description:
      "Engineering challenges and opportunities at the intersection of software and sustainable energy systems.",
  },
];

export function getPillarBySlug(pillarSlug: string) {
  return PILLARS.find((pillar) => pillar.slug === pillarSlug);
}

export function getPostHref(slug: string) {
  return `/blog/${slug}/`;
}

export function getPillarHref(slug: string) {
  return `/pillars/${slug}/`;
}
const BASE_URL = process.env.GCS_PUBLIC_BASE_URL;

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    // For static export, this is resolved at build time
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  return res.text();
}

const posts: PostMeta[] = LOCAL_POSTS_META;

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const posts = await getAllPostsMeta();
  const meta = posts.find((p) => p.slug === slug);

  if (!meta) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  // 1) Try GCS when configured
  if (BASE_URL) {
    try {
      const md = await fetchText(`${BASE_URL}/posts/${slug}.md`);
      const parsed = matter(md);
      return {
        ...meta,
        content: parsed.content,
      };
    } catch {
      // 2) Fall back to local temp content
    }
  }

  const localPost = LOCAL_POSTS_BY_SLUG[slug];
  if (!localPost) {
    throw new Error(`No local temp content found for slug: ${slug}`);
  }

  const parsed = matter(localPost.content);
  return {
    ...meta,
    content: parsed.content,
  };
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3
): Promise<PostMeta[]> {
  const allPosts = await getAllPostsMeta();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  const others = allPosts.filter((p) => p.slug !== currentSlug);

  // Score: +2 for same pillar, +1 for each shared tag
  const scored = others.map((post) => {
    let score = 0;
    if (currentPost.pillar && post.pillar === currentPost.pillar) score += 2;
    for (const tag of currentPost.tags) {
      if (post.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        new Date(b.post.publishedAt).getTime() -
        new Date(a.post.publishedAt).getTime()
      );
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export async function getPostsByPillar(pillarSlug: string): Promise<PostMeta[]> {
  const allPosts = await getAllPostsMeta();
  return allPosts.filter((p) => p.pillar === pillarSlug);
}
