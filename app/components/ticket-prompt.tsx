"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Ticket, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useCookieConsent } from "@/contexts/cookie-consent-context"
import { SALE_PHASES, TICKET_URL, getPhaseState, getTimeParts } from "@/app/lib/early-bird"

/**
 * Kauf-Popup: erscheint nach DELAY_MS auf der Seite, solange eine Preisphase
 * mit Enddatum läuft. Die Ersparnis ist die Differenz zwischen aktuellem
 * Preis und dem höchsten späteren Phasenpreis (aktuell 630 € - 530 € = 100 €).
 *
 * Wird es geschlossen, kommt es in derselben Sitzung nicht wieder. Wer auf
 * "Ticket sichern" klickt, sieht es 7 Tage lang nicht mehr.
 */
const DELAY_MS = 10_000
const DISMISS_KEY = "mc-ticket-prompt-dismissed"
const CLICK_KEY = "mc-ticket-prompt-clicked"
const CLICK_PAUSE_MS = 7 * 86_400_000

const COPY = {
  de: {
    kicker: (date: string) => `Frühbucher bis ${date}`,
    title: (save: number) => `Sichere dir jetzt dein Ticket und spare ${save} €`,
    body: (now: number, later: number) => `Jetzt ${now} € statt später ${later} €. Danach steigt der Preis.`,
    endsIn: "Endet in",
    cta: "Ticket sichern",
    close: "Schließen",
    d: "T",
  },
  en: {
    kicker: (date: string) => `Early booking until ${date}`,
    title: (save: number) => `Get your ticket now and save €${save}`,
    body: (now: number, later: number) => `€${now} now instead of €${later} later. The price goes up after that.`,
    endsIn: "Ends in",
    cta: "Get your ticket",
    close: "Close",
    d: "d",
  },
} as const

function readStore(store: "local" | "session", key: string): string | null {
  try {
    return (store === "local" ? window.localStorage : window.sessionStorage).getItem(key)
  } catch {
    return null
  }
}
function writeStore(store: "local" | "session", key: string, value: string) {
  try {
    ;(store === "local" ? window.localStorage : window.sessionStorage).setItem(key, value)
  } catch {
    /* Speicher nicht verfügbar: Popup kommt dann eben wieder */
  }
}

export default function TicketPrompt() {
  const { language } = useLanguage()
  const lang = language as "de" | "en"
  const c = COPY[lang]
  const { showBanner } = useCookieConsent()
  const prefersReducedMotion = useReducedMotion()

  const [elapsed, setElapsed] = useState(false)
  const [blocked, setBlocked] = useState(true)
  const [open, setOpen] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const clickedAt = Number(readStore("local", CLICK_KEY) || 0)
    const dismissed = readStore("session", DISMISS_KEY) === "1"
    setBlocked(dismissed || Date.now() - clickedAt < CLICK_PAUSE_MS)
    const t = window.setTimeout(() => setElapsed(true), DELAY_MS)
    return () => window.clearTimeout(t)
  }, [])

  const live = SALE_PHASES.find((p) => getPhaseState(p, now) === "live")
  const later = Math.max(...SALE_PHASES.map((p) => p.price ?? 0))
  const save = live?.price != null ? later - live.price : 0
  const eligible = !!live && !!live.end && save > 0

  // Erst zeigen, wenn die Wartezeit um ist und der Cookie-Banner nicht im Weg ist
  useEffect(() => {
    if (elapsed && !blocked && !showBanner && eligible) setOpen(true)
  }, [elapsed, blocked, showBanner, eligible])

  useEffect(() => {
    if (!open) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss()
    window.addEventListener("keydown", onKey)
    return () => {
      window.clearInterval(id)
      window.removeEventListener("keydown", onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function dismiss() {
    writeStore("session", DISMISS_KEY, "1")
    setOpen(false)
  }

  if (!live || !live.end || live.price == null) return null

  const endDate = new Intl.DateTimeFormat(lang === "de" ? "de-AT" : "en-GB", {
    timeZone: "Europe/Vienna",
    day: "numeric",
    month: "long",
  }).format(new Date(new Date(live.end).getTime() - 1))
  const parts = getTimeParts(new Date(live.end).getTime(), now)
  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ticket-prompt-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={dismiss}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4"
        >
        <motion.div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          aria-labelledby="ticket-prompt-title"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-sm overflow-hidden border border-white/40 bg-white/70 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between bg-primary/85 px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-wide text-white">{c.kicker(endDate)}</span>
            <button
              type="button"
              onClick={dismiss}
              aria-label={c.close}
              className="-mr-1 p-1 text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="p-5">
            <h2 id="ticket-prompt-title" className="text-xl font-bold uppercase leading-tight tracking-tight text-gray-900">
              {c.title(save)}
            </h2>
            <p className="mt-2 text-sm text-gray-700">{c.body(live.price, later)}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <span>{c.endsIn}</span>
              <span className="font-bold tabular-nums text-gray-900" aria-live="off">
                {parts.days > 0 && `${parts.days}${c.d} `}
                {pad(parts.hours)}:{pad(parts.minutes)}:{pad(parts.seconds)}
              </span>
            </div>

            <a
              href={TICKET_URL}
              onClick={() => {
                writeStore("local", CLICK_KEY, String(Date.now()))
                setOpen(false)
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Ticket className="h-4 w-4" aria-hidden="true" />
              {c.cta}
            </a>
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
