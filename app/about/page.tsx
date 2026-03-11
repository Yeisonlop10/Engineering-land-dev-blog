import { SiteContainer } from "@/app/components/site-container";

export default function AboutPage() {
  return (
    <main className="py-12 md:py-16">
      <SiteContainer className="max-w-3xl">
        <h1 className="font-[var(--font-reading)] text-4xl font-semibold tracking-tight">About</h1>
        <p className="mt-5 leading-8 text-[var(--color-muted)]">
          I write about engineering leadership, infrastructure, platform thinking, reliability, and building systems
          that scale.
        </p>
      </SiteContainer>
    </main>
  );
}