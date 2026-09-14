import { type NextRequest, NextResponse } from "next/server"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_FORMATS = new Set(["performance", "adventure"])

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email.trim() : ""
  const format = typeof body?.format === "string" ? body.format : ""

  if (!EMAIL_REGEX.test(email) || !VALID_FORMATS.has(format)) {
    return NextResponse.json({ error: "Invalid email or format." }, { status: 400 })
  }

  // TODO: persist to a database/mailing list once one is connected for this project.
  console.log("[v0] notify signup:", { email, format })

  return NextResponse.json({ ok: true })
}
