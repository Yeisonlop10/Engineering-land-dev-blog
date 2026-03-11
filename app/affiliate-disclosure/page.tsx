import { SiteContainer } from "@/app/components/site-container";

export default function AffiliateDisclosurePage() {
  return (
    <main className="py-14 md:py-20">
      <SiteContainer className="max-w-3xl">
        <h1 className="font-[var(--font-reading)] text-4xl font-semibold tracking-tight">Affiliate Disclosure</h1>
        <p className="mt-6 leading-8 text-[var(--color-muted)]">
          Some posts include affiliate links. If you click one of these links and make a purchase, I may earn a
          small commission at no additional cost to you.
        </p>
        <p className="mt-4 leading-8 text-[var(--color-muted)]">
          I only recommend books, products, and tools that I have evaluated and that I believe can be useful for
          engineering leaders and teams.
        </p>
      </SiteContainer>
    </main>
  );
}
