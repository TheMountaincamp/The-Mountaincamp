/**
 * Zentrale Konfiguration für den Early-Bird-Verkauf.
 *
 * ALLE Stellen auf der Seite (Banner, Hero-Badge, Metadata, Structured Data)
 * lesen aus dieser Datei. Willst du das Verkaufsfenster ändern, änderst du
 * nur diese Datei.
 *
 * WICHTIG: Die Zeitstempel enthalten bewusst den expliziten UTC-Offset
 * (+02:00 = CEST, Sommerzeit in Deutschland/Österreich). Ohne Offset würde
 * der Server die Zeit als UTC interpretieren und der Browser als Ortszeit –
 * das Ergebnis wären zwei verschiedene Countdown-Werte und ein
 * Hydration-Mismatch in React.
 */

/** Verkaufsstart: Sonntag, 16. August 2026, 12:00 Uhr (Mittag) MESZ */
export const EARLY_BIRD_START = "2026-08-16T12:00:00+02:00"

/** Verkaufsende: Sonntag, 16. August 2026, 24:00 Uhr (Mitternacht) MESZ */
export const EARLY_BIRD_END = "2026-08-17T00:00:00+02:00"

/**
 * Link zum Ticketshop.
 * TODO: Durch die echte Shop-URL ersetzen. Solange hier "#register" steht,
 * springt der Button nur zum Newsletter-Formular.
 */
export const TICKET_URL = "https://my.camps.digital/travel/selfhosted/extern/bm?&vendor=mountaincamp&anbieter_id=39&destination_id=2647&termin_id=38057"

export const EARLY_BIRD_START_MS = new Date(EARLY_BIRD_START).getTime()
export const EARLY_BIRD_END_MS = new Date(EARLY_BIRD_END).getTime()

/**
 * Ticket-Kontingent & Preisstufen.
 *
 * Phase 1 (Early Bird) ist mit EARLY_BIRD_END abgelaufen. Phase 2 startet
 * automatisch zum unten definierten Zeitpunkt zum Preis von 480€. Die
 * verkaufte Stückzahl wird manuell gepflegt (kein Live-Anschluss an den
 * Ticketshop).
 */
export const TOTAL_TICKETS = 300
export const TICKETS_SOLD = 60

/** Phase 2 startet: Donnerstag, 27. August 2026, 00:00 Uhr MESZ */
export const PHASE_2_START = "2026-08-27T00:00:00+02:00"
export const PHASE_2_PRICE = 500
export const PHASE_2_START_MS = new Date(PHASE_2_START).getTime()

export const PHASE_2_LABEL = {
  de: { date: "Donnerstag, 27. August", window: "ab 00:00 Uhr", full: "Donnerstag, 27. August, ab 00:00 Uhr" },
  en: { date: "Thursday, 27 August", window: "from 00:00 CEST", full: "Thursday, 27 August, from 00:00 CEST" },
} as const

export type SalePhase = "upcoming" | "live" | "ended"

export function getSalePhase(now: number = Date.now()): SalePhase {
  if (now < EARLY_BIRD_START_MS) return "upcoming"
  if (now < EARLY_BIRD_END_MS) return "live"
  return "ended"
}

/** Verbleibende Zeit bis zum nächsten Phasenwechsel, in Einzelteilen. */
export function getTimeParts(target: number, now: number = Date.now()) {
  const diff = Math.max(0, target - now)
  return {
    total: diff,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

/** Formatierte Datumsangaben für Fließtext und Schema.org. */
export const EARLY_BIRD_LABEL = {
  de: {
    date: "Sonntag, 16. August",
    window: "12:00 – 24:00 Uhr",
    full: "Sonntag, 16. August, 12:00 – 24:00 Uhr",
  },
  en: {
    date: "Sunday, 16 August",
    window: "12:00 – 24:00 CEST",
    full: "Sunday, 16 August, 12:00 – 24:00 CEST",
  },
} as const
