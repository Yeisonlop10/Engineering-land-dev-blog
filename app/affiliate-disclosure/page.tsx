import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateLink } from "@/app/components/affiliate-link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Learn how this site uses affiliate links and what that means for you as a reader.",
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="pb-16 pt-6 sm:pb-20">
      <section className="site-shell">
        <div className="glass-panel rounded-[2.5rem] px-7 py-8 sm:px-10 sm:py-12">
          <p className="eyebrow">Transparency</p>
          <h1 className="section-title mt-6">Affiliate Disclosure</h1>

          <p className="lead-copy mt-6">
            This site may contain affiliate links. If you purchase through them,
            I may earn a commission at no extra cost to you.
          </p>

          <div className="mt-8 space-y-6 text-base leading-8 muted-copy">
            <p>
              As an Amazon Associate I earn from qualifying purchases. Some
              articles include links to books, tools, or services on Amazon and
              other platforms. Clicking those links and making a purchase may
              result in a small commission being paid to this site.
            </p>

            <p>
              Affiliate commissions help cover the costs of running this blog
              and allow me to continue producing free, in-depth content on
              engineering leadership, infrastructure, and architecture. The
              commission comes at no additional cost to you — the price you pay
              is exactly the same whether you use an affiliate link or navigate
              directly to the product.
            </p>

            <p>
              I only recommend products, books, and services I have personally
              used or carefully evaluated. Affiliate relationships do not
              influence editorial decisions — if I wouldn&apos;t recommend
              something on its merits alone, it does not appear here.
            </p>

            <p>
              Where a section of an article contains affiliate links, you will
              see a short notice at the top of that section reading{" "}
              <em>&ldquo;Disclosure: Some links below are affiliate links.&rdquo;</em>
            </p>

            <p>
              If you have questions about this policy, feel free to reach out
              via the contact information on the{" "}
              <Link href="/about/" className="underline underline-offset-4">
                About page
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <h2 className="text-lg font-semibold text-[var(--text-strong)]">
              Recommended Resources
            </h2>
            <p className="text-sm leading-6 muted-copy">
              The links below illustrate how the site surfaces affiliate and
              plain resource links. Affiliate links are marked accordingly.
            </p>

            <ul className="space-y-3 text-sm leading-7 muted-copy">
              <li>
                <AffiliateLink
                  href="https://www.amazon.com/Accelerate-Software-Performing-Technology-Organizations/dp/1942788339"
                  isAffiliate
                  vendor="amazon"
                  placement="affiliate-disclosure-page"
                  resourceId="book-accelerate"
                  className="underline underline-offset-4"
                >
                  Accelerate — Nicole Forsgren, Jez Humble &amp; Gene Kim
                </AffiliateLink>{" "}
                <span className="text-xs opacity-60">(affiliate link)</span>
              </li>
              <li>
                <AffiliateLink
                  href="https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/1942788290"
                  isAffiliate
                  vendor="amazon"
                  placement="affiliate-disclosure-page"
                  resourceId="book-phoenix-project"
                  className="underline underline-offset-4"
                >
                  The Phoenix Project — Gene Kim, Kevin Behr &amp; George Spafford
                </AffiliateLink>{" "}
                <span className="text-xs opacity-60">(affiliate link)</span>
              </li>
              <li>
                <AffiliateLink
                  href="https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"
                  vendor="aws"
                  placement="affiliate-disclosure-page"
                  resourceId="aws-well-architected-framework"
                  className="underline underline-offset-4"
                >
                  AWS Well-Architected Framework
                </AffiliateLink>{" "}
                <span className="text-xs opacity-60">(free resource)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
