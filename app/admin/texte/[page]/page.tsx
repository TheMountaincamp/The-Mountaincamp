import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin-auth"
import { getTextOverridesFresh } from "@/app/lib/texts-server"
import { TEXT_ENTRIES, TEXT_PAGES } from "@/app/lib/text-registry"
import TextFilter from "./filter"

const area = "w-full border border-gray-300 bg-white px-2 py-1.5 text-sm leading-snug"

function rows(s: string) {
  return Math.min(8, Math.max(1, Math.ceil(s.length / 70) + (s.match(/\n/g)?.length ?? 0)))
}

export default async function TextsPage({
  params,
  searchParams,
}: {
  params: { page: string }
  searchParams: { saved?: string; error?: string }
}) {
  if (!isAdmin()) redirect("/admin/login")
  const page = TEXT_PAGES.find((p) => p.id === params.page)
  if (!page) notFound()
  const overrides = await getTextOverridesFresh()
  const entries = TEXT_ENTRIES.filter((e) => e.page === page.id)
  const sections = [...new Set(entries.map((e) => e.section))]

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Texte: {page.label}</h1>
        <div className="flex gap-4 text-sm">
          <a href={page.href} target="_blank" className="text-gray-500 underline">
            Seite ansehen
          </a>
          <Link href="/admin/texte" className="text-gray-500 underline">
            Alle Seiten
          </Link>
        </div>
      </header>

      {searchParams.saved && (
        <p className="mt-4 border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
          Gespeichert. Die Seite ist aktualisiert.
        </p>
      )}
      {searchParams.error && (
        <p className="mt-4 border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
          Nicht gespeichert: Die Datenbank war nicht erreichbar. Bitte nochmal versuchen.
        </p>
      )}

      <p className="mt-4 text-sm text-gray-600">
        Ein geleertes Feld stellt den Standardtext wieder her. Zeilenumbrüche bleiben dort erhalten, wo die Seite sie schon nutzt.
      </p>

      <div className="sticky top-0 z-10 mt-4 bg-gray-50 py-2">
        <TextFilter />
      </div>

      <form method="post" action={`/admin/texte/save?page=${page.id}`} className="mt-2 space-y-8">
        {sections.map((s) => (
          <section key={s}>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500">{s}</h2>
            <div className="divide-y divide-gray-100 border border-gray-200 bg-white">
              {entries
                .filter((e) => e.section === s)
                .map((e) => {
                  const o = overrides[e.key]
                  const de = o?.de || e.de
                  const en = o?.en || e.en
                  return (
                    <div
                      key={e.key}
                      data-text-entry
                      data-search={`${de} ${en} ${e.de} ${e.en}`.toLowerCase()}
                      className="grid gap-2 p-3 md:grid-cols-2"
                    >
                      <label className="block">
                        <span className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase text-gray-400">
                          Deutsch {o?.de && <span className="bg-amber-100 px-1 text-amber-800">geändert</span>}
                        </span>
                        <textarea name={`de:${e.key}`} defaultValue={de} rows={rows(de)} className={area} />
                      </label>
                      <label className="block">
                        <span className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase text-gray-400">
                          Englisch {o?.en && <span className="bg-amber-100 px-1 text-amber-800">geändert</span>}
                        </span>
                        <textarea name={`en:${e.key}`} defaultValue={en} rows={rows(en)} className={area} />
                      </label>
                    </div>
                  )
                })}
            </div>
          </section>
        ))}
        <div className="sticky bottom-0 border-t border-gray-200 bg-gray-50 py-3">
          <button className="bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white">Alle Änderungen speichern</button>
        </div>
      </form>
    </main>
  )
}
