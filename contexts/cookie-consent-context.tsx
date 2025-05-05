"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type CookieConsent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

type CookieConsentContextType = {
  consent: CookieConsent
  showBanner: boolean
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (preferences: CookieConsent) => void
  openPreferences: () => void
}

const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent)
  const [showBanner, setShowBanner] = useState<boolean>(false)

  // Load consent from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedConsent = localStorage.getItem("cookieConsent")

      if (storedConsent) {
        try {
          setConsent(JSON.parse(storedConsent))
          setShowBanner(false)
        } catch (e) {
          setShowBanner(true)
        }
      } else {
        setShowBanner(true)
      }
    }
  }, [])

  const acceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setConsent(fullConsent)
    setShowBanner(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", JSON.stringify(fullConsent))
    }
  }

  const rejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    setConsent(minimalConsent)
    setShowBanner(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", JSON.stringify(minimalConsent))
    }
  }

  const savePreferences = (preferences: CookieConsent) => {
    const updatedPreferences = { ...preferences, necessary: true }
    setConsent(updatedPreferences)
    setShowBanner(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", JSON.stringify(updatedPreferences))
    }
  }

  const openPreferences = () => {
    setShowBanner(true)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        showBanner,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}
