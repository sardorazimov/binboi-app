/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useState, useEffect, useCallback } from "react"

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "")

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + offset

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i])
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sectionIds[i])
        return
      }
    }

    setActiveSection(sectionIds[0] || "")
  }, [sectionIds, offset])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return activeSection
}
