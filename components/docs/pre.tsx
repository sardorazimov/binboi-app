/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyButton } from "./copy-button";

// Language display labels
const LANG_LABELS: Record<string, string> = {
  bash: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  ts: "ts",
  tsx: "tsx",
  js: "js",
  jsx: "jsx",
  typescript: "ts",
  javascript: "js",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",
  rust: "rs",
  rs: "rs",
  python: "py",
  py: "py",
  go: "go",
  css: "css",
  html: "html",
  sql: "sql",
  nginx: "nginx",
  dockerfile: "docker",
  powershell: "ps1",
  ps1: "ps1",
  xml: "xml",
};

function getLang(className?: string): string | null {
  if (!className) return null;
  const match = className.match(/language-(\w+)/);
  if (!match) return null;
  return LANG_LABELS[match[1]] ?? match[1];
}

export function Pre({ children, ...props }: any) {
  const codeClassName = children?.props?.className as string | undefined;
  const codeText = children?.props?.children ?? "";
  const lang = getLang(codeClassName);

  return (
    <div className="group relative my-6">
      {/* Top bar — only rendered when there's a language label */}
      {lang && (
        <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-white/[0.08] bg-white/[0.03] px-4 py-2">
          <span className="font-mono text-[0.7rem] font-medium uppercase tracking-widest text-white/30">
            {lang}
          </span>
        </div>
      )}

      {/* Copy button */}
      <CopyButton text={String(codeText)} />

      <pre
        className={`
          overflow-x-auto border border-white/[0.08] bg-[#0a0a0a]
          p-5 font-mono text-[0.8125rem] leading-[1.8] text-white/80
          ${lang ? "rounded-b-xl rounded-tr-xl" : "rounded-xl"}
        `}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
