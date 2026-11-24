"use client"

import { useMemo, useState } from "react"
import SiteHeader from "@/app/components/site-header"
import { SALE_PHASES, getPhaseState } from "@/app/lib/early-bird"
import {
  DIETS,
  EMAIL_REGEX,
  ROOMS,
  SHIRTS,
  SHIRT_CUTS,
  TRAVEL,
  emptyPerson,
  personPrice,
  type BookingRequest,
  type Person,
} from "./options"

/**
 * Testseite: eigene, vereinfachte Buchungsstrecke. Die Anfragen landen in der
 * Datenbank (Tabelle booking_requests) und werden von Hand in CADI erfasst.
 * Nicht verlinkt, nicht indexiert.
 */

const STEPS = ["Paket", "Über Euch", "Details", "Buchen"] as const

const field =
  "w-full border border-gray-300 bg-white px-3 py-2.5 text-[15px] outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
const label = "mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500"

function Choice({
  active,
  onClick,
  title,
  sub,
  price,
}: {
  active: boolean
  onClick: () => void
  title: string
  sub: string
  price: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between gap-3 border px-4 py-3 text-left transition ${
        active ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white hover:border-gray-400"
      }`}
    >
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className={`block text-xs ${active ? "text-white/70" : "text-gray-500"}`}>{sub}</span>
      </span>
      <span className="shrink-0 text-sm font-semibold tabular-nums">{price ? `+${price} €` : "inklusive"}</span>
    </button>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-1.5 text-sm transition ${
        active ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white hover:border-gray-500"
      }`}
    >
      {children}
    </button>
  )
}

