import { NextResponse } from "next/server"
import { addLead, EMAIL_REGEX } from "@/lib/leads"

/** Alte Adresse der Ticket-Benachrichtigung, schreibt jetzt in die Leads-Tabelle */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""

    if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 })
    }

    await addLead({ email, interest: "ticket-notify", source: "notify" })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[notify]", error)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
