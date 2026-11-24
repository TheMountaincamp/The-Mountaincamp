import { pool } from "@/lib/db"
import { ensureTables } from "@/lib/db/setup"
import { addToBrevo } from "@/lib/brevo"

export const LEAD_INTERESTS = {
  "ticket-notify": "Ticket-Benachrichtigung",
  waitlist: "Warteliste Community Camp",
  performance: "Performance Camp",
  adventure: "Adventure",
} as const

export type LeadInterest = keyof typeof LEAD_INTERESTS

export function isLeadInterest(v: unknown): v is LeadInterest {
  return typeof v === "string" && v in LEAD_INTERESTS
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function addLead(input: { email: string; interest: LeadInterest; locale?: string; source?: string }) {
  await ensureTables()
  const { rowCount } = await pool.query(
    `INSERT INTO leads (email, interest, locale, source) VALUES ($1, $2, $3, $4)
     ON CONFLICT (email, interest) DO NOTHING`,
    [input.email, input.interest, input.locale ?? null, input.source ?? null],
  )
  // Nur neue Einträge an Brevo geben; Fehler dort blockieren die Anmeldung nicht
  if (rowCount) await addToBrevo(input.email, input.interest, input.locale).catch((e) => console.error("[brevo]", e))
  return { created: !!rowCount }
}

export interface LeadRow {
  id: number
  email: string
  interest: string
  locale: string | null
  source: string | null
  created_at: string
}

export async function listLeads(interest?: string) {
  await ensureTables()
  const { rows } = await pool.query<LeadRow>(
    `SELECT id, email, interest, locale, source, created_at FROM leads
     ${interest ? "WHERE interest = $1" : ""} ORDER BY created_at DESC LIMIT 5000`,
    interest ? [interest] : [],
  )
  return rows
}

export async function countLeads() {
  await ensureTables()
  const { rows } = await pool.query<{ interest: string; n: string }>(
    "SELECT interest, count(*) AS n FROM leads GROUP BY interest",
  )
  return Object.fromEntries(rows.map((r) => [r.interest, Number(r.n)])) as Record<string, number>
}
