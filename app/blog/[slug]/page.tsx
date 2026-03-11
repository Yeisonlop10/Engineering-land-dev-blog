import { getAllPostsMeta, getPostBySlug } from "@/app/lib/posts";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

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
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8">
          <p className="mb-3 text-sm text-zinc-400">
            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          <p className="mt-4 text-lg text-zinc-300">{post.description}</p>
        </div>

        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mb-10 w-full rounded-2xl border border-zinc-800"
          />
        ) : null}

        <div className="prose prose-invert prose-zinc max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}