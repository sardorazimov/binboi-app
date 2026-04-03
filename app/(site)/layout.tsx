/**
 * Public-site layout with fixed header, shared spacing, and footer.
 */
import type { ReactNode } from "react";



import SmoothScrolling from "../../components/site/SmoothScrolling";
import { Navbar } from "../../components/site/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
         <Navbar/>
        <main className="min-w-full h-full">
         
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        </main>
        {/* <SiteFooter /> */}
      </div>
    </>
  );
}
