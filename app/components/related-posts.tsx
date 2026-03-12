import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, BookOpenText, Clock3 } from "lucide-react";
import { getPosterStyle } from "@/app/lib/presentation";
import { getPostHref, type PostMeta } from "@/app/lib/posts";

type Props = {
  posts: PostMeta[];
};

export function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <aside className="related-posts mt-14">
      <div className="related-posts-header">
        <p className="eyebrow">Continue reading</p>
        <h2 className="related-posts-title mt-3">Related essays</h2>
      </div>

      <div className="related-posts-grid mt-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="glass-panel post-card related-post-card rounded-[1.75rem] p-4"
          >
            <div
              className="poster-frame min-h-[11rem]"
              style={getPosterStyle(post.coverImage)}
            >
              <div className="poster-content">
                <p className="poster-kicker">Essay</p>
                <h3 className="poster-title">{post.title}</h3>
              </div>
            </div>

            <div className="px-1 pb-1 pt-4">
              <p className="text-sm leading-6 muted-copy line-clamp-2">
                {post.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <span className="meta-pill">
                  <BookOpenText className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
                  {format(new Date(post.publishedAt), "MMM d, yyyy")}
                </span>
                {post.readingTimeMinutes ? (
                  <span className="meta-pill">
                    <Clock3 className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
                    {post.readingTimeMinutes} min read
                  </span>
                ) : null}
              </div>

              <Link
                href={getPostHref(post.slug)}
                aria-label={`Read related essay: ${post.title}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:translate-x-1"
              >
                Read {post.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
