import "./globals.css";
import Link from "next/link";

import { GoogleAnalytics } from "@/app/components/google-analytics";
import { GoogleAnalyticsPageViews } from "@/app/components/google-analytics-page-views";

export const metadata = {
  title: "Leadership & Infrastructure",
  description: "Notes on engineering leadership, infrastructure, and architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
                  Latest posts
                </Link>
                <Link href="/about/" className="nav-link !px-0">
                  About
                </Link>
                <span className="muted-copy">© 2026 Yeison Lopez Ibarra</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
