"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Ticket, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  EARLY_BIRD_START_MS,
  EARLY_BIRD_END_MS,
  EARLY_BIRD_LABEL,
  TICKET_URL,
  getSalePhase,
  getTimeParts,
  type SalePhase,
} from "@/app/lib/early-bird"

const COPY = {
  de: {
    upcomingTitle: "Early-Bird-Tickets",
    upcomingLead: "Verkaufsstart in",
    liveTitle: "Early-Bird-Verkauf läuft",
    liveLead: "Noch",
    liveTail: "Zeit",
    endedTitle: "Early-Bird-Verkauf beendet",
    endedText: "Trag dich ein, wir melden uns beim nächsten Ticket-Release.",
    ctaLive: "Jetzt Tickets sichern",
    ctaUpcoming: "Erinnerung aktivieren",
    ctaEnded: "Auf die Warteliste",
    d: "T",
    h: "Std",
    m: "Min",
    s: "Sek",
  },
  en: {
    upcomingTitle: "Early-bird tickets",
    upcomingLead: "Sale starts in",
    liveTitle: "Early-bird sale is live",
    liveLead: "Only",
    liveTail: "left",
    endedTitle: "Early-bird sale has ended",
    endedText: "Sign up and we'll let you know about the next ticket release.",
    ctaLive: "Get your ticket",
    ctaUpcoming: "Remind me",
    ctaEnded: "Join the waitlist",
    d: "d",
    h: "h",
    m: "m",
    s: "s",
  },
} as const

type Parts = ReturnType<typeof getTimeParts>

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex min-w-[2.75rem] flex-col items-center bg-black/30 px-2 py-1 tabular-nums">
      <span className="text-lg font-bold leading-none md:text-xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wide opacity-70">{label}</span>
    </span>
  )
}

export default function EarlyBirdBanner() {
  const { language } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const c = COPY[language]
  const label = EARLY_BIRD_LABEL[language]

  // mounted-Gate: Der Countdown darf erst nach der Hydration rechnen,
  // sonst rendert der Server eine andere Sekundenzahl als der Client.
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<SalePhase>("upcoming")
  const [parts, setParts] = useState<Parts | null>(null)

  useEffect(() => {
    setMounted(true)

    const tick = () => {
      const now = Date.now()
      const nextPhase = getSalePhase(now)
      setPhase(nextPhase)

      if (nextPhase === "upcoming") {
        setParts(getTimeParts(EARLY_BIRD_START_MS, now))
      } else if (nextPhase === "live") {
        setParts(getTimeParts(EARLY_BIRD_END_MS, now))
      } else {
        setParts(null)
      }
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const isLive = phase === "live"
  const isEnded = phase === "ended"

  const title = isLive ? c.liveTitle : isEnded ? c.endedTitle : c.upcomingTitle
  const cta = isLive ? c.ctaLive : isEnded ? c.ctaEnded : c.ctaUpcoming
  const href = isLive ? TICKET_URL : "#register"

  return (
    <motion.aside
      initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label={title}
      className={`relative z-[60] w-full border-b ${
        isLive ? "border-primary/50 bg-primary" : "border-white/10 bg-black"
      } text-white`}
    >
      <div className="container flex flex-col items-center gap-3 py-3 md:flex-row md:justify-between md:gap-6 md:py-2.5">
        {/* Linke Seite: Status + Datum */}
        <div className="flex items-center gap-3 text-center md:text-left">
          {isLive ? (
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              {!prefersReducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping bg-white opacity-75" />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 bg-white" />
            </span>
          ) : (
            <Ticket className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          )}

          <p className="text-sm font-bold uppercase tracking-wide md:text-base">
            {title}
            <span
              className={`ml-2 font-normal normal-case ${
                isLive ? "text-white/85" : "text-white/60"
              }`}
            >
              {isEnded ? c.endedText : label.full}
            </span>
          </p>
        </div>

        {/* Rechte Seite: Countdown + CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            {mounted && parts && (
              <motion.div
                key={phase}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                <span className="sr-only">
                  {isLive ? c.liveLead : c.upcomingLead}
                </span>
                <span className="flex items-center gap-1" aria-live="off">
                  {parts.days > 0 && <Unit value={parts.days} label={c.d} />}
                  <Unit value={parts.hours} label={c.h} />
                  <Unit value={parts.minutes} label={c.m} />
                  <Unit value={parts.seconds} label={c.s} />
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href={href}
            className={`inline-flex shrink-0 items-center gap-2 px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isLive
                ? "bg-white text-primary hover:bg-white/90 focus-visible:outline-white"
                : "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary"
            }`}
          >
            <Ticket className="h-4 w-4" aria-hidden="true" />
            {cta}
          </Link>
        </div>
      </div>
    </motion.aside>
  )
}