"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Check, Ticket, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  TOTAL_TICKETS,
  TICKETS_SOLD,
  PHASE_2_START_MS,
  PHASE_2_PRICE,
  PHASE_2_LABEL,
  TICKET_URL,
  getTimeParts,
} from "@/app/lib/early-bird"

const COPY = {
  de: {
    title: "Ticket-Kontingent",
    subtitle: "Die Plätze für The Mountaincamp 2027 sind limitiert.",
    sold: "vergeben",
    of: "von",
    tickets: "Tickets",
    remaining: (n: number) => `${n} Plätze übrig`,
    phase1Name: "Phase 1 · Early Bird",
    phase1Status: "Verkauf beendet",
    phase2Name: "Phase 2",
    phase2LiveBadge: "Jetzt aktiv",
    phase2UpcomingLead: "Startet in",
    phase2Cta: "Jetzt sichern",
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
    phase1Name: "Phase 1 · Early bird",
    phase1Status: "Sale ended",
    phase2Name: "Phase 2",
    phase2LiveBadge: "Live now",
    phase2UpcomingLead: "Starts in",
    phase2Cta: "Get your ticket",
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

export default function TicketProgressSection() {
  const { language } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const c = COPY[language]
  const label = PHASE_2_LABEL[language]

  const ratio = TICKETS_SOLD / TOTAL_TICKETS
  const remaining = TOTAL_TICKETS - TICKETS_SOLD

  const [mounted, setMounted] = useState(false)
  const [phase2Live, setPhase2Live] = useState(false)
  const [parts, setParts] = useState<ReturnType<typeof getTimeParts> | null>(null)

  useEffect(() => {
    setMounted(true)

    const tick = () => {
      const now = Date.now()
      const live = now >= PHASE_2_START_MS
      setPhase2Live(live)
      setParts(live ? null : getTimeParts(PHASE_2_START_MS, now))
    }

    tick()
    const id = window.setInterval(tick, 1000)
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
          {/* Phase 1: Early Bird */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="border border-gray-200 bg-gray-50 p-6 md:p-8"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-gray-400">
                <Check className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                {c.phase1Status}
              </span>
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900">{c.phase1Name}</h3>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={`relative border p-6 md:p-8 ${
              phase2Live ? "border-primary bg-primary text-white" : "border-gray-200 bg-white"
            }`}
          >
            <div className="mb-4 flex items-center gap-2">
              {phase2Live ? (
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                  {!prefersReducedMotion && (
                    <span className="absolute inline-flex h-full w-full animate-ping bg-white opacity-75" />
                  )}
                  <span className="relative inline-flex h-2.5 w-2.5 bg-white" />
                </span>
              ) : (
                <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              )}
              <span
                className={`text-xs font-bold uppercase tracking-wide ${
                  phase2Live ? "text-white/85" : "text-gray-500"
                }`}
              >
                {phase2Live ? c.phase2LiveBadge : label.full}
              </span>
            </div>

            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3
                className={`text-xl font-bold uppercase tracking-tight ${
                  phase2Live ? "text-white" : "text-gray-900"
                }`}
              >
                {c.phase2Name}
              </h3>
              <span className={`text-2xl font-bold ${phase2Live ? "text-white" : "text-primary"}`}>
                {PHASE_2_PRICE}€
              </span>
            </div>

            {!phase2Live && mounted && parts && (
              <div className="mb-4 flex items-center gap-2">
                <span className="sr-only">{c.phase2UpcomingLead}</span>
                <span className="flex items-center gap-1" aria-live="off">
                  {parts.days > 0 && (
                    <span className="flex min-w-[2.5rem] flex-col items-center bg-gray-100 px-2 py-1 tabular-nums">
                      <span className="text-base font-bold leading-none">{String(parts.days).padStart(2, "0")}</span>
                      <span className="text-[9px] uppercase tracking-wide text-gray-500">{c.d}</span>
                    </span>
                  )}
                  <span className="flex min-w-[2.5rem] flex-col items-center bg-gray-100 px-2 py-1 tabular-nums">
                    <span className="text-base font-bold leading-none">{String(parts.hours).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase tracking-wide text-gray-500">{c.h}</span>
                  </span>
                  <span className="flex min-w-[2.5rem] flex-col items-center bg-gray-100 px-2 py-1 tabular-nums">
                    <span className="text-base font-bold leading-none">{String(parts.minutes).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase tracking-wide text-gray-500">{c.m}</span>
                  </span>
                  <span className="flex min-w-[2.5rem] flex-col items-center bg-gray-100 px-2 py-1 tabular-nums">
                    <span className="text-base font-bold leading-none">{String(parts.seconds).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase tracking-wide text-gray-500">{c.s}</span>
                  </span>
                </span>
              </div>
            )}

            {phase2Live && (
              <Link
                href={TICKET_URL}
                className="inline-flex items-center gap-2 bg-white px-5 py-2 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Ticket className="h-4 w-4" aria-hidden="true" />
                {c.phase2Cta}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
