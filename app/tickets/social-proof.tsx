import { TICKETS_SOLD, TOTAL_TICKETS } from "@/app/lib/early-bird"

/**
 * Soziale Bestätigung über der Buchungsmaske, bewusst schlicht gehalten.
 * Ticketstand: app/data/tickets.json (täglich aus der Paxliste).
 * Camp 2026: Altra-Report (130 Teilnehmende) und Umfrage 2026 (47 Antworten,
 * Zufriedenheit 4,6 von 5). Zitate nur von Leuten, die "Yes, feel free" angekreuzt haben.
 */
const T = {
  de: {
    sold: (s: number, t: number) => `${s} von ${t} Plätzen sind vergeben.`,
    facts:
      "Beim Camp 2026 waren 62 % Frauen dabei, Leute aus 12 Ländern, und mehr als vier von fünf kamen als Beginner oder Intermediate. In der Umfrage danach gaben 47 Teilnehmende im Schnitt 4,6 von 5 Punkten.",
    quotes: [
      { q: "Ich bin jetzt offiziell besessen von Trailrunning.", who: "Teilnehmer:in 2026, übersetzt" },
      { q: "Die Balance aus Trails, Spaß und Community.", who: "Teilnehmer:in 2026 zum persönlichen Highlight, übersetzt" },
    ],
    soloLead: "Du kommst allein?",
    solo: "Das bleibt nicht lange so. Ihr reist gemeinsam mit Bahn und Bus ab Berlin, München und Jenbach an, lauft in Gruppen nach Tempo und habt schon vor dem Camp einen gemeinsamen WhatsApp-Kanal.",
  },
  en: {
    sold: (s: number, t: number) => `${s} of ${t} spots are taken.`,
    facts:
      "At the 2026 camp, 62 % were women, people came from 12 countries, and more than four in five arrived as beginners or intermediates. In the survey afterwards, 47 participants gave it 4.6 out of 5 on average.",
    quotes: [
      { q: "I am now officially obsessed with trail running.", who: "Participant 2026" },
      { q: "Balance between trails and fun and community.", who: "Participant 2026, on their personal highlight" },
    ],
    soloLead: "Coming on your own?",
    solo: "Not for long. You travel together by train and bus from Berlin, Munich and Jenbach, run in groups by pace and share a WhatsApp channel before the camp starts.",
  },
} as const

export default function SocialProof({ lang }: { lang: "de" | "en" }) {
  const t = T[lang]
  const sold = Math.min(TICKETS_SOLD, TOTAL_TICKETS)
  const pct = TOTAL_TICKETS ? (sold / TOTAL_TICKETS) * 100 : 0
  return (
    <section
      aria-label={lang === "de" ? "Wer dabei ist" : "Who is coming"}
      className="mx-auto mb-12 max-w-3xl border-b border-gray-200 pb-10"
    >
      <p className="text-2xl font-semibold tracking-tight md:text-3xl">{t.sold(sold, TOTAL_TICKETS)}</p>
      <div className="mt-3 h-px w-full bg-gray-200" aria-hidden="true">
        <div className="h-px bg-gray-900" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-5 leading-relaxed text-gray-700">{t.facts}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {t.quotes.map((x, i) => (
          <figure key={x.q} className={`border-l-2 border-gray-900 pl-4 ${i > 0 ? "hidden md:block" : ""}`}>
            <blockquote className="text-lg leading-snug">{lang === "de" ? "\u201E" : "\u201C"}{x.q}{lang === "de" ? "\u201C" : "\u201D"}</blockquote>
            <figcaption className="mt-2 text-sm text-gray-500">{x.who}</figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-8 leading-relaxed text-gray-700">
        <span className="font-semibold text-gray-900">{t.soloLead}</span> {t.solo}
      </p>
    </section>
  )
}
