import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

/**
 * Einfacher Passwortschutz für /admin.
 * Das Passwort steht in der Vercel-Umgebungsvariable ADMIN_PASSWORD.
 * Das Sitzungs-Cookie ist mit dem Passwort signiert: Wird es geändert,
 * sind alle bestehenden Sitzungen automatisch ungültig.
 */
export const ADMIN_COOKIE = "mtc_admin"
const SESSION_DAYS = 30

function secret() {
  return process.env.ADMIN_PASSWORD || ""
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex")
}

function safeEqual(a: string, b: string) {
  const ab = new Uint8Array(Buffer.from(a))
  const bb = new Uint8Array(Buffer.from(b))
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

export function checkPassword(input: string) {
  const pw = secret()
  return pw.length >= 8 && safeEqual(sign(input), sign(pw))
}

export function createSessionValue() {
  const expires = Date.now() + SESSION_DAYS * 86_400_000
  return { value: `${expires}.${sign(String(expires))}`, expires: new Date(expires) }
}

export function isValidSession(value: string | undefined) {
  if (!value || !secret()) return false
  const [exp, sig] = value.split(".")
  if (!exp || !sig || Number(exp) < Date.now()) return false
  return safeEqual(sig, sign(exp))
}

export function isAdmin() {
  return isValidSession(cookies().get(ADMIN_COOKIE)?.value)
}

/** Für Automationen: Authorization: Bearer <ADMIN_API_TOKEN> */
export function isValidApiToken(header: string | null) {
  const token = process.env.ADMIN_API_TOKEN || ""
  if (token.length < 16 || !header?.startsWith("Bearer ")) return false
  return safeEqual(header.slice(7), token)
}
