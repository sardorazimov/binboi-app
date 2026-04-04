import { notFound } from "next/navigation";

import { getDocsPageByKey } from "@/constants/docs-pages";
import { DocsPageTemplate } from "@/components/docs/docs-page-template";

export function DocsRoutePage({ pageKey }: { pageKey: string }) {
  const page = getDocsPageByKey(pageKey);

  if (!page) {
    notFound();
  }

  return <DocsPageTemplate page={page} />;
}
