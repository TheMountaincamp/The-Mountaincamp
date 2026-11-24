import { unstable_cache, revalidateTag } from "next/cache"
import { pool } from "@/lib/db"
import { ensureTables } from "@/lib/db/setup"
import type { TextOverrides } from "@/app/lib/texts"

export const TEXTS_TAG = "site-texts"
const KEY = "texts"

async function read(): Promise<TextOverrides> {
  if (!process.env.DATABASE_URL) return {}
  try {
    await ensureTables()
    const { rows } = await pool.query<{ value: TextOverrides }>("SELECT value FROM site_settings WHERE key = $1", [KEY])
    return rows[0]?.value ?? {}
  } catch (e) {
    console.error("[texts] Datenbank nicht erreichbar, nutze Standardtexte", e)
    return {}
  }
}

export const getTextOverrides = unstable_cache(read, ["site-texts-v1"], { tags: [TEXTS_TAG], revalidate: 3600 })
export const getTextOverridesFresh = read

/** Ersetzt die Änderungen für die übergebenen Schlüssel. Leere Werte = Standardtext. */
export async function saveTextOverrides(changes: Record<string, { de: string | null; en: string | null }>) {
  await ensureTables()
  const current = await read()
  for (const [key, v] of Object.entries(changes)) {
    const next: { de?: string; en?: string } = {}
    if (v.de) next.de = v.de
    if (v.en) next.en = v.en
    if (next.de || next.en) current[key] = next
    else delete current[key]
  }
  await pool.query(
    `INSERT INTO site_settings (key, value, updated_at) VALUES ($1, $2::jsonb, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [KEY, JSON.stringify(current)],
  )
  revalidateTag(TEXTS_TAG)
}
