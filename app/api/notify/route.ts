import { db } from "@/lib/db"
import { earlyBirdSignups } from "@/lib/db/schema"
import { NextResponse } from "next/server"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""

    if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 })
    }

    await db.insert(earlyBirdSignups).values({ email }).onConflictDoNothing()

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Error saving early bird signup:", error)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
