"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Copy, Terminal, Shield, Zap } from "lucide-react";
import { Footer } from "../../../../components/site/site-footer";

// ─── 1. SCROLL-SPY (SAĞ MENÜ) BİLEŞENİ ───────────────────────────────────────
interface Heading {
  id: string;
  label: string;
}

function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // Ekranda başlığın yakalanacağı alan (Vercel tarzı)
      { rootMargin: "-20% 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="w-64 hidden xl:block shrink-0">
      <div className="fixed top-44">
        <h4 className="text-sm font-bold text-white mb-4">On this page</h4>
        
        <div className="relative border-l border-white/10 pl-4 flex flex-col gap-3">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;

            return (
              <Link
                key={heading.id}
                href={`#${heading.id}`}
                onClick={() => setActiveId(heading.id)}
                className={`text-sm transition-all duration-200 ${
                  isActive 
                    ? "text-[#9eff00] font-medium" 
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-toc-indicator"
                    className="absolute left-[-1px] w-[2px] bg-[#9eff00] rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ height: "18px", marginTop: "1px" }}
                  />
                )}
                {heading.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ─── 2. ANA SAYFA BİLEŞENİ ──────────────────────────────────────────────────
// Sağ menüde görünecek başlıkları tanımlıyoruz
const pageHeadings = [
  { id: "overview", label: "Overview" },
  { id: "core-concepts", label: "Core Concepts" },
  { id: "installation", label: "Installation" },
  { id: "yaml-config", label: "YAML Configuration" },
];

export default function BinboiDocsPage() {
  return (
   <>
      <div className="flex max-w-7xl  py-12 gap-16 min-h-screen bg-[#000000] ">
      
      {/* SOL: Ana İçerik Alanı */}
      <div className="flex-1 min-w-0">
        
        {/* Sayfa Başlığı */}
        <div className="mb-16">
          <h1 className="text-4xl font-black text-white tracking-tight mb-4 flex items-center justify-between">
            Binboi Universal Gateway
            <button className="flex items-center gap-2 text-xs font-medium text-white/40 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-colors">
              <Copy className="w-3.5 h-3.5" /> Copy page
            </button>
          </h1>
          <p className="text-lg text-white/50 leading-relaxed">
            Learn about the building blocks for creating lightweight HTTP tunnels, exposing local development environments, and secure routing with our Go-based engine.
          </p>
        </div>

        {/* Bölüm 1: Overview */}
        <section id="overview" className="mb-24 scroll-mt-24">
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
          <p className="text-white/60 leading-relaxed mb-6">
            Binboi is a universal gateway platform that gives you the building blocks to create powerful API gateways and device connections locally. Across all use cases it secures, accelerates, and protects your applications without the heavy overhead.
          </p>
          <ul className="space-y-4 text-white/60">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#9eff00] shrink-0 mt-0.5" />
              <span>Works with software running locally or in the cloud via lightweight binaries.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#9eff00] shrink-0 mt-0.5" />
              <span>Supports secure TLS and HTTP/S out of the box with zero configuration.</span>
            </li>
          </ul>
        </section>

        {/* Bölüm 2: Core Concepts */}
        <section id="core-concepts" className="mb-24 scroll-mt-24">
          <h2 className="text-2xl font-bold text-white mb-6">Core Concepts</h2>
          
          <div className="bg-[#1a1f24] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#9eff00]/10 rounded-lg">
                <Terminal className="w-5 h-5 text-[#9eff00]" />
              </div>
              <h3 className="text-lg font-bold text-white">Endpoints</h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Create and manage endpoints to orchestrate traffic to your local services. Every endpoint is globally distributed by default, ensuring low latency no matter where your requests originate.
            </p>
          </div>
        </section>

        {/* Bölüm 3: Installation */}
        <section id="installation" className="mb-24 scroll-mt-24">
          <h2 className="text-2xl font-bold text-white mb-6">Installation</h2>
          <p className="text-white/60 mb-4">You can easily install the CLI using Homebrew or npm.</p>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9eff00]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <pre className="relative bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-[#9eff00] font-mono">
              <code>brew install binboi/tap/binboi</code>
            </pre>
          </div>
        </section>

        {/* Bölüm 4: YAML Configuration */}
        <section id="yaml-config" className="mb-24 scroll-mt-24">
          <h2 className="text-2xl font-bold text-white mb-6">YAML Configuration</h2>
          <p className="text-white/60 mb-4">
            Instead of passing endless flags, you can define your tunnel settings in a clean YAML file for robust CLI development workflows.
          </p>
          
          <pre className="bg-black/40 border border-white/10 rounded-xl p-5 overflow-x-auto text-sm font-mono text-white/80">
            <code>
{`version: "1.0"
tunnels:
  web:
    proto: http
    addr: 3000
    subdomain: sazlab-dev`}
            </code>
          </pre>
        </section>

      </div>

      {/* SAĞ: Scroll-Spy Menüsü (Component'i burada çağırıyoruz) */}
      <TableOfContents headings={pageHeadings} />
     
    </div>
    <Footer/>
   </>
  );
}