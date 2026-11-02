"use client"

import { SALE_PHASES } from "@/app/lib/early-bird"

/**
 * Infotext unter der Buchungsmaske: Leistungen, Preise, Anreise, Storno und
 * kurze Fragen. Dient Besuchenden als Entscheidungshilfe und gibt der
 * Ticketseite genug Inhalt, um in Suchmaschinen zu ranken.
 * Preise der Phasen kommen aus SALE_PHASES, damit sie nie veralten.
 */

const ROOM_UPGRADES = { four: 60, double: 180 }
const SHUTTLES = [
  { city: "Berlin", price: 120 },
  { city: "München", cityEn: "Munich", price: 80 },
  { city: "Jenbach", price: 40 },
]

const COPY = {
  de: {
    includedTitle: "Das ist im Ticket enthalten",
    included: [
      "4 Nächte im Berghaus in Hochkrimml auf 1.700 m, Basis Mehrbettzimmer",
      "Vollpension: Frühstück, kleiner Lunch und Abendessen, auch vegetarisch und vegan",
      "Tägliche geführte Trailruns in Gruppen nach Tempo und Erfahrung, von entspannten 10 km bis zu Bergtouren mit über 1.500 Höhenmetern",
      "Technik-Coaching, auch für Einsteigerinnen und Einsteiger",
      "Workshops wie Yoga, Töpfern und Aquarell",
      "Gemeinsame Abende, Lagerfeuer und der Sunset Rave",
    ],
    pricesTitle: "Preise 2027",
    pricesIntro:
      "Der Ticketpreis steigt in Phasen. Je früher du buchst, desto günstiger wird dein Platz im Trailrunning Camp.",
    phase: "Phase",
    roomsTitle: "Zimmer-Upgrade",
    rooms: (four: number, double: number) =>
      `Statt im Mehrbettzimmer kannst du für alle vier Nächte auch im 4er-Zimmer (+${four} €) oder im Doppelzimmer (+${double} €) schlafen.`,
    travelTitle: "Anreise ohne Auto",
    travel:
      "Wir fahren gemeinsam mit dem Shuttle nach Hochkrimml und wieder zurück. Hin- und Rückfahrt kosten:",
    travelLink: "Alle Abfahrtsorte und Zeiten",
    cancelTitle: "Storno",
    cancel:
      "Kommt etwas dazwischen, kannst du jederzeit schriftlich stornieren. Bis 30 Tage vor dem Camp beträgt die Gebühr 20\u00a0% des Preises, danach staffelt sie sich nach unseren AGB. Wir empfehlen eine Reiserücktrittsversicherung.",
    agb: "AGB lesen",
    faqTitle: "Kurz gefragt",
    faq: [
      {
        q: "Ist das Trailrunning Camp auch für Anfänger geeignet?",
        a: "Ja. Es gibt Gruppen mit kürzeren Distanzen und Technik-Coaching. Du brauchst eine Grundfitness und Lust auf Berge, den Rest lernst du im Camp.",
      },
      {
        q: "Kann ich alleine kommen?",
        a: "Unbedingt. Die meisten reisen alleine oder zu zweit an. Spätestens nach dem ersten gemeinsamen Lauf kennst du Leute.",
      },
      {
        q: "Was muss ich mitbringen?",
        a: "Trailrunning-Schuhe, Laufkleidung, einen kleinen Laufrucksack und wetterfeste Kleidung. Nach der Buchung bekommst du eine ausführliche Packliste.",
      },
    ],
  },
  en: {
    includedTitle: "What your ticket includes",
    included: [
      "4 nights in the mountain house in Hochkrimml at 1,700 m, shared dorm as standard",
      "Full board: breakfast, a light lunch and dinner, with vegetarian and vegan options",
      "Daily guided trail runs in groups by pace and experience, from relaxed 10 km runs to mountain tours with more than 1,500 m of climbing",
      "Technique coaching, including for beginners",
      "Workshops such as yoga, pottery and watercolour",
      "Evenings together, campfires and the Sunset Rave",
    ],
    pricesTitle: "Prices 2027",
    pricesIntro:
      "The ticket price goes up in phases. The earlier you book, the less you pay for your spot at the trail running camp.",
    phase: "Phase",
    roomsTitle: "Room upgrade",
    rooms: (four: number, double: number) =>
      `Instead of a shared dorm you can stay in a 4-bed room (+€${four}) or a double room (+€${double}) for all four nights.`,
    travelTitle: "Getting there without a car",
    travel: "We travel to Hochkrimml and back together by shuttle. The return trip costs:",
    travelLink: "All departure points and times",
    cancelTitle: "Cancellation",
    cancel:
      "If something comes up, you can cancel in writing at any time. Up to 30 days before the camp the fee is 20% of the price, after that it increases as set out in our terms. We recommend travel cancellation insurance.",
    agb: "Read the terms (German)",
    faqTitle: "Quick answers",
    faq: [
      {
        q: "Is the trail running camp suitable for beginners?",
        a: "Yes. There are groups with shorter distances and technique coaching. You need a basic level of fitness and a love for the mountains, the rest you learn at the camp.",
      },
      {
        q: "Can I come on my own?",
        a: "Absolutely. Most people arrive alone or as a pair. By the end of the first run together you will know people.",
      },
      {
        q: "What do I need to bring?",
        a: "Trail running shoes, running clothes, a small running pack and weatherproof layers. After booking you get a detailed packing list.",
      },
    ],
  },
} as const

export default function TicketInfo({ lang }: { lang: "de" | "en" }) {
  const c = COPY[lang]
  const phases = SALE_PHASES.filter((p) => p.price !== null)

  return (
    <section className="mx-auto mt-16 max-w-3xl text-gray-700">
      <div className="grid gap-10">
        <div>
          <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-gray-900">{c.includedTitle}</h2>
          <ul className="list-disc space-y-2 pl-5">
            {c.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-gray-900">{c.pricesTitle}</h2>
          <p className="mb-4">{c.pricesIntro}</p>
          <ul className="mb-4 divide-y divide-gray-200 border border-gray-200">
            {phases.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-4 py-3">
                <span>{p.name[lang]}</span>
                <span className="font-bold text-gray-900">{lang === "de" ? `${p.price} €` : `€${p.price}`}</span>
              </li>
            ))}
          </ul>
          <h3 className="mb-2 font-bold text-gray-900">{c.roomsTitle}</h3>
          <p>{c.rooms(ROOM_UPGRADES.four, ROOM_UPGRADES.double)}</p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-gray-900">{c.travelTitle}</h2>
          <p className="mb-3">{c.travel}</p>
          <ul className="mb-3 list-disc space-y-1 pl-5">
            {SHUTTLES.map((s) => (
              <li key={s.city}>
                {lang === "en" && s.cityEn ? s.cityEn : s.city}: {lang === "de" ? `${s.price} €` : `€${s.price}`}
              </li>
            ))}
          </ul>
          <a href="/bus-departures" className="font-semibold text-primary underline">
            {c.travelLink}
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-gray-900">{c.cancelTitle}</h2>
          <p className="mb-3">{c.cancel}</p>
          <a href="/agb" className="font-semibold text-primary underline">
            {c.agb}
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-gray-900">{c.faqTitle}</h2>
          <dl className="space-y-4">
            {c.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-bold text-gray-900">{f.q}</dt>
                <dd className="mt-1">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
