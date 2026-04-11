import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";


const satoshi = localFont({
  src: [
    {
      path: "./fonts/WEB/fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "./fonts/WEB/fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
    {
      path: "./fonts/WEB/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WEB/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// Space Mono for code blocks
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binboi Docs",
  description: "Self-hosted tunnels for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full dark", satoshi.variable, spaceMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-full font-sans antialiased bg-[#000000] text-white"
        )}
      >
        {children}
      </body>
    </html>
  );
}
