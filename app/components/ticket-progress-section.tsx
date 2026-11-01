"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Check, Ticket, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  TOTAL_TICKETS,
  TICKETS_SOLD,
  TICKET_URL,
  SALE_PHASES,
  getPhaseState,
  getTimeParts,
  type PhaseState,
  type SalePhaseConfig,
} from "@/app/lib/early-bird"

const COPY = {
  de: {
    title: "Ticket-Kontingent",
    subtitle: "Die Plätze für The Mountaincamp 2027 sind limitiert.",
    sold: "vergeben",
    of: "von",
    tickets: "Tickets",
    remaining: (n: number) => `${n} Plätze übrig`,
    liveBadge: "Jetzt aktiv",
    ended: "Verkauf beendet",
    from: "Ab",
    upcomingLead: "Startet in",
    liveLead: "Endet in",
    cta: "Jetzt sichern",
    d: "T",
    h: "Std",
    m: "Min",
    s: "Sek",
  },
  en: {
    title: "Ticket allocation",
    subtitle: "Spots for The Mountaincamp 2027 are limited.",
    sold: "claimed",
    of: "of",
    tickets: "tickets",
    remaining: (n: number) => `${n} spots left`,
    liveBadge: "Live now",
    ended: "Sale ended",
    from: "From",
    upcomingLead: "Starts in",
    liveLead: "Ends in",
    cta: "Get your ticket",
    d: "d",
    h: "h",
    m: "m",
    s: "s",
  },
} as const

function barColor(ratio: number) {
  if (ratio >= 0.9) return "bg-red-500"
  if (ratio >= 0.6) return "bg-yellow-500"
  return "bg-primary"
}


function formatStart(iso: string, language: "de" | "en") {
  return new Intl.DateTimeFormat(language === "de" ? "de-AT" : "en-GB", {
    timeZone: "Europe/Vienna",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(iso))
}

function PhaseCard({ phase, index, now }: { phase: SalePhaseConfig; index: number; now: number | null }) {
  const { language } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const c = COPY[language]
  const lang = language as "de" | "en"
  const state: PhaseState = now === null ? (index === 0 ? "ended" : "upcoming") : getPhaseState(phase, now)
  const live = state === "live"
  const ended = state === "ended"

  const target =
    now === null ? null : live && phase.end ? new Date(phase.end).getTime() : state === "upcoming" && phase.start ? new Date(phase.start).getTime() : null
  const parts = target !== null && now !== null ? getTimeParts(target, now) : null

  const statusText = live
    ? c.liveBadge
    : ended
      ? c.ended
      : phase.start
        ? `${c.from} ${formatStart(phase.start, lang)}`
        : phase.upcomingNote?.[lang] ?? ""

  const unit = (value: number, label: string) => (
    <span
      className={`flex min-w-[2.5rem] flex-col items-center px-2 py-1 tabular-nums ${live ? "bg-white/15" : "bg-gray-100"}`}
    >
      <span className="text-base font-bold leading-none">{String(value).padStart(2, "0")}</span>
      <span className={`text-[9px] uppercase tracking-wide ${live ? "text-white/70" : "text-gray-500"}`}>{label}</span>
    </span>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
      className={`relative border p-6 md:p-8 ${
        live ? "border-primary bg-primary text-white" : ended ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="mb-4 flex items-center gap-2">
        {live ? (
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            {!prefersReducedMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping bg-white opacity-75" />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 bg-white" />
          </span>
        ) : ended ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-gray-400">
            <Check className="h-4 w-4 text-white" aria-hidden="true" />
          </span>
        ) : (
          <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        )}
        <span className={`text-xs font-bold uppercase tracking-wide ${live ? "text-white/85" : "text-gray-500"}`}>
          {statusText}
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <h3 className={`text-xl font-bold uppercase tracking-tight ${live ? "text-white" : "text-gray-900"}`}>
          {phase.name[lang]}
        </h3>
        {!ended && phase.price !== null && (
          <span className={`text-2xl font-bold ${live ? "text-white" : "text-primary"}`}>{phase.price}€</span>
        )}
      </div>

      {!ended && parts && (
        <div className="mt-4 flex items-center gap-2">
          <span className="sr-only">{live ? c.liveLead : c.upcomingLead}</span>
          <span className="flex items-center gap-1" aria-live="off">
            {parts.days > 0 && unit(parts.days, c.d)}
            {unit(parts.hours, c.h)}
            {unit(parts.minutes, c.m)}
            {unit(parts.seconds, c.s)}
          </span>
        </div>
      )}

      {live && (
        <a
          href={TICKET_URL}
          className="mt-4 inline-flex items-center gap-2 bg-white px-5 py-2 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Ticket className="h-4 w-4" aria-hidden="true" />
          {c.cta}
        </a>
      )}
    </motion.div>
  )
}

export default function TicketProgressSection() {
  const { language } = useLanguage()
  const c = COPY[language]

  const ratio = TICKETS_SOLD / TOTAL_TICKETS
  const remaining = TOTAL_TICKETS - TICKETS_SOLD

  // null bis zum Mount, damit Server- und Client-Render identisch sind
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-3 text-3xl font-bold uppercase tracking-tight text-gray-900 md:text-4xl">
            {c.title}
          </h2>
          <p className="text-balance text-gray-600">{c.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mb-10 max-w-3xl"
        >
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {TICKETS_SOLD} {c.of} {TOTAL_TICKETS} {c.tickets} {c.sold}
            </span>
            <span className="text-sm font-semibold text-gray-500">{c.remaining(remaining)}</span>
          </div>

          <div className="h-3 w-full bg-gray-100">
            <motion.div
              className={`h-3 ${barColor(ratio)}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${ratio * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {SALE_PHASES.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} now={now} />
          ))}
        </div>
      </div>
    </section>
  )
}
