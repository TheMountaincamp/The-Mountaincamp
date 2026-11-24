import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin-auth"
import { LEAD_INTERESTS, listLeads } from "@/lib/leads"

export const dynamic = "force-dynamic"

function cell(v: unknown) {
  const s = v == null ? "" : String(v)
  // Schutz vor Formel-Injection in Excel
  const safe = /^[=+\-@]/.test(s) ? "'" + s : s
  return `"${safe.replace(/"/g, '""')}"`
}

export async function GET(request: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  const interest = new URL(request.url).searchParams.get("interest") || undefined
  const rows = await listLeads(interest && interest in LEAD_INTERESTS ? interest : undefined)
  const csv = [
    ["email", "interest", "locale", "source", "created_at"].join(";"),
    ...rows.map((r) => [r.email, r.interest, r.locale, r.source, new Date(r.created_at).toISOString()].map(cell).join(";")),
  ].join("\r\n")
  return new Response("﻿" + csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="mountaincamp-leads${interest ? "-" + interest : ""}.csv"`,
    },
  })
}
