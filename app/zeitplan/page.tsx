"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"

// ─── Constants ──────────────────────────────────────────────────────────────

const PX_PER_MIN = 1.4
const START_H = 5
const END_H = 22
const TOTAL_MIN = (END_H - START_H) * 60
const TIME_W = 52
const COL_W = 108

function hToPx(h: number) { return (h - START_H) * 60 * PX_PER_MIN }
function durPx(from: number, to: number) { return (to - from) * 60 * PX_PER_MIN }

// ─── Day & Group headers ────────────────────────────────────────────────────

const DAY_SPANS = [
  { label: "Mi · Anreise", labelEn: "Wed · Arrival",    start: 0,  end: 1  },
  { label: "Do",            labelEn: "Thu",              start: 1,  end: 5  },
  { label: "Fr",            labelEn: "Fri",              start: 5,  end: 8  },
  { label: "Sa",            labelEn: "Sat",              start: 8,  end: 11 },
  { label: "So · Abreise", labelEn: "Sun · Departure",  start: 11, end: 12 },
]

const GRP_HEADERS = [
  { label: "",              col: 0,  cls: "" },
  { label: "Gr. A1 · Kurz",col: 1,  cls: "grp-a1" },
  { label: "Gr. A2 · Kurz",col: 2,  cls: "grp-a2" },
  { label: "Gr. B · Mittel",col: 3, cls: "grp-b"  },
  { label: "Gr. C · Lang", col: 4,  cls: "grp-c"  },
  { label: "Gr. A · Kurz", col: 5,  cls: "grp-a1" },
  { label: "Gr. B · Mittel",col: 6, cls: "grp-b"  },
  { label: "Gr. C · Lang", col: 7,  cls: "grp-c"  },
  { label: "Gr. A · Kurz", col: 8,  cls: "grp-a1" },
  { label: "Gr. B · Mittel",col: 9, cls: "grp-b"  },
  { label: "Gr. C · Lang", col: 10, cls: "grp-c"  },
  { label: "",              col: 11, cls: "" },
]

// ─── Block data ─────────────────────────────────────────────────────────────

interface Block {
  from: number
  to: number
  col: number
  colSpan?: number
  cls: string
  name: string
  sub?: string
}

