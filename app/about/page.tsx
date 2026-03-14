import type { Metadata } from "next";

import { getCanonicalUrl } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: getCanonicalUrl("/about/"),
  },
};

export default function AboutPage() {
  return (
    <main className="pb-16 pt-6 sm:pb-20">
      <section className="site-shell">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-panel rounded-[2.5rem] px-7 py-8 sm:px-10 sm:py-12">
            <p className="eyebrow">About the blog</p>
            <h1 className="section-title mt-6">
              Practical writing for engineering organizations in motion.
            </h1>
            <p className="lead-copy mt-6">
              I&apos;m Yeison Lopez, an engineering leader with more than 20
              years of experience across networking, renewable energy, and
              software engineering. I write about leadership, platform
              strategy, reliability, and the operating systems teams need to
              scale with clarity instead of chaos.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 muted-copy">
              The goal is simple: turn hard-earned lessons into practical
              essays for leaders and senior engineers who are navigating growth,
              complexity, and organizational change.
            </p>
          </div>

          <div className="space-y-5">
            <div className="glass-panel-soft rounded-[2rem] p-6">
              <p className="eyebrow">What you will find here</p>
              <p className="mt-4 text-lg leading-8 text-[var(--text-strong)]">
                Essays on building effective teams, making better architectural
                decisions, learning from incidents, and creating engineering
                organizations that can move fast without losing discipline.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="glass-panel-soft rounded-[1.75rem] p-5">
                <h2 className="text-lg font-semibold text-[var(--text-strong)]">
                  Practical perspective
                </h2>
                <p className="mt-3 text-sm leading-7 muted-copy">
                  Every piece is grounded in real operating tradeoffs, from team
                  design and delivery models to platform investments and
                  reliability practices.
                </p>
              </div>

              <div className="glass-panel-soft rounded-[1.75rem] p-5">
                <h2 className="text-lg font-semibold text-[var(--text-strong)]">
                  Built for useful reading
                </h2>
                <p className="mt-3 text-sm leading-7 muted-copy">
                  The writing is meant to be clear, direct, and applicable,
                  whether you are leading a team, shaping a roadmap, or
                  untangling a difficult technical decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
