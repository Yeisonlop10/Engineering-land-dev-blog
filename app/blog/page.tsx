import { getAllPostsMeta } from "@/app/lib/posts";
import { PostCard } from "@/app/components/post-card";
import { SiteContainer } from "@/app/components/site-container";

export const metadata = {
  title: "Blog",
  description: "Engineering leadership, infrastructure, and architecture posts.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPostsMeta();

  return (
    <main className="py-12 md:py-16">
      <SiteContainer>
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-subtle)]">Blog Archive</p>
          <h1 className="mt-3 font-[var(--font-reading)] text-4xl font-semibold tracking-tight md:text-5xl">
            Strategy, systems, and leadership
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </SiteContainer>
    </main>
  );
}
