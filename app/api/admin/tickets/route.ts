import { NextResponse } from "next/server"
import { isValidApiToken } from "@/lib/admin-auth"
import { getSiteConfigFresh, saveSetting } from "@/app/lib/site-config-server"

export const dynamic = "force-dynamic"

/**
 * Ticketstand für Automationen, z. B. die tägliche Auswertung der Paxliste:
 *
 *   curl -X POST https://themountaincamp.de/api/admin/tickets \
 *     -H "Authorization: Bearer $ADMIN_API_TOKEN" \
 *     -H "Content-Type: application/json" -d '{"sold": 85}'
 *
 * GET mit demselben Header liefert den aktuellen Stand.
 */
export async function GET(request: Request) {
  if (!isValidApiToken(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const { tickets } = await getSiteConfigFresh()
  return NextResponse.json(tickets)
}

export async function POST(request: Request) {
  if (!isValidApiToken(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const body = await request.json().catch(() => null)
  const sold = Number(body?.sold)
  const current = await getSiteConfigFresh()
  const total = body?.total === undefined ? current.tickets.total : Number(body.total)
  if (!Number.isInteger(sold) || sold < 0 || !Number.isInteger(total) || total < 1) {
    return NextResponse.json({ error: "invalid" }, { status: 400 })
  }
  const tickets = { sold, total, updatedAt: new Date().toISOString() }
  await saveSetting("tickets", tickets)
  return NextResponse.json({ ok: true, tickets })
}
