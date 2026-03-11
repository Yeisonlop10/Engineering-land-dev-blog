import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";

type AffiliateLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function AffiliateLink({ href, children, className = "" }: AffiliateLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="sponsored nofollow noreferrer"
      className={`affiliate-link inline-flex items-center gap-1 ${className}`}
    >
      <span>{children}</span>
      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-muted)]">
        Affiliate
        <ExternalLink size={12} />
      </span>
    </Link>
  );
}
