import { TICKETS_SOLD, TOTAL_TICKETS } from "@/app/lib/early-bird"

/**
 * Soziale Bestätigung direkt über der Buchungsmaske.
 * Zahlen: Ticketstand aus app/data/tickets.json (täglich aus der Paxliste),
 * Struktur 2026 aus dem Altra-Report (130 Teilnehmende). Zitate: echte Stimmen 2025.
 */
const T = {
  de: {
    sold: "Plätze vergeben",
    of: "von",
    women: "Frauen im Camp 2026",
    countries: "Länder im Camp 2026",
    levels: "kamen 2026 als Beginner oder Intermediate",
    quotes: [
      { q: "It was my first experience trail running and I loved it.", who: "Teilnehmer:in 2025" },
      { q: "Got me hooked on trail running hobby and made unique, lovely, crazy friends.", who: "Teilnehmer:in 2025" },
    ],
    soloTitle: "Du kommst allein?",
    solo: "Bist du nicht lange. Gemeinsame Anreise mit Bahn und Bus ab Berlin, München und Jenbach, Laufgruppen nach Tempo und ein WhatsApp-Kanal schon vor dem Camp.",
  },
  en: {
    sold: "spots taken",
    of: "of",
    women: "women at the 2026 camp",
    countries: "countries at the 2026 camp",
    levels: "came as beginners or intermediates in 2026",
    quotes: [
      { q: "It was my first experience trail running and I loved it.", who: "Participant 2025" },
      { q: "Got me hooked on trail running hobby and made unique, lovely, crazy friends.", who: "Participant 2025" },
    ],
    soloTitle: "Coming on your own?",
    solo: "Not for long. Travel together by train and bus from Berlin, Munich and Jenbach, running groups by pace and a WhatsApp channel before the camp starts.",
  },
} as const

export default function SocialProof({ lang }: { lang: "de" | "en" }) {
  const t = T[lang]
  const sold = Math.min(TICKETS_SOLD, TOTAL_TICKETS)
  const pct = TOTAL_TICKETS ? Math.round((sold / TOTAL_TICKETS) * 100) : 0
  const stats = [
    { v: "62 %", l: t.women },
    { v: "12", l: t.countries },
    { v: "83 %", l: t.levels },
  ]
  return (
    <section aria-label={lang === "de" ? "Wer dabei ist" : "Who is coming"} className="mx-auto mb-10 max-w-5xl">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="col-span-2 rounded-2xl bg-black p-4 text-white md:col-span-1 md:p-5">
          <div className="text-3xl font-bold">
            {sold} <span className="text-base font-medium text-white/60">{t.of} {TOTAL_TICKETS}</span>
          </div>
          <div className="mt-1 text-sm text-white/70">{t.sold}</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(pct, 3)}%` }} />
          </div>
        </div>
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-gray-200 p-4 last:col-span-2 md:p-5 md:last:col-span-1">
            <div className="text-3xl font-bold">{s.v}</div>
            <div className="mt-1 text-sm text-gray-600">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {t.quotes.map((x, i) => (
          <figure key={x.q} className={`rounded-2xl bg-gray-50 p-5 ${i > 0 ? "hidden md:block" : ""}`}>
            <blockquote className="text-gray-800">&ldquo;{x.q}&rdquo;</blockquote>
            <figcaption className="mt-2 text-sm text-gray-500">{x.who}</figcaption>
          </figure>
        ))}
        <div className="rounded-2xl bg-gray-50 p-5">
          <div className="font-semibold">{t.soloTitle}</div>
          <p className="mt-1 text-gray-700">{t.solo}</p>
        </div>
      </div>
    </section>
  )
}
