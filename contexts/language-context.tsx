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

  // Funktion zum Übersetzen von Texten
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  // Speichern der Spracheinstellung im localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "de" || savedLanguage === "en")) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
