import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, BookOpenText, Clock3, Layers3 } from "lucide-react";

import { getPosterStyle } from "@/app/lib/presentation";
import { PILLARS, getPostsByPillar } from "@/app/lib/posts";

type Props = {
  params: Promise<{ pillar: string }>;
};

export async function generateStaticParams() {
  return PILLARS.map((pillar) => ({ pillar: pillar.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { pillar: pillarSlug } = await params;
  const pillar = PILLARS.find((p) => p.slug === pillarSlug);

  if (!pillar) return {};

  return {
    title: pillar.title,
    description: pillar.description,
  };
}

export default async function PillarPage({ params }: Props) {
  const { pillar: pillarSlug } = await params;
  const pillar = PILLARS.find((p) => p.slug === pillarSlug);

  if (!pillar) notFound();

  const posts = await getPostsByPillar(pillarSlug);

  return (
    <main className="pb-16 pt-6 sm:pb-20">
      <section className="site-shell">
        <div className="glass-panel subtle-grid rounded-[2.5rem] px-7 py-8 sm:px-10 sm:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            All topics
          </Link>

          <p className="eyebrow mt-8">Topic pillar</p>
          <h1 className="section-title mt-4">{pillar.title}</h1>
          <p className="lead-copy mt-5 max-w-2xl">{pillar.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="metric-pill">
              <Layers3 className="h-4 w-4 text-[var(--accent-strong)]" />
              {posts.length} {posts.length === 1 ? "essay" : "essays"} in this
              topic
            </span>
          </div>
        </div>
      </section>

      <section className="site-shell mt-8 sm:mt-10">
        {posts.length === 0 ? (
          <div className="glass-panel rounded-[2rem] px-8 py-12 text-center">
            <p className="lead-copy mx-auto">
              No essays published in this topic yet. Check back soon.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:translate-x-1"
            >
              Browse all essays
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
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
                    <h2 className="poster-title">{post.title}</h2>
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
                    aria-label={`Read the essay: ${post.title}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:translate-x-1"
                  >
                    Read the essay
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
