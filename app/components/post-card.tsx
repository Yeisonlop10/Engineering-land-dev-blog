import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/app/lib/posts";

type PostCardProps = {
  post: PostMeta;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] ${
        featured ? "lg:grid lg:grid-cols-[1.2fr_1fr]" : ""
      }`}
    >
      <div className={`relative ${featured ? "min-h-[280px]" : "min-h-[220px]"}`}>
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 33vw"}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,var(--color-accent-soft),transparent_55%),linear-gradient(135deg,var(--color-surface-2),var(--color-surface))]" />
        )}
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--color-chip)] px-3 py-1 text-xs font-medium text-[var(--color-chip-text)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className={`${featured ? "text-3xl" : "text-2xl"} font-semibold leading-tight tracking-tight`}>
          <Link href={`/blog/${post.slug}`} className="story-link">
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 text-[var(--color-muted)]">{post.description}</p>

        <div className="mt-5 text-sm text-[var(--color-subtle)]">
          {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          {post.readingTimeMinutes ? ` · ${post.readingTimeMinutes} min read` : ""}
        </div>
      </div>
    </article>
  );
}
