"use client"

import { motion, useReducedMotion } from "framer-motion"

function LiveChatIllustration() {
  return (
    <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="225" fill="oklch(0.11 0 0)" />
      {/* Chat bubbles */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <rect x="40" y="40" width="160" height="50" rx="12" fill="oklch(0.18 0 0)" />
        <rect x="50" y="55" width="80" height="8" rx="4" fill="oklch(0.3 0 0)" />
        <rect x="50" y="70" width="120" height="8" rx="4" fill="oklch(0.25 0 0)" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <rect x="200" y="100" width="160" height="50" rx="12" fill="oklch(0.92 0.16 125)" />
        <rect x="210" y="115" width="100" height="8" rx="4" fill="oklch(0.08 0 0 / 0.3)" />
        <rect x="210" y="130" width="130" height="8" rx="4" fill="oklch(0.08 0 0 / 0.2)" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <rect x="40" y="160" width="140" height="40" rx="12" fill="oklch(0.18 0 0)" />
        <rect x="50" y="175" width="90" height="8" rx="4" fill="oklch(0.3 0 0)" />
      </motion.g>
      {/* Lightning accent */}
      <motion.path
        d="M340 30 L330 55 L345 55 L335 80"
        stroke="oklch(0.92 0.16 125)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
      {/* Glow effect */}
      <circle cx="337" cy="55" r="30" fill="oklch(0.92 0.16 125 / 0.1)" />
    </svg>
  )
}

function TicketResolutionIllustration() {
  return (
    <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="225" fill="oklch(0.11 0 0)" />
      {/* Ticket cards */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <rect
          x="30"
          y="30"
          width="100"
          height="80"
          rx="8"
          fill="oklch(0.18 0 0)"
          stroke="oklch(0.25 0 0)"
          strokeWidth="1"
        />
        <rect x="40" y="45" width="60" height="6" rx="3" fill="oklch(0.4 0 0)" />
        <rect x="40" y="58" width="80" height="5" rx="2.5" fill="oklch(0.3 0 0)" />
        <rect x="40" y="70" width="50" height="5" rx="2.5" fill="oklch(0.3 0 0)" />
        <circle cx="110" cy="95" r="8" fill="oklch(0.92 0.16 125)" />
        <path
          d="M106 95 L109 98 L114 92"
          stroke="oklch(0.08 0 0)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <rect
          x="150"
          y="50"
          width="100"
          height="80"
          rx="8"
          fill="oklch(0.18 0 0)"
          stroke="oklch(0.25 0 0)"
          strokeWidth="1"
        />
        <rect x="160" y="65" width="60" height="6" rx="3" fill="oklch(0.4 0 0)" />
        <rect x="160" y="78" width="80" height="5" rx="2.5" fill="oklch(0.3 0 0)" />
        <rect x="160" y="90" width="50" height="5" rx="2.5" fill="oklch(0.3 0 0)" />
        <circle cx="230" cy="115" r="8" fill="oklch(0.92 0.16 125)" />
        <path
          d="M226 115 L229 118 L234 112"
          stroke="oklch(0.08 0 0)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <rect
          x="270"
          y="70"
          width="100"
          height="80"
          rx="8"
          fill="oklch(0.18 0 0)"
          stroke="oklch(0.92 0.16 125 / 0.5)"
          strokeWidth="1"
        />
        <rect x="280" y="85" width="60" height="6" rx="3" fill="oklch(0.4 0 0)" />
        <rect x="280" y="98" width="80" height="5" rx="2.5" fill="oklch(0.3 0 0)" />
        <rect x="280" y="110" width="50" height="5" rx="2.5" fill="oklch(0.3 0 0)" />
        {/* Processing indicator */}
        <motion.circle
          cx="350"
          cy="135"
          r="8"
          fill="none"
          stroke="oklch(0.92 0.16 125)"
          strokeWidth="2"
          strokeDasharray="25"
          strokeDashoffset="0"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ transformOrigin: "350px 135px" }}
        />
      </motion.g>
      {/* Stats bar */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
        <rect x="30" y="170" width="340" height="35" rx="6" fill="oklch(0.15 0 0)" />
        <rect x="45" y="182" width="80" height="10" rx="5" fill="oklch(0.25 0 0)" />
        <rect x="45" y="182" width="65" height="10" rx="5" fill="oklch(0.92 0.16 125)" />
        <text x="140" y="191" fill="oklch(0.5 0 0)" fontSize="10" fontFamily="monospace">
          87%
        </text>
        <rect x="180" y="182" width="80" height="10" rx="5" fill="oklch(0.25 0 0)" />
        <rect x="180" y="182" width="72" height="10" rx="5" fill="oklch(0.92 0.16 125 / 0.7)" />
        <text x="275" y="191" fill="oklch(0.5 0 0)" fontSize="10" fontFamily="monospace">
          92%
        </text>
      </motion.g>
    </svg>
  )
}

function MultiChannelIllustration() {
  return (
    <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="225" fill="oklch(0.11 0 0)" />
      {/* Center hub */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <circle cx="200" cy="112" r="35" fill="oklch(0.92 0.16 125)" />
        <path d="M190 112 L195 105 L205 105 L210 112 L205 119 L195 119 Z" fill="oklch(0.08 0 0)" />
        <circle cx="200" cy="112" r="8" fill="oklch(0.08 0 0)" />
      </motion.g>
      {/* Connection lines */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }}>
        <line
          x1="165"
          y1="112"
          x2="80"
          y2="60"
          stroke="oklch(0.92 0.16 125 / 0.4)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="165"
          y1="112"
          x2="80"
          y2="165"
          stroke="oklch(0.92 0.16 125 / 0.4)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="235"
          y1="112"
          x2="320"
          y2="60"
          stroke="oklch(0.92 0.16 125 / 0.4)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="235"
          y1="112"
          x2="320"
          y2="165"
          stroke="oklch(0.92 0.16 125 / 0.4)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="200"
          y1="77"
          x2="200"
          y2="35"
          stroke="oklch(0.92 0.16 125 / 0.4)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="200"
          y1="147"
          x2="200"
          y2="190"
          stroke="oklch(0.92 0.16 125 / 0.4)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </motion.g>
      {/* Channel nodes */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {/* Email */}
        <circle cx="80" cy="60" r="22" fill="oklch(0.18 0 0)" stroke="oklch(0.3 0 0)" strokeWidth="1" />
        <rect x="68" y="52" width="24" height="16" rx="2" fill="none" stroke="oklch(0.5 0 0)" strokeWidth="1.5" />
        <path d="M68 54 L80 62 L92 54" stroke="oklch(0.5 0 0)" strokeWidth="1.5" fill="none" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        {/* Chat */}
        <circle cx="80" cy="165" r="22" fill="oklch(0.18 0 0)" stroke="oklch(0.3 0 0)" strokeWidth="1" />
        <rect x="66" y="155" width="28" height="18" rx="4" fill="none" stroke="oklch(0.5 0 0)" strokeWidth="1.5" />
        <circle cx="73" cy="164" r="2" fill="oklch(0.5 0 0)" />
        <circle cx="80" cy="164" r="2" fill="oklch(0.5 0 0)" />
        <circle cx="87" cy="164" r="2" fill="oklch(0.5 0 0)" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        {/* Phone */}
        <circle cx="320" cy="60" r="22" fill="oklch(0.18 0 0)" stroke="oklch(0.3 0 0)" strokeWidth="1" />
        <rect x="310" y="48" width="20" height="28" rx="3" fill="none" stroke="oklch(0.5 0 0)" strokeWidth="1.5" />
        <circle cx="320" cy="70" r="2" fill="oklch(0.5 0 0)" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        {/* Social */}
        <circle cx="320" cy="165" r="22" fill="oklch(0.18 0 0)" stroke="oklch(0.3 0 0)" strokeWidth="1" />
        <circle cx="320" cy="165" r="10" fill="none" stroke="oklch(0.5 0 0)" strokeWidth="1.5" />
        <circle cx="320" cy="165" r="3" fill="oklch(0.5 0 0)" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        {/* Web */}
        <circle cx="200" cy="35" r="22" fill="oklch(0.18 0 0)" stroke="oklch(0.3 0 0)" strokeWidth="1" />
        <circle cx="200" cy="35" r="12" fill="none" stroke="oklch(0.5 0 0)" strokeWidth="1.5" />
        <line x1="188" y1="35" x2="212" y2="35" stroke="oklch(0.5 0 0)" strokeWidth="1.5" />
        <line x1="200" y1="23" x2="200" y2="47" stroke="oklch(0.5 0 0)" strokeWidth="1.5" />
      </motion.g>
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.0 }}
      >
        {/* SMS */}
        <circle cx="200" cy="190" r="22" fill="oklch(0.18 0 0)" stroke="oklch(0.3 0 0)" strokeWidth="1" />
        <rect x="190" y="180" width="20" height="20" rx="3" fill="none" stroke="oklch(0.5 0 0)" strokeWidth="1.5" />
        <rect x="194" y="186" width="12" height="2" rx="1" fill="oklch(0.5 0 0)" />
        <rect x="194" y="191" width="8" height="2" rx="1" fill="oklch(0.5 0 0)" />
      </motion.g>
      {/* Pulse effect on center */}
      <motion.circle
        cx="200"
        cy="112"
        r="35"
        fill="none"
        stroke="oklch(0.92 0.16 125)"
        strokeWidth="2"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
      />
    </svg>
  )
}

const demos = [
  {
    title: "Live Chat Demo",
    description: "See Electric handle real customer inquiries",
    Illustration: LiveChatIllustration,
  },
  {
    title: "Ticket Resolution",
    description: "Watch AI resolve complex support tickets",
    Illustration: TicketResolutionIllustration,
  },
  {
    title: "Multi-Channel Support",
    description: "Seamless support across all channels",
    Illustration: MultiChannelIllustration,
  },
]

export function FeatureCard() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-display mb-4">
            See <span className="text-gradient-lime">Electric</span> in action
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Watch how AI transforms customer support experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden border border-border bg-card"
            >
              <div className="aspect-video relative overflow-hidden">
                <demo.Illustration />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{demo.title}</h3>
                <p className="text-sm text-muted-foreground">{demo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
