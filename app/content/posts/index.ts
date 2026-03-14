import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { Post, PostMeta } from "./types";

const POSTS_DIRECTORY = path.join(process.cwd(), "app/content/posts/entries");
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"]);

function getSlugFromFilename(filename: string) {
  return path.basename(filename, path.extname(filename));
}

function readRequiredString(
  value: unknown,
  field: keyof PostMeta,
  slug: string
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid or missing "${field}" frontmatter for post "${slug}"`);
  }

  return value;
}

function readOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string" || value.trim().length === 0) {
    return undefined;
  }

  return value;
}

function readStringArray(value: unknown, slug: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Invalid "tags" frontmatter for post "${slug}"`);
  }

  return value;
}

function readOptionalNumber(value: unknown, slug: string): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  throw new Error(`Invalid "readingTimeMinutes" frontmatter for post "${slug}"`);
}

function readPublishedAt(value: unknown, slug: string): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  throw new Error(`Invalid or missing "publishedAt" frontmatter for post "${slug}"`);
}

function toPostMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug: readRequiredString(data.slug ?? slug, "slug", slug),
    title: readRequiredString(data.title, "title", slug),
    description: readRequiredString(data.description, "description", slug),
    publishedAt: readPublishedAt(data.publishedAt, slug),
    tags: readStringArray(data.tags, slug),
    pillar: readOptionalString(data.pillar),
    coverImage: readOptionalString(data.coverImage),
    author: readOptionalString(data.author),
    readingTimeMinutes: readOptionalNumber(data.readingTimeMinutes, slug),
  };
}

function parsePostFile(source: string, slug: string): Post {
  const parsed = matter(source);
  const meta = toPostMeta(slug, parsed.data as Record<string, unknown>);

  return {
    ...meta,
    content: parsed.content.trim(),
  };
}

function toPostMetaOnly(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    tags: post.tags,
    pillar: post.pillar,
    coverImage: post.coverImage,
    author: post.author,
    readingTimeMinutes: post.readingTimeMinutes,
  };
}

async function listPostFiles(): Promise<string[]> {
  const entries = await readdir(POSTS_DIRECTORY, { withFileTypes: true });

  return entries
    .filter(
      (entry) => entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name))
    )
    .map((entry) => entry.name)
    .sort();
}

async function readPostSourceBySlug(slug: string): Promise<string | null> {
  for (const extension of SUPPORTED_EXTENSIONS) {
    const filePath = path.join(POSTS_DIRECTORY, `${slug}${extension}`);

    try {
      return await readFile(filePath, "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  return null;
}

export async function getLocalPostsMeta(): Promise<PostMeta[]> {
  const fileNames = await listPostFiles();
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const source = await readFile(path.join(POSTS_DIRECTORY, fileName), "utf8");
      return parsePostFile(source, getSlugFromFilename(fileName));
    })
  );

  return posts.map(toPostMetaOnly);
}

export async function getLocalPostBySlug(slug: string): Promise<Post | null> {
  const source = await readPostSourceBySlug(slug);

  if (!source) {
    return null;
  }

  return parsePostFile(source, slug);
}
