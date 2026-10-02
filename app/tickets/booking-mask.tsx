"use client"

import { useEffect, useRef, useState } from "react"
import { BOOKING_URL } from "@/app/lib/early-bird"

/**
 * Buchungsmaske von camps.digital (CADI), eingebettet direkt in die Seite.
 *
 * Entspricht dem offiziellen Snippet (CADI-Loaders/BookingMask.js), aber:
 * - jQuery liegt lokal unter /vendor (kein Abruf bei cdnjs/Cloudflare),
 * - die Lade-Logik steckt hier statt im Skript von jsdelivr (@latest), damit
 *   kein fremdes Skript ungeprüft auf der Seite landet,
 * - sie läuft bei jedem Aufruf der Seite neu, auch nach Navigation im Browser.
 */
const MASK_HTML_URL = "https://main.d1u2qdrqduf5v6.amplifyapp.com/index.html"
const JQUERY_SRC = "/vendor/jquery-3.7.1.min.js"

type JQ = ((el: Element) => { load: (url: string, cb: (r: string, status: string, xhr: XMLHttpRequest) => void) => void }) & {
  fn?: unknown
}

declare global {
  interface Window {
    jQuery?: JQ
    __cadiMaskLoaded?: boolean
  }
}

function loadJquery(): Promise<JQ> {
  if (window.jQuery) return Promise.resolve(window.jQuery)
  return new Promise((resolve, reject) => {
    let s = document.querySelector<HTMLScriptElement>(`script[src="${JQUERY_SRC}"]`)
    if (!s) {
      s = document.createElement("script")
      s.src = JQUERY_SRC
      s.async = true
      document.head.appendChild(s)
    }
    s.addEventListener("load", () => (window.jQuery ? resolve(window.jQuery) : reject(new Error("jQuery fehlt"))))
    s.addEventListener("error", () => reject(new Error("jQuery konnte nicht geladen werden")))
  })
}

// Die Maske hat eine mitlaufende Seitenleiste (position: sticky). Das klappt nur,
// wenn kein Elternelement overflow setzt. Wie im Original-Loader, aber nur bis <body>.
function fixStickyParents(tries = 0) {
  let el = document.querySelector<HTMLElement>("#side-bar-wrapper")
  if (!el) {
    if (tries < 40) window.setTimeout(() => fixStickyParents(tries + 1), 500)
    return
  }
  while (el && el !== document.body) {
    if (getComputedStyle(el).overflow !== "visible") el.style.setProperty("overflow", "visible")
    el = el.parentElement
  }
}

export default function BookingMask({ lang }: { lang: "de" | "en" }) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let cancelled = false
    const el = ref.current
    if (!el) return
    // Die Maske bringt eigene Skripte mit, die nur einmal pro Seitenaufruf sauber starten.
    // Kommt man per Navigation im Browser erneut hierher, Seite frisch laden.
    if (window.__cadiMaskLoaded) {
      window.location.reload()
      return
    }
    loadJquery()
      .then(($) => {
        if (cancelled) return
        $(el).load(MASK_HTML_URL, (_r, status) => {
          if (cancelled) return
          if (status === "error") setState("error")
          else {
            window.__cadiMaskLoaded = true
            setState("ready")
            fixStickyParents()
          }
        })
      })
      .catch(() => !cancelled && setState("error"))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      {state === "loading" && (
        <p className="py-12 text-center text-gray-500">
          {lang === "de" ? "Buchung wird geladen ..." : "Loading booking ..."}
        </p>
      )}
      {state === "error" && (
        <p className="py-12 text-center text-gray-700">
          {lang === "de"
            ? "Die Buchung konnte hier nicht geladen werden. "
            : "The booking could not be loaded here. "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            {lang === "de" ? "Direkt zur Buchungsseite" : "Open the booking page"}
          </a>
        </p>
      )}
      <div
        id="booking-mask-wrapper"
        ref={ref}
        data-api-base-url="https://my.camps.digital"
        data-subdomain="my"
        data-anbieter-id="39"
        data-pinned-countries="de,at,ch"
        data-footer-badge-img=""
        data-sidebar-badge-1-img=""
        data-sidebar-badge-2-img=""
      />
    </div>
  )
}
