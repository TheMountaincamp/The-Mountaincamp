"use client"

import { useEffect, useRef, useState } from "react"
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
  NEXT_LAUNCH_START_MS,
  NEXT_LAUNCH_LABEL,
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
    nextLaunchTitle: "Nächster Launch",
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
    nextLaunchTitle: "Next launch",
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
    <span className="flex min-w-[2rem] flex-col items-center bg-black/30 px-1.5 py-0.5 tabular-nums md:min-w-[2.75rem] md:px-2 md:py-1">
      <span className="text-sm font-bold leading-none md:text-xl">{String(value).padStart(2, "0")}</span>
      <span className="text-[8px] uppercase tracking-wide opacity-70 md:text-[10px]">{label}</span>
    </span>
  )
}

interface EarlyBirdBannerProps {
  /**
   * Verzögerung in Millisekunden, bevor das Banner überhaupt eingeblendet
   * wird. Standard: 3 Sekunden, damit Besucher zuerst kurz die Seite bzw.
   * das Header-Menü ohne Überlappung sehen können, bevor das Banner
   * erscheint.
   */
  delayMs?: number
  /**
   * Meldet die aktuell gerenderte Höhe des Banners (0, solange es
   * ausgeblendet ist) nach oben, damit z. B. der fixierte Header darunter
   * platziert werden kann statt vom Banner verdeckt zu werden.
   */
  onHeightChange?: (height: number) => void
}

export default function EarlyBirdBanner({ delayMs = 3_000, onHeightChange }: EarlyBirdBannerProps = {}) {
  const { language } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const c = COPY[language]
  const earlyBirdLabel = EARLY_BIRD_LABEL[language]
  const phase2Label = PHASE_2_LABEL[language]
  const nextLaunchLabel = NEXT_LAUNCH_LABEL[language]
  const rootRef = useRef<HTMLElement | null>(null)

  // mounted-Gate: Der Countdown darf erst nach der Hydration rechnen,
  // sonst rendert der Server eine andere Sekundenzahl als der Client.
  const [mounted, setMounted] = useState(false)
  // Verzögert das Einblenden des Banners, damit die Seite (inkl.
  // Header-Menü) erst ungestört sichtbar ist, bevor das Banner erscheint.
  const [armed, setArmed] = useState(false)
  const [phase, setPhase] = useState<OverallPhase>("earlybird-upcoming")
  const [parts, setParts] = useState<Parts | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setArmed(true), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs])

  // Meldet die Banner-Höhe (0 solange nicht sichtbar) nach oben, damit der
  // Header immer unterhalb des Banners bleibt und nutzbar ist.
  useEffect(() => {
    if (!onHeightChange) return
    if (!armed) {
      onHeightChange(0)
      return
    }

    const el = rootRef.current
    if (!el) return

    const report = () => onHeightChange(el.offsetHeight)
    report()

    const resizeObserver = new ResizeObserver(report)
    resizeObserver.observe(el)
    window.addEventListener("resize", report)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", report)
      onHeightChange(0)
    }
  }, [armed, onHeightChange])

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
      } else if (nextPhase === "next-launch-upcoming") {
        setParts(getTimeParts(NEXT_LAUNCH_START_MS, now))
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
            : phase === "next-launch-upcoming"
              ? c.nextLaunchTitle
              : c.endedTitle

  const dateText =
    phase === "earlybird-upcoming" || phase === "earlybird-live"
      ? earlyBirdLabel.full
      : phase === "phase2-upcoming" || phase === "phase2-live"
        ? phase2Label.full
        : phase === "next-launch-upcoming"
          ? nextLaunchLabel.date
          : c.endedText

  const cta = isLive ? c.ctaLive : isEnded ? c.ctaEnded : c.ctaUpcoming
  const href = isLive ? TICKET_URL : "#register"

  // Vor Ablauf der Verzögerung wird nichts gerendert: Die Seite (inkl.
  // Header-Menü) bleibt zunächst ungestört nutzbar.
  if (!armed) return null

  return (
    <motion.aside
      ref={rootRef}
      initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label={title}
      className={`relative z-[60] w-full border-b ${
        isLive ? "border-primary/50 bg-primary" : "border-white/10 bg-black"
      } text-white`}
    >
      <div className="container flex flex-col items-center gap-1.5 py-1.5 md:flex-row md:justify-between md:gap-6 md:py-2.5">
        {/* Linke Seite: Status + Datum */}
        <div className="flex flex-col items-center gap-0.5 text-center md:items-start md:text-left">
          <div className="flex items-center gap-2 md:gap-3">
            {isLive ? (
              <span className="relative flex h-2 w-2 shrink-0 md:h-2.5 md:w-2.5" aria-hidden="true">
                {!prefersReducedMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping bg-white opacity-75" />
                )}
                <span className="relative inline-flex h-2 w-2 bg-white md:h-2.5 md:w-2.5" />
              </span>
            ) : (
              <Ticket className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" aria-hidden="true" />
            )}

            <p className="text-xs font-bold uppercase tracking-wide md:text-base">
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
            <p className="pl-6 text-[10px] font-medium normal-case text-white/50 md:pl-8 md:text-xs">
              {c.phase2Hint}
            </p>
          )}
        </div>

        {/* Rechte Seite: Countdown + CTA */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3">
          <AnimatePresence mode="wait">
            {mounted && parts && (
              <motion.div
                key={phase}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 md:gap-2"
              >
                <Clock className="h-3 w-3 shrink-0 opacity-70 md:h-4 md:w-4" aria-hidden="true" />
                <span className="sr-only">{isLive ? c.liveLead : c.upcomingLead}</span>
                <span className="flex items-center gap-0.5 md:gap-1" aria-live="off">
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
            className={`inline-flex shrink-0 items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:gap-2 md:px-5 md:py-2 md:text-sm ${
              isLive
                ? "bg-white text-primary hover:bg-white/90 focus-visible:outline-white"
                : "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary"
            }`}
          >
            <Ticket className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
            {cta}
          </Link>
        </div>
      </div>
    </motion.aside>
  )
}
