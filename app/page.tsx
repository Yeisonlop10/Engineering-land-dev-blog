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
import { format } from "date-fns";

export default async function HomePage() {
  const posts = await getAllPostsMeta();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-zinc-400">
            Leadership • Infrastructure • Architecture
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Leadership & Infrastructure Notes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Lessons from engineering leadership, platform work, reliability,
            architecture, and scaling teams.
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-zinc-200 underline-offset-4 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 text-zinc-300">{post.description}</p>

              <div className="mt-4 text-sm text-zinc-400">
                {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                {post.readingTimeMinutes
                  ? ` • ${post.readingTimeMinutes} min read`
                  : ""}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}