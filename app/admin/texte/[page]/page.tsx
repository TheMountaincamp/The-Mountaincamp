import { notFound, redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin-auth"
import { getTextOverridesFresh } from "@/app/lib/texts-server"
import { TEXT_ENTRIES, TEXT_PAGES } from "@/app/lib/text-registry"
import Editor from "./editor"

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
  const entries = TEXT_ENTRIES.filter((e) => e.page === page.id).map((e) => ({
    key: e.key,
    section: e.section,
    shared: e.shared,
    alt: e.alt,
    de: overrides[e.key]?.de || e.de,
    en: overrides[e.key]?.en || e.en,
    defaultDe: e.de,
    defaultEn: e.en,
  }))
  const pages = TEXT_PAGES.filter((p) => TEXT_ENTRIES.some((e) => e.page === p.id)).map(({ id, label }) => ({ id, label }))

  return (
    <Editor
      key={page.id}
      pageId={page.id}
      pages={pages}
      entries={entries}
      viewHref={page.href}
      saved={!!searchParams.saved}
      error={!!searchParams.error}
    />
  )
}
