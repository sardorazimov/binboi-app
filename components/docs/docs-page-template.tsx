import Link from "next/link";

import { Footer } from "@/components/site/site-footer";
import { StepNavigation } from "@/components/docs/step-navigation";
import type { DocsPageContent } from "@/constants/docs-pages";

function CodeBlock({
  language,
  title,
  code,
}: {
  language: string;
  title?: string;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.24em] text-white/40">
        <span>{title ?? "Example"}</span>
        <span>{language}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-7 text-white/82">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function DocsPageTemplate({ page }: { page: DocsPageContent }) {
  const steps = page.sections.map((section, index) => ({
    id: section.id,
    number: index + 1,
    title: section.title,
  }));

  return (
    <>
      <div className="relative px-6 py-8 lg:px-8">
        <div
          className="pointer-events-none absolute right-0 top-0 -z-10 h-[1200px] w-[1200px] bg-primary/12"
          style={{
            maskImage:
              "radial-gradient(ellipse 50% 50% at 100% 0%, rgb(0 0 0 / 0.9), transparent)",
          }}
        />

        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,1fr)_14rem]">
          <article className="min-w-0 max-w-4xl space-y-8">
            <header className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]">
              <div className="border-b border-white/8 px-6 py-5 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  {page.category}
                </p>
                <div className="mt-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        {page.title}
                      </h1>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/50">
                        {page.readingTime}
                      </span>
                    </div>
                    <p className="max-w-3xl text-base leading-8 text-white/66 sm:text-lg">
                      {page.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {page.summary.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4 text-sm leading-7 text-white/68"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            {page.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-[28px] border border-white/8 bg-white/[0.02] px-6 py-6 sm:px-8 sm:py-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-black">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1 space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold tracking-tight text-white">
                        {section.title}
                      </h2>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/40">
                        {section.summary}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-8 text-white/68"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets ? (
                      <ul className="space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-sm leading-7 text-white/64"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.codeSamples ? (
                      <div className="space-y-4">
                        {section.codeSamples.map((sample) => (
                          <CodeBlock
                            key={`${section.id}-${sample.language}-${sample.title ?? "sample"}`}
                            language={sample.language}
                            title={sample.title}
                            code={sample.code}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>
            ))}

            <section
              id="next-steps"
              className="scroll-mt-24 rounded-[28px] border border-white/8 bg-white/[0.02] px-6 py-6 sm:px-8 sm:py-8"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Next Steps
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Keep moving through the docs
                </h2>
                <p className="max-w-3xl text-base leading-8 text-white/66">
                  The next pages build directly on what you just read, so you can
                  keep the same mental model while adding more operational depth.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {page.nextSteps.map((step) => (
                  <Link
                    key={step.href}
                    href={step.href}
                    className="rounded-2xl border border-white/10 bg-black/20 px-5 py-5 transition-colors hover:bg-white/[0.04]"
                  >
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/58">
                      {step.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <StepNavigation steps={steps} />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
