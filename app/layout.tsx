import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Leadership & Infrastructure",
  description: "Notes on engineering leadership, infrastructure, and architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <header className="border-b border-zinc-800">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              Leadership & Infrastructure
            </Link>
            <nav className="flex gap-6 text-sm text-zinc-300">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-zinc-800">
          <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-zinc-400">
            © 2026 Yeison Lopez Ibarra
          </div>
        </footer>
      </body>
    </html>
  );
}