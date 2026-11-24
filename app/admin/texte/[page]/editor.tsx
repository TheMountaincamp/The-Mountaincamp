"use client"

import { useEffect, useMemo, useRef, useState } from "react"

export type EditorEntry = {
  key: string
  section: string
  shared?: boolean
  alt?: boolean
  de: string
  en: string
  defaultDe: string
  defaultEn: string
}

type Lang = "de" | "en"
type Theme = "light" | "gray" | "dark" | "frost" | "stone" | "black"

// Hintergrund der Blöcke wie auf der Website
const THEMES: Record<Theme, { wrap: string; muted: string; field: string }> = {
  light: { wrap: "bg-white text-gray-900", muted: "text-gray-400", field: "hover:bg-gray-100/80 focus:bg-white" },
  gray: { wrap: "bg-gray-50 text-gray-900", muted: "text-gray-400", field: "hover:bg-white focus:bg-white" },
  dark: { wrap: "bg-gradient-to-b from-gray-800 to-gray-950 text-white", muted: "text-white/40", field: "hover:bg-white/10 focus:bg-white/10" },
  frost: { wrap: "bg-[#e8ebee] text-gray-900", muted: "text-gray-500", field: "hover:bg-white/70 focus:bg-white" },
  stone: { wrap: "bg-neutral-600 text-white", muted: "text-white/50", field: "hover:bg-white/10 focus:bg-white/10" },
  black: { wrap: "bg-black text-white", muted: "text-white/40", field: "hover:bg-white/10 focus:bg-white/10" },
}

function themeFor(section: string): Theme {
  const s = section.toLowerCase()
  if (/startbild|kopfbereich/.test(s)) return "dark"
  if (/navigation|preis-banner/.test(s)) return "black"
  if (/partner/.test(s)) return "black"
  if (/anmeldung|auf einen blick/.test(s)) return "frost"
  if (/abschluss/.test(s)) return "stone"
  if (/erlebnis|galerie|faq|ticket-hinweis|preise|kurz gefragt|wichtige/.test(s)) return "gray"
  return "light"
}

type Role = "title" | "heading" | "text" | "body" | "alt" | "label" | "button"

const BUTTON_RE = /(sichern|ansehen|entdecken|anmelden|buchen|benachrichtigt werden|mehr erfahren|anzeigen|öffnen|schließen|aktivieren|zurück|weiter)\b/i

function roleOf(e: EditorEntry, index: number): Role {
  if (e.alt) return "alt"
  const t = e.defaultDe.trim()
  if (BUTTON_RE.test(t) && t.length <= 40 && !/[.]$/.test(t)) return "button"
  if (t.length <= 14) return "label"
  if (index === 0 && t.length <= 70 && !/[.]$/.test(t)) return "title"
  if (t.length <= 60 && !/[.!:,]$/.test(t)) return "heading"
  if (t.length > 140) return "body"
  return "text"
}

const ROLE_CLASS: Record<Role, string> = {
  title: "text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight",
  heading: "text-lg md:text-xl font-bold leading-snug",
  text: "text-base leading-relaxed",
  body: "text-[15px] leading-relaxed opacity-90",
  alt: "text-xs italic opacity-60",
  label: "text-xs font-semibold uppercase tracking-wide",
  button: "text-sm font-semibold",
}

function AutoText({
  value,
  onChange,
  className,
  name,
  hidden,
}: {
  value: string
  onChange: (v: string) => void
  className: string
  name: string
  hidden: boolean
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || hidden) return
    const fit = () => {
      if (!el.offsetWidth) return
      el.style.height = "auto"
      el.style.height = `${el.scrollHeight}px`
    }
    fit()
    // Auch anpassen, wenn das Feld erst später sichtbar wird oder die Breite sich ändert
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [value, hidden])
  return (
    <textarea
      ref={ref}
      name={name}
      value={value}
      rows={1}
      spellCheck
      onChange={(e) => onChange(e.target.value)}
      className={`${className} ${hidden ? "hidden" : "block"} w-full resize-none overflow-hidden bg-transparent outline-none [text-align:inherit]`}
    />
  )
}

