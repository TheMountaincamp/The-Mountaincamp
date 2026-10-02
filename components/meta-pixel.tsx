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
    // Ticketseite mit eingebetteter Buchungsmaske = Beginn der Buchung
    if (pathname === TICKET_PAGE) trackMeta("InitiateCheckout", { content_name: "The Mountaincamp 2027", currency: "EUR" })
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

  return null
}
