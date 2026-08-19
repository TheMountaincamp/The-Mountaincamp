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
  PHASE_2_START_MS,
  PHASE_2_END_MS,
  PHASE_2_PRICE,
  PHASE_2_LABEL,
  TICKET_URL,
  getOverallPhase,
  getTimeParts,
  type OverallPhase,
} from "@/app/lib/early-bird"

const COPY = {
  de: {
    earlybirdUpcomingTitle: "Early-Bird-Tickets",
    earlybirdLiveTitle: "Early-Bird-Verkauf läuft",
    phase2UpcomingTitle: "Phase 2 startet in Kürze",
    phase2LiveTitle: `Phase 2 läuft · ${PHASE_2_PRICE}€`,
    endedTitle: "Ticketverkauf beendet",
    endedText: "Trag dich ein, wir melden uns beim nächsten Ticket-Release.",
    liveLead: "Noch",
    upcomingLead: "Start in",
    phase2Hint: `Danach Phase 2: ${PHASE_2_LABEL.de.date} für ${PHASE_2_PRICE}€`,
    ctaLive: "Jetzt Tickets sichern",
    ctaUpcoming: "Erinnerung aktivieren",
    ctaEnded: "Auf die Warteliste",
    d: "T",
    h: "Std",
    m: "Min",
    s: "Sek",
  },
  en: {
    earlybirdUpcomingTitle: "Early-bird tickets",
    earlybirdLiveTitle: "Early-bird sale is live",
    phase2UpcomingTitle: "Phase 2 starts soon",
    phase2LiveTitle: `Phase 2 is live · ${PHASE_2_PRICE}€`,
    endedTitle: "Ticket sale has ended",
    endedText: "Sign up and we'll let you know about the next ticket release.",
    liveLead: "Only",
    upcomingLead: "Starts in",
    phase2Hint: `Then Phase 2: ${PHASE_2_LABEL.en.date} for ${PHASE_2_PRICE}€`,
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
  const earlyBirdLabel = EARLY_BIRD_LABEL[language]
  const phase2Label = PHASE_2_LABEL[language]

  // mounted-Gate: Der Countdown darf erst nach der Hydration rechnen,
  // sonst rendert der Server eine andere Sekundenzahl als der Client.
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<OverallPhase>("earlybird-upcoming")
  const [parts, setParts] = useState<Parts | null>(null)

  useEffect(() => {
    setMounted(true)

    const tick = () => {
      const now = Date.now()
      const nextPhase = getOverallPhase(now)
      setPhase(nextPhase)

      if (nextPhase === "earlybird-upcoming") {
        setParts(getTimeParts(EARLY_BIRD_START_MS, now))
      } else if (nextPhase === "earlybird-live") {
        setParts(getTimeParts(EARLY_BIRD_END_MS, now))
      } else if (nextPhase === "phase2-upcoming") {
        setParts(getTimeParts(PHASE_2_START_MS, now))
      } else if (nextPhase === "phase2-live") {
        setParts(getTimeParts(PHASE_2_END_MS, now))
      } else {
        setParts(null)
      }
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const isLive = phase === "earlybird-live" || phase === "phase2-live"
  const isEnded = phase === "ended"
  const showPhase2Hint = phase === "earlybird-upcoming" || phase === "earlybird-live"

  const title =
    phase === "earlybird-upcoming"
      ? c.earlybirdUpcomingTitle
      : phase === "earlybird-live"
        ? c.earlybirdLiveTitle
        : phase === "phase2-upcoming"
          ? c.phase2UpcomingTitle
          : phase === "phase2-live"
            ? c.phase2LiveTitle
            : c.endedTitle

  const dateText =
    phase === "earlybird-upcoming" || phase === "earlybird-live"
      ? earlyBirdLabel.full
      : phase === "phase2-upcoming" || phase === "phase2-live"
        ? phase2Label.full
        : c.endedText

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
        <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
          <div className="flex items-center gap-3">
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
                {dateText}
              </span>
            </p>
          </div>

          {showPhase2Hint && (
            <p className="pl-8 text-xs font-medium normal-case text-white/50 md:pl-8">{c.phase2Hint}</p>
          )}
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
                <span className="sr-only">{isLive ? c.liveLead : c.upcomingLead}</span>
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
            className={`inline-flex shrink-0 items-center gap-2 px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
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
