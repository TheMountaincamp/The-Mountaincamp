"use client"

import { useState } from "react"

/**
 * Buchungshelfer über der CADI-Maske: Anreise, Unterkunft und Verpflegung per
 * Klick wählen, Gesamtpreis sehen und die passenden Einträge für das Formular
 * angezeigt bekommen. Die Maske selbst (iFrame von CADI) kann von hier aus nicht
 * befüllt werden. Sobald CADI eine Vorauswahl per Parameter unterstützt, werden
 * die Werte unten (cadiLabel) per data-Attribut an das iFrame übergeben.
 * Bezeichnungen wie in der Maske (Paxliste 2026).
 */
type Opt = { id: string; de: string; en: string; price: number; cadiLabel: string }

const TRAVEL: Opt[] = [
  { id: "self", de: "Eigenanreise", en: "Own travel", price: 0, cadiLabel: "Eigene Anreise" },
  { id: "jenbach", de: "Shuttle Jenbach", en: "Shuttle Jenbach", price: 40, cadiLabel: "Jenbach (A)" },
  { id: "muenchen", de: "Shuttle München", en: "Shuttle Munich", price: 80, cadiLabel: "München" },
  { id: "berlin", de: "Shuttle Berlin", en: "Shuttle Berlin", price: 120, cadiLabel: "Berlin Zug + Bus" },
]
const ROOMS: Opt[] = [
  { id: "dorm", de: "Mehrbettzimmer", en: "Shared dorm", price: 0, cadiLabel: "8er Mehrbettzimmer" },
  { id: "four", de: "4er-Zimmer", en: "4-bed room", price: 60, cadiLabel: "4er Mehrbettzimmer" },
  { id: "double", de: "Doppelzimmer", en: "Double room", price: 180, cadiLabel: "Doppelzimmer" },
]
const FOOD: Opt[] = [
  { id: "all", de: "Alles", en: "Everything", price: 0, cadiLabel: "Keine Einschränkung" },
  { id: "veggie", de: "Vegetarisch", en: "Vegetarian", price: 0, cadiLabel: "Vegetarisch" },
  { id: "vegan", de: "Vegan", en: "Vegan", price: 0, cadiLabel: "Vegan" },
]

const T = {
  de: {
    title: "Stell dein Ticket zusammen",
    travel: "Anreise",
    room: "Unterkunft",
    food: "Verpflegung",
    incl: "inklusive",
    total: "Dein Preis",
    hint: "So füllst du das Formular unten aus:",
    cta: "Weiter zur Buchung",
  },
  en: {
    title: "Build your ticket",
    travel: "Travel",
    room: "Room",
    food: "Food",
    incl: "included",
    total: "Your price",
    hint: "Select this in the form below:",
    cta: "Continue to booking",
  },
} as const

function Group({
  label, opts, value, onChange, lang, incl,
}: { label: string; opts: Opt[]; value: string; onChange: (id: string) => void; lang: "de" | "en"; incl: string }) {
  return (
    <fieldset className="mt-4">
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</legend>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {opts.map((o) => {
          const active = o.id === value
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className={`border px-3 py-2 text-left text-sm transition-colors ${
                active ? "border-primary bg-primary text-white" : "border-gray-300 bg-white text-gray-800 hover:border-primary"
              }`}
            >
              <span className="block font-semibold">{o[lang]}</span>
              <span className={`block text-xs ${active ? "text-white/85" : "text-gray-500"}`}>
                {o.price ? `+${o.price} €` : label === T[lang].food ? " " : incl}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function BookingHelper({ lang, basePrice }: { lang: "de" | "en"; basePrice: number | null }) {
  const t = T[lang]
  const [travel, setTravel] = useState("self")
  const [room, setRoom] = useState("dorm")
  const [food, setFood] = useState("all")
  const tr = TRAVEL.find((o) => o.id === travel)!
  const ro = ROOMS.find((o) => o.id === room)!
  const fo = FOOD.find((o) => o.id === food)!
  const total = (basePrice ?? 0) + tr.price + ro.price

  return (
    <section aria-label={t.title} className="mt-6 border border-gray-200 bg-gray-50 p-4 md:p-6">
      <h2 className="text-lg font-bold md:text-xl">{t.title}</h2>
      <Group label={t.travel} opts={TRAVEL} value={travel} onChange={setTravel} lang={lang} incl={t.incl} />
      <Group label={t.room} opts={ROOMS} value={room} onChange={setRoom} lang={lang} incl={t.incl} />
      <Group label={t.food} opts={FOOD} value={food} onChange={setFood} lang={lang} incl={t.incl} />

      {basePrice && (
        <p className="mt-5 text-sm text-gray-600">
          {t.total}:{" "}
          <span className="text-2xl font-bold text-gray-900">{total} €</span>
          {total !== basePrice && (
            <span className="ml-2 text-gray-500">
              ({basePrice} €{tr.price ? ` + ${tr.price} €` : ""}{ro.price ? ` + ${ro.price} €` : ""})
            </span>
          )}
        </p>
      )}

      <div className="mt-3 border-l-2 border-primary bg-white px-3 py-2 text-sm text-gray-700">
        <p className="font-semibold">{t.hint}</p>
        <p>
          {t.travel}: <strong>{tr.cadiLabel}</strong> · {t.room}: <strong>{ro.cadiLabel}</strong> · {t.food}:{" "}
          <strong>{fo.cadiLabel}</strong>
        </p>
      </div>

      <a
        href="#buchung"
        className="mt-4 inline-flex items-center bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark"
      >
        {t.cta}
      </a>
    </section>
  )
}
