// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


import Link from "next/link";
import { getAllPostsMeta } from "@/app/lib/posts";
import { SiteContainer } from "@/app/components/site-container";
import { PostCard } from "@/app/components/post-card";

export default async function HomePage() {
  const posts = await getAllPostsMeta();
  const [featured, ...latest] = posts;

  return (
    <main className="py-10 md:py-16">
      <SiteContainer>
        <section className="mb-12 rounded-3xl border border-[var(--color-border)] bg-[color:color-mix(in_oklab,var(--color-surface)_78%,white_22%)] p-8 shadow-[var(--shadow-soft)] md:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-subtle)] md:text-sm">
            Leadership • Infrastructure • Architecture
          </p>
          <h1 className="font-[var(--font-reading)] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Field Notes for Engineering Leaders
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            Practical ideas on scaling teams, shaping platform strategy, and improving reliability without losing the
            human side of engineering.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-white transition hover:brightness-110"
            >
              Explore All Posts
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2 text-sm font-medium"
            >
              About the Author
            </Link>
          </div>
        </section>

        {featured ? (
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-[var(--font-reading)] text-2xl font-semibold md:text-3xl">Featured</h2>
            </div>
            <PostCard post={featured} featured />
          </section>
        ) : null}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[var(--font-reading)] text-2xl font-semibold md:text-3xl">Latest Articles</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </SiteContainer>
    </main>
  );
}