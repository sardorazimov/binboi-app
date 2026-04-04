"use client"

export function RetentionCard() {
  return (
    <div className="group relative bg-[#0f0f12] rounded-2xl p-6 overflow-hidden border border-white/5 hover:border-purple-500/20 transition-all duration-500">
      {/* Card Number */}
      <span className="text-xs text-gray-600 mb-4 block">• 05</span>
      
      {/* Animation Container */}
      <div className="relative h-48 flex items-center justify-center mb-6 overflow-hidden">
        {/* Funnel Shape */}
        <div className="relative">
          {/* Top Funnel Opening */}
          <div className="w-24 h-12 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-700/50 to-gray-800/50 rounded-t-full border border-gray-600/30" />
            <div className="absolute inset-2 bg-gradient-to-b from-purple-900/30 to-transparent rounded-t-full" />
            
            {/* Inner Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-4 bg-purple-500/20 rounded-full blur-md animate-pulse" />
            </div>
          </div>

          {/* Middle Section */}
          <div className="w-16 h-8 mx-auto relative -mt-1">
            <div 
              className="absolute inset-0 bg-gradient-to-b from-gray-700/40 to-gray-800/60 border-l border-r border-gray-600/20"
              style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
            />
          </div>

          {/* Bottom Opening */}
          <div className="w-8 h-4 mx-auto relative -mt-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/60 to-transparent rounded-b-lg border-l border-r border-b border-gray-600/20" />
          </div>
        </div>

        {/* Purple Light Stream */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6">
          {/* Main Stream */}
          <div className="relative h-24 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-purple-500/60 via-purple-400/40 to-transparent animate-stream" />
            
            {/* Glow Core */}
            <div className="absolute inset-x-1 top-0 h-full bg-gradient-to-b from-purple-300/40 via-purple-400/20 to-transparent animate-stream-delay" />
          </div>

          {/* Bottom Glow Pool */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-8">
            <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute inset-2 bg-purple-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { left: "42%", bottom: "10%", delay: "0s", duration: "1.8s" },
            { left: "48%", bottom: "18%", delay: "0.2s", duration: "2.1s" },
            { left: "44%", bottom: "26%", delay: "0.4s", duration: "1.6s" },
            { left: "50%", bottom: "34%", delay: "0.6s", duration: "2.3s" },
            { left: "46%", bottom: "42%", delay: "0.8s", duration: "1.9s" },
            { left: "52%", bottom: "50%", delay: "1s", duration: "2.0s" },
            { left: "43%", bottom: "58%", delay: "1.2s", duration: "1.7s" },
            { left: "49%", bottom: "66%", delay: "1.4s", duration: "2.2s" },
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/60 rounded-full animate-float-particle"
              style={{
                left: particle.left,
                bottom: particle.bottom,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>

        {/* Side Glows */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-16 bg-purple-600/10 blur-2xl rounded-full animate-pulse" />
      </div>

      {/* Card Footer */}
      <div>
        <h3 className="text-white font-semibold text-lg">Access Control</h3>
        <p className="text-gray-400">That Scales</p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
      </div>
    </div>
  )
}
