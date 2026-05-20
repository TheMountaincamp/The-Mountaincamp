"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"

// ─── Schedule constants ───────────────────────────────────────────────────────
const PX_PER_MIN = 1.0
const START_H = 5
const END_H = 22
const TOTAL_MIN = (END_H - START_H) * 60
const TIME_W = 48
const COL_W = 86
const TOTAL_COLS = 12
const CONTENT_TOP = 54

function hToPx(h: number) { return (h - START_H) * 60 * PX_PER_MIN }
function durPx(from: number, to: number) { return (to - from) * 60 * PX_PER_MIN }

const DAY_SPANS = [
  { label: "Mi · Anreise", start: 0, end: 1 },
  { label: "Do", start: 1, end: 5 },
  { label: "Fr", start: 5, end: 8 },
  { label: "Sa", start: 8, end: 11 },
  { label: "So · Abreise", start: 11, end: 12 },
]

const GRP_HEADERS = [
  { label: "", col: 0, cls: "" },
  { label: "Gr. A1 · Kurz", col: 1, cls: "trail-a1" },
  { label: "Gr. A2 · Kurz", col: 2, cls: "trail-a2" },
  { label: "Gr. B · Mittel", col: 3, cls: "trail-b" },
  { label: "Gr. C · Lang", col: 4, cls: "trail-c" },
  { label: "Gr. A · Kurz", col: 5, cls: "trail-a1" },
  { label: "Gr. B · Mittel", col: 6, cls: "trail-b" },
  { label: "Gr. C · Lang", col: 7, cls: "trail-c" },
  { label: "Gr. A · Kurz", col: 8, cls: "trail-a1" },
  { label: "Gr. B · Mittel", col: 9, cls: "trail-b" },
  { label: "Gr. C · Lang", col: 10, cls: "trail-c" },
  { label: "", col: 11, cls: "" },
]

interface Block {
  from: number
  to: number
  col: number
  colSpan?: number
  cls: string
  name: string
  sub: string
}

