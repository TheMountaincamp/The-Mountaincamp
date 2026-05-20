"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"

// ─── Schedule data ───────────────────────────────────────────────────────────

interface ScheduleEvent {
  time: string
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  type: "meal" | "activity" | "run" | "workshop" | "travel" | "free" | "evening" | "yoga"
  groups?: string[]
}

interface DaySchedule {
  day: string
  dayEn: string
  date: string
  events: ScheduleEvent[]
}

const SCHEDULE: DaySchedule[] = [
  {
    day: "Mittwoch",
    dayEn: "Wednesday",
    date: "5. August",
    events: [
      { time: "06:36", title: "Zug Berlin → München", titleEn: "Train Berlin → Munich", description: "Ankunft 10:45", descriptionEn: "Arrival 10:45", type: "travel" },
      { time: "12:30", title: "Bus München → Hochkrimml", titleEn: "Bus Munich → Hochkrimml", description: "Ankunft ca. 16:30", descriptionEn: "Arrival approx. 16:30", type: "travel" },
      { time: "16:30", title: "Check-in & Zimmerverteilung", titleEn: "Check-in & Room Assignment", type: "activity" },
      { time: "18:00", title: "Welcome & Ablauf", titleEn: "Welcome & Briefing", description: "Kennenlernen und Programmvorstellung", descriptionEn: "Meet & greet and program overview", type: "activity" },
      { time: "18:30", title: "Abendessen", titleEn: "Dinner", type: "meal" },
      { time: "19:30", title: "Abendessen Filzsteinalm", titleEn: "Dinner Filzsteinalm", description: "Gemeinsamer Hüttenabend", descriptionEn: "Group hut evening", type: "evening" },
    ],
  },
  {
    day: "Donnerstag",
    dayEn: "Thursday",
    date: "6. August",
    events: [
      { time: "06:30", title: "Morning Yoga", titleEn: "Morning Yoga", description: "Optional", type: "yoga" },
      { time: "07:30", title: "Frühstück", titleEn: "Breakfast", type: "meal" },
      { time: "08:15", title: "Treffpunkt & Briefing", titleEn: "Meeting Point & Briefing", type: "activity" },
      { time: "08:30", title: "Vormittagsprogramm", titleEn: "Morning Program", description: "Gruppen A1/A2: Technik & Kraft · Gruppen B/C: Trail Run", descriptionEn: "Groups A1/A2: Technique & Strength · Groups B/C: Trail Run", type: "run", groups: ["A1", "A2", "B", "C"] },
      { time: "12:30", title: "Freie Zeit / Duschen", titleEn: "Free Time / Showers", type: "free" },
      { time: "13:00", title: "Mittagessen", titleEn: "Lunch", type: "meal" },
      { time: "13:30", title: "Nachmittagsprogramm", titleEn: "Afternoon Program", description: "Kanufahren · Linoleum-Druck · Ernährungsworkshop", descriptionEn: "Canoeing · Linocut Printing · Nutrition Workshop", type: "workshop" },
      { time: "18:00", title: "Freie Zeit / Duschen", titleEn: "Free Time / Showers", type: "free" },
      { time: "18:30", title: "Abendessen", titleEn: "Dinner", type: "meal" },
      { time: "19:30", title: "Outdoor Movie Night", titleEn: "Outdoor Movie Night", description: "Speakers Event", type: "evening" },
    ],
  },
  {
    day: "Freitag",
    dayEn: "Friday",
    date: "7. August",
    events: [
      { time: "05:00", title: "Sunrise Hike", titleEn: "Sunrise Hike", description: "Optional · Start 5:00", type: "yoga" },
      { time: "06:30", title: "Morning Yoga", titleEn: "Morning Yoga", description: "Optional", type: "yoga" },
      { time: "07:30", title: "Frühstück", titleEn: "Breakfast", type: "meal" },
      { time: "08:15", title: "Treffpunkt & Briefing", titleEn: "Meeting Point & Briefing", type: "activity" },
      { time: "08:30", title: "Trail Run", titleEn: "Trail Run", description: "Gruppe A: 8–13 km · Gruppe B: 11–17 km · Gruppe C: 17+ km", descriptionEn: "Group A: 8–13 km · Group B: 11–17 km · Group C: 17+ km", type: "run", groups: ["A", "B", "C"] },
      { time: "12:30", title: "Freie Zeit / Duschen", titleEn: "Free Time / Showers", type: "free" },
      { time: "13:00", title: "Mittagessen", titleEn: "Lunch", type: "meal" },
      { time: "13:30", title: "Nachmittagsprogramm", titleEn: "Afternoon Program", description: "Kletterkurs · Bogenschießen · Stricken · Krafttraining · Upcycling", descriptionEn: "Climbing Course · Archery · Knitting · Strength Training · Upcycling", type: "workshop" },
      { time: "18:00", title: "Freie Zeit / Duschen", titleEn: "Free Time / Showers", type: "free" },
      { time: "18:30", title: "Abendessen", titleEn: "Dinner", type: "meal" },
      { time: "19:30", title: "Lagerfeuerabend", titleEn: "Campfire Evening", type: "evening" },
    ],
  },
  {
    day: "Samstag",
    dayEn: "Saturday",
    date: "8. August",
    events: [
      { time: "06:30", title: "Morning Yoga", titleEn: "Morning Yoga", description: "Optional", type: "yoga" },
      { time: "07:30", title: "Frühstück", titleEn: "Breakfast", type: "meal" },
      { time: "08:15", title: "Treffpunkt & Briefing", titleEn: "Meeting Point & Briefing", type: "activity" },
      { time: "08:30", title: "Trail Run", titleEn: "Trail Run", description: "Gruppe A: 8–13 km · Gruppe B: 11–17 km · Gruppe C: 17+ km", descriptionEn: "Group A: 8–13 km · Group B: 11–17 km · Group C: 17+ km", type: "run", groups: ["A", "B", "C"] },
      { time: "12:30", title: "Freie Zeit / Duschen", titleEn: "Free Time / Showers", type: "free" },
      { time: "13:00", title: "Mittagessen", titleEn: "Lunch", type: "meal" },
      { time: "13:30", title: "Nachmittagsprogramm", titleEn: "Afternoon Program", description: "MTB-Tour · Töpfern · Freie Zeit", descriptionEn: "MTB Tour · Pottery · Free Time", type: "workshop" },
      { time: "18:00", title: "Freie Zeit / Duschen", titleEn: "Free Time / Showers", type: "free" },
      { time: "18:30", title: "Abendessen", titleEn: "Dinner", type: "meal" },
      { time: "19:30", title: "Letzter Abend", titleEn: "Final Evening", description: "Gemeinsamer Abschluss", descriptionEn: "Group farewell", type: "evening" },
    ],
  },
  {
    day: "Sonntag",
    dayEn: "Sunday",
    date: "9. August",
    events: [
      { time: "05:00", title: "Sunrise Hike", titleEn: "Sunrise Hike", description: "Optional · Letzter Sonnenaufgang", descriptionEn: "Optional · Last sunrise", type: "yoga" },
      { time: "06:30", title: "Morning Yoga", titleEn: "Morning Yoga", description: "Optional", type: "yoga" },
      { time: "07:30", title: "Frühstück", titleEn: "Breakfast", type: "meal" },
      { time: "08:30", title: "Check-out & Abreise", titleEn: "Check-out & Departure", description: "Bus zurück nach München", descriptionEn: "Bus back to Munich", type: "travel" },
    ],
  },
]

