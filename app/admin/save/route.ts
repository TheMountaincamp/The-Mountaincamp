import { NextResponse } from "next/server"
import { ADMIN_COOKIE, isAdmin } from "@/lib/admin-auth"
import { getSiteConfigFresh, saveSetting } from "@/app/lib/site-config-server"
import { localInputToIso } from "@/lib/vienna-time"

export const dynamic = "force-dynamic"

function int(v: FormDataEntryValue | null, min = 0, max = 100000) {
  const n = Math.round(Number(v))
  if (v === null || String(v).trim() === "" || !Number.isFinite(n) || n < min || n > max) throw new Error("invalid")
  return n
}

export async function POST(request: Request) {
  const base = new URL(request.url)
  const back = (q: string) => NextResponse.redirect(new URL(`/admin?${q}`, base), 303)
  const section = base.searchParams.get("section")

  if (section === "logout") {
    const res = NextResponse.redirect(new URL("/admin/login", base), 303)
    res.cookies.delete(ADMIN_COOKIE)
    return res
  }
  if (!isAdmin()) return NextResponse.redirect(new URL("/admin/login", base), 303)

  const form = await request.formData()
  try {
    const current = await getSiteConfigFresh()
    if (section === "tickets") {
      await saveSetting("tickets", {
        sold: int(form.get("sold")),
        total: int(form.get("total"), 1),
        updatedAt: new Date().toISOString(),
      })
    } else if (section === "shuttles") {
      await saveSetting(
        "shuttles",
        current.shuttles.map((s) => ({ ...s, price: int(form.get(`shuttle-${s.id}`)), perLeg: true })),
      )
    } else if (section === "phases") {
      await saveSetting(
        "phases",
        current.phases.map((p) => {
          const price = String(form.get(`price-${p.id}`) ?? "").trim()
          return {
            ...p,
            price: price === "" ? null : int(price),
            start: localInputToIso(String(form.get(`start-${p.id}`) ?? "")),
            end: localInputToIso(String(form.get(`end-${p.id}`) ?? "")),
          }
        }),
      )
    } else {
      return back("error=unknown")
    }
  } catch (e) {
    console.error("[admin/save]", e)
    return back("error=" + (e instanceof Error && e.message === "invalid" ? "invalid" : "db"))
  }
  return back(`saved=${section}`)
}
