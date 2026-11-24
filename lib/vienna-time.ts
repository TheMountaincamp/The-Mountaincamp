/** Umrechnung zwischen ISO-Zeitpunkten und Formularfeldern in Wiener Ortszeit */
const TZ = "Europe/Vienna"

function offsetMinutes(date: Date) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "longOffset" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(name || "")
  if (!m) return 0
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] || 0))
}

/** ISO-Zeitpunkt -> "YYYY-MM-DDTHH:mm" in Wiener Zeit (für <input type="datetime-local">) */
export function isoToLocalInput(iso: string | null) {
  if (!iso) return ""
  const d = new Date(iso)
  const local = new Date(d.getTime() + offsetMinutes(d) * 60_000)
  return local.toISOString().slice(0, 16)
}

/** "YYYY-MM-DDTHH:mm" in Wiener Zeit -> ISO mit Offset, z. B. 2026-12-01T00:00:00+01:00 */
export function localInputToIso(value: string) {
  if (!value) return null
  const guess = new Date(value + ":00Z")
  const off = offsetMinutes(new Date(guess.getTime() - offsetMinutes(guess) * 60_000))
  const sign = off < 0 ? "-" : "+"
  const abs = Math.abs(off)
  return `${value}:00${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`
}
