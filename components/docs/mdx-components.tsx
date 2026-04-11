/* eslint-disable @typescript-eslint/no-explicit-any */
// components/mdx-components.tsx
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export const mdxComponents = {
  h1: ({ className, ...props }: any) => (
    <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tighter text-white", className)} {...props} />
  ),
  h2: ({ className, ...props }: any) => (
    <h2 className={cn("mt-10 scroll-m-20 border-b border-white/10 pb-2 text-2xl font-semibold tracking-tight text-white/90 first:mt-0", className)} {...props} />
  ),
  p: ({ className, ...props }: any) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6 text-white/60 font-sans", className)} {...props} />
  ),
  
  // Çoklu satır kod blokları için (Buton buraya ekleniyor)
  pre: ({ children, ...props }: any) => {
    // İçerideki ham metni kopyalamak için çekiyoruz
    const content = children?.props?.children || "";
    return (
      <div className="group relative mt-6 mb-4">
        <CopyButton text={content} />
        <pre
          className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-4 font-mono text-sm leading-relaxed"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  // Satır içi (inline) kodlar
  code: ({ className, ...props }: any) => (
    <code className={cn("relative rounded bg-white/10 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-red-400", className)} {...props} />
  ),

  // Clerk tarzı Step bileşeni
  Step: ({ number, title, children }: any) => (
    <div className="relative pl-10 pb-10 border-l border-white/10 last:border-l-0 ml-4">
      <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-black border border-white/10 text-xs font-bold text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
        {number}
      </div>
      <h3 className="text-lg font-bold tracking-tight text-white mb-2">{title}</h3>
      <div className="text-white/50">{children}</div>
    </div>
  ),
};