const BLOCKS: Block[] = [
  // YOGA / SUNRISE
  { from: 6.5, to: 7.5, col: 1, colSpan: 4, cls: "yoga-block", name: "Morning Yoga", sub: "6:30 – 7:30" },
  { from: 5, to: 6.5, col: 5, colSpan: 3, cls: "yoga-block", name: "Sunrise Hike", sub: "Start 5:00" },
  { from: 6.5, to: 7.5, col: 5, colSpan: 3, cls: "yoga-block", name: "Morning Yoga", sub: "6:30 – 7:30" },
  { from: 6.5, to: 7.5, col: 8, colSpan: 3, cls: "yoga-block", name: "Morning Yoga", sub: "6:30 – 7:30" },
  { from: 5, to: 6.5, col: 11, colSpan: 1, cls: "yoga-block", name: "Sunrise Hike", sub: "Start 5:00" },
  { from: 6.5, to: 7.5, col: 11, colSpan: 1, cls: "yoga-block", name: "Morning Yoga", sub: "6:30 – 7:30" },

  // FRÜHSTÜCK
  { from: 7.5, to: 8.25, col: 1, colSpan: 4, cls: "shared-block", name: "Frühstück", sub: "7:30 – 8:15" },
  { from: 7.5, to: 8.25, col: 5, colSpan: 3, cls: "shared-block", name: "Frühstück", sub: "7:30 – 8:15" },
  { from: 7.5, to: 8.25, col: 8, colSpan: 3, cls: "shared-block", name: "Frühstück", sub: "7:30 – 8:15" },
  { from: 7.5, to: 8.25, col: 11, colSpan: 1, cls: "shared-block", name: "Frühstück", sub: "7:30 – 8:15" },

  // BRIEFING
  { from: 8.25, to: 8.5, col: 1, colSpan: 4, cls: "shared-block", name: "Treffpunkt & Briefing", sub: "8:15 – 8:30" },
  { from: 8.25, to: 8.5, col: 5, colSpan: 3, cls: "shared-block", name: "Treffpunkt & Briefing", sub: "8:15 – 8:30" },
  { from: 8.25, to: 8.5, col: 8, colSpan: 3, cls: "shared-block", name: "Treffpunkt & Briefing", sub: "8:15 – 8:30" },

  // ANREISE Mi
  { from: 6, to: 12.5, col: 0, colSpan: 1, cls: "travel-block", name: "Zug Berlin → München", sub: "ab 6:36 · Ankunft 10:45" },
  { from: 12.5, to: 16.5, col: 0, colSpan: 1, cls: "travel-block", name: "Bus München → Hochkrimml", sub: "ab 12:30 · Ankunft 16:30" },
  { from: 16.5, to: 18, col: 0, colSpan: 1, cls: "travel-block", name: "Check-in", sub: "" },

  // DO VORMITTAG
  { from: 8.5, to: 10.5, col: 1, colSpan: 1, cls: "trail-a1", name: "Trailrunning Technik Kurs", sub: "8:30 – 10:30" },
  { from: 8.5, to: 10.5, col: 2, colSpan: 1, cls: "trail-a2", name: "Krafttraining für Läufer*innen", sub: "8:30 – 10:30" },
  { from: 8.5, to: 12.5, col: 3, colSpan: 1, cls: "trail-b", name: "Trail Run B", sub: "11–17 km · 500–1500 hm" },
  { from: 8.5, to: 12.5, col: 4, colSpan: 1, cls: "trail-c", name: "Trail Run C", sub: "17+ km · 800+ hm" },
  { from: 10.5, to: 12.5, col: 1, colSpan: 1, cls: "trail-a1", name: "Krafttraining für Läufer*innen", sub: "10:30 – 12:30" },
  { from: 10.5, to: 12.5, col: 2, colSpan: 1, cls: "trail-a2", name: "Trailrunning Technik Kurs", sub: "10:30 – 12:30" },

  // FR VORMITTAG
  { from: 8.5, to: 12.5, col: 5, colSpan: 1, cls: "trail-a1", name: "Trail Run A", sub: "8–13 km · 300–800 hm" },
  { from: 8.5, to: 12.5, col: 6, colSpan: 1, cls: "trail-b", name: "Trail Run B", sub: "11–17 km · 500–1500 hm" },
  { from: 8.5, to: 12.5, col: 7, colSpan: 1, cls: "trail-c", name: "Trail Run C", sub: "17+ km · 800+ hm" },

  // SA VORMITTAG
  { from: 8.5, to: 12.5, col: 8, colSpan: 1, cls: "trail-a1", name: "Trail Run A", sub: "8–13 km · 300–800 hm" },
  { from: 8.5, to: 12.5, col: 9, colSpan: 1, cls: "trail-b", name: "Trail Run B", sub: "11–17 km · 500–1500 hm" },
  { from: 8.5, to: 12.5, col: 10, colSpan: 1, cls: "trail-c", name: "Trail Run C", sub: "17+ km · 800+ hm" },

  // ABREISE So
  { from: 8.25, to: 22.5, col: 11, colSpan: 1, cls: "travel-block", name: "Abreise", sub: "nach dem Frühstück" },

  // MITTAGSPAUSE
  { from: 12.5, to: 13, col: 1, colSpan: 4, cls: "shared-block", name: "Freie Zeit / Duschen", sub: "" },
  { from: 12.5, to: 13, col: 5, colSpan: 3, cls: "shared-block", name: "Freie Zeit / Duschen", sub: "" },
  { from: 12.5, to: 13, col: 8, colSpan: 3, cls: "shared-block", name: "Freie Zeit / Duschen", sub: "" },
  { from: 13, to: 13.5, col: 1, colSpan: 4, cls: "shared-block", name: "Mittagessen", sub: "13:00 – 13:30" },
  { from: 13, to: 13.5, col: 5, colSpan: 3, cls: "shared-block", name: "Mittagessen", sub: "13:00 – 13:30" },
  { from: 13, to: 13.5, col: 8, colSpan: 3, cls: "shared-block", name: "Mittagessen", sub: "13:00 – 13:30" },

  // DO NACHMITTAG: KANU
  { from: 13.5, to: 14, col: 1, colSpan: 1, cls: "kanu-weg", name: "Anfahrt See", sub: "30 Min" },
  { from: 14, to: 15.5, col: 1, colSpan: 1, cls: "kanu-gr1", name: "Kanu fahren Gr. 1", sub: "14:00 – 15:30" },
  { from: 15.5, to: 16.25, col: 1, colSpan: 1, cls: "kanu-weg", name: "Rückweg", sub: "45 Min" },
  { from: 16.25, to: 18, col: 1, colSpan: 1, cls: "workshop", name: "Freie Zeit", sub: "ab 16:15" },
  { from: 13.5, to: 15, col: 2, colSpan: 1, cls: "workshop", name: "Freie Zeit", sub: "" },
  { from: 15, to: 15.5, col: 2, colSpan: 1, cls: "kanu-weg", name: "Anfahrt See", sub: "30 Min" },
  { from: 15.5, to: 17, col: 2, colSpan: 1, cls: "kanu-gr2", name: "Kanu fahren Gr. 2", sub: "15:30 – 17:00" },
  { from: 17, to: 17.75, col: 2, colSpan: 1, cls: "kanu-weg", name: "Rückweg", sub: "45 Min" },
  { from: 17.75, to: 18, col: 2, colSpan: 1, cls: "workshop", name: "Freie Zeit", sub: "ab 17:45" },
  { from: 13.5, to: 15, col: 3, colSpan: 1, cls: "workshop", name: "Linoleum-Druck", sub: "13:30 – 15:00" },
  { from: 13.5, to: 15, col: 4, colSpan: 1, cls: "workshop", name: "Ernährungsworkshop", sub: "13:30 – 15:00" },
  { from: 15, to: 15.25, col: 3, colSpan: 1, cls: "shared-block", name: "Pause", sub: "" },
  { from: 15, to: 15.25, col: 4, colSpan: 1, cls: "shared-block", name: "Pause", sub: "" },
  { from: 15.25, to: 16.75, col: 3, colSpan: 1, cls: "workshop", name: "Freie Zeit", sub: "15:15 – 16:45" },
  { from: 15.25, to: 16.75, col: 4, colSpan: 1, cls: "workshop", name: "Linoleum-Druck", sub: "15:15 – 16:45" },
  { from: 16.75, to: 18, col: 3, colSpan: 1, cls: "workshop", name: "Freie Zeit", sub: "" },
  { from: 16.75, to: 18, col: 4, colSpan: 1, cls: "workshop", name: "Freie Zeit", sub: "" },

  // FR NACHMITTAG
  { from: 13.5, to: 15, col: 5, colSpan: 1, cls: "workshop", name: "Kletterkurs 1", sub: "13:30 – 15:00" },
  { from: 13.5, to: 15, col: 6, colSpan: 1, cls: "workshop", name: "Bogenschießen", sub: "13:30 – 15:00" },
  { from: 13.5, to: 15, col: 7, colSpan: 1, cls: "workshop", name: "Stricken lernen", sub: "13:30 – 15:00" },
  { from: 15, to: 15.25, col: 5, colSpan: 3, cls: "shared-block", name: "Pause", sub: "" },
  { from: 15.25, to: 16.75, col: 5, colSpan: 1, cls: "workshop", name: "Kletterkurs 2", sub: "15:15 – 16:45" },
  { from: 15.25, to: 16.75, col: 6, colSpan: 1, cls: "workshop", name: "Krafttraining Workshop", sub: "15:15 – 16:45" },
  { from: 15.25, to: 16.75, col: 7, colSpan: 1, cls: "workshop", name: "Upcycling", sub: "15:15 – 16:45" },
  { from: 16.75, to: 18, col: 5, colSpan: 3, cls: "shared-block", name: "Freie Zeit", sub: "ab 16:45" },

  // SA NACHMITTAG
  { from: 13.5, to: 16.75, col: 8, colSpan: 1, cls: "workshop", name: "MTB-Tour", sub: "13:30 – 16:45" },
  { from: 13.5, to: 15, col: 9, colSpan: 1, cls: "shared-block", name: "Freie Zeit", sub: "" },
  { from: 13.5, to: 15, col: 10, colSpan: 1, cls: "workshop", name: "Töpfern", sub: "13:30 – 15:00" },
  { from: 15, to: 15.25, col: 9, colSpan: 1, cls: "shared-block", name: "Pause", sub: "" },
  { from: 15, to: 15.25, col: 10, colSpan: 1, cls: "shared-block", name: "Pause", sub: "" },
  { from: 15.25, to: 16.75, col: 9, colSpan: 1, cls: "shared-block", name: "Freie Zeit", sub: "" },
  { from: 15.25, to: 16.75, col: 10, colSpan: 1, cls: "workshop", name: "Töpfern", sub: "15:15 – 16:45" },
  { from: 16.75, to: 18, col: 8, colSpan: 3, cls: "shared-block", name: "Freie Zeit", sub: "ab 16:45" },

  // ABEND
  { from: 18, to: 18.5, col: 0, colSpan: 1, cls: "shared-block", name: "Welcome & Ablauf", sub: "18:00 – 18:30" },
  { from: 18, to: 18.5, col: 1, colSpan: 4, cls: "shared-block", name: "Freie Zeit / Duschen", sub: "" },
  { from: 18, to: 18.5, col: 5, colSpan: 3, cls: "shared-block", name: "Freie Zeit / Duschen", sub: "" },
  { from: 18, to: 18.5, col: 8, colSpan: 3, cls: "shared-block", name: "Freie Zeit / Duschen", sub: "" },
  { from: 18.5, to: 19.25, col: 0, colSpan: 12, cls: "dinner-block", name: "Dinner", sub: "18:30 – 19:15" },
  { from: 19.5, to: 21.5, col: 0, colSpan: 1, cls: "dinner-block", name: "Dinner Filzsteinalm / Duxer Alm", sub: "" },
  { from: 19.5, to: 21.5, col: 1, colSpan: 4, cls: "evening-block", name: "Outdoormovie Night + Speakers Event", sub: "" },
  { from: 19.5, to: 21.5, col: 5, colSpan: 3, cls: "evening-block", name: "Lagerfeuerabend", sub: "" },
  { from: 19.5, to: 21.5, col: 8, colSpan: 3, cls: "evening-block", name: "Letzter Abend", sub: "" },
]

