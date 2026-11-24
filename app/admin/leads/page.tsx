import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin-auth"
import { LEAD_INTERESTS, listLeads } from "@/lib/leads"

export default async function LeadsPage({ searchParams }: { searchParams: { interest?: string } }) {
  if (!isAdmin()) redirect("/admin/login")
  const interest = searchParams.interest && searchParams.interest in LEAD_INTERESTS ? searchParams.interest : undefined
  const leads = await listLeads(interest)
  const exportHref = `/admin/leads/export${interest ? `?interest=${interest}` : ""}`

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <Link href="/admin" className="text-sm text-gray-500 underline">Zurück</Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Leads ({leads.length})</h1>
        <a href={exportHref} className="bg-gray-900 px-4 py-2 text-sm font-semibold text-white">CSV exportieren</a>
      </div>
      <nav className="flex flex-wrap gap-2 text-sm">
        <Link href="/admin/leads" className={!interest ? "font-bold underline" : "underline"}>Alle</Link>
        {Object.entries(LEAD_INTERESTS).map(([id, label]) => (
          <Link key={id} href={`/admin/leads?interest=${id}`} className={interest === id ? "font-bold underline" : "underline"}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="overflow-x-auto border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2">E-Mail</th>
              <th className="px-3 py-2">Interesse</th>
              <th className="px-3 py-2">Sprache</th>
              <th className="px-3 py-2">Datum</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-gray-100">
                <td className="px-3 py-2">{l.email}</td>
                <td className="px-3 py-2">{LEAD_INTERESTS[l.interest as keyof typeof LEAD_INTERESTS] ?? l.interest}</td>
                <td className="px-3 py-2">{l.locale ?? ""}</td>
                <td className="px-3 py-2 tabular-nums">
                  {new Date(l.created_at).toLocaleString("de-AT", { timeZone: "Europe/Vienna", dateStyle: "short", timeStyle: "short" })}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-gray-500">Noch keine Einträge.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
