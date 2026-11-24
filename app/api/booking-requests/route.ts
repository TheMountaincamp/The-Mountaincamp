import { NextResponse } from "next/server"
import { SALE_PHASES, getPhaseState } from "@/app/lib/early-bird"
import { DIETS, EMAIL_REGEX, ROOMS, SHIRTS, TRAVEL, personPrice, type BookingRequest } from "@/app/buchung-test/options"
import { saveBookingRequest } from "@/lib/db/booking-requests"

export const dynamic = "force-dynamic"

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "")

/** Nimmt eine Buchungsanfrage der Testseite an. Der Preis wird hier neu berechnet, nie vom Browser übernommen. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<BookingRequest> | null
  if (!body || !Array.isArray(body.persons) || body.persons.length < 1 || body.persons.length > 6) {
    return NextResponse.json({ error: "invalid" }, { status: 400 })
  }

  const live = SALE_PHASES.find((p) => p.price !== null && getPhaseState(p) === "live")
  const base = live?.price ?? 0

  const persons = body.persons.map((p) => ({
    firstName: str(p.firstName, 80),
    lastName: str(p.lastName, 80),
    email: str(p.email, 254).toLowerCase(),
    birthDate: str(p.birthDate, 10),
    gender: ["f", "m", "d"].includes(p.gender as string) ? p.gender! : "",
    travel: TRAVEL.some((t) => t.id === p.travel) ? p.travel! : "eigen",
    travelBack: TRAVEL.some((t) => t.id === p.travelBack) ? p.travelBack! : "eigen",
    room: ROOMS.some((r) => r.id === p.room) ? p.room! : "8er",
    diets: Array.isArray(p.diets) ? p.diets.filter((d) => (DIETS as readonly string[]).includes(d)) : [],
    shirtCut: (p.shirtCut === "Damen" || p.shirtCut === "Herren" ? p.shirtCut : "") as "" | "Damen" | "Herren",
    shirtSize: (SHIRTS as readonly string[]).includes(p.shirtSize as string) ? p.shirtSize! : "",
  }))

  const missing =
    persons.some((p) => !p.firstName || !p.lastName || !p.birthDate || !p.gender || !p.shirtSize || !EMAIL_REGEX.test(p.email)) ||
    !str(body.phone) ||
    !str(body.street) ||
    !str(body.zip) ||
    !str(body.city) ||
    !body.acceptTerms ||
    !body.acceptPrivacy
  if (missing) return NextResponse.json({ error: "missing_fields" }, { status: 400 })

  const total = persons.reduce((s, p) => s + personPrice(p, base), 0)
  const data = {
    persons,
    phone: str(body.phone, 40),
    street: str(body.street),
    zip: str(body.zip, 12),
    city: str(body.city, 80),
    country: str(body.country, 60) || "Deutschland",
    message: str(body.message, 1000),
    voucher: str(body.voucher, 40),
    payment: body.payment === "card" ? "card" : "invoice",
    basePrice: base,
    phase: live?.id ?? null,
    userAgent: request.headers.get("user-agent")?.slice(0, 200) ?? null,
  }

  try {
    const id = await saveBookingRequest({ email: persons[0].email, persons: persons.length, total, payment: data.payment, data })
    return NextResponse.json({ ok: true, id, total })
  } catch (e) {
    console.error("[booking-requests]", e)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
