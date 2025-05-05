"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCookieConsent } from "@/contexts/cookie-consent-context"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, savePreferences } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  const handleTogglePreference = (key: "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200"
      >
        <div className="container mx-auto p-4 md:p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Cookie-Einstellungen</h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
            >
              {showDetails ? (
                <>
                  <span className="mr-1">Weniger anzeigen</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span className="mr-1">Details anzeigen</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Einige Cookies
              sind technisch notwendig, während andere uns helfen, Ihre Erfahrung zu verbessern.
            </p>
            <p className="text-gray-600 text-sm">
              Weitere Informationen finden Sie in unserer{" "}
              <Link href="/datenschutz" className="text-primary underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="space-y-4 mb-4">
                  <div className="border p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Notwendige Cookies</h3>
                        <p className="text-sm text-gray-500">
                          Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert
                          werden.
                        </p>
                      </div>
                      <div className="bg-gray-200 px-2 py-1 rounded text-xs">Erforderlich</div>
                    </div>
                  </div>

                  <div className="border p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Analyse-Cookies</h3>
                        <p className="text-sm text-gray-500">
                          Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={() => handleTogglePreference("analytics")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="border p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Marketing-Cookies</h3>
                        <p className="text-sm text-gray-500">
                          Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={() => handleTogglePreference("marketing")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-2 justify-end">
            <Button variant="outline" onClick={rejectAll} className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Nur notwendige Cookies
            </Button>
            {showDetails ? (
              <Button onClick={handleSavePreferences}>Auswahl speichern</Button>
            ) : (
              <Button onClick={acceptAll}>Alle akzeptieren</Button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
