"use client"

import { MousePointer2 } from "lucide-react"

export function ConversionsCard() {
  return (
    <div className="group relative bg-[#0f0f12] rounded-2xl p-6 overflow-hidden border border-white/5 hover:border-purple-500/20 transition-all duration-500">
      {/* Card Number */}
      <span className="text-xs text-gray-600 mb-4 block">• 02</span>
      
      {/* Animation Container */}
      <div className="relative h-48 flex items-center justify-center mb-6">
        {/* Outer Radar Rings */}
        <div className="absolute w-40 h-40">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-purple-500/20 animate-radar-pulse"
              style={{
                animationDelay: `${i * 0.5}s`,
                transform: `scale(${1 + i * 0.3})`
              }}
            />
          ))}
        </div>

        {/* Main Circle */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-[#1a1a20] to-[#0f0f12] border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.15)]">
          {/* Inner Glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-purple-500/5 to-transparent" />
          
          {/* Rotating Dot */}
          <div className="absolute w-full h-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            </div>
          </div>

          {/* Center Icon */}
          <div className="relative animate-float-slow">
            <div className="absolute inset-0 bg-white/10 blur-md rounded-full" />
            <MousePointer2 className="w-8 h-8 text-gray-300 relative z-10" />
          </div>
        </div>

        {/* Scanning Line */}
        <div className="absolute w-28 h-28 animate-spin-slow" style={{ animationDuration: "4s" }}>
          <div className="absolute top-1/2 left-1/2 w-14 h-0.5 origin-left bg-gradient-to-r from-purple-500/50 to-transparent" />
        </div>
      </div>

      {/* Card Footer */}
      <div>
        <h3 className="text-white font-semibold text-lg">Request</h3>
        <p className="text-gray-400">Visibility</p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
      </div>
    </div>
  )
}
