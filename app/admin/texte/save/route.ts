import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin-auth"
import { saveTextOverrides } from "@/app/lib/texts-server"
import { TEXT_ENTRIES } from "@/app/lib/text-registry"

export const dynamic = "force-dynamic"

const norm = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.replace(/\r\n/g, "\n") : "")

export async function POST(request: Request) {
  const url = new URL(request.url)
  if (!isAdmin()) return NextResponse.redirect(new URL("/admin/login", url), 303)
  const page = url.searchParams.get("page") ?? ""
  const form = await request.formData()

  // Nur bekannte Schlüssel dieser Seite. Gleich wie Standard oder leer = keine Änderung speichern.
  const changes: Record<string, { de: string | null; en: string | null }> = {}
  for (const e of TEXT_ENTRIES.filter((x) => x.page === page)) {
    const de = norm(form.get(`de:${e.key}`)).slice(0, 5000)
    const en = norm(form.get(`en:${e.key}`)).slice(0, 5000)
    changes[e.key] = {
      de: de.trim() && de.trim() !== e.de.trim() ? de : null,
      en: en.trim() && en.trim() !== e.en.trim() ? en : null,
    }
  }

  try {
    await saveTextOverrides(changes)
  } catch (err) {
    console.error("[admin/texte/save]", err)
    return NextResponse.redirect(new URL(`/admin/texte/${page}?error=db`, url), 303)
  }
  return NextResponse.redirect(new URL(`/admin/texte/${page}?saved=1`, url), 303)
}
