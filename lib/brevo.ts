/**
 * Optional: neue Leads in eine Brevo-Liste eintragen.
 * Aktiv nur, wenn in Vercel BREVO_API_KEY und für das jeweilige Interesse
 * eine Listen-ID gesetzt ist, z. B. BREVO_LIST_WAITLIST=12,
 * BREVO_LIST_PERFORMANCE=13, BREVO_LIST_ADVENTURE=14, BREVO_LIST_TICKET_NOTIFY=15.
 */
export async function addToBrevo(email: string, interest: string, locale?: string) {
  const key = process.env.BREVO_API_KEY
  const listId = Number(process.env[`BREVO_LIST_${interest.toUpperCase().replace(/-/g, "_")}`])
  if (!key || !listId) return
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
      attributes: locale ? { LANGUAGE: locale } : undefined,
    }),
  })
  if (!res.ok && res.status !== 204) throw new Error(`Brevo ${res.status}: ${await res.text()}`)
}
