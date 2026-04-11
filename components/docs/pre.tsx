/* eslint-disable @typescript-eslint/no-explicit-any */
// components/docs/pre.tsx
import { CopyButton } from "./copy-button";

export const Pre = ({ children, ...props }: any) => {
  // İçerideki ham metni kopyalamak için alıyoruz
  const codeText = children?.props?.children || "";

  return (
    <div className="group relative mt-6 mb-4">
      <CopyButton text={codeText} />
      <pre
        className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-4 font-mono text-sm leading-relaxed scrollbar-hide"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
};