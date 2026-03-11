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
              I write about engineering leadership, infrastructure, platform
              thinking, reliability, and the systems that help teams scale
              without increasing chaos.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 muted-copy">
              This publication is built for readers who want grounded
              tradeoffs, useful operating patterns, and articles that stay
              readable on long sessions across desktop and mobile.
            </p>
          </div>

          <div className="space-y-5">
            <div className="glass-panel-soft rounded-[2rem] p-6">
              <p className="eyebrow">What you will find here</p>
              <p className="mt-4 text-lg leading-8 text-[var(--text-strong)]">
                Essays on team design, platform strategy, architecture
                decisions, incident learning, and the mechanics behind durable
                execution.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="glass-panel-soft rounded-[1.75rem] p-5">
                <h2 className="text-lg font-semibold text-[var(--text-strong)]">
                  Editorial quality
                </h2>
                <p className="mt-3 text-sm leading-7 muted-copy">
                  Strong typography, cleaner metadata surfaces, and richer media
                  presentation for each article.
                </p>
              </div>

              <div className="glass-panel-soft rounded-[1.75rem] p-5">
                <h2 className="text-lg font-semibold text-[var(--text-strong)]">
                  Growth-ready structure
                </h2>
                <p className="mt-3 text-sm leading-7 muted-copy">
                  The styling system is set up to scale to more posts, richer
                  previews, and affiliate-friendly content blocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
