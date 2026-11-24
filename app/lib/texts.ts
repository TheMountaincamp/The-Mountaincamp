/**
 * Editierbare Texte. Die Standardtexte stehen im Code, Änderungen aus dem
 * Admin-Bereich (/admin/texte) liegen in der Datenbank und überschreiben sie.
 *
 * Verwendung in Komponenten:
 *   tx(language, "anreise.zurueck", "Zurück", "Back")      einzelner Text
 *   txo("anreise.berlin", "Berlin", "Berlin")              { de, en } Objekt
 *   copy(lang, "tickets.info", COPY)                       ganzes COPY-Objekt
 *
 * Der Schlüssel (zweites Argument) muss ein fester String sein, damit
 * scripts/build-text-registry.mjs ihn findet.
 */
import { translations } from "@/app/translations"

export type Lang = "de" | "en"
export type TextOverride = { de?: string; en?: string }
export type TextOverrides = Record<string, TextOverride>

// Für alle Besucher gleich, deshalb reicht ein Modul-Speicher. Wird vom
// LanguageProvider gesetzt, bevor die Seite rendert.
let store: TextOverrides = {}

export function setTextOverrides(o: TextOverrides | undefined) {
  store = o ?? {}
}

function pick(lang: Lang | string, key: string, de: string, en: string) {
  const l: Lang = lang === "en" ? "en" : "de"
  const o = store[key]
  const v = o?.[l]
  if (typeof v === "string" && v.trim() !== "") return v
  return l === "en" ? en : de
}

export function tx(lang: Lang | string, key: string, de: string, en: string) {
  return pick(lang, key, de, en)
}

export function txo(key: string, de: string, en: string): { de: string; en: string } {
  return { de: pick("de", key, de, en), en: pick("en", key, de, en) }
}

/** Übersetzung aus app/translations.ts, mit Änderungen aus dem Admin */
export function tKey(lang: Lang | string, key: string) {
  const l: Lang = lang === "en" ? "en" : "de"
  const de = (translations.de as Record<string, string>)[key] ?? key
  const en = (translations.en as Record<string, string>)[key] ?? de
  return pick(l, key, de, en)
}

function applyDeep(value: unknown, lang: Lang, path: string): unknown {
  if (typeof value === "string") {
    const v = store[path]?.[lang]
    return typeof v === "string" && v.trim() !== "" ? v : value
  }
  if (Array.isArray(value)) return value.map((v, i) => applyDeep(v, lang, `${path}.${i}`))
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = applyDeep(v, lang, `${path}.${k}`)
    return out
  }
  return value
}

/** COPY = { de: {...}, en: {...} } → Texte der Sprache, mit Änderungen aus dem Admin */
export function copy<T extends { de: object; en: object }>(lang: Lang | string, ns: string, dict: T): T["de"] {
  const l: Lang = lang === "en" ? "en" : "de"
  return applyDeep(dict[l], l, ns) as T["de"]
}
