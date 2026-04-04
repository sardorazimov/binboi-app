"use client"

import { LeadFlowCard } from "./cards/lead-flow-card"
import { ConversionsCard } from "./cards/conversions-card"
import { IntelligenceCard } from "./cards/intelligence-card"
import { ContentCard } from "./cards/content-card"
import { RetentionCard } from "./cards/retention-card"

export function CapabilitySection() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
          </div>
          <span className="text-gray-400 text-sm tracking-wide">Capability</span>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            What Binboi<br />
            Unlocks Fast
          </h2>
          <p className="text-gray-500 text-sm max-w-xs text-right">
            Not growth hacks. Not fluff.<br />
            Just ingress, visibility, and safer sharing.
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LeadFlowCard />
        <ConversionsCard />
        <IntelligenceCard />
        <ContentCard />
        <RetentionCard />
      </div>
    </section>
  )
}