export default function BookingTestPage() {
  const live = SALE_PHASES.find((p) => p.price !== null && getPhaseState(p) === "live")
  const next = live ? SALE_PHASES.slice(SALE_PHASES.indexOf(live) + 1).find((p) => p.price) : null
  const base = live?.price ?? 0

  const [step, setStep] = useState(0)
  const [persons, setPersons] = useState<Person[]>([emptyPerson()])
  const [contact, setContact] = useState({ phone: "", street: "", zip: "", city: "", country: "Deutschland" })
  const [extra, setExtra] = useState({ message: "", voucher: "" })
  const [payment, setPayment] = useState<BookingRequest["payment"]>("invoice")
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")

  const total = useMemo(() => persons.reduce((s, p) => s + personPrice(p, base), 0), [persons, base])

  const update = (i: number, patch: Partial<Person>) =>
    setPersons((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)))

  const stepValid = [
    true,
    persons.every((p) => p.firstName && p.lastName && p.gender && p.birthDate && EMAIL_REGEX.test(p.email)) &&
      contact.phone &&
      contact.street &&
      contact.zip &&
      contact.city,
    persons.every((p) => p.shirtSize && p.shirtCut),
    terms && privacy,
  ]

  function go(to: number) {
    if (to > step && !stepValid[step]) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    setStep(to)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function submit() {
    if (!stepValid.every(Boolean)) {
      setShowErrors(true)
      return
    }
    setStatus("sending")
    const body: BookingRequest = {
      persons,
      ...contact,
      ...extra,
      payment,
      acceptTerms: terms,
      acceptPrivacy: privacy,
    }
    try {
      const res = await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      setStatus(res.ok ? "done" : "error")
    } catch {
      setStatus("error")
    }
  }

  const err = (cond: unknown) => showErrors && !cond
  const errCls = (cond: unknown) => (err(cond) ? " border-red-500" : "")

  if (status === "done") {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <SiteHeader transparent={false} />
        <main className="mx-auto max-w-xl px-4 pb-20 pt-32 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Anfrage eingegangen</p>
          <h1 className="mt-2 text-3xl font-bold">Danke, {persons[0].firstName}.</h1>
          <p className="mt-4 text-gray-600">
            Wir erfassen Eure Buchung und schicken Dir innerhalb von 24 Stunden die Buchungsbestätigung an{" "}
            <strong>{persons[0].email}</strong>.{" "}
            {payment === "card"
              ? "Darin findest Du auch den Link zur Kartenzahlung."
              : "Darin findest Du auch die Bankverbindung für die Anzahlung."}
          </p>
          <p className="mt-6 text-sm text-gray-500">Gesamt: {total} € für {persons.length} {persons.length === 1 ? "Person" : "Personen"}</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader transparent={false} />

      <div className="bg-amber-100 px-4 pb-2 pt-20 text-center text-xs font-semibold text-amber-900 md:pt-24">
        Testseite. Nicht öffentlich verlinkt. Anfragen werden gespeichert, aber nicht automatisch gebucht.
      </div>

      <main className="mx-auto grid max-w-5xl gap-8 px-4 pb-32 pt-8 md:grid-cols-[1fr_300px] md:pb-16">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Mountaincamp 2027 buchen</h1>
          <p className="mt-1 text-sm text-gray-600">18. bis 22. August 2027, Hochkrimml. 4 Nächte, Vollpension, tägliche Trailruns.</p>

          {/* Fortschritt */}
          <ol className="mt-6 grid grid-cols-4 gap-1 text-[11px] font-semibold uppercase tracking-wide md:text-xs">
            {STEPS.map((s, i) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => i < step && go(i)}
                  className={`w-full border-t-4 pt-2 text-left ${i <= step ? "border-gray-900 text-gray-900" : "border-gray-200 text-gray-400"}`}
                >
                  {i + 1}. {s}
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-8 space-y-8">
            {/* Schritt 1: Paket */}
            {step === 0 &&
              persons.map((p, i) => (
                <section key={i} className="border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold">{persons.length > 1 ? `Person ${i + 1}` : "Dein Paket"}</h2>
                    {i > 0 && (
                      <button type="button" onClick={() => setPersons((ps) => ps.filter((_, j) => j !== i))} className="text-xs text-gray-500 underline">
                        Entfernen
                      </button>
                    )}
                  </div>
                  <p className={`${label} mt-4`}>Hinfahrt nach Hochkrimml</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {TRAVEL.map((t) => (
                      <Choice
                        key={t.id}
                        active={p.travel === t.id}
                        onClick={() => update(i, p.travelBack === p.travel ? { travel: t.id, travelBack: t.id } : { travel: t.id })}
                        title={t.label}
                        sub={t.sub}
                        price={t.price}
                      />
                    ))}
                  </div>
                  <p className={`${label} mt-5`}>Rückfahrt von Hochkrimml</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {TRAVEL.map((t) => (
                      <Choice key={t.id} active={p.travelBack === t.id} onClick={() => update(i, { travelBack: t.id })} title={t.label} sub={t.sub} price={t.price} />
                    ))}
                  </div>
                  <p className={`${label} mt-5`}>Zimmer</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {ROOMS.map((r) => (
                      <Choice key={r.id} active={p.room === r.id} onClick={() => update(i, { room: r.id })} title={r.label} sub={r.sub} price={r.price} />
                    ))}
                  </div>
                </section>
              ))}
            {step === 0 && persons.length < 6 && (
              <button
                type="button"
                onClick={() => setPersons((ps) => [...ps, { ...emptyPerson(), travel: ps[0].travel, travelBack: ps[0].travelBack, room: ps[0].room }])}
                className="w-full border border-dashed border-gray-400 py-3 text-sm font-semibold hover:border-gray-900"
              >
                + Freund:in mitbuchen
              </button>
            )}

            {/* Schritt 2: Über Euch */}
            {step === 1 && (
              <>
                {persons.map((p, i) => (
                  <section key={i} className="border border-gray-200 bg-white p-5">
                    <h2 className="font-bold">{i === 0 ? "Über Dich" : `Person ${i + 1}`}</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(
                        [
                          ["f", "Frau"],
                          ["m", "Herr"],
                          ["d", "Divers"],
                        ] as const
                      ).map(([v, l]) => (
                        <Chip key={v} active={p.gender === v} onClick={() => update(i, { gender: v })}>
                          {l}
                        </Chip>
                      ))}
                      {err(p.gender) && <span className="self-center text-xs text-red-600">Bitte auswählen</span>}
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label>
                        <span className={label}>Vorname</span>
                        <input className={field + errCls(p.firstName)} autoComplete={i === 0 ? "given-name" : "off"} value={p.firstName} onChange={(e) => update(i, { firstName: e.target.value })} />
                      </label>
                      <label>
                        <span className={label}>Nachname</span>
                        <input className={field + errCls(p.lastName)} autoComplete={i === 0 ? "family-name" : "off"} value={p.lastName} onChange={(e) => update(i, { lastName: e.target.value })} />
                      </label>
                      <label>
                        <span className={label}>E-Mail</span>
                        <input type="email" className={field + errCls(EMAIL_REGEX.test(p.email))} autoComplete={i === 0 ? "email" : "off"} value={p.email} onChange={(e) => update(i, { email: e.target.value })} />
                      </label>
                      <label>
                        <span className={label}>Geburtsdatum</span>
                        <input type="date" className={field + errCls(p.birthDate)} autoComplete={i === 0 ? "bday" : "off"} value={p.birthDate} onChange={(e) => update(i, { birthDate: e.target.value })} />
                      </label>
                    </div>
                    {i === 0 && (
                      <div className="mt-3 grid gap-3 sm:grid-cols-[2fr_1fr]">
                        <label className="sm:col-span-2">
                          <span className={label}>Handynummer</span>
                          <input type="tel" className={field + errCls(contact.phone)} autoComplete="tel" placeholder="+49 170 1234567" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                        </label>
                        <label className="sm:col-span-2">
                          <span className={label}>Straße und Hausnummer</span>
                          <input className={field + errCls(contact.street)} autoComplete="street-address" value={contact.street} onChange={(e) => setContact({ ...contact, street: e.target.value })} />
                        </label>
                        <label>
                          <span className={label}>Stadt</span>
                          <input className={field + errCls(contact.city)} autoComplete="address-level2" value={contact.city} onChange={(e) => setContact({ ...contact, city: e.target.value })} />
                        </label>
                        <label>
                          <span className={label}>PLZ</span>
                          <input className={field + errCls(contact.zip)} autoComplete="postal-code" inputMode="numeric" value={contact.zip} onChange={(e) => setContact({ ...contact, zip: e.target.value })} />
                        </label>
                        <label className="sm:col-span-2">
                          <span className={label}>Land</span>
                          <select className={field} autoComplete="country-name" value={contact.country} onChange={(e) => setContact({ ...contact, country: e.target.value })}>
                            {["Deutschland", "Österreich", "Schweiz", "Italien", "Niederlande", "Belgien", "Frankreich", "Andere"].map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}
                  </section>
                ))}
              </>
            )}

            {/* Schritt 3: Details */}
            {step === 2 && (
              <>
                {persons.map((p, i) => (
                  <section key={i} className="border border-gray-200 bg-white p-5">
                    <h2 className="font-bold">{p.firstName || (i === 0 ? "Du" : `Person ${i + 1}`)}</h2>
                    <p className={`${label} mt-4`}>Essen (optional)</p>
                    <div className="flex flex-wrap gap-2">
                      {DIETS.map((d) => (
                        <Chip
                          key={d}
                          active={p.diets.includes(d)}
                          onClick={() => update(i, { diets: p.diets.includes(d) ? p.diets.filter((x) => x !== d) : [...p.diets, d] })}
                        >
                          {d}
                        </Chip>
                      ))}
                    </div>
                    <p className={`${label} mt-5`}>Camp-Shirt</p>
                    <div className="flex flex-wrap gap-2">
                      {SHIRT_CUTS.map((c) => (
                        <Chip key={c} active={p.shirtCut === c} onClick={() => update(i, { shirtCut: c })}>
                          {c}
                        </Chip>
                      ))}
                      <span className="mx-1 self-center text-gray-300">|</span>
                      {SHIRTS.map((s) => (
                        <Chip key={s} active={p.shirtSize === s} onClick={() => update(i, { shirtSize: s })}>
                          {s}
                        </Chip>
                      ))}
                    </div>
                    {err(p.shirtCut && p.shirtSize) && <p className="mt-2 text-xs text-red-600">Bitte Schnitt und Größe wählen</p>}
                  </section>
                ))}
                <section className="border border-gray-200 bg-white p-5">
                  <label className="block">
                    <span className={label}>Nachricht an uns (optional)</span>
                    <textarea
                      rows={3}
                      className={field}
                      placeholder="Zimmer mit Freund:innen, abweichende Rückreise, Fragen ..."
                      value={extra.message}
                      onChange={(e) => setExtra({ ...extra, message: e.target.value })}
                    />
                  </label>
                  <label className="mt-3 block">
                    <span className={label}>Gutscheincode (optional)</span>
                    <input className={field} value={extra.voucher} onChange={(e) => setExtra({ ...extra, voucher: e.target.value.toUpperCase() })} />
                  </label>
                </section>
              </>
            )}

            {/* Schritt 4: Buchen */}
            {step === 3 && (
              <>
                <section className="border border-gray-200 bg-white p-5">
                  <h2 className="font-bold">Zusammenfassung</h2>
                  <ul className="mt-3 divide-y divide-gray-100 text-sm">
                    {persons.map((p, i) => (
                      <li key={i} className="flex justify-between gap-3 py-2">
                        <span>
                          <strong>
                            {p.firstName} {p.lastName}
                          </strong>
                          <span className="block text-gray-500">
                            Hin: {TRAVEL.find((t) => t.id === p.travel)?.label}, Zurück: {TRAVEL.find((t) => t.id === p.travelBack)?.label}, {ROOMS.find((r) => r.id === p.room)?.label}, Shirt {p.shirtCut} {p.shirtSize}
                            {p.diets.length ? `, ${p.diets.join(", ")}` : ""}
                          </span>
                        </span>
                        <span className="shrink-0 font-semibold tabular-nums">{personPrice(p, base)} €</span>
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => go(0)} className="mt-2 text-xs text-gray-500 underline">
                    Ändern
                  </button>
                </section>

                <section className="border border-gray-200 bg-white p-5">
                  <h2 className="font-bold">Zahlung</h2>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <Choice active={payment === "invoice"} onClick={() => setPayment("invoice")} title="Überweisung" sub="Bankdaten kommen mit der Bestätigung" price={0} />
                    <Choice active={payment === "card"} onClick={() => setPayment("card")} title="Kreditkarte" sub="Zahlungslink kommt mit der Bestätigung" price={0} />
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Anzahlung 20 %, fällig 21 Tage nach Buchung. Der Rest bis 45 Tage vor Camp-Start. Bei Buchung bis 30 Tage vor Camp-Start innerhalb von 7 Tagen kostenlos stornierbar.
                  </p>
                </section>

                <section className="space-y-3 border border-gray-200 bg-white p-5 text-sm">
                  <label className="flex gap-3">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-gray-900" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                    <span className={err(terms) ? "text-red-600" : ""}>
                      Ich habe die{" "}
                      <a href="/agb" target="_blank" className="underline">
                        AGB
                      </a>{" "}
                      gelesen und bin einverstanden.
                    </span>
                  </label>
                  <label className="flex gap-3">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-gray-900" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
                    <span className={err(privacy) ? "text-red-600" : ""}>
                      Ich habe die{" "}
                      <a href="/datenschutz" target="_blank" className="underline">
                        Datenschutzhinweise
                      </a>{" "}
                      gelesen.
                    </span>
                  </label>
                </section>
                {status === "error" && (
                  <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Das hat nicht geklappt. Bitte prüf Deine Angaben oder versuch es gleich nochmal.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Navigation Desktop */}
          <div className="mt-8 hidden items-center justify-between md:flex">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} className="text-sm text-gray-600 underline">
                Zurück
              </button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <button type="button" onClick={() => go(step + 1)} className="bg-gray-900 px-6 py-3 text-sm font-semibold text-white">
                Weiter
              </button>
            ) : (
              <button type="button" disabled={status === "sending"} onClick={submit} className="bg-gray-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">
                {status === "sending" ? "Sende ..." : `Verbindlich buchen, ${total} €`}
              </button>
            )}
          </div>
        </div>

        {/* Preis Desktop */}
        <aside className="hidden md:block">
          <div className="sticky top-28 border border-gray-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{live ? live.name.de : "Preis"}</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">{total} €</p>
            <p className="text-xs text-gray-500">
              {persons.length} {persons.length === 1 ? "Person" : "Personen"}, alles inklusive
            </p>
            {next?.price && live?.price && (
              <p className="mt-3 text-xs text-gray-600">
                Danach {next.price} € pro Person. Du sparst {next.price - live.price} € pro Person.
              </p>
            )}
            <ul className="mt-4 space-y-1 border-t border-gray-100 pt-4 text-xs text-gray-600">
              <li>4 Nächte im Berghaus auf 1.700 m</li>
              <li>Vollpension, auch vegetarisch und vegan</li>
              <li>Tägliche Trailruns für jedes Level</li>
              <li>Summit Rave, Workshops, Community</li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Leiste Mobil */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-gray-200 bg-white px-4 py-3 md:hidden">
        <div>
          <p className="text-lg font-bold leading-none tabular-nums">{total} €</p>
          <p className="text-[11px] text-gray-500">
            {persons.length} {persons.length === 1 ? "Person" : "Personen"}
            {step > 0 && (
              <>
                {" · "}
                <button type="button" onClick={() => go(step - 1)} className="underline">
                  Zurück
                </button>
              </>
            )}
          </p>
        </div>
        {step < 3 ? (
          <button type="button" onClick={() => go(step + 1)} className="bg-gray-900 px-6 py-3 text-sm font-semibold text-white">
            Weiter
          </button>
        ) : (
          <button type="button" disabled={status === "sending"} onClick={submit} className="bg-gray-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
            {status === "sending" ? "Sende ..." : "Verbindlich buchen"}
          </button>
        )}
      </div>
    </div>
  )
}
