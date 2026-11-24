import { NextResponse } from "next/server"
import { addLead, EMAIL_REGEX, isLeadInterest } from "@/lib/leads"

export const dynamic = "force-dynamic"

/** Eintrag für Warteliste, Performance, Adventure oder Ticket-Benachrichtigung */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""
    const interest = body?.interest ?? "ticket-notify"
    const locale = body?.locale === "en" ? "en" : "de"
    const source = typeof body?.source === "string" ? body.source.slice(0, 100) : undefined

    if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 })
    }
    if (!isLeadInterest(interest)) return NextResponse.json({ error: "invalid_interest" }, { status: 400 })

    await addLead({ email, interest, locale, source })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[leads]", error)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
