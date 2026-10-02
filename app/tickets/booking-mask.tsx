"use client"

import { useEffect, useState } from "react"
import { BOOKING_URL } from "@/app/lib/early-bird"

/**
 * Buchungsmaske von camps.digital (CADI) als iFrame, laut CADI-Doku
 * "Einbindungsmöglichkeit 3". Die Maske läuft dabei auf CADIs eigener Domain,
 * deshalb muss themountaincamp.de bei CADI nicht als Herkunft freigeschaltet sein.
 * Die drei Skripte von CADI setzen die iFrame-Adresse und passen die Höhe an.
 */
const CADI_BASE = "https://main.d1u2qdrqduf5v6.amplifyapp.com/js/iframe"
const CADI_SCRIPTS = [
  `${CADI_BASE}/loader.js`,
  `${CADI_BASE}/communication/msgHandler/parentFrame.js`,
  `${CADI_BASE}/communication/main.js`,
]

// Die Maske liest Anbieter, Reise, Termin und Sprache aus der Adresszeile.
// Fehlen sie, setzen wir die Werte für The Mountaincamp 2027 (wie in BOOKING_URL).
const DEFAULT_PARAMS: Record<string, string> = {
  vendor: "mountaincamp",
  destination_id: "2647",
  termin_id: "38057",
}

declare global {
  interface Window {
    __cadiMaskLoaded?: boolean
  }
}

function ensureParams(lang: string) {
  const url = new URL(window.location.href)
  let changed = false
  for (const [k, v] of Object.entries({ ...DEFAULT_PARAMS, locale: lang })) {
    if (!url.searchParams.get(k)) {
      url.searchParams.set(k, v)
      changed = true
    }
  }
  if (changed) window.history.replaceState(window.history.state, "", url.toString())
}

// Skripte nacheinander laden: main.js braucht den Handler aus parentFrame.js
function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script")
    s.src = src
    s.async = false
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(src))
    document.body.appendChild(s)
  })
}

export default function BookingMask({ lang }: { lang: "de" | "en" }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Die CADI-Skripte laufen nur einmal pro Seitenaufruf sauber. Kommt man per
    // Navigation im Browser erneut hierher, Seite frisch laden.
    if (window.__cadiMaskLoaded) {
      window.location.reload()
      return
    }
    window.__cadiMaskLoaded = true
    ensureParams(lang)
    ;(async () => {
      try {
        for (const src of CADI_SCRIPTS) await loadScript(src)
      } catch {
        setFailed(true)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      {failed && (
        <p className="py-12 text-center text-gray-700">
          {lang === "de" ? "Die Buchung konnte hier nicht geladen werden. " : "The booking could not be loaded here. "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            {lang === "de" ? "Direkt zur Buchungsseite" : "Open the booking page"}
          </a>
        </p>
      )}
      <iframe
        id="bm-iframe"
        title={lang === "de" ? "Buchung The Mountaincamp 2027" : "Booking The Mountaincamp 2027"}
        width="100%"
        height="900"
        style={{ border: "none", outline: "none", overflow: "hidden", display: "block" }}
        scrolling="no"
        frameBorder={0}
        data-api-base-url="https://my.camps.digital"
        data-subdomain="my"
        data-anbieter-id="39"
        data-pinned-countries="de,at,ch"
        data-database-user="CORS"
        data-top-offset="80"
      />
    </div>
  )
}
