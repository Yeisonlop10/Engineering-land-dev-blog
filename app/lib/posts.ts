import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  coverImage?: string;
  author?: string;
  readingTimeMinutes?: number;
};

export type Post = PostMeta & {
  content: string;
};

const BASE_URL = process.env.GCS_PUBLIC_BASE_URL!;

const LOCAL_POST_CONTENT: Record<string, string> = {
  "engineering-leadership-first-90-days": `
# Engineering Leadership: The First 90 Days

The first 90 days are about trust, clarity, and momentum.

## Focus
- Build relationships
- Understand team context
- Set clear priorities
`,
  "platform-thinking-for-growing-teams": `
# Platform Thinking for Growing Teams

Internal platforms reduce cognitive load and increase delivery speed.

## Principles
- Self-service
- Standardization
- Developer experience
`,
  "incident-review-without-blame": `
# Running Incident Reviews Without Blame

Blameless reviews improve reliability and learning culture.

## Outcomes
- Better runbooks
- Better detection
- Better communication
`,
  "architecture-decisions-at-speed": `
# Making Architecture Decisions at Speed

Use lightweight ADRs to align teams and move quickly.

## ADR Template
- Context
- Decision
- Consequences
`,
  "from-projects-to-product-mindset": `
# From Projects to a Product Mindset

Teams scale better when they own outcomes, not only output.

## Shift
- From delivery dates to customer impact
- From temporary squads to long-lived ownership
`,
};

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

// export async function getAllPostsMeta(): Promise<PostMeta[]> {
//   const text = await fetchText(`${BASE_URL}/posts/index.json`);
//   const posts = JSON.parse(text) as PostMeta[];

//   return posts.sort(
//     (a, b) =>
//       new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
//   );
// }

const posts: PostMeta[] = [
    {
      slug: "engineering-leadership-first-90-days",
      title: "Engineering Leadership: The First 90 Days",
      description: "A practical framework to build trust, clarity, and momentum as a new engineering leader.",
      publishedAt: "2026-01-15",
      tags: ["Leadership", "Management", "Teams"],
      coverImage: "/images/first-90-days.svg",
      author: "Yeison Lopez",
      readingTimeMinutes: 8,
    },
    {
      slug: "platform-thinking-for-growing-teams",
      title: "Platform Thinking for Growing Teams",
      description: "How internal platforms reduce cognitive load and increase delivery speed across teams.",
      publishedAt: "2026-01-29",
      tags: ["Infrastructure", "Platform", "Scaling"],
      coverImage: "/images/platform-thinking.svg",
      author: "Yeison Lopez",
      readingTimeMinutes: 10,
    },
    {
      slug: "incident-review-without-blame",
      title: "Running Incident Reviews Without Blame",
      description: "Techniques to improve reliability and learning culture through actionable post-incident reviews.",
      publishedAt: "2026-02-12",
      tags: ["Reliability", "SRE", "Culture"],
      coverImage: "/images/incident-review.svg",
      author: "Yeison Lopez",
      readingTimeMinutes: 7,
    },
    {
      slug: "architecture-decisions-at-speed",
      title: "Making Architecture Decisions at Speed",
      description: "A lightweight ADR approach for balancing long-term architecture with near-term delivery.",
      publishedAt: "2026-02-26",
      tags: ["Architecture", "Decision Making", "Delivery"],
      coverImage: "/images/architecture-speed.svg",
      author: "Yeison Lopez",
      readingTimeMinutes: 9,
    },
    {
      slug: "from-projects-to-product-mindset",
      title: "From Projects to a Product Mindset",
      description: "Why engineering organizations scale better when teams own outcomes, not just output.",
      publishedAt: "2026-03-05",
      tags: ["Product", "Leadership", "Strategy"],
      coverImage: "/images/product-mindset.svg",
      author: "Yeison Lopez",
      readingTimeMinutes: 6,
    },
  ];


export async function getAllPostsMeta(): Promise<PostMeta[]> {
  return posts.sort(
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

  const local = LOCAL_POST_CONTENT[slug];
  if (!local) {
    throw new Error(`No local temp content found for slug: ${slug}`);
  }

  const parsed = matter(local);
  return {
    ...meta,
    content: parsed.content,
  };
}

// export async function getPostBySlug(slug: string): Promise<Post> {
//   const posts = await getAllPostsMeta();
//   const meta = posts.find((p) => p.slug === slug);

//   if (!meta) {
//     throw new Error(`Post not found for slug: ${slug}`);
//   }

//   const md = await fetchText(`${BASE_URL}/posts/${slug}.md`);
//   const parsed = matter(md);

//   return {
//     ...meta,
//     content: parsed.content,
//   };
// }
