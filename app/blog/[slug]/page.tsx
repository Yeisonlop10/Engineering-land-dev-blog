import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPostsMeta,
  getPillarBySlug,
  getPillarHref,
  getPostBySlug,
  getRelatedPosts,
} from "@/app/lib/posts";
import { getPosterStyle } from "@/app/lib/presentation";
import { getCanonicalUrl } from "@/app/lib/site";
import { RelatedPosts } from "@/app/components/related-posts";
import { AffiliateLink } from "@/app/components/affiliate-link";
import ReactMarkdown, { type Components } from "react-markdown";
import { format } from "date-fns";
import { ArrowLeft, Clock3, UserRound } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Build the ReactMarkdown component map for a given article slug.
 *
 * External link metadata is encoded in the standard Markdown title attribute:
 *   - `[text](url "affiliate:vendor")` → affiliate link, fires affiliate_click
 *   - `[text](url "affiliate")`        → affiliate link, no vendor specified
 *   - `[text](url "resource:id")`      → resource link with id, fires resource_click
 *   - `[text](url "resource")`         → resource link, no id, fires resource_click
 *   - `[text](url)`                    → resource link, no metadata, fires resource_click
 */
function makeMarkdownComponents(articleSlug: string): Components {
  return {
    a({ href, children, title, ...props }) {
      if (!href) {
        return <span>{children}</span>;
      }

      // Internal links use Next.js Link for client-side navigation
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={props.className}>
            {children}
          </Link>
        );
      }

      // External links — parse optional title for affiliate/resource metadata
      let isAffiliate = false;
      let vendor: string | undefined;
      let resourceId: string | undefined;

      if (title) {
        const [kind, ...rest] = title.split(":");
        const value = rest.join(":") || undefined;
        if (kind === "affiliate") {
          isAffiliate = true;
          vendor = value;
        } else if (kind === "resource") {
          resourceId = value;
        }
      }

      return (
        <AffiliateLink
          href={href}
          isAffiliate={isAffiliate}
          vendor={vendor}
          placement="post-body"
          articleSlug={articleSlug}
          resourceId={resourceId}
          className={props.className}
        >
          {children}
        </AffiliateLink>
      );
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: getCanonicalUrl(`/blog/${post.slug}/`),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug),
  ]);

  const pillar = post.pillar ? getPillarBySlug(post.pillar) : undefined;
  const markdownComponents = makeMarkdownComponents(slug);

  return (
    <main className="pb-16 pt-6 sm:pb-20">
      <article className="site-shell max-w-4xl">
        <div className="glass-panel rounded-[2.5rem] px-6 py-6 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:-translate-x-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
            {pillar ? (
              <Link
                href={getPillarHref(pillar.slug)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-opacity hover:opacity-70"
              >
                <span className="tag-pill">More from {pillar.title}</span>
              </Link>
            ) : null}
          </div>

          <header className="mt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="article-title mt-6">{post.title}</h1>
            <p className="lead-copy mt-5 max-w-3xl">{post.description}</p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="meta-pill">
                <BookMetaDate publishedAt={post.publishedAt} />
              </span>

              {post.readingTimeMinutes ? (
                <span className="meta-pill">
                  <Clock3 className="h-4 w-4 text-[var(--accent-strong)]" />
                  {post.readingTimeMinutes} min read
                </span>
              ) : null}

              {post.author ? (
                <span className="meta-pill">
                  <UserRound className="h-4 w-4 text-[var(--accent-strong)]" />
                  {post.author}
                </span>
              ) : null}
            </div>
          </header>

          <div
            className="poster-frame mt-8 min-h-[20rem] sm:min-h-[26rem]"
            style={getPosterStyle(post.coverImage)}
          >
            <div className="poster-content">
              <p className="poster-kicker">Long-form essay</p>
              <p className="poster-title">{post.title}</p>
            </div>
          </div>

          <div className="article-prose mt-10">
            <ReactMarkdown components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>

          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>
    </main>
  );
}

function BookMetaDate({ publishedAt }: { publishedAt: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-[var(--accent)]"
      />
      {format(new Date(publishedAt), "MMMM d, yyyy")}
    </>
  );
}
