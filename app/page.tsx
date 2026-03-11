import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, BookOpenText, Clock3, Layers3, NotebookPen } from "lucide-react";

import { getPosterStyle } from "@/app/lib/presentation";
import { getAllPostsMeta } from "@/app/lib/posts";

export default async function HomePage() {
  const posts = await getAllPostsMeta();
  const [featuredPost, ...restPosts] = posts;
  const totalReadingTime = posts.reduce(
    (sum, post) => sum + (post.readingTimeMinutes ?? 0),
    0
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
                  href={`/blog/${featuredPost.slug}/`}
                  aria-label={`Read the essay ${featuredPost.title}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:translate-x-1"
                >
                  Read the essay
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="site-shell mt-8 sm:mt-10">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Recent writing</p>
            <h2 className="section-title mt-4">A cleaner reading experience for every post.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 muted-copy">
            The card system below is designed to scale cleanly as the blog grows
            and to keep tags, metadata, affiliate references, and future media
            previews visually consistent.
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
                  href={`/blog/${post.slug}/`}
                  aria-label={`Open article ${post.title}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:translate-x-1"
                >
                  Open article
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
