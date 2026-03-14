import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, BookOpenText, Clock3, Layers3, NotebookPen } from "lucide-react";

import { getPosterStyle } from "@/app/lib/presentation";
import {
  getAllPostsMeta,
  getPillarBySlug,
  getPillarHref,
  getPostHref,
  getPostsByPillar,
  PILLARS,
} from "@/app/lib/posts";
import { getCanonicalUrl } from "@/app/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

export default async function HomePage() {
  const posts = await getAllPostsMeta();
  const [featuredPost, ...restPosts] = posts;
  const totalReadingTime = posts.reduce(
    (sum, post) => sum + (post.readingTimeMinutes ?? 0),
    0
  );
  const featuredPillar = featuredPost?.pillar
    ? getPillarBySlug(featuredPost.pillar)
    : undefined;

  const pillarCounts = await Promise.all(
    PILLARS.map(async (pillar) => {
      const pillarPosts = await getPostsByPillar(pillar.slug);
      return { pillar, count: pillarPosts.length };
    })
  );

  return (
    <main className="pb-16 pt-6 sm:pb-20">
      <section className="site-shell">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel subtle-grid rounded-[2.5rem] px-7 py-8 sm:px-10 sm:py-12">
            <p className="eyebrow">Leadership, platforms, and architecture</p>
            <h1 className="display-title mt-6">
              Notes for engineering leaders building durable systems.
            </h1>
            <p className="lead-copy mt-6">
              A modern engineering blog for practical lessons on team design,
              platform strategy, reliability, and the operating habits that
              help organizations scale without losing clarity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="metric-pill">
                <NotebookPen className="h-4 w-4 text-[var(--accent-strong)]" />
                {posts.length} published essays
              </span>
              <span className="metric-pill">
                <Clock3 className="h-4 w-4 text-[var(--accent-strong)]" />
                {totalReadingTime} minutes of reading
              </span>
              <span className="metric-pill">
                <Layers3 className="h-4 w-4 text-[var(--accent-strong)]" />
                Leadership to infrastructure
              </span>
            </div>
          </div>

          {featuredPost ? (
            <article className="glass-panel post-card rounded-[2.3rem] p-4 sm:p-5">
              <div
                className="poster-frame min-h-[23rem]"
                style={getPosterStyle(featuredPost.coverImage)}
              >
                <div className="poster-content">
                  <p className="poster-kicker">Latest essay</p>
                  <h2 className="poster-title">{featuredPost.title}</h2>
                </div>
              </div>

              <div className="px-2 pb-2 pt-6">
                <div className="flex flex-wrap gap-2">
                  {featuredPillar ? (
                    <Link
                      href={getPillarHref(featuredPillar.slug)}
                      className="tag-pill transition-opacity hover:opacity-70"
                    >
                      {featuredPillar.title}
                    </Link>
                  ) : null}
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-base leading-7 muted-copy">
                  {featuredPost.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="meta-pill">
                    <BookOpenText className="h-4 w-4 text-[var(--accent-strong)]" />
                    {format(new Date(featuredPost.publishedAt), "MMMM d, yyyy")}
                  </span>
                  {featuredPost.readingTimeMinutes ? (
                    <span className="meta-pill">
                      <Clock3 className="h-4 w-4 text-[var(--accent-strong)]" />
                      {featuredPost.readingTimeMinutes} min read
                    </span>
                  ) : null}
                </div>

                <Link
                  href={getPostHref(featuredPost.slug)}
                  aria-label={`Read the essay ${featuredPost.title}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:translate-x-1"
                >
                  Read {featuredPost.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="site-shell mt-8 sm:mt-10">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8">
          <p className="eyebrow">Browse by topic</p>
          <h2 className="section-title mt-2">Four pillars of practice.</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillarCounts.map(({ pillar, count }) => (
            <Link
              key={pillar.slug}
              href={getPillarHref(pillar.slug)}
              aria-label={`Explore essays on ${pillar.title}`}
              className="glass-panel pillar-card rounded-[1.75rem] p-6 transition-transform hover:-translate-y-1"
            >
              <p className="eyebrow">Pillar</p>
              <h3 className="pillar-card-title mt-3">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 muted-copy">
                {pillar.description}
              </p>
              <p className="pillar-card-count mt-4">
                {count} {count === 1 ? "essay" : "essays"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell mt-8 sm:mt-10">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Recent writing</p>
            <h2 className="section-title mt-4">
              Practical lessons for leading teams and shaping systems.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 muted-copy">
            These essays focus on the decisions that matter as organizations
            grow: how to build trust, reduce complexity, improve reliability,
            and create engineering systems that can scale without losing
            direction.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {restPosts.map((post) => (
            <article
              key={post.slug}
              className="glass-panel post-card rounded-[2rem] p-4 sm:p-5"
            >
              <div
                className="poster-frame min-h-[15rem]"
                style={getPosterStyle(post.coverImage)}
              >
                <div className="poster-content">
                  <p className="poster-kicker">Essay</p>
                  <h3 className="poster-title">{post.title}</h3>
                </div>
              </div>

              <div className="px-1 pb-1 pt-5">
                <div className="flex flex-wrap gap-2">
                  {post.pillar ? (
                    <Link
                      href={getPillarHref(post.pillar)}
                      className="tag-pill transition-opacity hover:opacity-70"
                    >
                      {getPillarBySlug(post.pillar)?.title ?? post.pillar}
                    </Link>
                  ) : null}
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-base leading-7 muted-copy">
                  {post.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="meta-pill">
                    <BookOpenText className="h-4 w-4 text-[var(--accent-strong)]" />
                    {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                  </span>
                  {post.readingTimeMinutes ? (
                    <span className="meta-pill">
                      <Clock3 className="h-4 w-4 text-[var(--accent-strong)]" />
                      {post.readingTimeMinutes} min read
                    </span>
                  ) : null}
                </div>

                <Link
                  href={getPostHref(post.slug)}
                  aria-label={`Read the essay ${post.title}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:translate-x-1"
                >
                  Read {post.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
