"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Clock, Euro } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"

// ─── Price mapping ──────────────────────────────────────────────────────────

const PRICES: Record<string, number | "Free"> = {
  "Stricken lernen": 12,
  "Upcycling": 12,
  "Upcycling 1": 12,
  "Upcycling 2": 12,
  "Linoleum-Druck": 12,
  "Töpfern": 12,
  "Aquarell-malen": 12,
  "Bogenschießen": 18,
  "MTB-Tour": 22,
  "Kanu fahren": 20,
  "Kanu fahren Gr. 1": 20,
  "Kanu fahren Gr. 2": 20,
  "Ernährungsworkshop": 25,
  "Krafttraining Workshop": 25,
  "Trailrunning Technik Kurs": 25,
  "Morning Yoga": "Free",
  "Krafttraining für Läufer*innen": "Free",
  "Kletterkurs": 35,
  "Kletterkurs 1": 35,
  "Kletterkurs 2": 35,
}

function getPrice(name: string): number | "Free" | null {
  return PRICES[name] ?? null
}

// ─── Event types ────────────────────────────────────────────────────────────

type EventCategory = "yoga" | "meal" | "run" | "workshop" | "travel" | "evening" | "shared"

interface ScheduleEvent {
  time: string
  name: string
  sub?: string
  category: EventCategory
  groups?: string[]
}

interface DaySchedule {
  day: string
  dayEn: string
  date: string
  events: ScheduleEvent[]
}

// ─── Schedule data ──────────────────────────────────────────────────────────

