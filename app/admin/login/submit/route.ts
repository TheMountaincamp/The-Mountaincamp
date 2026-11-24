import { NextResponse } from "next/server"
import { ADMIN_COOKIE, checkPassword, createSessionValue } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const base = new URL(request.url)
  if (!process.env.ADMIN_PASSWORD) return NextResponse.redirect(new URL("/admin/login?error=missing", base), 303)
  const form = await request.formData()
  if (!checkPassword(String(form.get("password") || ""))) {
    await new Promise((r) => setTimeout(r, 800))
    return NextResponse.redirect(new URL("/admin/login?error=wrong", base), 303)
  }
  const s = createSessionValue()
  const res = NextResponse.redirect(new URL("/admin", base), 303)
  res.cookies.set(ADMIN_COOKIE, s.value, { httpOnly: true, secure: true, sameSite: "lax", path: "/", expires: s.expires })
  return res
}