const LEGEND = [
  { cls: "trail-a1", label: "Gr. A1 — Kurz" },
  { cls: "trail-a2", label: "Gr. A2 — Kurz" },
  { cls: "trail-b", label: "Gr. B — Mittel" },
  { cls: "trail-c", label: "Gr. C — Lang" },
  { cls: "workshop", label: "Workshop / Aktivität" },
  { cls: "kanu-gr1", label: "Kanu Gr. 1" },
  { cls: "kanu-gr2", label: "Kanu Gr. 2" },
  { cls: "kanu-weg", label: "An- / Rückweg Kanu" },
  { bg: "#534AB7", label: "Dinner" },
  { bg: "#3C3489", label: "Abendprogramm" },
]

const CLS_STYLES: Record<string, React.CSSProperties> = {
  "trail-a1":    { background: "#E1F5EE", color: "#085041" },
  "trail-a2":    { background: "#9FE1CB", color: "#04342C" },
  "trail-b":     { background: "#FAEEDA", color: "#633806" },
  "trail-c":     { background: "#EEEDFE", color: "#3C3489" },
  "workshop":    { background: "#F1EFE8", color: "#2C2C2A" },
  "kanu-gr1":    { background: "#378ADD", color: "#E6F1FB" },
  "kanu-gr2":    { background: "#85B7EB", color: "#042C53" },
  "kanu-weg":    { background: "#B5D4F4", color: "#0C447C" },
  "shared-block":{ background: "#F3F3F3", color: "#555" },
  "travel-block":{ background: "#F1EFE8", color: "#5F5E5A" },
  "yoga-block":  { background: "#9FE1CB", color: "#04342C" },
  "dinner-block":{ background: "#534AB7", color: "#CECBF6" },
  "evening-block":{ background: "#3C3489", color: "#CECBF6" },
}

function ScheduleGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const totalHeight = TOTAL_MIN * PX_PER_MIN + CONTENT_TOP + 20
  const totalWidth = TIME_W + TOTAL_COLS * COL_W

  const timeLabels: { label: string; top: number }[] = []
  for (let m = 0; m <= TOTAL_MIN; m += 30) {
    const h = START_H + m / 60
    const hrs = Math.floor(h)
    const mins = Math.round((h - hrs) * 60)
    timeLabels.push({
      label: `${hrs}:${mins === 0 ? "00" : "30"}`,
      top: CONTENT_TOP + m * PX_PER_MIN,
    })
  }

  return (
    <div ref={containerRef} className="overflow-x-auto">
      <div style={{ position: "relative", width: totalWidth, height: totalHeight }}>

        {/* Day headers */}
        <div style={{ position: "absolute", top: 0, left: TIME_W, height: 24, display: "flex" }}>
          {DAY_SPANS.map((d) => (
            <div
              key={d.label}
              style={{
                width: (d.end - d.start) * COL_W,
                fontSize: 11.5,
                fontWeight: 600,
                color: "#1a1a1a",
                textAlign: "center",
                padding: "5px 4px",
                borderRadius: 7,
                background: "#f0f0f0",
                margin: "0 1px 2px 1px",
                boxSizing: "border-box",
              }}
            >
              {d.label}
            </div>
          ))}
        </div>

        {/* Group headers */}
        <div style={{ position: "absolute", top: 28, left: TIME_W, height: 18, display: "flex" }}>
          {GRP_HEADERS.map((g, i) => (
            <div
              key={i}
              style={{
                width: COL_W,
                fontSize: 9.5,
                textAlign: "center",
                padding: "3px 2px",
                borderRadius: 4,
                fontWeight: 500,
                margin: "0 1px 2px 1px",
                boxSizing: "border-box",
                ...CLS_STYLES[g.cls],
              }}
            >
              {g.label}
            </div>
          ))}
        </div>

        {/* Time labels + grid lines */}
        {timeLabels.map(({ label, top }) => (
          <div key={label}>
            <div
              style={{
                position: "absolute",
                top: top - 7,
                left: 0,
                width: TIME_W - 4,
                fontSize: 9.5,
                color: "#999",
                textAlign: "right",
                paddingRight: 5,
                paddingTop: 2,
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </div>
            <div
              style={{
                position: "absolute",
                top,
                left: TIME_W,
                right: 0,
                height: 1,
                background: "#ddd",
                opacity: 0.6,
              }}
            />
          </div>
        ))}

        {/* Day separators */}
        {DAY_SPANS.map((d) => (
          <div
            key={`sep-${d.label}`}
            style={{
              position: "absolute",
              top: CONTENT_TOP,
              bottom: 10,
              left: TIME_W + d.start * COL_W,
              width: 1,
              background: "#ccc",
              opacity: 0.75,
            }}
          />
        ))}

        {/* Blocks */}
        {BLOCKS.map((b, i) => {
          const top = CONTENT_TOP + hToPx(b.from)
          const height = durPx(b.from, b.to) - 2
          const left = TIME_W + b.col * COL_W
          const width = (b.colSpan ?? 1) * COL_W - 2
          const style = CLS_STYLES[b.cls] ?? {}
          return (
            <div
              key={i}
              title={b.sub ? `${b.name} · ${b.sub}` : b.name}
              style={{
                position: "absolute",
                top,
                left,
                width,
                height,
                borderRadius: 6,
                padding: "4px 6px",
                fontSize: 10,
                lineHeight: 1.25,
                overflow: "hidden",
                margin: "0 1px",
                boxShadow: "0 1px 0 rgba(0,0,0,.04)",
                boxSizing: "border-box",
                ...style,
              }}
            >
              {b.name && (
                <>
                  <div style={{ fontWeight: 600 }}>{b.name}</div>
                  {b.sub && <div style={{ fontSize: 9, opacity: 0.8, marginTop: 1 }}>{b.sub}</div>}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ZeitplanPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-gray-950 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "de" ? "Zurück zur Startseite" : "Back to home"}
          </Link>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {language === "de" ? "Zeitplan" : "Schedule"}
          </h1>
          <p className="mt-2 text-white/60">
            The Mountaincamp 2026 · 5–9 August · Hochkrimml
          </p>
        </div>
      </div>

      {/* Schedule section */}
      <section className="container mx-auto px-4 py-10">

        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs text-gray-400">
              {language === "de"
                ? "Seitlich scrollen für alle Tage und Gruppen · 1px ≈ 1 Minute"
                : "Scroll horizontally for all days and groups · 1px ≈ 1 minute"}
            </p>
          </div>
          <div className="text-xs text-gray-400 italic">
            {language === "de"
              ? "Vormittags laufen · Nachmittags Workshops & Aktivitäten"
              : "Morning runs · Afternoon workshops & activities"}
          </div>
        </div>

        {/* Grid */}
        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm md:p-5">
          <ScheduleGrid />
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {LEGEND.map((item) => {
            const bg = item.bg ?? (CLS_STYLES[item.cls ?? ""]?.background as string) ?? "#eee"
            return (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ background: bg }}
                />
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
            )
          })}
        </div>

        {/* Info note */}
        <p className="mt-6 text-xs text-gray-400">
          {language === "de"
            ? "* Alle Zeiten sind vorläufig und können sich noch ändern."
            : "* All times are provisional and subject to change."}
        </p>
      </section>
    </div>
  )
}