const BLOCKS: Block[] = [
  // ── DO: Yoga ──
  { from: 6.5, to: 7.5, col: 1, colSpan: 4, cls: "blk-yoga", name: "Morning Yoga", sub: "6:30 – 7:30" },

  // ── FR: Sunrise Hike + Yoga ──
  { from: 5, to: 6.5, col: 5, colSpan: 3, cls: "blk-yoga", name: "Sunrise Hike", sub: "5:00 – 6:30" },
  { from: 6.5, to: 7.5, col: 5, colSpan: 3, cls: "blk-yoga", name: "Morning Yoga", sub: "6:30 – 7:30" },

  // ── SA: Yoga ──
  { from: 6.5, to: 7.5, col: 8, colSpan: 3, cls: "blk-yoga", name: "Morning Yoga", sub: "6:30 – 7:30" },

  // ── SO: Sunrise Hike + Yoga + Frühstück + Abreise ──
  { from: 5, to: 6.5, col: 11, cls: "blk-yoga", name: "Sunrise Hike", sub: "5:00 – 6:30" },
  { from: 6.5, to: 7.5, col: 11, cls: "blk-yoga", name: "Morning Yoga", sub: "6:30 – 7:30" },
  { from: 7.5, to: 8.25, col: 11, cls: "blk-shared", name: "Frühstück", sub: "7:30 – 8:15" },
  { from: 8.25, to: 22, col: 11, cls: "blk-travel", name: "Abreise", sub: "ab 8:30" },

  // ── FRÜHSTÜCK ──
  { from: 7.5, to: 8.25, col: 1, colSpan: 4, cls: "blk-shared", name: "Frühstück", sub: "7:30 – 8:15" },
  { from: 7.5, to: 8.25, col: 5, colSpan: 3, cls: "blk-shared", name: "Frühstück", sub: "7:30 – 8:15" },
  { from: 7.5, to: 8.25, col: 8, colSpan: 3, cls: "blk-shared", name: "Frühstück", sub: "7:30 – 8:15" },

  // ── BRIEFING ──
  { from: 8.25, to: 8.5, col: 1, colSpan: 4, cls: "blk-shared", name: "Treffpunkt & Briefing", sub: "8:15 – 8:30" },
  { from: 8.25, to: 8.5, col: 5, colSpan: 3, cls: "blk-shared", name: "Treffpunkt & Briefing", sub: "8:15 – 8:30" },
  { from: 8.25, to: 8.5, col: 8, colSpan: 3, cls: "blk-shared", name: "Treffpunkt & Briefing", sub: "8:15 – 8:30" },

  // ── ANREISE Mi ──
  { from: 6, to: 12.5, col: 0, cls: "blk-travel", name: "Zug Berlin → München", sub: "ab 6:36 · Ankunft 10:45" },
  { from: 12.5, to: 16.5, col: 0, cls: "blk-travel", name: "Bus München → Hochkrimml", sub: "ab 12:30 · Ankunft 16:30" },
  { from: 16.5, to: 18, col: 0, cls: "blk-travel", name: "Check-in", sub: "" },

  // ── DO VORMITTAG ──
  { from: 8.5, to: 10.5, col: 1, cls: "blk-a1", name: "Trailrunning Technik Kurs", sub: "8:30 – 10:30" },
  { from: 8.5, to: 10.5, col: 2, cls: "blk-a2", name: "Krafttraining für Läufer*innen", sub: "8:30 – 10:30" },
  { from: 8.5, to: 12.5, col: 3, cls: "blk-b", name: "Trail Run Fortgeschritten", sub: "11–17 km · 500–1500 hm" },
  { from: 8.5, to: 14, col: 4, cls: "blk-c", name: "Trail Run Profi", sub: "17+ km · 800+ hm" },
  { from: 10.5, to: 12.5, col: 1, cls: "blk-a1", name: "Krafttraining für Läufer*innen", sub: "10:30 – 12:30" },
  { from: 10.5, to: 12.5, col: 2, cls: "blk-a2", name: "Trailrunning Technik Kurs", sub: "10:30 – 12:30" },

  // ── FR VORMITTAG ──
  { from: 8.5, to: 12.5, col: 5, cls: "blk-a1", name: "Trail Run Anfänger", sub: "8–13 km · 300–800 hm" },
  { from: 8.5, to: 12.5, col: 6, cls: "blk-b", name: "Trail Run Fortgeschritten", sub: "11–17 km · 500–1500 hm" },
  { from: 8.5, to: 14, col: 7, cls: "blk-c", name: "Trail Run Profi", sub: "17+ km · 800+ hm" },

  // ── SA VORMITTAG ──
  { from: 8.5, to: 12.5, col: 8, cls: "blk-a1", name: "Trail Run Anfänger", sub: "8–13 km · 300–800 hm" },
  { from: 8.5, to: 12.5, col: 9, cls: "blk-b", name: "Trail Run Fortgeschritten", sub: "11–17 km · 500–1500 hm" },
  { from: 8.5, to: 14, col: 10, cls: "blk-c", name: "Trail Run Profi", sub: "17+ km · 800+ hm" },

  // ── MITTAGESSEN ──
  { from: 12.5, to: 13.25, col: 1, colSpan: 4, cls: "blk-shared", name: "Mittagessen", sub: "12:30 – 13:15" },
  { from: 12.5, to: 13.25, col: 5, colSpan: 3, cls: "blk-shared", name: "Mittagessen", sub: "12:30 – 13:15" },
  { from: 12.5, to: 13.25, col: 8, colSpan: 3, cls: "blk-shared", name: "Mittagessen", sub: "12:30 – 13:15" },

  // ── DO NACHMITTAG: KANU + Workshops ──
  { from: 13.5, to: 14, col: 1, cls: "blk-kanu-weg", name: "Anfahrt See", sub: "30 Min" },
  { from: 14, to: 15.5, col: 1, cls: "blk-kanu1", name: "Kanu fahren Gr. 1", sub: "14:00 – 15:30" },
  { from: 15.5, to: 16.25, col: 1, cls: "blk-kanu-weg", name: "Rückweg", sub: "45 Min" },
  { from: 15, to: 15.5, col: 2, cls: "blk-kanu-weg", name: "Anfahrt See", sub: "30 Min" },
  { from: 15.5, to: 17, col: 2, cls: "blk-kanu2", name: "Kanu fahren Gr. 2", sub: "15:30 – 17:00" },
  { from: 17, to: 17.75, col: 2, cls: "blk-kanu-weg", name: "Rückweg", sub: "45 Min" },
  { from: 13.5, to: 17, col: 3, cls: "blk-workshop", name: "Linoleum-Druck", sub: "13:30 – 17:00" },
  { from: 16.5, to: 18.5, col: 4, cls: "blk-workshop", name: "Ernährungsworkshop", sub: "16:30 – 18:30" },

  // ── FR NACHMITTAG ──
  { from: 13.5, to: 15.5, col: 5, cls: "blk-workshop", name: "Kletterkurs 1", sub: "13:30 – 15:30" },
  { from: 15.75, to: 17.75, col: 5, cls: "blk-workshop", name: "Kletterkurs 2", sub: "15:45 – 17:45" },
  { from: 13.5, to: 15.5, col: 6, cls: "blk-workshop", name: "Bogenschießen", sub: "13:30 – 15:30" },
  { from: 17, to: 18.5, col: 6, cls: "blk-workshop", name: "Krafttraining Workshop", sub: "17:00 – 18:30" },
  { from: 13.5, to: 15.5, col: 7, cls: "blk-workshop", name: "Upcycling 1", sub: "13:30 – 15:30" },
  { from: 15.5, to: 17.5, col: 7, cls: "blk-workshop", name: "Upcycling 2", sub: "15:30 – 17:30" },

  // ── SA NACHMITTAG: MTB ──
  { from: 13.5, to: 14, col: 8, cls: "blk-kanu-weg", name: "Anfahrt", sub: "30 Min" },
  { from: 14, to: 16.25, col: 8, cls: "blk-workshop", name: "MTB-Tour", sub: "14:00 – 16:15" },
  { from: 16.25, to: 16.75, col: 8, cls: "blk-kanu-weg", name: "Rückfahrt", sub: "30 Min" },
  { from: 13.5, to: 15, col: 10, cls: "blk-workshop", name: "Töpfern", sub: "13:30 – 15:00" },
  { from: 15.25, to: 16.75, col: 10, cls: "blk-workshop", name: "Töpfern", sub: "15:15 – 16:45" },

  // ── ABEND ──
  { from: 18, to: 18.5, col: 0, cls: "blk-shared", name: "Welcome & Ablauf", sub: "18:00 – 18:30" },
  { from: 18.5, to: 19.25, col: 0, colSpan: 12, cls: "blk-dinner", name: "Dinner", sub: "18:30 – 19:15" },
  { from: 19.5, to: 21.5, col: 1, colSpan: 4, cls: "blk-evening", name: "Outdoormovie Night + Speakers Event", sub: "" },
  { from: 19.5, to: 21.5, col: 5, colSpan: 3, cls: "blk-evening", name: "Lagerfeuerabend", sub: "" },
  { from: 19.5, to: 21.5, col: 8, colSpan: 3, cls: "blk-evening", name: "Letzter Abend", sub: "" },
]

