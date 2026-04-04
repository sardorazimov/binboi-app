/**
 * Dynamic docs article page backed by the structured article content model.
 */
import { notFound } from "next/navigation";

import { DocsPageTemplate } from "@/components/docs/docs-page-template";
import type { DocsPageContent } from "@/constants/docs-pages";
import { DOCS_ARTICLES } from "@/constants";
import { createMetadata } from "@/lib/metadata";

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
    next:
      index >= 0 && index < DOCS_ARTICLES.length - 1
        ? DOCS_ARTICLES[index + 1]
        : null,
  };
}

function getSectionSummary(body: string) {
  const firstSentence = body.split(". ")[0]?.trim();
  return firstSentence ? `${firstSentence}.` : "Read this section carefully.";
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

  const page: DocsPageContent = {
    key: article.slug,
    href: `/docs/${article.slug}`,
    title: article.title,
    description: article.description,
    category: article.section,
    readingTime: article.readingTime,
    summary: article.blocks.slice(0, 3).map((block) => block.heading),
    sections: article.blocks.map((block, index) => ({
      id: `${article.slug}-${index + 1}`,
      title: block.heading,
      summary: getSectionSummary(block.body),
      paragraphs: [block.body],
      bullets: block.bullets,
      codeSamples: block.code
        ? [
            {
              language: block.code.language,
              code: block.code.snippet,
            },
          ]
        : undefined,
    })),
    nextSteps: [
      neighbors.previous
        ? {
            title: `Previous: ${neighbors.previous.title}`,
            description: neighbors.previous.description,
            href: `/docs/${neighbors.previous.slug}`,
          }
        : {
            title: "Back to docs overview",
            description:
              "Return to the main documentation hub and choose another path.",
            href: "/docs",
          },
      neighbors.next
        ? {
            title: `Next: ${neighbors.next.title}`,
            description: neighbors.next.description,
            href: `/docs/${neighbors.next.slug}`,
          }
        : {
            title: "Explore troubleshooting",
            description:
              "Continue with practical operational guidance for common failures.",
            href: "/docs/troubleshooting",
          },
    ],
  };

  return <DocsPageTemplate page={page} />;
}
