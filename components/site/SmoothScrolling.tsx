// components/SmoothScrolling.tsx
"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.05, // Bu değer küçüldükçe scroll daha yavaş ve pürüzsüz olur (Varsayılan 0.1'dir).
        duration: 1.5, // Scroll'un ne kadar süreceği.
        smoothWheel: true, // Mouse tekerleği için yumuşatma.
        wheelMultiplier: 1, // Mouse tekerleği hassasiyeti.
      }}
    >
      {children}
    </ReactLenis>
  );
}