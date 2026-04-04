"use client"

import { useEffect, useState } from "react"

export function IntelligenceCard() {
  const [points, setPoints] = useState<number[]>([30, 45, 35, 55, 40, 60, 50, 70, 55, 75, 65, 80])

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const newPoints = [...prev.slice(1), prev[prev.length - 1] + (Math.random() - 0.4) * 15]
        return newPoints.map(p => Math.max(20, Math.min(90, p)))
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const pathD = points
    .map((point, i) => {
      const x = (i / (points.length - 1)) * 100
      return `${i === 0 ? "M" : "L"} ${x} ${100 - point}`
    })
    .join(" ")

  return (
    <div className="group relative bg-[#0f0f12] rounded-2xl p-6 overflow-hidden border border-white/5 hover:border-purple-500/20 transition-all duration-500">
      {/* Card Number */}
      <span className="text-xs text-gray-600 mb-4 block">• 03</span>
      
      {/* Background Text */}
      <div className="absolute top-16 right-4 text-6xl font-bold text-white/[0.03] tracking-wider leading-tight animate-fade-in-out">
        POWERED<br />BY<br />DATA
      </div>

      {/* Animation Container */}
      <div className="relative h-48 flex items-end mb-6">
        {/* Chart */}
        <svg className="w-full h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Area Fill */}
          <path
            d={`${pathD} L 100 100 L 0 100 Z`}
            fill="url(#areaGradient)"
            className="transition-all duration-500"
          />

          {/* Main Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            className="transition-all duration-500"
          />

          {/* Animated Dot */}
          <circle
            cx={100}
            cy={100 - points[points.length - 1]}
            r="3"
            fill="#a78bfa"
            className="animate-pulse"
          >
            <animate
              attributeName="r"
              values="2;4;2"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Glow Effect at End */}
        <div 
          className="absolute right-0 w-8 h-16 bg-gradient-to-l from-purple-500/20 to-transparent blur-md animate-pulse"
          style={{ bottom: `${points[points.length - 1] * 0.32}%` }}
        />
      </div>

      {/* Card Footer */}
      <div>
        <h3 className="text-white font-semibold text-lg">Traffic Clarity</h3>
        <p className="text-gray-400">Before Guesswork</p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
      </div>
    </div>
  )
}
