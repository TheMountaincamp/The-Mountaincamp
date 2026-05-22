"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"

export default function ZeitplanPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    if (!containerRef.current) return

    const PX_PER_MIN = 1.0
    const START_H = 5
    const END_H = 22
    const TOTAL_MIN = (END_H - START_H) * 60
    const TIME_W = 40
    const CONTENT_TOP = 50
    const TOTAL_C = 16
    const MI_START = 0, DO_START = 3, FR_START = 7, SA_START = 10, SO_START = 13

    const DAY_SPANS = [
      { label: language === "de" ? "Mi · Anreise" : "Wed · Arrival", start: 0, end: 3 },
      { label: language === "de" ? "Do" : "Thu", start: 3, end: 7 },
      { label: language === "de" ? "Fr" : "Fri", start: 7, end: 10 },
      { label: language === "de" ? "Sa" : "Sat", start: 10, end: 13 },
      { label: language === "de" ? "So · Abreise" : "Sun · Departure", start: 13, end: 16 },
    ]

    const GRP_HEADERS = [
      { label: "", col: 0, cls: "" }, { label: "", col: 1, cls: "" }, { label: "", col: 2, cls: "" },
      { label: language === "de" ? "Anfänger" : "Beginner", col: 3, cls: "trail-a1" },
      { label: language === "de" ? "Anfänger" : "Beginner", col: 4, cls: "trail-a2" },
      { label: language === "de" ? "Fortgeschritten" : "Intermediate", col: 5, cls: "trail-b" },
      { label: language === "de" ? "Profi" : "Pro", col: 6, cls: "trail-c" },
      { label: language === "de" ? "Anfänger" : "Beginner", col: 7, cls: "trail-a1" },
      { label: language === "de" ? "Fortgeschritten" : "Intermediate", col: 8, cls: "trail-b" },
      { label: language === "de" ? "Profi" : "Pro", col: 9, cls: "trail-c" },
      { label: language === "de" ? "Anfänger" : "Beginner", col: 10, cls: "trail-a1" },
      { label: language === "de" ? "Fortgeschritten" : "Intermediate", col: 11, cls: "trail-b" },
      { label: language === "de" ? "Profi" : "Pro", col: 12, cls: "trail-c" },
      { label: "", col: 13, cls: "" }, { label: "", col: 14, cls: "" }, { label: "", col: 15, cls: "" },
    ]

    const b = (from: number, to: number, col: number, cls: string, name: string, sub: string, price?: string, colSpan?: number) => ({
      from, to, col, cls, name, sub, price: price || "", colSpan: colSpan || 1,
    })

    const blocks = [
      b(5, 6.5, SO_START, "sunrise-block", language === "de" ? "Sunrise Hike" : "Sunrise Hike", "5:00–6:30", "", 3),
      b(6.5, 7.5, SO_START, "yoga-block", language === "de" ? "Morning Yoga" : "Morning Yoga", "6:30–7:30", "Free", 3),
      b(7.5, 8.25, SO_START, "shared-block", language === "de" ? "Frühstück" : "Breakfast", "7:30–8:15", "", 3),
      b(8.25, 22, SO_START, "travel-block", language === "de" ? "Abreise" : "Departure", language === "de" ? "ab 8:30" : "from 8:30", "", 3),
      b(5, 6.5, FR_START, "sunrise-block", language === "de" ? "Sunrise Hike" : "Sunrise Hike", "5:00–6:30", "", 3),
      b(6.5, 7.5, FR_START, "yoga-block", language === "de" ? "Morning Yoga" : "Morning Yoga", "6:30–7:30", "Free", 3),
      b(6.5, 7.5, DO_START, "yoga-block", language === "de" ? "Morning Yoga" : "Morning Yoga", "6:30–7:30", "Free", 4),
      b(6.5, 7.5, SA_START, "yoga-block", language === "de" ? "Morning Yoga" : "Morning Yoga", "6:30–7:30", "Free", 3),
      b(7.5, 8.25, DO_START, "shared-block", language === "de" ? "Frühstück" : "Breakfast", "7:30–8:15", "", 4),
      b(7.5, 8.25, FR_START, "shared-block", language === "de" ? "Frühstück" : "Breakfast", "7:30–8:15", "", 3),
      b(7.5, 8.25, SA_START, "shared-block", language === "de" ? "Frühstück" : "Breakfast", "7:30–8:15", "", 3),
      b(8.25, 8.5, DO_START, "shared-block", language === "de" ? "Treffpunkt & Briefing" : "Meeting Point & Briefing", "8:15–8:30", "", 4),
      b(8.25, 8.5, FR_START, "shared-block", language === "de" ? "Treffpunkt & Briefing" : "Meeting Point & Briefing", "8:15–8:30", "", 3),
      b(8.25, 8.5, SA_START, "shared-block", language === "de" ? "Treffpunkt & Briefing" : "Meeting Point & Briefing", "8:15–8:30", "", 3),
      b(6, 12.5, MI_START, "travel-block", language === "de" ? "Zug Berlin → München" : "Train Berlin → Munich", language === "de" ? "ab 6:36 · Ankunft 10:45" : "from 6:36 · Arrival 10:45", "", 3),
      b(12.5, 16.5, MI_START, "travel-block", language === "de" ? "Bus München → Hochkrimml" : "Bus Munich → Hochkrimml", language === "de" ? "ab 12:30 · Ankunft 16:30" : "from 12:30 · Arrival 16:30", "", 3),
      b(16.5, 18, MI_START, "travel-block", language === "de" ? "Check-in" : "Check-in", "", "", 3),
      b(8.5, 10.5, DO_START, "trail-a1", language === "de" ? "Trailrunning Technik Kurs" : "Trailrunning Technique", "8:30–10:30", "28€"),
      b(8.5, 10.5, DO_START + 1, "trail-a2", language === "de" ? "Krafttraining für Läufer*innen" : "Strength Training for Runners", "8:30–10:30", "Free"),
      b(8.5, 12.5, DO_START + 2, "trail-b", language === "de" ? "Trail Run Fortgeschritten" : "Trail Run Intermediate", "11–17 km", ""),
      b(8.5, 14, DO_START + 3, "trail-c", language === "de" ? "Trail Run Profi" : "Trail Run Pro", "17+ km · 800+ hm", ""),
      b(10.5, 12.5, DO_START, "trail-a1", language === "de" ? "Krafttraining für Läufer*innen" : "Strength Training for Runners", "10:30–12:30", "Free"),
      b(10.5, 12.5, DO_START + 1, "trail-a2", language === "de" ? "Trailrunning Technik Kurs" : "Trailrunning Technique", "10:30–12:30", "28€"),
      b(8.5, 12.5, FR_START, "trail-a1", language === "de" ? "Trail Run Anfänger" : "Trail Run Beginner", "8–13 km", ""),
      b(8.5, 12.5, FR_START + 1, "trail-b", language === "de" ? "Trail Run Fortgeschritten" : "Trail Run Intermediate", "11–17 km", ""),
      b(8.5, 14, FR_START + 2, "trail-c", language === "de" ? "Trail Run Profi" : "Trail Run Pro", "17+ km", ""),
      b(8.5, 12.5, SA_START, "trail-a1", language === "de" ? "Trail Run Anfänger" : "Trail Run Beginner", "8–13 km", ""),
      b(8.5, 12.5, SA_START + 1, "trail-b", language === "de" ? "Trail Run Fortgeschritten" : "Trail Run Intermediate", "11–17 km", ""),
      b(8.5, 14, SA_START + 2, "trail-c", language === "de" ? "Trail Run Profi" : "Trail Run Pro", "17+ km", ""),
      b(12.5, 13.25, DO_START, "shared-block", language === "de" ? "Mittagessen" : "Lunch", "12:30–13:15", "", 4),
      b(12.5, 13.25, FR_START, "shared-block", language === "de" ? "Mittagessen" : "Lunch", "12:30–13:15", "", 3),
      b(12.5, 13.25, SA_START, "shared-block", language === "de" ? "Mittagessen" : "Lunch", "12:30–13:15", "", 3),
      b(13.5, 14, DO_START, "kanu-weg", language === "de" ? "Anfahrt See" : "Travel to lake", language === "de" ? "30 Min" : "30 min", ""),
      b(14, 15.5, DO_START, "kanu-gr1", language === "de" ? "Kanu Gr. 1" : "Kayaking Gr. 1", "14:00–15:30", "23€"),
      b(15.5, 16.25, DO_START, "kanu-weg", language === "de" ? "Rückweg" : "Return", language === "de" ? "45 Min" : "45 min", ""),
      b(15, 15.5, DO_START + 1, "kanu-weg", language === "de" ? "Anfahrt See" : "Travel to lake", language === "de" ? "30 Min" : "30 min", ""),
      b(15.5, 17, DO_START + 1, "kanu-gr2", language === "de" ? "Kanu Gr. 2" : "Kayaking Gr. 2", "15:30–17:00", "23€"),
      b(17, 17.75, DO_START + 1, "kanu-weg", language === "de" ? "Rückweg" : "Return", language === "de" ? "45 Min" : "45 min", ""),
      b(13.5, 17, DO_START + 2, "workshop", language === "de" ? "Linoleum-Druck" : "Linocut Printing", "13:30–17:00", "15€"),
      b(16.5, 18.5, DO_START + 3, "workshop", language === "de" ? "Ernährungsworkshop" : "Nutrition Workshop", "16:30–18:30", "28€"),
      b(13.5, 15.5, FR_START, "workshop", language === "de" ? "Kletterkurs 1" : "Climbing Course 1", "13:30–15:30", "38€"),
      b(15.75, 17.75, FR_START, "workshop", language === "de" ? "Kletterkurs 2" : "Climbing Course 2", "15:45–17:45", "38€"),
      b(13.5, 15.5, FR_START + 1, "workshop", language === "de" ? "Bogenschießen" : "Archery", "13:30–15:30", "21€"),
      b(17, 18.5, FR_START + 1, "workshop", language === "de" ? "Krafttraining Workshop" : "Strength Training Workshop", "17:00–18:30", "28€"),
      b(13.5, 15.5, FR_START + 2, "workshop", language === "de" ? "Upcycling 1" : "Upcycling 1", "13:30–15:30", "15€"),
      b(15.5, 17.5, FR_START + 2, "workshop", language === "de" ? "Upcycling 2" : "Upcycling 2", "15:30–17:30", "15€"),
      b(13.5, 14, SA_START, "kanu-weg", language === "de" ? "Anfahrt" : "Travel", language === "de" ? "30 Min" : "30 min", ""),
      b(14, 16.25, SA_START, "workshop", language === "de" ? "MTB-Tour" : "MTB Tour", "14:00–16:15", "25€"),
      b(16.25, 16.75, SA_START, "kanu-weg", language === "de" ? "Rückfahrt" : "Return", language === "de" ? "30 Min" : "30 min", ""),
      b(13.5, 15, SA_START + 2, "workshop", language === "de" ? "Töpfern" : "Pottery", "13:30–15:00", "15€"),
      b(15.25, 16.75, SA_START + 2, "workshop", language === "de" ? "Töpfern" : "Pottery", "15:15–16:45", "15€"),
      b(18, 18.5, MI_START, "shared-block", language === "de" ? "Welcome & Ablauf" : "Welcome & Overview", "18:00–18:30", "", 3),
      b(18.5, 19.25, MI_START, "dinner-block", language === "de" ? "Dinner" : "Dinner", "18:30–19:15", "", TOTAL_C),
      b(19.5, 21.5, DO_START, "evening-block", language === "de" ? "Outdoormovie Night + Speakers Event" : "Outdoor Movie Night + Speakers Event", "", "", 4),
      b(19.5, 21.5, FR_START, "evening-block", language === "de" ? "Lagerfeuerabend" : "Campfire Evening", "", "", 3),
      b(19.5, 21.5, SA_START, "evening-block", language === "de" ? "Abschlussabend" : "Closing Evening", "", "", 3),
    ]

    const render = () => {
      if (!containerRef.current) return
      containerRef.current.innerHTML = ""
      const availW = containerRef.current.parentElement?.clientWidth || 700
      const COL_W = Math.floor((availW - TIME_W) / TOTAL_C)
      const totalWidth = TIME_W + TOTAL_C * COL_W

      const wrap = document.createElement("div")
      wrap.style.cssText = `position:relative;width:${totalWidth}px;height:${TOTAL_MIN * PX_PER_MIN + 60}px;`
      containerRef.current.appendChild(wrap)

      // Day headers
      const dhr = document.createElement("div")
      dhr.style.cssText = `position:absolute;top:0;left:${TIME_W}px;right:0;height:24px;display:flex;`
      DAY_SPANS.forEach((d) => {
        const div = document.createElement("div")
        div.style.cssText = `width:${(d.end - d.start) * COL_W}px;font-size:11px;font-weight:600;color:var(--color-text-primary);text-align:center;padding:6px 2px;border-radius:6px;background:var(--color-background-secondary);margin:0 1px 2px 1px;`
        div.textContent = d.label
        dhr.appendChild(div)
      })
      wrap.appendChild(dhr)

      // Group headers
      const ghr = document.createElement("div")
      ghr.style.cssText = `position:absolute;top:28px;left:${TIME_W}px;right:0;height:18px;display:flex;`
      GRP_HEADERS.forEach((g) => {
        const div = document.createElement("div")
        div.style.cssText = `width:${COL_W}px;font-size:8.5px;text-align:center;padding:2px 1px;border-radius:3px;font-weight:500;margin:0 1px 2px 1px;`
        if (g.cls === "trail-a1") div.style.background = "#E1F5EE"
        if (g.cls === "trail-a2") div.style.background = "#9FE1CB"
        if (g.cls === "trail-b") div.style.background = "#FAEEDA"
        if (g.cls === "trail-c") div.style.background = "#EEEDFE"
        div.textContent = g.label
        ghr.appendChild(div)
      })
      wrap.appendChild(ghr)

      // Time grid
      for (let m = 0; m <= TOTAL_MIN; m += 30) {
        const h = START_H + m / 60, hrs = Math.floor(h), mins = Math.round((h - hrs) * 60)
        const label = document.createElement("div")
        label.style.cssText = `position:absolute;top:${CONTENT_TOP + m * PX_PER_MIN - 7}px;left:0;width:${TIME_W - 4}px;font-size:9px;color:var(--color-text-tertiary);text-align:right;padding-right:4px;padding-top:2px;white-space:nowrap;`
        label.textContent = hrs + ":" + (mins === 0 ? "00" : "30")
        wrap.appendChild(label)

        const line = document.createElement("div")
        line.style.cssText = `position:absolute;top:${CONTENT_TOP + m * PX_PER_MIN}px;left:${TIME_W}px;right:0;height:1px;background:var(--color-border-tertiary);opacity:0.5;`
        wrap.appendChild(line)
      }

      // Day dividers
      DAY_SPANS.forEach((d) => {
        const line = document.createElement("div")
        line.style.cssText = `position:absolute;top:${CONTENT_TOP}px;bottom:10px;left:${TIME_W + d.start * COL_W}px;width:2px;background:var(--color-border-secondary);opacity:.9;`
        wrap.appendChild(line)
      })

      // Blocks
      blocks.forEach((bl) => {
        const top = CONTENT_TOP + (bl.from - START_H) * 60 * PX_PER_MIN
        const height = (bl.to - bl.from) * 60 * PX_PER_MIN
        const left = TIME_W + bl.col * COL_W
        const width = bl.colSpan * COL_W - 2
        const div = document.createElement("div")
        
        // Apply color styles
        const colorMap: Record<string, string> = {
          "trail-a1": "background:#E1F5EE;color:#085041;",
          "trail-a2": "background:#9FE1CB;color:#04342C;",
          "trail-b": "background:#FAEEDA;color:#633806;",
          "trail-c": "background:#EEEDFE;color:#3C3489;",
          "workshop": "background:#F1EFE8;color:#2C2C2A;",
          "kanu-gr1": "background:#378ADD;color:#E6F1FB;",
          "kanu-gr2": "background:#85B7EB;color:#042C53;",
          "kanu-weg": "background:#B5D4F4;color:#0C447C;",
          "shared-block": "background:var(--color-background-secondary);color:var(--color-text-secondary);",
          "travel-block": "background:#F1EFE8;color:#5F5E5A;",
          "yoga-block": "background:#9FE1CB;color:#04342C;",
          "sunrise-block": "background:#FAD36B;color:#5C3A00;",
          "dinner-block": "background:#534AB7;color:#CECBF6;font-weight:500;",
          "evening-block": "background:#3C3489;color:#CECBF6;font-weight:500;",
        }

        div.style.cssText = (colorMap[bl.cls] || "") + `position:absolute;top:${top}px;left:${left}px;width:${width}px;height:${height - 2}px;border-radius:5px;padding:3px 4px;font-size:9px;line-height:1.2;overflow:hidden;margin:0 1px;`
        div.title = bl.sub ? `${bl.name} · ${bl.sub}` : bl.name
        
        let html = bl.name ? `<div style="font-weight:600;">${bl.name}</div>` : ""
        if (bl.sub) html += `<div style="font-size:8px;opacity:0.80;margin-top:1px;">${bl.sub}</div>`
        if (bl.price) html += `<div style="font-size:8px;margin-top:1px;font-weight:700;opacity:0.9;">${bl.price}</div>`
        div.innerHTML = html
        wrap.appendChild(div)
      })
    }

    render()
    const handleResize = () => render()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [language])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container max-w-full mx-auto px-4 py-8 md:py-12 pt-24">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>{language === "de" ? "Zurück" : "Back"}</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {language === "de" ? "Mountaincamp Schedule" : "Mountaincamp Schedule"}
          </h1>
          <p className="text-lg text-white/60">
            {language === "de" ? "5.–9. August 2026" : "August 5–9, 2026"}
          </p>
          <p className="text-base text-white/50 mt-3">
            {language === "de"
              ? "Jeden Tag kannst du dir den Lauf aussuchen, der zu deinem Level passt."
              : "Every day you can choose the run that matches your level."}
          </p>
        </div>

        <div className="mb-8 overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-4">
          <div ref={containerRef} />
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#E1F5EE" }} />
            <span className="text-white/70">{language === "de" ? "Anfänger" : "Beginner"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#9FE1CB" }} />
            <span className="text-white/70">{language === "de" ? "Anfänger (2. Gr.)" : "Beginner (Group 2)"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#FAEEDA" }} />
            <span className="text-white/70">{language === "de" ? "Fortgeschritten" : "Intermediate"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#EEEDFE" }} />
            <span className="text-white/70">{language === "de" ? "Profi" : "Pro"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#F1EFE8" }} />
            <span className="text-white/70">Workshop</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#378ADD" }} />
            <span className="text-white/70">{language === "de" ? "Kanu Gr. 1" : "Kayaking Gr. 1"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#85B7EB" }} />
            <span className="text-white/70">{language === "de" ? "Kanu Gr. 2" : "Kayaking Gr. 2"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#B5D4F4" }} />
            <span className="text-white/70">{language === "de" ? "An-/Rückweg" : "Travel"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#9FE1CB" }} />
            <span className="text-white/70">{language === "de" ? "Yoga" : "Yoga"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#FAD36B" }} />
            <span className="text-white/70">{language === "de" ? "Sunrise Hike" : "Sunrise Hike"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#534AB7" }} />
            <span className="text-white/70">Dinner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ background: "#3C3489" }} />
            <span className="text-white/70">{language === "de" ? "Abendprogramm" : "Evening"}</span>
          </div>
        </div>

        <p className="text-sm text-white/40 mt-6">
          {language === "de" ? "Preise in € pro Person" : "Prices in € per person"}
        </p>
      </div>
    </div>
  )
}
