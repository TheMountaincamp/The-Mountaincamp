"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useCookieConsent } from "@/contexts/cookie-consent-context"
import { META_PIXEL_ID, trackMeta } from "@/lib/meta-pixel"

// Seiten, die als ViewContent zählen (Produkt- und Infoseiten des Camps)
const CONTENT_PAGES: Record<string, string> = {
  "/": "The Mountaincamp Community",
  "/trails": "Trails",
  "/house": "Unterkunft",
  "/bus-departures": "Busanreise",
}

// Ticketseite mit eingebetteter Buchungsmaske
const TICKET_PAGE = "/tickets"

// Direkte Links zum externen Buchungssystem (Fallback-Link)
const CHECKOUT_LINK = 'a[href*="camps.digital"]'

// Die CADI-Buchungsmaske (iFrame) meldet ihre Schritte per postMessage als
// {type: "data-layer-push", content: {event, conversionValue}}. Getestet am 11.10.2026:
// buchung-step0 (Maske geladen), buchung-step1 (Checkout), buchung-click-purchase
// (Klick auf Kaufen), buchung-thx (Bestätigungsseite, Buchung abgeschlossen).
const CADI_ORIGIN = /^https:\/\/[a-z0-9-]+\.d1u2qdrqduf5v6\.amplifyapp\.com$/
const CAMP_NAME = "The Mountaincamp 2027"

function loadPixel() {
  if (typeof window === "undefined" || window.fbq) return
  const queue: unknown[][] = []
  const fbq = function (...args: unknown[]) {
    const self = fbq as unknown as { callMethod?: (...a: unknown[]) => void }
    if (self.callMethod) self.callMethod(...args)
    else queue.push(args)
  } as unknown as Window["fbq"] & { queue: unknown[][]; loaded: boolean; version: string; push: unknown }
  fbq.queue = queue
  fbq.loaded = true
  fbq.version = "2.0"
  fbq.push = fbq
  window.fbq = fbq
  if (!window._fbq) window._fbq = fbq
  const script = document.createElement("script")
  script.async = true
  script.src = "https://connect.facebook.net/en_US/fbevents.js"
  document.head.appendChild(script)
  window.fbq!("init", META_PIXEL_ID)
}

export default function MetaPixel() {
  const { consent } = useCookieConsent()
  const pathname = usePathname()
  const lastTracked = useRef<string | null>(null)
  const allowed = consent.marketing === true

  // Laden bzw. Einwilligung widerrufen
  useEffect(() => {
    if (allowed) {
      loadPixel()
      window.fbq?.("consent", "grant")
    } else if (window.fbq) {
      window.fbq("consent", "revoke")
      lastTracked.current = null
    }
  }, [allowed])

  // PageView und ViewContent bei jedem Seitenwechsel
  useEffect(() => {
    if (!allowed || !pathname || lastTracked.current === pathname) return
    lastTracked.current = pathname
    trackMeta("PageView")
    const name = CONTENT_PAGES[pathname]
    if (name) trackMeta("ViewContent", { content_name: name, content_category: "Camp" })
    // Auf der Ticketseite meldet die Buchungsmaske selbst, wann der Checkout beginnt
    if (pathname === TICKET_PAGE) trackMeta("ViewContent", { content_name: "Tickets", content_category: "Camp" })
  }, [allowed, pathname])

  // Klick auf einen Ticket-Link = Beginn der Buchung
  useEffect(() => {
    if (!allowed) return
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const link = target?.closest?.(CHECKOUT_LINK)
      if (!link || window.location.pathname === TICKET_PAGE) return
      trackMeta("InitiateCheckout", { content_name: "The Mountaincamp 2027", currency: "EUR" })
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [allowed])

  // Buchungsschritte aus der CADI-Maske
  useEffect(() => {
    if (!allowed) return
    let fahrt = ""
    const onMessage = (event: MessageEvent) => {
      if (!CADI_ORIGIN.test(event.origin)) return
      let msg: { type?: string; content?: { event?: string; conversionValue?: number; fullPath?: string } }
      try {
        msg = typeof event.data === "string" ? JSON.parse(event.data) : event.data
      } catch {
        return
      }
      if (!msg || !msg.content) return
      if (msg.type === "sync-url" && msg.content.fullPath) {
        const m = /fahrt=([a-z0-9]+)/i.exec(msg.content.fullPath)
        if (m) fahrt = m[1]
        return
      }
      if (msg.type !== "data-layer-push") return
      const value = Number(msg.content.conversionValue) || 0
      switch (msg.content.event) {
        case "buchung-step1":
          trackMeta("InitiateCheckout", { content_name: CAMP_NAME, currency: "EUR" })
          break
        case "buchung-click-purchase":
          trackMeta("AddPaymentInfo", { content_name: CAMP_NAME, currency: "EUR", value })
          break
        case "buchung-thx": {
          // Pro Buchung nur einmal zählen, auch wenn die Bestätigung neu geladen wird
          const key = "mc-purchase-" + (fahrt || String(value))
          try {
            if (sessionStorage.getItem(key)) return
            sessionStorage.setItem(key, "1")
          } catch {}
          window.fbq?.("track", "Purchase", { content_name: CAMP_NAME, currency: "EUR", value }, fahrt ? { eventID: "cadi-" + fahrt } : undefined)
          break
        }
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [allowed])

  return null
}
