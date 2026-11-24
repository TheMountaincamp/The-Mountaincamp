import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin-auth"
import { getTextOverridesFresh } from "@/app/lib/texts-server"
import { TEXT_ENTRIES, TEXT_PAGES } from "@/app/lib/text-registry"

export default async function TextsOverview() {
  if (!isAdmin()) redirect("/admin/login")
  const overrides = await getTextOverridesFresh()

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Texte</h1>
        <Link href="/admin" className="text-sm text-gray-500 underline">
          Zurück zum Admin
        </Link>
      </header>
      <p className="text-sm text-gray-600">
        Wähle eine Seite. Änderungen sind nach dem Speichern sofort live. Ein geleertes Feld stellt den Standardtext wieder her.
      </p>
      <ul className="divide-y divide-gray-200 border border-gray-200 bg-white">
        {TEXT_PAGES.map((p) => {
          const entries = TEXT_ENTRIES.filter((e) => e.page === p.id)
          if (!entries.length) return null
          const changed = entries.filter((e) => overrides[e.key]).length
          return (
            <li key={p.id}>
              <Link href={`/admin/texte/${p.id}`} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50">
                <span className="font-semibold">{p.label}</span>
                <span className="text-sm text-gray-500">
                  {entries.length} Texte{changed ? `, ${changed} geändert` : ""}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
