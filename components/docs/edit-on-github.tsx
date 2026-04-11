// components/docs/edit-on-github.tsx
"use client";

import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";



export const EditOnGithub = () => {
  const pathname = usePathname();
  const repoUrl = "https://github.com/miransas/binboi-docs/edit/main/app"; // Repo yoluna göre ayarla
  
  // Örnek: /docs/installation -> app/docs/installation/page.mdx
  const editUrl = `${repoUrl}${pathname}/page.mdx`;

  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-[11px] font-medium text-white/30 hover:text-white transition-colors group"
    >
      <FaGithub className="group-hover:text-red-500 transition-colors" />
      <span>Edit this page on GitHub</span>
    </a>
  );
};