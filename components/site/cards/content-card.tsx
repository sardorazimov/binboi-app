"use client"

import { useEffect, useState } from "react"

const scheduleItems = [
  { time: "08:30AM", title: "How we dr...", color: "bg-purple-500/20", border: "border-purple-500/40" },
  { time: "09:30AM", title: "POSTED", color: "bg-green-500/20", border: "border-green-500/40" },
  { time: "10:30AM", title: "Api Getway", color: "bg-blue-500/20", border: "border-blue-500/40" },
]

export function ContentCard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % scheduleItems.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const days = ["Mon", "Tue", "Wed", "Thu"]

  return (
    <div className="group relative bg-[#0f0f12] rounded-2xl p-6 overflow-hidden border border-white/5 hover:border-purple-500/20 transition-all duration-500 lg:col-span-2">
      {/* Card Number */}
      <span className="text-xs text-gray-600 mb-4 block">• 04</span>
      
      {/* Animation Container */}
      <div className="relative h-48 mb-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4 px-2">
          {days.map((day, i) => (
            <div 
              key={day}
              className="text-center cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredDay(i)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <span className={`text-xs transition-colors duration-300 ${hoveredDay === i ? "text-purple-400" : "text-gray-500"}`}>
                {day}
              </span>
              {hoveredDay === i && (
                <div className="mt-1 w-1 h-1 bg-purple-400 rounded-full mx-auto animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Schedule Items */}
        <div className="space-y-2 relative">
          {scheduleItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-500 ${
                activeIndex === index 
                  ? `${item.color} ${item.border} border scale-105 shadow-lg` 
                  : "bg-white/5 border border-transparent"
              }`}
              style={{
                transform: activeIndex === index ? "translateX(4px)" : "translateX(0)",
              }}
            >
              <span className={`text-xs transition-colors duration-300 ${
                activeIndex === index ? "text-white" : "text-gray-600"
              }`}>
                {item.time}
              </span>
              <div className="flex-1 flex items-center gap-2">
                <span className={`text-sm truncate transition-colors duration-300 ${
                  activeIndex === index ? "text-white" : "text-gray-400"
                }`}>
                  {item.title}
                </span>
              </div>
              {activeIndex === index && (
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              )}
            </div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute -right-4 top-0 w-20 h-full opacity-30" viewBox="0 0 80 150">
            <path
              d="M0,25 Q40,25 40,75 T80,125"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="animate-dash"
            />
          </svg>
        </div>

        {/* Floating Labels */}
        <div className="absolute right-8 top-8 animate-float" style={{ animationDelay: "0.5s" }}>
          <div className="bg-white/5 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10 text-xs text-gray-400">
            <span className="text-green-400">●</span> How...
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute bottom-0 left-1/4 w-32 h-8 bg-purple-500/10 blur-xl rounded-full animate-pulse" />
      </div>

      {/* Card Footer */}
      <div>
        <h3 className="text-white font-semibold text-lg">Webhook Flows</h3>
        <p className="text-gray-400">That Stay Legible</p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
      </div>
    </div>
  )
}
