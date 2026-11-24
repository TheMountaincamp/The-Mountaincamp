import { pool } from "./index"

/**
 * Legt die Tabellen für den Admin-Bereich an, falls sie fehlen.
 * Läuft einmal pro Server-Instanz; so braucht es keinen separaten Migrationsschritt.
 */
let ready: Promise<void> | null = null

export function ensureTables() {
  if (!ready) {
    ready = pool
      .query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          key text PRIMARY KEY,
          value jsonb NOT NULL,
          updated_at timestamptz NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS leads (
          id serial PRIMARY KEY,
          email text NOT NULL,
          interest text NOT NULL,
          locale text,
          source text,
          created_at timestamptz NOT NULL DEFAULT now()
        );
        CREATE UNIQUE INDEX IF NOT EXISTS leads_email_interest ON leads (email, interest);
        DO $$ BEGIN
          IF to_regclass('public.early_bird_signups') IS NOT NULL THEN
            INSERT INTO leads (email, interest, source, created_at)
            SELECT email, 'ticket-notify', 'early_bird_signups', created_at FROM early_bird_signups
            ON CONFLICT DO NOTHING;
          END IF;
        END $$;
      `)
      .then(() => undefined)
      .catch((e) => {
        ready = null
        throw e
      })
  }
  return ready
}
