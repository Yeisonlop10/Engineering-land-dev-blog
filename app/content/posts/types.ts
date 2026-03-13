export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  pillar?: string;
  coverImage?: string;
  author?: string;
  readingTimeMinutes?: number;
};

export type Post = PostMeta & {
  content: string;
};

export type LocalPost = Post;
