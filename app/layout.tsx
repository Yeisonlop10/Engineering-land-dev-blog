import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

import { GoogleAnalytics } from "@/app/components/google-analytics";
import { GoogleAnalyticsPageViews } from "@/app/components/google-analytics-page-views";
import { getAllPostsMeta, getPillarHref, getPillarBySlug } from "@/app/lib/posts";
import {
  BING_SITE_VERIFICATION,
  GOOGLE_SITE_VERIFICATION,
  getCanonicalUrl,
  SITE_URL,
} from "@/app/lib/site";

function getMetadataBase(): URL {
  try {
    return new URL(SITE_URL);
  } catch {
    throw new Error(
      `Invalid SITE_URL value "${SITE_URL}". SITE_URL must be an absolute URL including the scheme, such as "https://your-domain.com".`
    );
  }
}

export const metadata: Metadata = {
  title: "Leadership & Infrastructure",
  description: "Notes on engineering leadership, infrastructure, and architecture.",
  metadataBase: getMetadataBase(),
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  verification:
    (GOOGLE_SITE_VERIFICATION || BING_SITE_VERIFICATION)
      ? {
          ...(GOOGLE_SITE_VERIFICATION
            ? { google: GOOGLE_SITE_VERIFICATION }
            : {}),
          ...(BING_SITE_VERIFICATION
            ? { other: { "msvalidate.01": BING_SITE_VERIFICATION } }
            : {}),
        }
      : undefined,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const posts = await getAllPostsMeta();
  const linkedPillars = Array.from(
    new Set(
      posts
        .map((post) => post.pillar)
        .filter((pillarSlug): pillarSlug is string => Boolean(pillarSlug))
    )
  ).flatMap((pillarSlug) => {
    const pillar = getPillarBySlug(pillarSlug);
    return pillar ? [pillar] : [];
  });

  return (
    <html lang="en">
      <body className="antialiased">
        <GoogleAnalytics />
        <GoogleAnalyticsPageViews />
        <div className="page-backdrop" aria-hidden="true" />

        <header className="sticky top-0 z-40 pt-4">
          <div className="site-shell">
            <div className="glass-panel flex flex-col gap-4 rounded-[2rem] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <Link href="/" className="flex items-center gap-4">
                <div className="brand-mark">Yeison Lopez</div>
                <span>
                  <span className="eyebrow mb-2">Independent engineering writing</span>
                  <span className="brand-copy block">Leadership & Engineering</span>
                </span>
              </Link>

              <nav className="flex flex-wrap items-center gap-2">
                <Link href="/" className="nav-link">
                  Home
                </Link>
                <Link href="/about/" className="nav-link">
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="pb-10 pt-4">
          <div className="site-shell">
            <div className="glass-panel flex flex-col gap-5 rounded-[2rem] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Built for long-form reading</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 muted-copy">
                  Essays on leadership, infrastructure, architecture, and the
                  operating systems behind healthy engineering organizations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link href="/" className="nav-link !px-0">
                  Browse all essays
                </Link>
                <Link href="/about/" className="nav-link !px-0">
                  About
                </Link>
                {linkedPillars.map((pillar) => (
                  <Link
                    key={pillar.slug}
                    href={getPillarHref(pillar.slug)}
                    className="nav-link !px-0"
                  >
                    {pillar.title}
                  </Link>
                ))}
                <span className="muted-copy">© 2026 Yeison Lopez Ibarra</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
