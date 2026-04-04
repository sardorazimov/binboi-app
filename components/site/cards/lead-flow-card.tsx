"use client"

export function LeadFlowCard() {
  return (
    <div className="group relative bg-[#0f0f12] rounded-2xl p-6 overflow-hidden border border-white/5 hover:border-purple-500/20 transition-all duration-500">
      {/* Card Number */}
      <span className="text-xs text-gray-600 mb-4 block">• 01</span>
      
      {/* Animation Container */}
      <div className="relative h-48 flex items-center justify-center mb-6">
        {/* Outer Glow Ring */}
        <div className="absolute w-56 h-24 animate-pulse-slow">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 via-amber-500/30 to-purple-600/20 blur-xl animate-glow-rotate" />
        </div>
        
        {/* Main Ring */}
        <div className="relative w-48 h-20 perspective-1000">
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,0.3)] animate-ring-spin transform rotate-x-60" 
               style={{ 
                 background: "linear-gradient(180deg, transparent 0%, rgba(251,191,36,0.1) 50%, transparent 100%)",
                 transform: "perspective(500px) rotateX(60deg)"
               }} 
          />
          {/* Inner Glow */}
          <div className="absolute inset-4 rounded-full border border-purple-500/40 animate-ring-pulse"
               style={{ transform: "perspective(500px) rotateX(60deg)" }} 
          />
        </div>

        {/* Floating Label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/30 blur-lg rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-r from-purple-600/80 to-purple-500/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-purple-400/30">
              <span className="text-white text-sm font-medium">Inbound Lead</span>
            </div>
          </div>
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-particle"
              style={{
                left: `${20 + i * 12}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div>
        <h3 className="text-white font-semibold text-lg">Fast Public</h3>
        <p className="text-gray-400">URLs</p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
      </div>
    </div>
  )
}
