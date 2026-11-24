import { NextResponse } from "next/server"
import sitemap from "@/app/sitemap"
import { SITE_URL } from "@/app/lib/seo"
import { INDEXNOW_KEY } from "@/app/lib/indexnow"

export const dynamic = "force-dynamic"

/**
 * Wird wöchentlich per Vercel Cron aufgerufen (vercel.json) und meldet alle
 * Seiten, deren Änderungsdatum in der Sitemap in den letzten 8 Tagen liegt.
 * Manuell alle Seiten melden: GET /api/indexnow?all=1
 * (mit Authorization: Bearer $CRON_SECRET, falls CRON_SECRET gesetzt ist).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const all = new URL(request.url).searchParams.get("all") === "1"
  const since = Date.now() - 8 * 86_400_000
  const urls = sitemap()
    .filter((e) => all || (e.lastModified && new Date(e.lastModified).getTime() >= since))
    .map((e) => e.url)

  if (urls.length === 0) return NextResponse.json({ ok: true, submitted: 0 })

  const host = new URL(SITE_URL).host
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })

  return NextResponse.json({ ok: res.ok, status: res.status, submitted: urls.length, urls })
}
