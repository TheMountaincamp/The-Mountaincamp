import { unstable_cache, revalidateTag } from "next/cache"
import { pool } from "@/lib/db"
import { ensureTables } from "@/lib/db/setup"
import { DEFAULT_SITE_CONFIG, mergeSiteConfig, type SiteConfig } from "@/app/lib/site-config"

export const SITE_CONFIG_TAG = "site-config"

async function readFromDb(): Promise<SiteConfig> {
  if (!process.env.DATABASE_URL) return DEFAULT_SITE_CONFIG
  try {
    await ensureTables()
    const { rows } = await pool.query<{ key: string; value: unknown }>("SELECT key, value FROM site_settings")
    const stored: Record<string, unknown> = {}
    for (const r of rows) stored[r.key] = r.value
    return mergeSiteConfig(stored as Partial<SiteConfig>)
  } catch (e) {
    console.error("[site-config] Datenbank nicht erreichbar, nutze Standardwerte", e)
    return DEFAULT_SITE_CONFIG
  }
}

/** Aktuelle Werte, gecacht bis zur nächsten Änderung im Admin-Bereich (spätestens 1 h) */
export const getSiteConfig = unstable_cache(readFromDb, ["site-config-v1"], {
  tags: [SITE_CONFIG_TAG],
  revalidate: 3600,
})

/** Ungecacht, für den Admin-Bereich */
export const getSiteConfigFresh = readFromDb

export async function saveSetting<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) {
  await ensureTables()
  await pool.query(
    `INSERT INTO site_settings (key, value, updated_at) VALUES ($1, $2::jsonb, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [key, JSON.stringify(value)],
  )
  revalidateTag(SITE_CONFIG_TAG)
}