const SCHEDULE: DaySchedule[] = [
  {
    day: "Mittwoch",
    dayEn: "Wednesday",
    date: "05. August 2026",
    events: [
      { time: "06:36", name: "Zug Berlin → München", sub: "Ankunft 10:45", category: "travel" },
      { time: "12:30", name: "Bus München → Hochkrimml", sub: "Ankunft 16:30", category: "travel" },
      { time: "16:30", name: "Check-in", sub: "Zimmerverteilung & Ankommen", category: "travel" },
      { time: "18:00", name: "Welcome & Ablauf", sub: "Begrüßung und Programmvorstellung", category: "shared" },
      { time: "18:30", name: "Dinner", sub: "Gemeinsames Abendessen", category: "meal" },
      { time: "19:30", name: "Dinner Filzsteinalm / Duxer Alm", sub: "Optionaler Ausflug", category: "evening" },
    ],
  },
  {
    day: "Donnerstag",
    dayEn: "Thursday",
    date: "06. August 2026",
    events: [
      { time: "06:30", name: "Morning Yoga", sub: "Optional · 60 Min", category: "yoga" },
      { time: "07:30", name: "Frühstück", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", sub: "Tagesplanung", category: "shared" },
      { time: "08:30", name: "Trailrunning Technik Kurs", sub: "Gruppe A1 · 8:30 – 10:30", category: "workshop", groups: ["A1"] },
      { time: "08:30", name: "Krafttraining für Läufer*innen", sub: "Gruppe A2 · 8:30 – 10:30", category: "workshop", groups: ["A2"] },
      { time: "08:30", name: "Trail Run Fortgeschritten", sub: "Gruppe B · 11–17 km · 500–1500 hm", category: "run", groups: ["B"] },
      { time: "08:30", name: "Trail Run Profi", sub: "Gruppe C · 17+ km · 800+ hm", category: "run", groups: ["C"] },
      { time: "10:30", name: "Krafttraining für Läufer*innen", sub: "Gruppe A1 · 10:30 – 12:30", category: "workshop", groups: ["A1"] },
      { time: "10:30", name: "Trailrunning Technik Kurs", sub: "Gruppe A2 · 10:30 – 12:30", category: "workshop", groups: ["A2"] },
      { time: "12:30", name: "Mittagessen", category: "meal" },
      { time: "13:30", name: "Anfahrt See", sub: "30 Min · Für Kanu Gr. 1", category: "travel" },
      { time: "14:00", name: "Kanu fahren Gr. 1", sub: "14:00 – 15:30", category: "workshop" },
      { time: "13:30", name: "Linoleum-Druck", sub: "13:30 – 17:00", category: "workshop" },
      { time: "15:00", name: "Anfahrt See", sub: "30 Min · Für Kanu Gr. 2", category: "travel" },
      { time: "15:30", name: "Kanu fahren Gr. 2", sub: "15:30 – 17:00", category: "workshop" },
      { time: "16:30", name: "Ernährungsworkshop", sub: "16:30 – 18:30", category: "workshop" },
      { time: "18:30", name: "Dinner", sub: "Gemeinsames Abendessen", category: "meal" },
      { time: "19:30", name: "Outdoormovie Night + Speakers Event", category: "evening" },
    ],
  },
  {
    day: "Freitag",
    dayEn: "Friday",
    date: "07. August 2026",
    events: [
      { time: "05:00", name: "Sunrise Hike", sub: "Optional · 90 Min", category: "yoga" },
      { time: "06:30", name: "Morning Yoga", sub: "Optional · 60 Min", category: "yoga" },
      { time: "07:30", name: "Frühstück", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", sub: "Tagesplanung", category: "shared" },
      { time: "08:30", name: "Trail Run Anfänger", sub: "Gruppe A · 8–13 km · 300–800 hm", category: "run", groups: ["A"] },
      { time: "08:30", name: "Trail Run Fortgeschritten", sub: "Gruppe B · 11–17 km · 500–1500 hm", category: "run", groups: ["B"] },
      { time: "08:30", name: "Trail Run Profi", sub: "Gruppe C · 17+ km · 800+ hm", category: "run", groups: ["C"] },
      { time: "12:30", name: "Mittagessen", category: "meal" },
      { time: "13:30", name: "Kletterkurs 1", sub: "13:30 – 15:30", category: "workshop" },
      { time: "13:30", name: "Bogenschießen", sub: "13:30 – 15:30", category: "workshop" },
      { time: "13:30", name: "Upcycling 1", sub: "13:30 – 15:30", category: "workshop" },
      { time: "15:30", name: "Upcycling 2", sub: "15:30 – 17:30", category: "workshop" },
      { time: "15:45", name: "Kletterkurs 2", sub: "15:45 – 17:45", category: "workshop" },
      { time: "17:00", name: "Krafttraining Workshop", sub: "17:00 – 18:30", category: "workshop" },
      { time: "18:30", name: "Dinner", sub: "Gemeinsames Abendessen", category: "meal" },
      { time: "19:30", name: "Lagerfeuerabend", sub: "Gemütlicher Abend am Feuer", category: "evening" },
    ],
  },
  {
    day: "Samstag",
    dayEn: "Saturday",
    date: "08. August 2026",
    events: [
      { time: "06:30", name: "Morning Yoga", sub: "Optional · 60 Min", category: "yoga" },
      { time: "07:30", name: "Frühstück", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", sub: "Tagesplanung", category: "shared" },
      { time: "08:30", name: "Trail Run Anfänger", sub: "Gruppe A · 8–13 km · 300–800 hm", category: "run", groups: ["A"] },
      { time: "08:30", name: "Trail Run Fortgeschritten", sub: "Gruppe B · 11–17 km · 500–1500 hm", category: "run", groups: ["B"] },
      { time: "08:30", name: "Trail Run Profi", sub: "Gruppe C · 17+ km · 800+ hm", category: "run", groups: ["C"] },
      { time: "12:30", name: "Mittagessen", category: "meal" },
      { time: "13:30", name: "Anfahrt MTB", sub: "30 Min", category: "travel" },
      { time: "14:00", name: "MTB-Tour", sub: "14:00 – 16:15", category: "workshop" },
      { time: "13:30", name: "Töpfern", sub: "Slot 1 · 13:30 – 15:00", category: "workshop" },
      { time: "15:15", name: "Töpfern", sub: "Slot 2 · 15:15 – 16:45", category: "workshop" },
      { time: "18:30", name: "Dinner", sub: "Gemeinsames Abendessen", category: "meal" },
      { time: "19:30", name: "Letzter Abend", sub: "Gemeinsamer Abschluss", category: "evening" },
    ],
  },
  {
    day: "Sonntag",
    dayEn: "Sunday",
    date: "09. August 2026",
    events: [
      { time: "05:00", name: "Sunrise Hike", sub: "Optional · 90 Min", category: "yoga" },
      { time: "06:30", name: "Morning Yoga", sub: "Optional · 60 Min", category: "yoga" },
      { time: "07:30", name: "Frühstück", category: "meal" },
      { time: "08:30", name: "Abreise", sub: "Check-out und Verabschiedung", category: "travel" },
    ],
  },
]

// ─── Category styles ────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<EventCategory, { bg: string; border: string; text: string; dot: string }> = {
  yoga: { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-300", dot: "bg-teal-400" },
  meal: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-300", dot: "bg-amber-400" },
  run: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-300", dot: "bg-purple-400" },
  workshop: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-300", dot: "bg-emerald-400" },
  travel: { bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-300", dot: "bg-slate-400" },
  evening: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-300", dot: "bg-indigo-400" },
  shared: { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-300", dot: "bg-gray-400" },
}

const CATEGORY_LABELS: Record<EventCategory, { de: string; en: string }> = {
  yoga: { de: "Yoga / Sunrise", en: "Yoga / Sunrise" },
  meal: { de: "Mahlzeit", en: "Meal" },
  run: { de: "Trail Run", en: "Trail Run" },
  workshop: { de: "Workshop", en: "Workshop" },
  travel: { de: "Reise", en: "Travel" },
  evening: { de: "Abend", en: "Evening" },
  shared: { de: "Gemeinsam", en: "Shared" },
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function ZeitplanPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-gray-950 pt-24 pb-10 border-b border-white/10">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "de" ? "Zurück" : "Back"}
          </Link>
          <h1 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
            {language === "de" ? "Zeitplan 2026" : "Schedule 2026"}
          </h1>
          <p className="mt-2 text-lg text-white/60">The Mountaincamp · 5 – 9 August 2026</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> 5.–9. August 2026</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Hochkrimml, Österreich</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 {language === "de" ? "Tage" : "Days"}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-b border-white/10 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            {language === "de" ? "Legende" : "Legend"}
          </p>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(CATEGORY_STYLES) as EventCategory[]).map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${CATEGORY_STYLES[cat].dot}`} />
                <span className="text-xs text-white/60">{CATEGORY_LABELS[cat][language]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {SCHEDULE.map((day, dayIdx) => (
            <div key={dayIdx} className="rounded-xl border border-white/10 bg-gray-900/50 overflow-hidden">
              {/* Day header */}
              <div className="bg-primary px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  {language === "de" ? day.day : day.dayEn}
                </h2>
                <p className="text-sm text-white/70">{day.date}</p>
              </div>

              {/* Events */}
              <div className="divide-y divide-white/5">
                {day.events.map((event, eventIdx) => {
                  const style = CATEGORY_STYLES[event.category]
                  const price = getPrice(event.name)
                  
                  return (
                    <div
                      key={eventIdx}
                      className={`flex items-start gap-4 px-4 py-3 md:px-6 md:py-4 ${style.bg} border-l-4 ${style.border}`}
                    >
                      {/* Time */}
                      <div className="w-14 shrink-0 text-right">
                        <span className="font-mono text-sm font-semibold text-white/80">{event.time}</span>
                      </div>

                      {/* Dot */}
                      <div className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} />

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={`font-semibold ${style.text}`}>{event.name}</h3>
                          {event.groups && (
                            <div className="flex gap-1">
                              {event.groups.map((g) => (
                                <span
                                  key={g}
                                  className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/60"
                                >
                                  {g}
                                </span>
                              ))}
                            </div>
                          )}
                          {price !== null && (
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                              price === "Free" 
                                ? "bg-green-500/20 text-green-300" 
                                : "bg-amber-500/20 text-amber-300"
                            }`}>
                              {price === "Free" ? (
                                language === "de" ? "Kostenlos" : "Free"
                              ) : (
                                <><Euro className="h-3 w-3" />{price}</>
                              )}
                            </span>
                          )}
                        </div>
                        {event.sub && (
                          <p className="mt-0.5 text-sm text-white/50">{event.sub}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop pricing overview */}
      <div className="container mx-auto px-4 pb-12">
        <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {language === "de" ? "Workshop-Preise im Überblick" : "Workshop Prices Overview"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(PRICES)
              .filter(([name]) => !name.includes("Gr.") && !name.match(/\d$/))
              .map(([name, price]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3"
                >
                  <span className="text-sm text-white/80">{name}</span>
                  <span className={`text-sm font-semibold ${
                    price === "Free" ? "text-green-400" : "text-amber-400"
                  }`}>
                    {price === "Free" ? (language === "de" ? "Kostenlos" : "Free") : `${price} €`}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="container mx-auto px-4 pb-20">
        <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6">
          <h3 className="font-semibold text-white">
            {language === "de" ? "Hinweise" : "Notes"}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>• {language === "de" ? "Alle Zeiten sind vorläufig." : "All times are provisional."}</li>
            <li>• {language === "de" ? "Morning Yoga und Sunrise Hike sind optional und kostenlos." : "Morning Yoga and Sunrise Hike are optional and free."}</li>
            <li>• {language === "de" ? "Gruppeneinteilung A/B/C nach Erfahrungslevel." : "Group assignment A/B/C based on experience level."}</li>
            <li>• {language === "de" ? "Bei den Nachmittagsworkshops freie Wahl (begrenzte Plätze)." : "Free choice among afternoon workshops (limited spots)."}</li>
            <li>• {language === "de" ? "Workshop-Preise werden vor Ort abgerechnet." : "Workshop prices are charged on-site."}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
