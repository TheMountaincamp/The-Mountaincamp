"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  // Initialize with null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Return false during SSR, then the actual value once mounted
  return isMobile === null ? false : isMobile
}
