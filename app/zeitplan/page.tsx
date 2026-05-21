"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Euro } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"

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
  "Sunrise Hike": "Free",
  "Kletterkurs": 35,
  "Kletterkurs 1": 35,
  "Kletterkurs 2": 35,
}

function getPrice(name: string): number | "Free" | null {
  return PRICES[name] ?? null
}

interface Event {
  time: string
  name: string
  sub?: string
  duration?: string
  location?: string
  groups?: string[]
  category: "yoga" | "meal" | "run" | "workshop" | "travel" | "evening" | "shared"
}

interface Day {
  day: string
  dayEn: string
  date: string
  events: Event[]
}

const SCHEDULE: Day[] = [
  {
    day: "Mittwoch",
    dayEn: "Wednesday",
    date: "5. August 2026",
    events: [
      { time: "06:36", name: "Zug Berlin → München", sub: "Ankunft 10:45", category: "travel" },
      { time: "12:30", name: "Bus München → Hochkrimml", sub: "Ankunft 16:30", category: "travel" },
      { time: "16:30", name: "Check-in", sub: "Zimmerverteilung & Ankommen", category: "shared" },
      { time: "18:00", name: "Welcome & Ablauf", duration: "30 Min", category: "shared" },
      { time: "18:30", name: "Dinner", duration: "45 Min", category: "meal" },
      { time: "19:30", name: "Dinner Filzsteinalm / Duxer Alm", sub: "Optional", category: "evening" },
    ],
  },
  {
    day: "Donnerstag",
    dayEn: "Thursday",
    date: "6. August 2026",
    events: [
      { time: "06:30", name: "Morning Yoga", duration: "60 Min", category: "yoga" },
      { time: "07:30", name: "Frühstück", duration: "45 Min", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", duration: "15 Min", category: "shared" },
      { time: "08:30", name: "Trailrunning Technik Kurs", sub: "Gr. A1 | 60 Min", groups: ["A1"], category: "workshop" },
      { time: "08:30", name: "Krafttraining für Läufer*innen", sub: "Gr. A2 | 60 Min", groups: ["A2"], category: "workshop" },
      { time: "08:30", name: "Trail Run Fortgeschritten", sub: "Gr. B | 11–17 km | 500–1500 hm", groups: ["B"], category: "run" },
      { time: "08:30", name: "Trail Run Profi", sub: "Gr. C | 17+ km | 800+ hm", groups: ["C"], category: "run" },
      { time: "10:30", name: "Krafttraining für Läufer*innen", sub: "Gr. A1 | 60 Min", groups: ["A1"], category: "workshop" },
      { time: "10:30", name: "Trailrunning Technik Kurs", sub: "Gr. A2 | 60 Min", groups: ["A2"], category: "workshop" },
      { time: "12:30", name: "Mittagessen", duration: "45 Min", category: "meal" },
      { time: "13:30", name: "Kanu fahren Gr. 1", sub: "An- & Rückfahrt | 120 Min", groups: ["1"], category: "workshop" },
      { time: "13:30", name: "Linoleum-Druck", duration: "3.5 Std", category: "workshop" },
      { time: "15:00", name: "Kanu fahren Gr. 2", sub: "An- & Rückfahrt | 120 Min", groups: ["2"], category: "workshop" },
      { time: "16:30", name: "Ernährungsworkshop", duration: "2 Std", category: "workshop" },
      { time: "18:30", name: "Dinner", duration: "45 Min", category: "meal" },
      { time: "19:30", name: "Outdoormovie Night + Speakers Event", category: "evening" },
    ],
  },
  {
    day: "Freitag",
    dayEn: "Friday",
    date: "7. August 2026",
    events: [
      { time: "05:00", name: "Sunrise Hike", duration: "90 Min", category: "yoga" },
      { time: "06:30", name: "Morning Yoga", duration: "60 Min", category: "yoga" },
      { time: "07:30", name: "Frühstück", duration: "45 Min", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", duration: "15 Min", category: "shared" },
      { time: "08:30", name: "Trail Run Anfänger", sub: "Gr. A | 8–13 km | 300–800 hm", groups: ["A"], category: "run" },
      { time: "08:30", name: "Trail Run Fortgeschritten", sub: "Gr. B | 11–17 km | 500–1500 hm", groups: ["B"], category: "run" },
      { time: "08:30", name: "Trail Run Profi", sub: "Gr. C | 17+ km | 800+ hm", groups: ["C"], category: "run" },
      { time: "12:30", name: "Mittagessen", duration: "45 Min", category: "meal" },
      { time: "13:30", name: "Kletterkurs 1", sub: "120 Min", category: "workshop" },
      { time: "13:30", name: "Bogenschießen", sub: "120 Min", category: "workshop" },
      { time: "13:30", name: "Upcycling 1", sub: "120 Min", category: "workshop" },
      { time: "15:15", name: "Kletterkurs 2", sub: "120 Min", category: "workshop" },
      { time: "15:15", name: "Krafttraining Workshop", sub: "120 Min", category: "workshop" },
      { time: "15:15", name: "Upcycling 2", sub: "120 Min", category: "workshop" },
      { time: "18:30", name: "Dinner", duration: "45 Min", category: "meal" },
      { time: "19:30", name: "Lagerfeuerabend", category: "evening" },
    ],
  },
  {
    day: "Samstag",
    dayEn: "Saturday",
    date: "8. August 2026",
    events: [
      { time: "06:30", name: "Morning Yoga", duration: "60 Min", category: "yoga" },
      { time: "07:30", name: "Frühstück", duration: "45 Min", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", duration: "15 Min", category: "shared" },
      { time: "08:30", name: "Trail Run Anfänger", sub: "Gr. A | 8–13 km | 300–800 hm", groups: ["A"], category: "run" },
      { time: "08:30", name: "Trail Run Fortgeschritten", sub: "Gr. B | 11–17 km | 500–1500 hm", groups: ["B"], category: "run" },
      { time: "08:30", name: "Trail Run Profi", sub: "Gr. C | 17+ km | 800+ hm", groups: ["C"], category: "run" },
      { time: "12:30", name: "Mittagessen", duration: "45 Min", category: "meal" },
      { time: "13:30", name: "MTB-Tour", sub: "An- & Rückfahrt | 180 Min", category: "workshop" },
      { time: "13:30", name: "Töpfern 1", sub: "90 Min", category: "workshop" },
      { time: "15:15", name: "Töpfern 2", sub: "90 Min", category: "workshop" },
      { time: "18:30", name: "Dinner", duration: "45 Min", category: "meal" },
      { time: "19:30", name: "Letzter Abend", category: "evening" },
    ],
  },
  {
    day: "Sonntag",
    dayEn: "Sunday",
    date: "9. August 2026",
    events: [
      { time: "05:00", name: "Sunrise Hike", duration: "90 Min", category: "yoga" },
      { time: "06:30", name: "Morning Yoga", duration: "60 Min", category: "yoga" },
      { time: "07:30", name: "Frühstück", duration: "45 Min", category: "meal" },
      { time: "08:30", name: "Abreise", sub: "Nach dem Frühstück", category: "travel" },
    ],
  },
]

const CATEGORY_COLORS = {
  yoga: { badge: "bg-emerald-500/20 text-emerald-200", icon: "text-emerald-400" },
  meal: { badge: "bg-amber-500/20 text-amber-200", icon: "text-amber-400" },
  run: { badge: "bg-purple-500/20 text-purple-200", icon: "text-purple-400" },
  workshop: { badge: "bg-blue-500/20 text-blue-200", icon: "text-blue-400" },
  travel: { badge: "bg-slate-500/20 text-slate-200", icon: "text-slate-400" },
  evening: { badge: "bg-rose-500/20 text-rose-200", icon: "text-rose-400" },
  shared: { badge: "bg-cyan-500/20 text-cyan-200", icon: "text-cyan-400" },
}

function EventRow({ event }: { event: Event }) {
  const price = getPrice(event.name)
  const isFree = price === "Free" || price === null
  const colors = CATEGORY_COLORS[event.category]

  return (
    <div className="border-b border-white/10 py-3 px-4 md:px-6 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-mono font-bold ${colors.icon}`}>{event.time}</span>
          <h3 className="font-semibold text-white">{event.name}</h3>
          {event.groups && (
            <div className="flex gap-1">
              {event.groups.map((g) => (
                <span key={g} className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                  Gr. {g}
                </span>
              ))}
            </div>
          )}
        </div>
        {(event.sub || event.duration) && (
          <p className="text-sm text-white/50 mt-1">
            {event.sub} {event.duration && `· ${event.duration}`}
          </p>
        )}
      </div>
      <span className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${
        isFree
          ? "bg-green-500/20 text-green-300"
          : "bg-amber-500/20 text-amber-300"
      }`}>
        {isFree ? "Free" : (
          <><Euro className="h-3 w-3" />{price}</> 
        )}
      </span>
    </div>
  )
}

export default function ZeitplanPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12 pt-24">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>{language === "de" ? "Zurück" : "Back"}</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {language === "de" ? "The Mountaincamp 2026" : "The Mountaincamp 2026"}
        </h1>
        <p className="text-lg text-white/60 mb-8">
          {language === "de"
            ? "Zeitplan für dein Abenteuer im Hochgebirge"
            : "Schedule for your mountain adventure"}
        </p>

        <div className="space-y-8">
          {SCHEDULE.map((day, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
              <div className="bg-primary/20 border-b border-white/10 px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {language === "de" ? day.day : day.dayEn}
                    </h2>
                    <p className="text-sm text-white/50 mt-1">{day.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white/70">
                      {day.events.length} {language === "de" ? "Programme" : "Programs"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {day.events.map((event, eventIdx) => (
                  <EventRow key={eventIdx} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">
            {language === "de" ? "Legende" : "Legend"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-sm text-white/70">{language === "de" ? "Yoga/Wandern" : "Yoga/Hiking"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="text-sm text-white/70">{language === "de" ? "Mahlzeit" : "Meal"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-400" />
              <span className="text-sm text-white/70">{language === "de" ? "Trail Run" : "Trail Run"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
              <span className="text-sm text-white/70">{language === "de" ? "Workshop" : "Workshop"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-400" />
              <span className="text-sm text-white/70">{language === "de" ? "Reise" : "Travel"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="text-sm text-white/70">{language === "de" ? "Abendprogramm" : "Evening"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-cyan-400" />
              <span className="text-sm text-white/70">{language === "de" ? "Gemeinsam" : "Shared"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
