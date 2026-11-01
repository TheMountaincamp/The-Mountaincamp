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

import ticketData from "@/app/data/tickets.json"

/** Verkaufsstart: Sonntag, 16. August 2026, 12:00 Uhr (Mittag) MESZ */
export const EARLY_BIRD_START = "2026-08-16T12:00:00+02:00"

/** Verkaufsende: Sonntag, 16. August 2026, 24:00 Uhr (Mitternacht) MESZ */
export const EARLY_BIRD_END = "2026-08-17T00:00:00+02:00"

/** Externe Buchungsseite von camps.digital (Fallback, falls die eingebettete Maske nicht lädt) */
export const BOOKING_URL = "https://my.camps.digital/travel/selfhosted/extern/bm?&vendor=mountaincamp&anbieter_id=39&destination_id=2647&termin_id=38057"

/** Ziel aller Ticket-Buttons: eigene Seite mit eingebetteter Buchungsmaske */
export const TICKET_URL = "/tickets"

export const EARLY_BIRD_START_MS = new Date(EARLY_BIRD_START).getTime()
export const EARLY_BIRD_END_MS = new Date(EARLY_BIRD_END).getTime()

/**
 * Ticket-Kontingent & Preisstufen.
 *
 * Phase 1 (Early Bird) ist mit EARLY_BIRD_END abgelaufen. Phase 2 ist,
 * genau wie Phase 1, ein einmaliges Zeitfenster (nicht dauerhaft offen):
 * sie startet und endet an den unten definierten Zeitpunkten zum Preis
 * von 500€. Die verkaufte Stückzahl steht in app/data/tickets.json und wird
 * täglich automatisch aus der Paxliste von camps.digital aktualisiert.
 */
export const TOTAL_TICKETS = 300
export const TICKETS_SOLD: number = ticketData.sold

/** Phase 2 startet: Mittwoch, 26. August 2026, 00:00 Uhr MESZ */
export const PHASE_2_START = "2026-08-26T00:00:00+02:00"
/** Phase 2 endet: Mittwoch, 26. August 2026, 24:00 Uhr (= Donnerstag, 27. August, 00:00 Uhr) MESZ */
export const PHASE_2_END = "2026-08-27T00:00:00+02:00"
export const PHASE_2_PRICE = 500
export const PHASE_2_START_MS = new Date(PHASE_2_START).getTime()
export const PHASE_2_END_MS = new Date(PHASE_2_END).getTime()

export const PHASE_2_LABEL = {
  de: {
    date: "Mittwoch, 26. August",
    window: "00:00 – 24:00 Uhr",
    full: "Mittwoch, 26. August, 00:00 – 24:00 Uhr",
  },
  en: {
    date: "Wednesday, 26 August",
    window: "00:00 – 24:00 CEST",
    full: "Wednesday, 26 August, 00:00 – 24:00 CEST",
  },
} as const

/**
 * Nächster Ticket-Release nach Phase 2: Mittwoch, 16. September 2026,
 * 09:00 Uhr MESZ, zum Preis von 550€ (aktuell 530€ laut camps.digital). Anders als Early Bird und Phase 2
 * ist dies KEIN zeitlich begrenztes Verkaufsfenster mehr – der Verkauf
 * läuft ab dem Start durchgehend weiter (kein Enddatum).
 */
export const NEXT_LAUNCH_START = "2026-09-16T09:00:00+02:00"
export const NEXT_LAUNCH_START_MS = new Date(NEXT_LAUNCH_START).getTime()
export const NEXT_LAUNCH_PRICE = 530

export const NEXT_LAUNCH_LABEL = {
  de: {
    date: "Mittwoch, 16. September",
  },
  en: {
    date: "Wednesday, 16 September",
  },
} as const

/**
 * Preisphasen 2027, wie sie im Bereich "Ticket-Kontingent" angezeigt werden.
 *
 * Eine Phase ist "ended", sobald ihr Ende erreicht ist, "upcoming", solange
 * ihr Start in der Zukunft liegt oder noch nicht feststeht (start: null),
 * sonst "live". Die nächste Phase startet automatisch, wenn die vorige endet.
 * Willst du Preise oder Termine ändern, änderst du nur diese Liste.
 */
export interface SalePhaseConfig {
  id: string
  name: { de: string; en: string }
  /** Preis in Euro; null = Preis wird nicht angezeigt (z. B. abgelaufener Early Bird) */
  price: number | null
  /** ISO-Zeitpunkt mit Offset; null = Start steht noch nicht fest */
  start: string | null
  /** ISO-Zeitpunkt mit Offset; null = kein festes Ende */
  end: string | null
  /** Optionaler Text, wenn Start noch nicht feststeht */
  upcomingNote?: { de: string; en: string }
}

/** Ende Frühbucher (Phase 2): Montag, 30. November 2026, 24:00 Uhr MEZ = Start Phase 3 */
export const PHASE_FRUEHBUCHER_END = "2026-12-01T00:00:00+01:00"

export const SALE_PHASES: SalePhaseConfig[] = [
  {
    id: "phase-1",
    name: { de: "Phase 1 · Early Bird", en: "Phase 1 · Early bird" },
    price: null,
    start: EARLY_BIRD_START,
    end: NEXT_LAUNCH_START,
  },
  {
    id: "phase-2",
    name: { de: "Phase 2 · Frühbucher", en: "Phase 2 · Early booking" },
    price: 530,
    start: NEXT_LAUNCH_START,
    end: PHASE_FRUEHBUCHER_END,
  },
  {
    id: "phase-3",
    name: { de: "Phase 3", en: "Phase 3" },
    price: 580,
    start: PHASE_FRUEHBUCHER_END,
    end: null,
  },
  {
    id: "phase-4",
    name: { de: "Phase 4", en: "Phase 4" },
    price: 630,
    start: null,
    end: null,
    upcomingNote: { de: "Folgt nach Phase 3", en: "Follows Phase 3" },
  },
]

export type PhaseState = "upcoming" | "live" | "ended"

export function getPhaseState(p: SalePhaseConfig, now: number = Date.now()): PhaseState {
  if (p.end && now >= new Date(p.end).getTime()) return "ended"
  if (!p.start || now < new Date(p.start).getTime()) return "upcoming"
  return "live"
}

export type SalePhase = "upcoming" | "live" | "ended"

export function getSalePhase(now: number = Date.now()): SalePhase {
  if (now < EARLY_BIRD_START_MS) return "upcoming"
  if (now < EARLY_BIRD_END_MS) return "live"
  return "ended"
}

/**
 * Gesamtstatus über beide Verkaufsphasen hinweg. Wird überall verwendet,
 * wo neben dem Early-Bird-Status auch auf Phase 2 hingewiesen werden soll
 * (Banner, Hero-Badge, Ticket-Kontingent-Bereich).
 */
export type OverallPhase =
  | "earlybird-upcoming"
  | "earlybird-live"
  | "phase2-upcoming"
  | "phase2-live"
  | "next-launch-upcoming"
  | "next-launch-live"

export function getOverallPhase(now: number = Date.now()): OverallPhase {
  if (now < EARLY_BIRD_START_MS) return "earlybird-upcoming"
  if (now < EARLY_BIRD_END_MS) return "earlybird-live"
  if (now < PHASE_2_START_MS) return "phase2-upcoming"
  if (now < PHASE_2_END_MS) return "phase2-live"
  if (now < NEXT_LAUNCH_START_MS) return "next-launch-upcoming"
  // Ab hier läuft der Verkauf durchgehend weiter – kein Enddatum mehr.
  return "next-launch-live"
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
