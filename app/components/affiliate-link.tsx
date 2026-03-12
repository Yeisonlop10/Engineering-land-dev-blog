"use client";

import { trackAffiliateClick, trackResourceClick } from "@/app/lib/gtag";

type Props = {
  href: string;
  isAffiliate?: boolean;
  vendor?: string;
  placement?: string;
  articleSlug?: string;
  resourceId?: string;
  children: React.ReactNode;
  className?: string;
};

export function AffiliateLink({
  href,
  isAffiliate = false,
  vendor,
  placement,
  articleSlug,
  resourceId,
  children,
  className,
}: Props) {
  const rel = isAffiliate
    ? "sponsored nofollow noopener"
    : "noopener";

  function handleClick() {
    const params = {
      resource_id: resourceId,
      vendor,
      placement,
      article_slug: articleSlug,
      link_url: href,
    };

    if (isAffiliate) {
      trackAffiliateClick(params);
    } else {
      trackResourceClick(params);
    }
  }

  return (
    <a
      href={href}
      rel={rel}
      target="_blank"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
