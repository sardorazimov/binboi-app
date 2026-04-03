/**
 * Dynamic docs article page backed by the structured article content model.
 */
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { DOCS_ARTICLES } from "@/constants";
import { createMetadata } from "@/lib/metadata";
import { SiteFooter } from "../../../../components/site/site-footer";

type DocsArticlePageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

function getArticle(slug: string) {
  return DOCS_ARTICLES.find((article) => article.slug === slug);
}

function getNeighbors(slug: string) {
  const index = DOCS_ARTICLES.findIndex((article) => article.slug === slug);

  return {
    previous: index > 0 ? DOCS_ARTICLES[index - 1] : null,
    next: index >= 0 && index < DOCS_ARTICLES.length - 1 ? DOCS_ARTICLES[index + 1] : null,
  };
}

export async function generateMetadata({ params }: DocsArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug[0] ?? "");

  if (!article) {
    return createMetadata({
      title: "Docs",
      path: "/docs",
    });
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/docs/${article.slug}`,
  });
}

export default async function DocsArticlePage({ params }: DocsArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug[0] ?? "");

  if (!article) {
    notFound();
  }

  const neighbors = getNeighbors(article.slug);

  return (
    <article className="space-y-8">
      <header className="surface-panel surface-panel-blue space-y-4 rounded-[32px] border border-white/[0.08] px-6 py-6 sm:px-8 sm:py-8">
        <Badge>{article.section}</Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            {article.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-foreground/68">
            {article.description}
          </p>
          <p className="text-sm text-foreground/45">{article.readingTime}</p>
        </div>
      </header>

      <div className="space-y-6">
        {article.blocks.map((block) => (
          <Panel
            key={block.heading}
            className="surface-panel surface-panel-blue space-y-4 border-white/[0.07]"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {block.heading}
            </h2>
            <p className="text-sm leading-8 text-foreground/66">{block.body}</p>
            {block.bullets ? (
              <ul className="space-y-3 text-sm leading-7 text-foreground/66">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[linear-gradient(180deg,rgba(76,122,255,1),rgba(255,135,74,0.92))]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {block.code ? (
              <pre className="surface-panel-strong overflow-x-auto rounded-[24px] border border-white/[0.08] p-4 text-sm text-foreground/82">
                <code>{block.code.snippet}</code>
              </pre>
            ) : null}
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {neighbors.previous ? (
          <Link
            href={`/docs/${neighbors.previous.slug}`}
            className="surface-panel rounded-[26px] border border-white/[0.07] p-5 text-sm text-foreground/68 transition-colors hover:bg-white/[0.04] hover:text-foreground"
          >
            Previous: {neighbors.previous.title}
          </Link>
        ) : (
          <div />
        )}
        {neighbors.next ? (
          <Link
            href={`/docs/${neighbors.next.slug}`}
            className="surface-panel rounded-[26px] border border-white/[0.07] p-5 text-right text-sm text-foreground/68 transition-colors hover:bg-white/[0.04] hover:text-foreground"
          >
            Next: {neighbors.next.title}
          </Link>
        ) : null}
      </div>
      <SiteFooter/>
    </article>
  );
}
