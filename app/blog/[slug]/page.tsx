import { getAllPostsMeta, getPostBySlug } from "@/app/lib/posts";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { SiteContainer } from "@/app/components/site-container";
import { AffiliateLink } from "@/app/components/affiliate-link";

function getYouTubeEmbedUrl(rawText: string) {
  const text = rawText.trim();
  const match = text.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );

  if (!match?.[1]) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
}

function isAffiliateHref(href?: string) {
  if (!href) return false;
  return /(amzn\.|amazon\.|shareasale|impact\.com|partner|ref=)/i.test(href);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <main className="py-12 md:py-16">
      <SiteContainer className="max-w-4xl">
        <Link href="/blog" className="story-link text-sm text-[var(--color-muted)]">
          ← Back to all posts
        </Link>

        <article className="mt-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)] md:p-10">
          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--color-chip)] px-3 py-1 text-xs font-medium text-[var(--color-chip-text)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mb-3 text-sm text-[var(--color-subtle)]">
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
              {post.readingTimeMinutes ? ` · ${post.readingTimeMinutes} min read` : ""}
            </p>
            <h1 className="font-[var(--font-reading)] text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">{post.description}</p>
          </div>

          {post.containsAffiliateLinks ? (
            <p className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 text-sm text-[var(--color-muted)]">
              This post may contain affiliate links. Learn more in the <Link href="/affiliate-disclosure" className="story-link font-medium">affiliate disclosure</Link>.
            </p>
          ) : null}

          {post.coverImage ? (
            <figure className="prose-media mb-10">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1600}
                height={900}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 920px"
              />
              {post.mediaCaption ? <figcaption className="caption">{post.mediaCaption}</figcaption> : null}
            </figure>
          ) : null}

          <div className="prose-content">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => {
                  if (isAffiliateHref(href)) {
                    return <AffiliateLink href={href ?? "#"}>{children}</AffiliateLink>;
                  }

                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="story-link text-[var(--color-accent)]"
                    >
                      {children}
                    </a>
                  );
                },
                img: ({ src, alt }) => (
                  <figure className="prose-media">
                    <img src={src ?? ""} alt={alt ?? "Article media"} loading="lazy" />
                    {alt ? <figcaption className="caption">{alt}</figcaption> : null}
                  </figure>
                ),
                p: ({ children }) => {
                  const onlyChild = Array.isArray(children) ? children[0] : children;
                  if (typeof onlyChild === "string") {
                    const embedUrl = getYouTubeEmbedUrl(onlyChild);
                    if (embedUrl) {
                      return (
                        <div className="prose-media">
                          <iframe
                            title="Embedded media"
                            src={embedUrl}
                            className="embed-frame"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      );
                    }
                  }

                  return <p>{children}</p>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </SiteContainer>
    </main>
  );
}