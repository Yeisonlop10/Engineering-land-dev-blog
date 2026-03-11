import Link from "next/link";
import { getAllPostsMeta, getPostBySlug } from "@/app/lib/posts";
import { getPosterStyle } from "@/app/lib/presentation";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { ArrowLeft, Clock3, UserRound } from "lucide-react";

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
    <main className="pb-16 pt-6 sm:pb-20">
      <article className="site-shell max-w-4xl">
        <div className="glass-panel rounded-[2.5rem] px-6 py-6 sm:px-10 sm:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] transition-transform hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>

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
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
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