// ─── Legend ─────────────────────────────────────────────────────────────────

const LEGEND = [
  { cls: "blk-a1", label: "Anfänger" },
  { cls: "blk-a2", label: "Anfänger (2. Gruppe)" },
  { cls: "blk-b", label: "Fortgeschritten" },
  { cls: "blk-c", label: "Profi" },
  { cls: "blk-workshop", label: "Workshop / Aktivität" },
  { cls: "blk-kanu1", label: "Kanu Gr. 1" },
  { cls: "blk-kanu2", label: "Kanu Gr. 2" },
  { cls: "blk-kanu-weg", label: "An- / Rückweg" },
  { cls: "blk-yoga", label: "Sunrise Hike / Yoga" },
  { cls: "blk-dinner", label: "Dinner" },
  { cls: "blk-evening", label: "Abendprogramm" },
  { cls: "blk-travel", label: "Reise / Check-in" },
  { cls: "blk-shared", label: "Gemeinsam / Frühstück" },
]

// ─── Component ──────────────────────────────────────────────────────────────

export default function ZeitplanPage() {
  const { language } = useLanguage()

  const CONTENT_TOP = 56 // px — space for day + group headers
  const totalHeight = TOTAL_MIN * PX_PER_MIN + CONTENT_TOP + 24
  const totalWidth  = TIME_W + 12 * COL_W

  return (
    <>
      <style>{`
        /* ── Block colour tokens ── */
        .blk-a1       { background: #d1f5eb; color: #064e3b; }
        .blk-a2       { background: #a7f3d0; color: #022c22; }
        .blk-b        { background: #fef3c7; color: #78350f; }
        .blk-c        { background: #ede9fe; color: #3730a3; }
        .blk-workshop { background: #f0fdf4; color: #14532d; border: 1px solid #bbf7d0; }
        .blk-kanu1    { background: #2563eb; color: #eff6ff; }
        .blk-kanu2    { background: #60a5fa; color: #1e3a5f; }
        .blk-kanu-weg { background: #bfdbfe; color: #1e40af; }
        .blk-meal     { background: #fde68a; color: #78350f; border: 1px solid #fcd34d; }
        .blk-yoga     { background: #ccfbf1; color: #134e4a; }
        .blk-dinner   { background: hsl(248 24% 47%); color: #e9e7fb; }
        .blk-evening  { background: hsl(248 24% 32%); color: #c4c0f8; }
        .blk-travel   { background: #e2e8f0; color: #334155; border: 1px solid #cbd5e1; }
        .blk-shared   { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }

        /* ── Group header tokens ── */
        .grp-a1 { background: #d1f5eb; color: #064e3b; }
        .grp-a2 { background: #a7f3d0; color: #022c22; }
        .grp-b  { background: #fef3c7; color: #78350f; }
        .grp-c  { background: #ede9fe; color: #3730a3; }

        /* ── Block base ── */
        .sched-block {
          position: absolute;
          border-radius: 4px;
          padding: 4px 6px;
          font-size: 11px;
          line-height: 1.3;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,.06);
        }
        .sched-block .blk-title { font-weight: 600; }
        .sched-block .blk-sub   { font-size: 10px; opacity: .78; margin-top: 1px; }
      `}</style>

      <div className="min-h-screen bg-gray-950 text-white">
        <SiteHeader />

        {/* ── Page header ── */}
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

        {/* ── Legend ── */}
        <div className="border-b border-white/10 bg-gray-900">
          <div className="container mx-auto px-4 py-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {language === "de" ? "Legende" : "Legend"}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {LEGEND.map(({ cls, label }) => (
                <div key={cls} className="flex items-center gap-1.5">
                  <div className={`h-3 w-3 shrink-0 rounded-sm ${cls}`} />
                  <span className="text-xs text-white/60">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div className="container mx-auto px-4 pt-4 pb-1">
          <p className="text-xs text-white/30">
            {language === "de"
              ? "Seitlich scrollen für alle Tage und Gruppen · 1 px ≈ 1 Minute"
              : "Scroll horizontally for all days and groups · 1 px ≈ 1 minute"}
          </p>
        </div>

        {/* ── Schedule grid ── */}
        <div className="container mx-auto px-4 pb-16">
          <div className="overflow-x-auto rounded-lg border border-white/10 bg-gray-900">
            <div
              style={{
                position: "relative",
                width: totalWidth,
                height: totalHeight,
              }}
            >
              {/* Day header row */}
              {DAY_SPANS.map((d) => (
                <div
                  key={d.label}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: TIME_W + d.start * COL_W,
                    width: (d.end - d.start) * COL_W,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#fff",
                    background: "hsl(248 24% 47%)",
                    borderRight: "1px solid rgba(255,255,255,.1)",
                    borderBottom: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  {language === "de" ? d.label : d.labelEn}
                </div>
              ))}

              {/* Group header row */}
              {GRP_HEADERS.map((g) => (
                <div
                  key={g.col}
                  style={{
                    position: "absolute",
                    top: 28,
                    left: TIME_W + g.col * COL_W,
                    width: COL_W,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 600,
                    borderRight: "1px solid rgba(255,255,255,.06)",
                    borderBottom: "1px solid rgba(255,255,255,.1)",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  className={g.cls}
                >
                  {g.label}
                </div>
              ))}

              {/* Day separator verticals */}
              {DAY_SPANS.map((d) => (
                <div
                  key={`sep-${d.label}`}
                  style={{
                    position: "absolute",
                    top: CONTENT_TOP,
                    left: TIME_W + d.start * COL_W,
                    width: 1,
                    height: totalHeight - CONTENT_TOP,
                    background: "rgba(255,255,255,.12)",
                  }}
                />
              ))}

              {/* Time gridlines + labels */}
              {Array.from({ length: Math.floor(TOTAL_MIN / 30) + 1 }, (_, i) => {
                const m = i * 30
                const h = START_H + m / 60
                const hrs = Math.floor(h)
                const mins = Math.round((h - hrs) * 60)
                const y = CONTENT_TOP + m * PX_PER_MIN
                const label = `${hrs}:${mins === 0 ? "00" : "30"}`
                return (
                  <div key={label}>
                    <div
                      style={{
                        position: "absolute",
                        top: y - 7,
                        left: 0,
                        width: TIME_W - 4,
                        textAlign: "right",
                        fontSize: 10,
                        color: "rgba(255,255,255,.3)",
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: y,
                        left: TIME_W,
                        right: 0,
                        height: 1,
                        background: i % 2 === 0
                          ? "rgba(255,255,255,.1)"
                          : "rgba(255,255,255,.04)",
                      }}
                    />
                  </div>
                )
              })}

              {/* Blocks */}
              {BLOCKS.map((b, i) => {
                const top    = CONTENT_TOP + hToPx(b.from)
                const height = durPx(b.from, b.to)
                const left   = TIME_W + b.col * COL_W + 1
                const width  = (b.colSpan || 1) * COL_W - 3
                return (
                  <div
                    key={i}
                    className={`sched-block ${b.cls}`}
                    style={{
                      top,
                      left,
                      width,
                      height: height - 2,
                    }}
                    title={b.sub ? `${b.name} · ${b.sub}` : b.name}
                  >
                    <div className="blk-title">{b.name}</div>
                    {b.sub && height > 22 && (
                      <div className="blk-sub">{b.sub}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Notes ── */}
        <div className="container mx-auto px-4 pb-20">
          <div className="rounded-lg border border-white/10 bg-gray-900 p-6">
            <h3 className="font-semibold text-white">
              {language === "de" ? "Hinweise" : "Notes"}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>{language === "de" ? "• Alle Zeiten sind vorläufig." : "• All times are provisional."}</li>
              <li>{language === "de" ? "• Morning Yoga und Sunrise Hike sind optional." : "• Morning Yoga and Sunrise Hike are optional."}</li>
              <li>{language === "de" ? "• Gruppeneinteilung A/B/C nach Erfahrungslevel." : "• Group assignment A/B/C based on experience level."}</li>
              <li>{language === "de" ? "• Bei den Nachmittagsworkshops freie Wahl." : "• Free choice among afternoon workshops."}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
