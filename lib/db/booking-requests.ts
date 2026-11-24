import { pool } from "@/lib/db"

let ready: Promise<unknown> | null = null

/** Tabelle für Buchungsanfragen aus der Test-Buchungsstrecke (/buchung-test) */
function ensureTable() {
  if (!ready) {
    ready = pool
      .query(`
        CREATE TABLE IF NOT EXISTS booking_requests (
          id serial PRIMARY KEY,
          created_at timestamptz NOT NULL DEFAULT now(),
          email text NOT NULL,
          persons int NOT NULL,
          total int NOT NULL,
          payment text NOT NULL,
          status text NOT NULL DEFAULT 'neu',
          data jsonb NOT NULL
        )`)
      .catch((e) => {
        ready = null
        throw e
      })
  }
  return ready
}

export async function saveBookingRequest(r: { email: string; persons: number; total: number; payment: string; data: unknown }) {
  await ensureTable()
  const { rows } = await pool.query<{ id: number }>(
    "INSERT INTO booking_requests (email, persons, total, payment, data) VALUES ($1, $2, $3, $4, $5::jsonb) RETURNING id",
    [r.email, r.persons, r.total, r.payment, JSON.stringify(r.data)],
  )
  return rows[0].id
}
