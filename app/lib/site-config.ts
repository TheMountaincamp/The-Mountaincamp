/**
 * Inhalte, die im Admin-Bereich (/admin) gepflegt werden.
 *
 * Die Werte liegen in der Datenbank (Tabelle site_settings). Die DEFAULTS
 * hier sind der Stand im Code und greifen, wenn die Datenbank nicht
 * erreichbar ist oder ein Wert noch nie gespeichert wurde.
 * Diese Datei ist bewusst ohne Server-Abhängigkeiten, damit Client und
 * Server sie gleichermaßen nutzen können.
 */
import ticketData from "@/app/data/tickets.json"
import { SALE_PHASES, type SalePhaseConfig } from "@/app/lib/early-bird"

export interface ShuttleConfig {
  id: "berlin" | "muenchen" | "jenbach"
  city: { de: string; en: string }
  price: number
}

export interface SiteConfig {
  tickets: { sold: number; total: number; updatedAt: string | null }
  phases: SalePhaseConfig[]
  shuttles: ShuttleConfig[]
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  tickets: { sold: ticketData.sold, total: 300, updatedAt: ticketData.updatedAt ?? null },
  phases: SALE_PHASES,
  shuttles: [
    { id: "berlin", city: { de: "Berlin", en: "Berlin" }, price: 140 },
    { id: "muenchen", city: { de: "München", en: "Munich" }, price: 80 },
    { id: "jenbach", city: { de: "Jenbach", en: "Jenbach" }, price: 40 },
  ],
}

export function shuttlePrice(config: SiteConfig, id: ShuttleConfig["id"]) {
  return config.shuttles.find((s) => s.id === id)?.price ?? DEFAULT_SITE_CONFIG.shuttles.find((s) => s.id === id)!.price
}

/** Ende der Frühbucher-Phase (Phase 2), für den Countdown im Banner */
export function fruehbucherEnd(config: SiteConfig) {
  return config.phases.find((p) => p.id === "phase-2")?.end ?? null
}

/** Gespeicherte Teilwerte mit den Defaults zusammenführen */
export function mergeSiteConfig(stored: Partial<SiteConfig>): SiteConfig {
  const d = DEFAULT_SITE_CONFIG
  return {
    tickets: { ...d.tickets, ...(stored.tickets ?? {}) },
    phases: d.phases.map((p) => {
      const s = stored.phases?.find((x) => x.id === p.id)
      return s ? { ...p, price: s.price, start: s.start, end: s.end } : p
    }),
    shuttles: d.shuttles.map((sh) => {
      const s = stored.shuttles?.find((x) => x.id === sh.id)
      return s ? { ...sh, price: s.price } : sh
    }),
  }
}
