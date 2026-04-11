import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  // MDX dosyalarını sayfa olarak tanıması için uzantıları ekliyoruz
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // Senin "True Black" sevdan için en iyi temalardan biri
          theme: "github-dark", 
          keepBackground: false, // Arka planı bizim globals.css'deki #0a0a0a yapsın diye
        },
      ],
    ],
  },
});

// MDX ile config'i sarmalayıp dışa aktarıyoruz
export default withMDX(nextConfig);