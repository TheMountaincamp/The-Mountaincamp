"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { type Language, type TranslationKey } from "@/app/translations"
import { EN_PATHS, isEnPath, stripEn } from "@/app/lib/locale"
import { setTextOverrides, tKey, type TextOverrides } from "@/app/lib/texts"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children, overrides }: { children: ReactNode; overrides?: TextOverrides }) {
  // Texte aus dem Admin-Bereich, vor dem Rendern der Seite setzen
  setTextOverrides(overrides)
  const pathname = usePathname()
  const router = useRouter()
  const enUrl = isEnPath(pathname)
  // Unter /en ist die Sprache durch die Adresse festgelegt (auch beim Server-Rendering).
  // Auf allen anderen Seiten gilt Deutsch, außer die Person hat Englisch gewählt.
  const [stored, setStored] = useState<Language>("de")
  const language: Language = enUrl ? "en" : stored

  useEffect(() => {
    if (enUrl) {
      setStored("en")
      localStorage.setItem("language", "en")
      return
    }
    const saved = localStorage.getItem("language")
    if (saved === "de" || saved === "en") setStored(saved)
  }, [enUrl])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setStored(lang)
    localStorage.setItem("language", lang)
    const base = stripEn(pathname || "/")
    const suffix = typeof window !== "undefined" ? window.location.hash : ""
    if (lang === "en" && !enUrl && EN_PATHS.includes(base)) {
      router.push((base === "/" ? "/en" : `/en${base}`) + suffix)
    } else if (lang === "de" && enUrl) {
      router.push(base + suffix)
    }
  }

  const t = (key: TranslationKey): string => {
    return tKey(language, key)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
