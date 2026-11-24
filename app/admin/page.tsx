import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin-auth"
import { getSiteConfigFresh } from "@/app/lib/site-config-server"
import { getPhaseState } from "@/app/lib/early-bird"
import { countLeads, LEAD_INTERESTS } from "@/lib/leads"
import { isoToLocalInput } from "@/lib/vienna-time"

const SAVED: Record<string, string> = {
  tickets: "Ticketstand gespeichert.",
  shuttles: "Shuttle-Preise gespeichert.",
  phases: "Preisphasen gespeichert.",
}

const input = "w-full border border-gray-300 bg-white px-2 py-1.5 text-sm"
const button = "bg-gray-900 px-4 py-2 text-sm font-semibold text-white"

function Card({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border border-gray-200 bg-white p-5">
      <h2 className="text-base font-bold">{title}</h2>
      {note && <p className="mt-1 text-sm text-gray-500">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default async function AdminPage({ searchParams }: { searchParams: { saved?: string; error?: string } }) {
  if (!isAdmin()) redirect("/admin/login")
  const config = await getSiteConfigFresh()
  const counts = await countLeads().catch(() => ({}) as Record<string, number>)
  const saved = searchParams.saved && SAVED[searchParams.saved]
  const error =
    searchParams.error === "invalid"
      ? "Nicht gespeichert: Bitte nur ganze Zahlen eintragen."
      : searchParams.error
        ? "Nicht gespeichert: Die Datenbank war nicht erreichbar. Bitte nochmal versuchen."
        : null

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mountaincamp Admin</h1>
        <form method="post" action="/admin/save?section=logout">
          <button className="text-sm text-gray-500 underline">Abmelden</button>
        </form>
      </header>

      {error && <p className="border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">{error}</p>}
      {saved && <p className="border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{saved} Die Website ist aktualisiert.</p>}

      <Card
        title="Ticketstand"
        note={`Wird auf Startseite und im Event-Schema angezeigt. Zuletzt aktualisiert: ${
          config.tickets.updatedAt ? new Date(config.tickets.updatedAt).toLocaleString("de-AT", { timeZone: "Europe/Vienna" }) : "unbekannt"
        }`}
      >
        <form method="post" action="/admin/save?section=tickets" className="flex flex-wrap items-end gap-3">
          <label className="text-sm">
            Verkauft
            <input name="sold" type="number" min={0} defaultValue={config.tickets.sold} className={input} />
          </label>
          <label className="text-sm">
            Kontingent
            <input name="total" type="number" min={1} defaultValue={config.tickets.total} className={input} />
          </label>
          <button className={button}>Speichern</button>
        </form>
      </Card>

      <Card title="Preisphasen" note="Zeiten in Wiener Ortszeit. Ende einer Phase = Start der nächsten. Leeres Feld = offen.">
        <form method="post" action="/admin/save?section=phases" className="space-y-4">
          {config.phases.map((p) => {
            const state = getPhaseState(p)
            return (
              <fieldset key={p.id} className="grid grid-cols-1 gap-2 border-t border-gray-100 pt-3 sm:grid-cols-[1fr_6rem_1fr_1fr]">
                <legend className="text-sm font-semibold">
                  {p.name.de}{" "}
                  <span className="font-normal text-gray-500">
                    ({state === "live" ? "läuft" : state === "ended" ? "beendet" : "kommt"})
                  </span>
                </legend>
                <span className="hidden sm:block" />
                <label className="text-xs text-gray-500">
                  Preis €
                  <input name={`price-${p.id}`} type="number" min={0} defaultValue={p.price ?? ""} className={input} />
                </label>
                <label className="text-xs text-gray-500">
                  Start
                  <input name={`start-${p.id}`} type="datetime-local" defaultValue={isoToLocalInput(p.start)} className={input} />
                </label>
                <label className="text-xs text-gray-500">
                  Ende
                  <input name={`end-${p.id}`} type="datetime-local" defaultValue={isoToLocalInput(p.end)} className={input} />
                </label>
              </fieldset>
            )
          })}
          <button className={button}>Speichern</button>
        </form>
      </Card>

      <Card title="Shuttle-Preise" note="Hin und zurück pro Person. Erscheint auf Ticketseite, Anreiseseite und in llms.txt. Den Preis in CADI musst du separat ändern.">
        <form method="post" action="/admin/save?section=shuttles" className="flex flex-wrap items-end gap-3">
          {config.shuttles.map((s) => (
            <label key={s.id} className="text-sm">
              {s.city.de}
              <input name={`shuttle-${s.id}`} type="number" min={0} defaultValue={s.price} className={input} />
            </label>
          ))}
          <button className={button}>Speichern</button>
        </form>
      </Card>

      <Card title="Leads">
        <ul className="space-y-1 text-sm">
          {Object.entries(LEAD_INTERESTS).map(([id, label]) => (
            <li key={id} className="flex justify-between">
              <span>{label}</span>
              <span className="tabular-nums">{counts[id] ?? 0}</span>
            </li>
          ))}
        </ul>
        <Link href="/admin/leads" className="mt-4 inline-block text-sm font-semibold underline">
          Alle Leads ansehen und exportieren
        </Link>
      </Card>
    </main>
  )
}