function InlineText({
  value,
  onChange,
  className,
  name,
  hidden,
}: {
  value: string
  onChange: (v: string) => void
  className: string
  name: string
  hidden: boolean
}) {
  return (
    <input
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: `${Math.max(3, Math.ceil(value.length * 1.2) + 1)}ch` }}
      className={`${className} ${hidden ? "hidden" : "inline-block"} bg-transparent text-center outline-none`}
    />
  )
}

function Field({
  entry,
  role,
  lang,
  theme,
  value,
  onChange,
}: {
  entry: EditorEntry
  role: Role
  lang: Lang
  theme: Theme
  value: { de: string; en: string }
  onChange: (l: Lang, v: string) => void
}) {
  const t = THEMES[theme]
  const def = lang === "de" ? entry.defaultDe : entry.defaultEn
  const changed = value[lang].trim() !== "" && value[lang].trim() !== def.trim()
  const inline = role === "label" || role === "button"
  const light = theme === "light" || theme === "gray" || theme === "frost"
  const pill =
    role === "button"
      ? light
        ? "rounded-full bg-gray-900 px-4 py-1.5 text-white"
        : "rounded-full bg-white px-4 py-1.5 text-gray-900"
      : role === "label"
        ? `rounded px-2 py-1 ${light ? "bg-gray-100" : "bg-white/10"}`
        : ""
  if (inline) {
    return (
      <span
        className={`group relative inline-flex ${pill} ${changed ? "ring-2 ring-amber-400" : "focus-within:ring-2 focus-within:ring-sky-400"}`}
      >
        {(["de", "en"] as const).map((l) => (
          <InlineText key={l} name={`${l}:${entry.key}`} hidden={l !== lang} value={value[l]} onChange={(v) => onChange(l, v)} className={ROLE_CLASS[role]} />
        ))}
        {changed && (
          <button
            type="button"
            title="Original wiederherstellen"
            onClick={() => onChange(lang, def)}
            className="absolute -right-2 -top-2 hidden h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-white group-hover:flex"
          >
            ↺
          </button>
        )}
      </span>
    )
  }
  return (
    <div
      className={`group relative -mx-2 rounded px-2 py-0.5 transition ${t.field} ${
        changed ? "ring-2 ring-amber-400/70" : "focus-within:ring-2 focus-within:ring-sky-400/70"
      }`}
    >
      {/\{\w+\}/.test(def) && (
        <span className={`block text-[10px] ${t.muted}`}>Begriffe in {"{ }"} werden automatisch ersetzt (z. B. durch Preise), bitte stehen lassen.</span>
      )}
      {role === "alt" && <span className={`block text-[10px] font-semibold uppercase tracking-wide ${t.muted}`}>Bildbeschreibung, für Google und Screenreader</span>}
      {(["de", "en"] as const).map((l) => (
        <AutoText
          key={l}
          name={`${l}:${entry.key}`}
          hidden={l !== lang}
          value={value[l]}
          onChange={(v) => onChange(l, v)}
          className={ROLE_CLASS[role]}
        />
      ))}
      <div className="pointer-events-none absolute -top-2.5 right-1 hidden gap-1 group-focus-within:flex group-hover:flex">
        {entry.shared && <span className="pointer-events-auto rounded bg-sky-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">auch auf anderen Seiten</span>}
        {changed && (
          <button
            type="button"
            onClick={() => onChange(lang, def)}
            className="pointer-events-auto rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold text-white"
          >
            Original wiederherstellen
          </button>
        )}
      </div>
    </div>
  )
}

