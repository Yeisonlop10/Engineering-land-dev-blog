import { ReactNode } from "react";

type SiteContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SiteContainer({ children, className = "" }: SiteContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>{children}</div>;
}
