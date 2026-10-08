import { TICKETS_SOLD, TOTAL_TICKETS } from "@/app/lib/early-bird"

/**
 * Soziale Bestätigung über der Buchungsmaske.
 * Ticketstand: app/data/tickets.json (täglich aus der Paxliste).
 * 2026: Umfrage (47 Antworten, Zufriedenheit 4,6 von 5), Altra-Report (130 TN:
 * 62 % Frauen; Level 43,1 / 39,7 / 15,5 %, auf 100 % normiert).
 * Zitat nur von Leuten, die "Yes, feel free" angekreuzt haben.
 */
const SATISFACTION = 4.6
const WOMEN = 62
const LEVELS = [44, 40, 16] // Beginner, Intermediate, Advanced

const T = {
  de: {
    sold: (s: number, t: number) => `${s} von ${t} Plätzen sind vergeben.`,
    satL: "Bewertung",
    womenL: "Teilnehmende",
    year: "Camp 2026",
    satOf: "von 5",
    women: "Frauen",
    womenShort: "Frauen",
    men: "Männer",
    level: ["Beginner", "Intermediate", "Advanced"],
    newish: "Beginner & Intermediate",
    quote: { q: "Jeder Tag hat seine besonderen Momente. Running Rave, Trailrun am Gletscher und Feuer mit Livemusik!", who: "Teilnehmer:in 2026, übersetzt" },
  },
  en: {
    sold: (s: number, t: number) => `${s} of ${t} spots are taken.`,
    satL: "Rating",
    womenL: "Participants",
    year: "2026 camp",
    satOf: "out of 5",
    women: "women",
    womenShort: "women",
    men: "men",
    level: ["Beginner", "Intermediate", "Advanced"],
    newish: "beginner & intermediate",
    quote: { q: "I think every day has its special moments. Running rave, glacier trail run and fire with live music!", who: "Participant 2026" },
  },
} as const

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs uppercase tracking-wider text-gray-500">{children}</div>
}

export default function SocialProof({ lang }: { lang: "de" | "en" }) {
  const t = T[lang]
  const sold = Math.min(TICKETS_SOLD, TOTAL_TICKETS)
  const pct = TOTAL_TICKETS ? (sold / TOTAL_TICKETS) * 100 : 0
  const num = (v: number) => v.toLocaleString(lang === "de" ? "de-DE" : "en-GB")
  const shades = ["bg-gray-900", "bg-gray-500", "bg-gray-300"]

  return (
    <section
      aria-label={lang === "de" ? "Wer dabei ist" : "Who is coming"}
      className="mx-auto mb-12 max-w-3xl border-b border-gray-200 pb-10"
    >
      <p className="text-2xl font-semibold tracking-tight md:text-3xl">{t.sold(sold, TOTAL_TICKETS)}</p>
      <div className="mt-3 h-px w-full bg-gray-200" aria-hidden="true">
        <div className="h-px bg-gray-900" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-8 text-xs uppercase tracking-wider text-gray-400">{t.year}</div>
      <div className="mt-3 grid grid-cols-3 gap-4 md:gap-8">
        {/* Zufriedenheit: fünf Segmente, anteilig gefüllt */}
        <div>
          <Label>{t.satL}</Label>
          <div className="mt-2 flex flex-col md:flex-row md:items-baseline md:gap-1.5">
            <span className="whitespace-nowrap text-2xl font-semibold md:text-3xl">{num(SATISFACTION)}</span>
            <span className="min-h-[2.6em] text-xs leading-tight text-gray-500 md:min-h-0 md:text-sm">{t.satOf}</span>
          </div>
          <div className="mt-2 flex gap-1" role="img" aria-label={`${t.satL} ${num(SATISFACTION)} ${t.satOf}`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1.5 flex-1 bg-gray-200">
                <div className="h-full bg-gray-900" style={{ width: `${Math.max(0, Math.min(1, SATISFACTION - i)) * 100}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Teilnehmende: Kreisdiagramm Frauen / Männer */}
        <div>
          <Label>{t.womenL}</Label>
          <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <svg
              viewBox="0 0 42 42"
              className="h-14 w-14 shrink-0 -rotate-90 md:h-16 md:w-16"
              role="img"
              aria-label={`${WOMEN} % ${t.women}, ${100 - WOMEN} % ${t.men}`}
            >
              <circle cx="21" cy="21" r="15.915" fill="none" stroke="#d1d5db" strokeWidth="6" />
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                stroke="#111827"
                strokeWidth="6"
                strokeDasharray={`${WOMEN} ${100 - WOMEN}`}
              />
            </svg>
            <div className="space-y-1 whitespace-nowrap text-xs text-gray-600 md:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-gray-900" />
                {WOMEN} % {t.women}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-gray-300" />
                {100 - WOMEN} % {t.men}
              </div>
            </div>
          </div>
        </div>

        {/* Level */}
        <div>
          <Label>Level</Label>
          <div className="mt-2 flex flex-col md:flex-row md:items-baseline md:gap-1.5">
            <span className="whitespace-nowrap text-2xl font-semibold md:text-3xl">{LEVELS[0] + LEVELS[1]} %</span>
            <span className="min-h-[2.6em] text-xs leading-tight text-gray-500 md:min-h-0 md:text-sm">{t.newish}</span>
          </div>
          <div
            className="mt-2 flex h-1.5 gap-1"
            role="img"
            aria-label={t.level.map((l, i) => `${LEVELS[i]} % ${l}`).join(", ")}
          >
            {LEVELS.map((v, i) => (
              <div key={i} className={shades[i]} style={{ width: `${v}%` }} />
            ))}
          </div>
          <div className="mt-2 hidden flex-wrap gap-x-3 text-xs text-gray-500 md:flex">
            {LEVELS.map((v, i) => (
              <span key={i}>
                {v} % {t.level[i]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <figure className="mt-10 border-l-2 border-gray-900 pl-4">
        <blockquote className="text-lg leading-snug">
          {lang === "de" ? "„" : "“"}
          {t.quote.q}
          {lang === "de" ? "“" : "”"}
        </blockquote>
        <figcaption className="mt-2 text-sm text-gray-500">{t.quote.who}</figcaption>
      </figure>

    </section>
  )
}