export default function Editor({
  pageId,
  pages,
  entries,
  viewHref,
  saved,
  error,
}: {
  pageId: string
  pages: { id: string; label: string }[]
  entries: EditorEntry[]
  viewHref: string
  saved: boolean
  error: boolean
}) {
  const [lang, setLang] = useState<Lang>("de")
  const [values, setValues] = useState(() => Object.fromEntries(entries.map((e) => [e.key, { de: e.de, en: e.en }])))
  const initial = useMemo(() => JSON.stringify(Object.fromEntries(entries.map((e) => [e.key, { de: e.de, en: e.en }]))), [entries])
  const dirty = useMemo(() => {
    const init = JSON.parse(initial) as typeof values
    return entries.filter((e) => values[e.key].de !== init[e.key].de || values[e.key].en !== init[e.key].en).length
  }, [values, initial, entries])
  const changedTotal = entries.filter((e) => {
    const v = values[e.key]
    return (v.de.trim() && v.de.trim() !== e.defaultDe.trim()) || (v.en.trim() && v.en.trim() !== e.defaultEn.trim())
  }).length

  useEffect(() => {
    const warn = (ev: BeforeUnloadEvent) => {
      if (dirty) ev.preventDefault()
    }
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  const sections = useMemo(() => [...new Set(entries.map((e) => e.section))], [entries])
  const [submitting, setSubmitting] = useState(false)

  return (
    <form method="post" action={`/admin/texte/save?page=${pageId}`} onSubmit={() => setSubmitting(true)} className="min-h-screen bg-gray-200">
      {/* Leiste oben */}
      <div className="sticky top-0 z-30 border-b border-gray-300 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <a href="/admin" className="text-sm font-bold">
            Mountaincamp Admin
          </a>
          <nav className="flex flex-wrap gap-1">
            {pages.map((p) => (
              <a
                key={p.id}
                href={`/admin/texte/${p.id}`}
                onClick={(ev) => {
                  if (dirty && !confirm("Ungespeicherte Änderungen verwerfen?")) ev.preventDefault()
                }}
                className={`rounded-full px-3 py-1 text-sm ${p.id === pageId ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {p.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex overflow-hidden rounded-full border border-gray-300 text-xs font-semibold">
              {(["de", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 ${lang === l ? "bg-gray-900 text-white" : "text-gray-600"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a href={viewHref} target="_blank" className="text-sm text-gray-500 underline">
              Seite ansehen
            </a>
            <button
              disabled={!dirty || submitting}
              className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white disabled:bg-gray-300"
            >
              {submitting ? "Speichere ..." : dirty ? `Speichern (${dirty})` : "Gespeichert"}
            </button>
          </div>
        </div>
        {(saved || error) && !dirty && (
          <div className={`px-4 py-1.5 text-center text-xs ${error ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
            {error ? "Nicht gespeichert: Die Datenbank war nicht erreichbar. Bitte nochmal versuchen." : "Gespeichert. Die Website ist aktualisiert."}
          </div>
        )}
      </div>

      <p className="mx-auto max-w-6xl px-4 pt-4 text-xs text-gray-500">
        Klick in einen Text und schreib los. Oben rechts wechselst Du zwischen Deutsch und Englisch. Gelb umrandet = von Dir geändert
        {changedTotal ? ` (${changedTotal} auf dieser Seite)` : ""}. Bilder werden hier nicht angezeigt.
      </p>

      {/* Seite */}
      <div className="mx-auto my-4 max-w-6xl overflow-hidden rounded-lg shadow-xl ring-1 ring-black/5">
        {sections.map((s) => {
          const theme = themeFor(s)
          const t = THEMES[theme]
          const list = entries.filter((e) => e.section === s)
          const visible = list.filter((e) => !e.alt)
          const alts = list.filter((e) => e.alt)
          const roles = visible.map((e, i) => roleOf(e, i))
          // Paare aus Überschrift und Text als Karten, kurze Elemente als Reihe
          type Item = { kind: "one"; i: number } | { kind: "card"; head: number; body: number } | { kind: "row"; list: number[] }
          const isBody = (r: Role) => r === "text" || r === "body"
          const headPairs = roles.filter((r, i) => i > 0 && (r === "heading" || r === "label") && isBody(roles[i + 1])).length
          // Viele kurze Texte ohne Fließtext dazwischen (z. B. Bildunterschriften): als Kacheln
          const shortIdx = roles.map((r, i) => (r === "heading" || r === "label" ? i : -1)).filter((i) => i >= 0)
          const tiles =
            shortIdx.length >= 6 &&
            headPairs <= 1 &&
            !roles.includes("button") &&
            roles.filter((r) => r === "heading").length >= 4
          const items: Item[] = []
          for (let i = 0; i < roles.length; i++) {
            const r = roles[i]
            const canHead = r === "heading" || r === "label" || (r === "title" && headPairs >= 2)
            if (canHead && i + 1 < roles.length && isBody(roles[i + 1])) {
              items.push({ kind: "card", head: i, body: i + 1 })
              i++
            } else if (r === "label" || r === "button") {
              const last = items[items.length - 1]
              if (last?.kind === "row") last.list.push(i)
              else items.push({ kind: "row", list: [i] })
            } else items.push({ kind: "one", i })
          }
          const cards = items.filter((x) => x.kind === "card")
          const asCards = cards.length >= 3
          const firstCard = items.findIndex((x) => x.kind === "card")
          const lastCard = items.length - 1 - [...items].reverse().findIndex((x) => x.kind === "card")
          const isHero = theme === "dark"

          const render = (i: number, roleOverride?: Role) => (
            <Field
              key={visible[i].key}
              entry={visible[i]}
              role={roleOverride ?? roles[i]}
              lang={lang}
              theme={theme}
              value={values[visible[i].key]}
              onChange={(l, v) => setValues((prev) => ({ ...prev, [visible[i].key]: { ...prev[visible[i].key], [l]: v } }))}
            />
          )

          return (
            <section key={s} className={`relative ${t.wrap} ${isHero ? "py-20 md:py-28" : "py-12 md:py-16"}`}>
              <span className={`absolute left-4 top-3 text-[10px] font-bold uppercase tracking-widest ${t.muted}`}>{s}</span>
              <div className={`mx-auto max-w-4xl px-6 ${isHero ? "text-center" : ""}`}>
                {(() => {
                  const cardBox = `rounded-lg p-4 text-left ${theme === "light" || theme === "gray" || theme === "frost" ? "bg-white shadow-sm ring-1 ring-gray-200" : "bg-white/5 ring-1 ring-white/10"}`
                  const one = (x: Item) =>
                    x.kind === "one" ? (
                      render(x.i)
                    ) : x.kind === "row" ? (
                      <div key={visible[x.list[0]].key} className={`flex flex-wrap gap-2 py-1 ${isHero ? "justify-center" : ""}`}>
                        {x.list.map((i) => render(i))}
                      </div>
                    ) : (
                      <div key={visible[x.head].key} className={cardBox}>
                        {render(x.head, "heading")}
                        <div className="mt-1">{render(x.body, "body")}</div>
                      </div>
                    )
                  if (tiles) {
                    const rest = visible.map((_, i) => i).filter((i) => !shortIdx.includes(i))
                    return (
                      <div className="space-y-4">
                        <div className="space-y-3">{rest.filter((i) => i < shortIdx[0]).map((i) => render(i))}</div>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                          {shortIdx.map((i) => (
                            <div key={visible[i].key} className={`${cardBox} flex min-h-[5.5rem] items-end`}>
                              <div className="w-full">{render(i, "text")}</div>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">{rest.filter((i) => i > shortIdx[0]).map((i) => render(i))}</div>
                      </div>
                    )
                  }
                  if (!asCards) return <div className="space-y-3">{items.map((x) => (x.kind === "card" ? [render(x.head), render(x.body)] : one(x)))}</div>
                  return (
                    <div className="space-y-6">
                      <div className="space-y-3">{items.slice(0, firstCard).map(one)}</div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {items.slice(firstCard, lastCard + 1).map((x) =>
                          x.kind === "card" ? one(x) : <div key={"w" + (x.kind === "one" ? x.i : x.list[0])} className="md:col-span-2">{one(x)}</div>,
                        )}
                      </div>
                      <div className="space-y-3">{items.slice(lastCard + 1).map(one)}</div>
                    </div>
                  )
                })()}
                {alts.length > 0 && (
                  <details className={`mt-8 text-left text-sm ${t.muted}`}>
                    <summary className="cursor-pointer select-none">Bildbeschreibungen in diesem Bereich ({alts.length})</summary>
                    <div className="mt-3 space-y-2">
                      {alts.map((e) => (
                        <Field
                          key={e.key}
                          entry={e}
                          role="alt"
                          lang={lang}
                          theme={theme}
                          value={values[e.key]}
                          onChange={(l, v) => setValues((prev) => ({ ...prev, [e.key]: { ...prev[e.key], [l]: v } }))}
                        />
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </form>
  )
}
