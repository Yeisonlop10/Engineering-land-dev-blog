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

When we take on a new engineering leadership role, the first 90 days are crucial in setting the tone, building relationships, and laying the foundation for success. Here are some key things to focus on during this period:

Learn the business: Learn the business, including the products, services, and teams.
Build relationships: Build relationships with your team members, stakeholders, and colleagues.
Set the tone: Set the tone for your leadership style, values, and priorities.
Clarify expectations: Clarify expectations with your team, stakeholders, and superiors.
Identify priorities: Identify the priorities for your team and the organization.
Establish a presence: Establish a presence in your new role, including setting up your workspace and communication channels.
Focus on people: Focus on your team members, including their needs, concerns, and goals.
By focusing on these areas, we can set ourselves up for success in our new engineering leadership role and build a strong foundation for our teams and organizations.

## Focus
- Build relationships
- Understand team context
- Set clear priorities
`,
  "platform-thinking-for-growing-teams": `
# Platform Thinking for Growing Teams

As our teams grow, so do our technical debt, complexity, and maintenance needs. That's why we need to adopt a platform thinking approach to ensure that our teams can scale effectively and efficiently.

Platform thinking is all about building a foundation that can support multiple products, services, or features. It's about creating a platform that can be reused, extended, and maintained over time.

To adopt platform thinking, follow these steps:

Identify reusable components: Identify the components that can be reused across multiple products or services.
Build a foundation: Build a solid foundation that can support multiple products or services.
Modularize: Modularize your components and applications to make them reusable and maintainable.
Standardize: Standardize your processes, tools, and technologies to ensure consistency and scalability.
Monitor and adapt: Monitor your platform's performance and adapt it as needed to ensure it continues to meet the needs of your growing team.
By adopting a platform thinking approach, we can build a foundation that can support our growing teams, reduce technical debt, and improve our overall scalability and efficiency.

## Principles
- Self-service
- Standardization
- Developer experience
`,
  "incident-review-without-blame": `
# Running Incident Reviews Without Blame

When an incident occurs, it's natural to feel frustrated, stressed, or even angry. As leaders, it's our job to create an environment where we can learn from these incidents and improve our processes. That's why we need to run incident reviews without blame.

Blame is a natural human response to failure. However, it's not helpful in an incident review. Instead, we need to focus on understanding what happened, why it happened, and how we can prevent it from happening again.

To run incident reviews without blame, follow these steps:

Set the tone: Establish a tone of curiosity and inquiry, rather than accusation and blame.
Focus on the facts: Stick to the facts and avoid speculation or assumptions.
Identify root causes: Identify the underlying causes of the incident, rather than pointing fingers at specific individuals.
Discuss mitigations: Discuss the mitigations that could have prevented the incident, and how we can implement them in the future.
Create an action plan: Create a concrete action plan to prevent similar incidents from occurring in the future.
By focusing on the facts, identifying root causes, and creating an action plan, we can run incident reviews that are constructive, learning-oriented, and focused on improvement.

## Outcomes
- Better runbooks
- Better detection
- Better communication
`,
  "architecture-decisions-at-speed": `
# Making Architecture Decisions at Speed

As engineering leaders, we know that architecture decisions are crucial to the success of our products. However, these decisions often require careful consideration, debate, and consensus-building. But what if we need to make these decisions quickly, without sacrificing quality or integrity?

That's where the Lightweight Architecture Decision Record (ADR) approach comes in. An ADR is a lightweight document that captures the reasoning behind an architecture decision. It's a simple template that includes the following:

Decision: A brief summary of the decision made.
Context: The background and motivations behind the decision.
Trade-offs: A discussion of the trade-offs made in reaching the decision.
Consequences: An outline of the potential consequences of the decision.
Reviewer: The name and role of the person reviewing the decision.
Using ADRs, we can make architecture decisions at speed while maintaining transparency, accountability, and quality. Here's how:

Identify the decision: Recognize the need for an architecture decision and start the ADR process.
Gather input: Gather input from relevant stakeholders, including team members and subject matter experts.
Document the ADR: Write the ADR, following the template, and include the input gathered.
Review and validate: Review the ADR and validate the decision with the relevant stakeholders.
Implement and refine: Implement the decision and refine it as needed based on feedback and new information.
By using ADRs, we can make architecture decisions quickly, while maintaining the quality and integrity of our products.

## ADR Template
- Context
- Decision
- Consequences
`,
  "from-projects-to-product-mindset": `
# From Projects to a Product Mindset

As engineering leaders, we've all been there: managing a project, meeting deadlines, and delivering a specific set of features. But what happens when the project is complete, and we're left with a team and a product that needs to be sustained and improved over time? That's when the project mindset needs to shift to a product mindset.

A project mindset focuses on delivering a specific outcome, whereas a product mindset focuses on delivering a continuous stream of value to customers. It's the difference between building a house and building a highway. The house is a one-time delivery, whereas the highway needs constant maintenance and expansion to remain relevant.

To make this shift, we need to adopt a more long-term perspective, prioritize customer needs, and focus on delivering a continuous stream of value. This means rethinking our priorities, processes, and metrics. For example, we might shift from measuring project success by deadline completion to measuring it by customer satisfaction and retention.

As leaders, it's our job to create an environment that encourages experimentation, learning, and iteration. We need to empower our teams to take ownership of the product, make decisions quickly, and prioritize features that drive customer value. By adopting a product mindset, we can build products that truly matter to our customers and drive long-term success..

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
