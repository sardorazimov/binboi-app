/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaDiscord, FaGithub } from "react-icons/fa";

type Heading = {
  id: string;
  text: string;
  level: number;
};

const GITHUB_EDIT_BASE =
  "https://github.com/Miransas/binboi-docs/edit/main/app/docs";

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  const editUrl = useMemo(() => {
    let docPath = pathname.replace(/^\/docs/, "");

    if (!docPath || docPath === "/") {
      docPath = "/introduction";
    }

    return `${GITHUB_EDIT_BASE}${docPath}/page.mdx`;
  }, [pathname]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLHeadingElement[];

    const items = elements
      .filter((el) => el.id && el.innerText.trim().length > 0)
      .map((el) => ({
        id: el.id,
        text: el.innerText,
        level: el.tagName === "H2" ? 2 : 3,
      }));

    setHeadings(items);

    if (items.length > 0 && !activeId) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );

        if (visible.length > 0) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname, activeId]);

  return (
    <div className="space-y-6">
      {headings.length > 0 && (
        <div>
          <p className="mb-4 text-md font-semibold uppercase tracking-[0.22em] text-stone-300">
            On this page
          </p>

          <nav className="relative">
            <div className="absolute left-0 top-0 h-full w-px bg-white/8" />

            <ul className="space-y-1">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;

                return (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={cn(
                        "relative block border-l pl-4 text-sm transition-colors",
                        heading.level === 3 && "pl-7 text-white/40",
                        isActive
                          ? "border-red-500 text-white"
                          : "border-transparent text-white/45 hover:text-white/70"
                      )}
                    >
                      {heading.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}

      <div className="h-px bg-white/8" />

      <div className="space-y-3 text-sm">
        <a
          href={editUrl}
          target="_blank"
          rel="noreferrer"
          className="block text-white/80 text-md transition-colors hover:text-emerland-500 flex gap-1 items-center"
        >
         <FaGithub  size={19}/> Edit this page on GitHub
        </a>

        <a
          href="https://discord.gg/"
          target="_blank"
          rel="noreferrer"
          className="block text-white/80 text-md gap-1  transition-colors hover:text-white/70 flex items-center"
        >
         <FaDiscord size={20} color="blue" className=""/> Chat with us on Discord
        </a>
      </div>
    </div>
  );
}