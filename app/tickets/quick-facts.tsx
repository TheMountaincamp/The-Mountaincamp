"use client"

import { Check } from "lucide-react"
import { SALE_PHASES, getPhaseState } from "@/app/lib/early-bird"
import BookingHelper from "./booking-helper"

/**
 * Kurzinfo direkt über der Buchungsmaske: Preis, Frist, Leistungen in Stichworten.
 * Die ausführlichen Infos stehen weiterhin unter der Maske (TicketInfo).
 * Preis und Frist kommen aus SALE_PHASES, damit sie nie veralten.
 */
const COPY = {
  de: {
    after: (p: number) => `danach ${p} €`,
    until: (d: string) => `nur bis ${d}`,
    points: [
      "4 Nächte im Berghaus auf 1.700 m",
      "Vollpension, auch vegetarisch und vegan",
      "Tägliche geführte Trailruns für jedes Level",
      "Gemeinsame Abende, Lagerfeuer und Sunset Rave",
    ],
    extras: [
      "Zubuchbar: Workshops wie Yoga, Töpfern und Aquarell",
      "Shuttle ab Berlin 120 €, München 80 €, Jenbach 40 €",
      "Die meisten reisen allein oder zu zweit an",
      "7 Tage nach Buchung kostenlos stornieren (bei Buchung bis 30 Tage vor Camp-Start), danach bis 30 Tage vorher 20 %",
    ],
    cta: "Jetzt buchen",
    more: "Alle Details",
  },
  en: {
    after: (p: number) => `then ${p} €`,
    until: (d: string) => `only until ${d}`,
    points: [
      "4 nights in a mountain lodge at 1,700 m",
      "Full board, vegetarian and vegan too",
      "Daily guided trail runs for every level",
      "Evenings together, campfires and the sunset rave",
    ],
    extras: [
      "Add-ons: workshops such as yoga, pottery and watercolour",
      "Shuttle from Berlin 120 €, Munich 80 €, Jenbach 40 €",
      "Most people come alone or as a pair",
      "Free cancellation within 7 days of booking (if booked at least 30 days before the camp), then 20 % up to 30 days before",
    ],
    cta: "Book now",
    more: "All details",
  },
} as const

function fmtDate(iso: string, lang: "de" | "en") {
  // Phasenende ist 00:00 des Folgetags, angezeigt wird der letzte gültige Tag
  const d = new Date(new Date(iso).getTime() - 1)
  return d.toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { day: "numeric", month: "long", timeZone: "Europe/Vienna" })
}

export default function QuickFacts({ lang }: { lang: "de" | "en" }) {
  const t = COPY[lang]
  const idx = SALE_PHASES.findIndex((p) => getPhaseState(p) === "live" && p.price)
  const live = idx >= 0 ? SALE_PHASES[idx] : null
  const next = live ? SALE_PHASES.slice(idx + 1).find((p) => p.price) : null

  return (
    <section
      aria-label={lang === "de" ? "Das Wichtigste auf einen Blick" : "At a glance"}
      className="mx-auto mb-6 max-w-3xl md:mb-10"
    >
      {live && (
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-3xl font-bold md:text-4xl">{live.price} €</span>
          {next && <span className="text-sm text-gray-500 md:text-base">{t.after(next.price!)}</span>}
          {live.end && (
            <span className="bg-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white md:text-sm">
              {t.until(fmtDate(live.end, lang))}
            </span>
          )}
        </div>
      )}

      <ul className="mt-4 grid gap-2 text-sm text-gray-800 md:grid-cols-2 md:text-base">
        {t.points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>

      <ul className="mt-3 space-y-1 text-xs text-gray-500 md:text-sm">
        {t.extras.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <BookingHelper lang={lang} basePrice={live?.price ?? null} />
      <a href="#details" className="mt-3 inline-block text-sm text-gray-600 underline">
        {t.more}
      </a>
    </section>
  )
}
