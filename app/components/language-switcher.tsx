"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const changeLanguage = (lang: "de" | "en") => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-sm font-medium uppercase hover:text-primary transition-colors text-white"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4" />
        <span>{language.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-24 rounded-md bg-black shadow-lg border border-primary/20 z-50"
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                onClick={() => changeLanguage("de")}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === "de" ? "text-primary" : "text-white hover:text-primary"
                }`}
                role="menuitem"
              >
                Deutsch
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === "en" ? "text-primary" : "text-white hover:text-primary"
                }`}
                role="menuitem"
              >
                English
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