const TYPE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  meal: { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200" },
  activity: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
  run: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  workshop: { bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200" },
  travel: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
  free: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-100" },
  evening: { bg: "bg-primary", text: "text-white", border: "border-primary" },
  yoga: { bg: "bg-teal-50", text: "text-teal-800", border: "border-teal-200" },
}

function EventCard({ event, language }: { event: ScheduleEvent; language: string }) {
  const styles = TYPE_STYLES[event.type] || TYPE_STYLES.activity
  const title = language === "de" ? event.title : (event.titleEn || event.title)
  const description = language === "de" ? event.description : (event.descriptionEn || event.description)

  return (
    <div className={`flex gap-4 rounded-xl border p-4 transition-all hover:shadow-md ${styles.bg} ${styles.border}`}>
      <div className="flex w-16 shrink-0 flex-col items-center justify-center">
        <span className={`text-lg font-bold ${styles.text}`}>{event.time}</span>
      </div>
      <div className="flex-1">
        <h4 className={`font-semibold ${styles.text}`}>{title}</h4>
        {description && (
          <p className={`mt-1 text-sm opacity-80 ${styles.text}`}>{description}</p>
        )}
        {event.groups && event.groups.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {event.groups.map((group) => (
              <span
                key={group}
                className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium"
              >
                <Users className="h-3 w-3" />
                {language === "de" ? `Gruppe ${group}` : `Group ${group}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DayCard({ day, language }: { day: DaySchedule; language: string }) {
  const dayName = language === "de" ? day.day : day.dayEn

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Day Header */}
      <div className="bg-gray-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{dayName}</h3>
            <p className="text-sm text-white/60">{day.date} 2026</p>
          </div>
          <Calendar className="h-6 w-6 text-white/40" />
        </div>
      </div>

      {/* Events */}
      <div className="flex flex-col gap-3 p-4">
        {day.events.map((event, idx) => (
          <EventCard key={idx} event={event} language={language} />
        ))}
      </div>
    </div>
  )
}

export default function ZeitplanPage() {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-gray-950 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "de" ? "Zurück zur Startseite" : "Back to home"}
          </Link>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {language === "de" ? "Zeitplan" : "Schedule"}
          </h1>
          <p className="mt-3 text-lg text-white/70">
            The Mountaincamp 2026
          </p>

          {/* Meta Info */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <Calendar className="h-5 w-5" />
              <span>5. – 9. August 2026</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="h-5 w-5" />
              <span>Hochkrimml, Österreich</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Clock className="h-5 w-5" />
              <span>5 {language === "de" ? "Tage" : "Days"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-medium text-gray-500">
              {language === "de" ? "Legende:" : "Legend:"}
            </span>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary/20 border border-primary/30" />
              <span className="text-gray-600">{language === "de" ? "Laufen" : "Running"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-100 border border-emerald-200" />
              <span className="text-gray-600">{language === "de" ? "Workshop" : "Workshop"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-100 border border-amber-200" />
              <span className="text-gray-600">{language === "de" ? "Mahlzeit" : "Meal"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-teal-100 border border-teal-200" />
              <span className="text-gray-600">Yoga</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-gray-600">{language === "de" ? "Abendprogramm" : "Evening"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule section */}
      <section ref={containerRef} className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {SCHEDULE.map((day) => (
            <DayCard key={day.day} day={day} language={language} />
          ))}
        </div>

        {/* Info note */}
        <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900">
            {language === "de" ? "Hinweise zum Zeitplan" : "Schedule Notes"}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>
              {language === "de"
                ? "• Alle Zeiten sind vorläufig und können sich noch ändern."
                : "• All times are provisional and subject to change."}
            </li>
            <li>
              {language === "de"
                ? "• Morning Yoga und Sunrise Hikes sind optional."
                : "• Morning Yoga and Sunrise Hikes are optional."}
            </li>
            <li>
              {language === "de"
                ? "• Die Gruppeneinteilung (A/B/C) erfolgt nach Erfahrungslevel und Distanzwunsch."
                : "• Group assignment (A/B/C) is based on experience level and preferred distance."}
            </li>
            <li>
              {language === "de"
                ? "• Bei den Nachmittagsworkshops kannst du frei wählen."
                : "• You can freely choose among the afternoon workshops."}
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
