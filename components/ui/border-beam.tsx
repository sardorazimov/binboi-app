"use client";

import { useRef, useEffect, useState } from "react";
import { useAnimationFrame } from "framer-motion";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  size = 80,
  duration = 3,
  colorFrom = "#9eff00",
  colorTo = "#4ade80",
}: BorderBeamProps) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const rectRef  = useRef<SVGRectElement>(null);
  const progress = useRef(0);
  const [pathLen, setPathLen] = useState(0);
  const gradId = `beam-${colorFrom.replace("#", "")}`;

  useEffect(() => {
    if (rectRef.current) {
      const bbox = rectRef.current.getBBox();
      setPathLen(2 * (bbox.width + bbox.height));
    }
  }, []);

  useAnimationFrame((_, delta) => {
    if (!rectRef.current || !pathLen) return;
    progress.current = (progress.current + delta / 1000 / duration) % 1;
    rectRef.current.style.strokeDashoffset = String(-(progress.current * pathLen));
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <svg ref={svgRef} className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={colorFrom} stopOpacity="0" />
            <stop offset="50%"  stopColor={colorFrom} stopOpacity="1" />
            <stop offset="100%" stopColor={colorTo}   stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          ref={rectRef}
          x="1" y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="15" ry="15"
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          strokeDasharray={`${size} ${Math.max(pathLen - size, 0)}`}
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
}