"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Euro, Info } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"

const PRICES: Record<string, number | "Free"> = {
  "Stricken lernen": 12,
  "Upcycling": 12,
  "Upcycling 1": 12,
  "Upcycling 2": 12,
  "Linoleum-Druck": 12,
  "Töpfern": 12,
  "Töpfern 1": 12,
  "Töpfern 2": 12,
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

const ACTIVITY_IMAGES: Record<string, string> = {
  "Morning Yoga": "/images/activities/sunrise-hike.jpg",
  "Sunrise Hike": "/images/activities/sunrise-hike.jpg",
  "Trail Run Anfänger": "/images/activities/trail-run.jpg",
  "Trail Run Fortgeschritten": "/images/activities/trail-run.jpg",
  "Trail Run Profi": "/images/activities/trail-run.jpg",
  "Trailrunning Technik Kurs": "/images/activities/krafttraining.jpg",
  "Krafttraining für Läufer*innen": "/images/activities/krafttraining.jpg",
  "Krafttraining Workshop": "/images/activities/krafttraining.jpg",
  "Kanu fahren Gr. 1": "/images/activities/kanu.jpg",
  "Kanu fahren Gr. 2": "/images/activities/kanu.jpg",
  "Kletterkurs 1": "/images/activities/klettern.jpg",
  "Kletterkurs 2": "/images/activities/klettern.jpg",
  "MTB-Tour": "/images/activities/mtb.jpg",
}

function getPrice(name: string): number | "Free" | null {
  return PRICES[name] ?? null
}

function hasImage(name: string): boolean {
  return name in ACTIVITY_IMAGES
}

interface Event {
  time: string
  name: string
  nameEn?: string
  sub?: string
  subEn?: string
  duration?: string
  groups?: string[]
  category: "yoga" | "meal" | "run" | "workshop" | "travel" | "evening" | "shared"
  showPrice?: boolean // explicitly control price display
}

interface Day {
  day: string
  dayEn: string
  date: string
  dateEn: string
  events: Event[]
}

const SCHEDULE: Day[] = [
  {
    day: "Mittwoch",
    dayEn: "Wednesday",
    date: "5. August 2026",
    dateEn: "August 5, 2026",
    events: [
      { time: "06:36", name: "Zug Berlin → München", nameEn: "Train Berlin → Munich", sub: "Ankunft 10:45", subEn: "Arrival 10:45", category: "travel" },
      { time: "12:30", name: "Bus München → Hochkrimml", nameEn: "Bus Munich → Hochkrimml", sub: "Ankunft 16:30", subEn: "Arrival 16:30", category: "travel" },
      { time: "16:30", name: "Check-in", sub: "Zimmerverteilung & Ankommen", subEn: "Room assignment & arrival", category: "shared" },
      { time: "18:00", name: "Welcome & Ablauf", nameEn: "Welcome & Overview", duration: "30 Min", category: "shared" },
      { time: "18:30", name: "Dinner", duration: "45 Min", category: "meal" },
    ],
  },
  {
    day: "Donnerstag",
    dayEn: "Thursday",
    date: "6. August 2026",
    dateEn: "August 6, 2026",
    events: [
      { time: "06:30", name: "Morning Yoga", duration: "60 Min", category: "yoga", showPrice: true },
      { time: "07:30", name: "Frühstück", nameEn: "Breakfast", duration: "45 Min", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", nameEn: "Meeting Point & Briefing", duration: "15 Min", category: "shared" },
      { time: "08:30", name: "Trailrunning Technik Kurs", nameEn: "Trail Running Technique Course", sub: "Gr. A1 | 60 Min", groups: ["A1"], category: "workshop", showPrice: true },
      { time: "08:30", name: "Krafttraining für Läufer*innen", nameEn: "Strength Training for Runners", sub: "Gr. A2 | 60 Min", groups: ["A2"], category: "workshop", showPrice: true },
      { time: "08:30", name: "Trail Run Fortgeschritten", nameEn: "Trail Run Intermediate", sub: "Gr. B | 11–17 km | 500–1500 hm", groups: ["B"], category: "run" },
      { time: "08:30", name: "Trail Run Profi", nameEn: "Trail Run Pro", sub: "Gr. C | 17+ km | 800+ hm", groups: ["C"], category: "run" },
      { time: "10:30", name: "Krafttraining für Läufer*innen", nameEn: "Strength Training for Runners", sub: "Gr. A1 | 60 Min", groups: ["A1"], category: "workshop", showPrice: true },
      { time: "10:30", name: "Trailrunning Technik Kurs", nameEn: "Trail Running Technique Course", sub: "Gr. A2 | 60 Min", groups: ["A2"], category: "workshop", showPrice: true },
      { time: "12:30", name: "Mittagessen", nameEn: "Lunch", duration: "45 Min", category: "meal" },
      { time: "13:30", name: "Kanu fahren Gr. 1", nameEn: "Canoeing Group 1", sub: "inkl. An- & Rückfahrt | 120 Min", subEn: "incl. transport | 120 min", groups: ["1"], category: "workshop", showPrice: true },
      { time: "13:30", name: "Linoleum-Druck", nameEn: "Linocut Printing", duration: "3.5 Std", category: "workshop", showPrice: true },
      { time: "15:00", name: "Kanu fahren Gr. 2", nameEn: "Canoeing Group 2", sub: "inkl. An- & Rückfahrt | 120 Min", subEn: "incl. transport | 120 min", groups: ["2"], category: "workshop", showPrice: true },
      { time: "16:30", name: "Ernährungsworkshop", nameEn: "Nutrition Workshop", duration: "2 Std", category: "workshop", showPrice: true },
      { time: "18:30", name: "Dinner", duration: "45 Min", category: "meal" },
      { time: "19:30", name: "Outdoormovie Night + Speakers Event", category: "evening" },
    ],
  },
  {
    day: "Freitag",
    dayEn: "Friday",
    date: "7. August 2026",
    dateEn: "August 7, 2026",
    events: [
      { time: "05:00", name: "Sunrise Hike", duration: "90 Min", category: "yoga", showPrice: true },
      { time: "06:30", name: "Morning Yoga", duration: "60 Min", category: "yoga", showPrice: true },
      { time: "07:30", name: "Frühstück", nameEn: "Breakfast", duration: "45 Min", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", nameEn: "Meeting Point & Briefing", duration: "15 Min", category: "shared" },
      { time: "08:30", name: "Trail Run Anfänger", nameEn: "Trail Run Beginner", sub: "Gr. A | 8–13 km | 300–800 hm", groups: ["A"], category: "run" },
      { time: "08:30", name: "Trail Run Fortgeschritten", nameEn: "Trail Run Intermediate", sub: "Gr. B | 11–17 km | 500–1500 hm", groups: ["B"], category: "run" },
      { time: "08:30", name: "Trail Run Profi", nameEn: "Trail Run Pro", sub: "Gr. C | 17+ km | 800+ hm", groups: ["C"], category: "run" },
      { time: "12:30", name: "Mittagessen", nameEn: "Lunch", duration: "45 Min", category: "meal" },
      { time: "13:30", name: "Kletterkurs 1", nameEn: "Climbing Course 1", sub: "120 Min", category: "workshop", showPrice: true },
      { time: "13:30", name: "Bogenschießen", nameEn: "Archery", sub: "120 Min", category: "workshop", showPrice: true },
      { time: "13:30", name: "Upcycling 1", sub: "120 Min", category: "workshop", showPrice: true },
      { time: "15:15", name: "Kletterkurs 2", nameEn: "Climbing Course 2", sub: "120 Min", category: "workshop", showPrice: true },
      { time: "15:15", name: "Krafttraining Workshop", nameEn: "Strength Training Workshop", sub: "120 Min", category: "workshop", showPrice: true },
      { time: "15:15", name: "Upcycling 2", sub: "120 Min", category: "workshop", showPrice: true },
      { time: "18:30", name: "Dinner", duration: "45 Min", category: "meal" },
      { time: "19:30", name: "Lagerfeuerabend", nameEn: "Campfire Evening", category: "evening" },
    ],
  },
  {
    day: "Samstag",
    dayEn: "Saturday",
    date: "8. August 2026",
    dateEn: "August 8, 2026",
    events: [
      { time: "06:30", name: "Morning Yoga", duration: "60 Min", category: "yoga", showPrice: true },
      { time: "07:30", name: "Frühstück", nameEn: "Breakfast", duration: "45 Min", category: "meal" },
      { time: "08:15", name: "Treffpunkt & Briefing", nameEn: "Meeting Point & Briefing", duration: "15 Min", category: "shared" },
      { time: "08:30", name: "Trail Run Anfänger", nameEn: "Trail Run Beginner", sub: "Gr. A | 8–13 km | 300–800 hm", groups: ["A"], category: "run" },
      { time: "08:30", name: "Trail Run Fortgeschritten", nameEn: "Trail Run Intermediate", sub: "Gr. B | 11–17 km | 500–1500 hm", groups: ["B"], category: "run" },
      { time: "08:30", name: "Trail Run Profi", nameEn: "Trail Run Pro", sub: "Gr. C | 17+ km | 800+ hm", groups: ["C"], category: "run" },
      { time: "12:30", name: "Mittagessen", nameEn: "Lunch", duration: "45 Min", category: "meal" },
      { time: "13:30", name: "MTB-Tour", sub: "inkl. An- & Rückfahrt | 180 Min", subEn: "incl. transport | 180 min", category: "workshop", showPrice: true },
      { time: "13:30", name: "Töpfern 1", nameEn: "Pottery 1", sub: "90 Min", category: "workshop", showPrice: true },
      { time: "15:15", name: "Töpfern 2", nameEn: "Pottery 2", sub: "90 Min", category: "workshop", showPrice: true },
      { time: "18:30", name: "Dinner", duration: "45 Min", category: "meal" },
      { time: "19:30", name: "Letzter Abend", nameEn: "Final Evening", category: "evening" },
    ],
  },
  {
    day: "Sonntag",
    dayEn: "Sunday",
    date: "9. August 2026",
    dateEn: "August 9, 2026",
    events: [
      { time: "05:00", name: "Sunrise Hike", duration: "90 Min", category: "yoga", showPrice: true },
      { time: "06:30", name: "Morning Yoga", duration: "60 Min", category: "yoga", showPrice: true },
      { time: "07:30", name: "Frühstück", nameEn: "Breakfast", duration: "45 Min", category: "meal" },
      { time: "08:30", name: "Abreise", nameEn: "Departure", sub: "Nach dem Frühstück", subEn: "After breakfast", category: "travel" },
    ],
  },
]

const CATEGORY_STYLES = {
  yoga: { bg: "bg-emerald-900/40", border: "border-emerald-500/30", dot: "bg-emerald-400", text: "text-emerald-300" },
  meal: { bg: "bg-amber-900/40", border: "border-amber-500/30", dot: "bg-amber-400", text: "text-amber-300" },
  run: { bg: "bg-purple-900/40", border: "border-purple-500/30", dot: "bg-purple-400", text: "text-purple-300" },
  workshop: { bg: "bg-blue-900/40", border: "border-blue-500/30", dot: "bg-blue-400", text: "text-blue-300" },
  travel: { bg: "bg-slate-800/60", border: "border-slate-500/30", dot: "bg-slate-400", text: "text-slate-300" },
  evening: { bg: "bg-rose-900/40", border: "border-rose-500/30", dot: "bg-rose-400", text: "text-rose-300" },
  shared: { bg: "bg-gray-800/60", border: "border-gray-500/30", dot: "bg-gray-400", text: "text-gray-300" },
}

function EventRow({ event, language }: { event: Event; language: string }) {
  const [showImage, setShowImage] = useState(false)
  const rawPrice = event.showPrice ? getPrice(event.name) : null
  // Only show "Free" badge for activities that explicitly have showPrice=true AND price is "Free"
  // Show euro amount for paid workshops with showPrice=true
  // Show nothing for meals, travel, shared
  const showBadge = rawPrice !== null
  const colors = CATEGORY_STYLES[event.category]
  const imageSrc = ACTIVITY_IMAGES[event.name]

  const displayName = language === "en" && event.nameEn ? event.nameEn : event.name
  const displaySub = language === "en" && event.subEn ? event.subEn : event.sub

  return (
    <div
      className={`relative border-l-4 ${colors.border} ${colors.bg} py-3.5 px-4 md:px-6 flex items-start justify-between gap-4 hover:brightness-125 transition-all cursor-default`}
      onMouseEnter={() => imageSrc && setShowImage(true)}
      onMouseLeave={() => setShowImage(false)}
    >
      {/* Hover Image Preview */}
      {showImage && imageSrc && (
        <div className="absolute left-full top-0 z-50 ml-4 w-64 rounded-xl overflow-hidden shadow-2xl border border-white/20 pointer-events-none hidden md:block">
          <Image
            src={imageSrc}
            alt={displayName}
            width={256}
            height={160}
            className="w-full h-44 object-cover"
          />
          <div className="bg-gray-900 px-3 py-2 border-t border-white/10">
            <p className="text-sm font-semibold text-white">{displayName}</p>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`text-sm font-mono font-bold tabular-nums ${colors.text}`}>{event.time}</span>
          <h3 className="font-semibold text-white text-base leading-snug">{displayName}</h3>
          {event.groups && (
            <div className="flex gap-1">
              {event.groups.map((g) => (
                <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/90 font-medium">
                  Gr.&nbsp;{g}
                </span>
              ))}
            </div>
          )}
        </div>
        {(displaySub || event.duration) && (
          <p className="text-sm text-white/55 mt-1">
            {displaySub}{displaySub && event.duration ? " · " : ""}{event.duration}
          </p>
        )}
      </div>

      {showBadge && (
        <span className={`shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap ${
          rawPrice === "Free"
            ? "bg-green-500/25 text-green-200 border border-green-500/40"
            : "bg-amber-500/25 text-amber-200 border border-amber-500/40"
        }`}>
          {rawPrice === "Free" ? "Free" : (
            <><Euro className="h-3 w-3" />{rawPrice}</>
          )}
        </span>
      )}
    </div>
  )
}

export default function ZeitplanPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-950">
      <SiteHeader />
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12 pt-24">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>{language === "de" ? "Zurück" : "Back"}</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          The Mountaincamp 2026
        </h1>
        <p className="text-xl text-white/70 mb-4">
          {language === "de"
            ? "Zeitplan für dein Abenteuer im Hochgebirge"
            : "Schedule for your mountain adventure"}
        </p>
        
        {/* Info Box */}
        <div className="flex items-start gap-3 bg-primary/20 border border-primary/30 rounded-lg p-4 mb-8">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-white/90">
            {language === "de"
              ? "Jeden Tag kannst du dir den Lauf aussuchen, der zu deinem Level passt."
              : "Every day you can choose the run that matches your level."}
          </p>
        </div>

        <div className="space-y-8">
          {SCHEDULE.map((day, idx) => (
            <div key={idx} className="rounded-xl border border-white/20 bg-gray-900/80 overflow-hidden shadow-xl">
              <div className="bg-primary/30 border-b border-white/20 px-4 md:px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {language === "de" ? day.day : day.dayEn}
                    </h2>
                    <p className="text-base text-white/70 mt-1">
                      {language === "de" ? day.date : day.dateEn}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">
                      {day.events.length} {language === "de" ? "Programmpunkte" : "Programs"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {day.events.map((event, eventIdx) => (
                  <EventRow key={eventIdx} event={event} language={language} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 p-6 rounded-xl bg-gray-900/80 border border-white/20">
          <h3 className="text-lg font-bold text-white mb-4">
            {language === "de" ? "Legende" : "Legend"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-sm text-white/80">{language === "de" ? "Yoga/Wandern" : "Yoga/Hiking"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="text-sm text-white/80">{language === "de" ? "Mahlzeit" : "Meal"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-400" />
              <span className="text-sm text-white/80">Trail Run</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
              <span className="text-sm text-white/80">Workshop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-400" />
              <span className="text-sm text-white/80">{language === "de" ? "Reise" : "Travel"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="text-sm text-white/80">{language === "de" ? "Abendprogramm" : "Evening"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-400" />
              <span className="text-sm text-white/80">{language === "de" ? "Gemeinsam" : "Shared"}</span>
            </div>
          </div>
        </div>

        {/* Image Note */}
        <p className="mt-6 text-sm text-white/50 text-center">
          {language === "de"
            ? "Bewege den Cursor über eine Aktivität, um ein Vorschaubild zu sehen."
            : "Hover over an activity to see a preview image."}
        </p>
      </div>
    </div>
  )
}
