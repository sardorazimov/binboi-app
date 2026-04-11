"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className={cn(
        "absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/50 text-white/50 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white",
        isCopied && "border-red-500/50 text-red-500"
      )}
    >
      {isCopied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
};