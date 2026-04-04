"use client"


import { cn } from "@/lib/utils"
import { useScrollSpy } from "../../hooks/use-scroll-spy"

interface Step {
  id: string
  number: number
  title: string
}

interface StepNavigationProps {
  steps: Step[]
  nextStepsTitle?: string
}

export function StepNavigation({ steps, nextStepsTitle = "Next steps" }: StepNavigationProps) {
  const sectionIds = steps.map((step) => step.id)
  const activeSection = useScrollSpy(sectionIds, 150)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="hidden w-56 xl:block fixed">
      <div className="space-y-1 ">
        {steps.map((step) => {
          const isActive = activeSection === step.id
          const isPast = steps.findIndex((s) => s.id === activeSection) > steps.findIndex((s) => s.id === step.id)

          return (
            <button
              key={step.id}
              onClick={() => scrollToSection(step.id)}
              className="flex w-full items-start gap-3 py-1.5 text-left transition-colors"
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isPast
                    ? "bg-primary/20 text-primary"
                    : "border border-border bg-transparent text-muted-foreground"
                )}
              >
                {step.number}
              </span>
              <span
                className={cn(
                  "text-sm leading-6 transition-colors",
                  isActive
                    ? "font-medium text-foreground"
                    : isPast
                    ? "text-muted-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </button>
          )
        })}

        <div className="pt-2">
          <button
            onClick={() => scrollToSection("next-steps")}
            className="flex w-full items-center gap-3 py-1.5 text-left"
          >
            <span className="h-6 w-6" />
            <span
              className={cn(
                "text-sm transition-colors",
                activeSection === "next-steps"
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {nextStepsTitle}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
