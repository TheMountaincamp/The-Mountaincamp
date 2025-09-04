"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations, type TranslationKey } from "@/app/translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  }

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "de" || savedLanguage === "en")) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
