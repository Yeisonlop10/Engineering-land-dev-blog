import "./globals.css";
import Link from "next/link";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { SiteContainer } from "@/app/components/site-container";
import type { Metadata } from "next";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-ui",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-reading",
});

export const metadata: Metadata = {
  title: "Leadership & Infrastructure",
  description: "Notes on engineering leadership, infrastructure, and architecture.",
  metadataBase: new URL("https://yeisonlopez.github.io/EngLeadershipBlog"),
  openGraph: {
    title: "Leadership & Infrastructure",
    description: "Notes on engineering leadership, infrastructure, and architecture.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership & Infrastructure",
    description: "Notes on engineering leadership, infrastructure, and architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sourceSerif.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[color:color-mix(in_oklab,var(--color-bg)_88%,white_12%)]/95 backdrop-blur">
          <SiteContainer className="flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Leadership & Infrastructure Journal
            </Link>
            <nav className="flex gap-6 text-sm text-[var(--color-muted)]">
              <Link href="/" className="story-link">
                Home
              </Link>
              <Link href="/blog" className="story-link">
                Blog
              </Link>
              <Link href="/about" className="story-link">
                About
              </Link>
            </nav>
          </SiteContainer>
        </header>

        <div id="main-content">{children}</div>

        <footer className="mt-20 border-t border-[var(--color-border)]">
          <SiteContainer className="flex flex-col gap-4 py-8 text-sm text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
            <p>© 2026 Yeison Lopez Ibarra</p>
            <div className="flex items-center gap-5">
              <Link href="/affiliate-disclosure" className="story-link">
                Affiliate Disclosure
              </Link>
              <Link href="/about" className="story-link">
                Contact
              </Link>
            </div>
          </SiteContainer>
        </footer>
      </body>
    </html>
  );
}