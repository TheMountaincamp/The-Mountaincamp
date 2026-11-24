import { SITE_URL, OG_IMAGE } from "@/app/lib/seo"
import { getPhaseState, TICKET_URL } from "@/app/lib/early-bird"
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/app/lib/site-config"

/** Angebot für das Event-Schema aus der gerade laufenden Preisphase */
function currentOffer(config: SiteConfig) {
  const now = Date.now()
  const SALE_PHASES = config.phases
  const { sold: TICKETS_SOLD, total: TOTAL_TICKETS } = config.tickets
  const live = SALE_PHASES.find((p) => p.price !== null && getPhaseState(p, now) === "live")
  const fallback = SALE_PHASES.filter((p) => p.price !== null).find((p) => getPhaseState(p, now) !== "ended")
  const phase = live ?? fallback
  return {
    "@type": "Offer",
    url: `${SITE_URL}${TICKET_URL}`,
    price: String(phase?.price ?? ""),
    priceCurrency: "EUR",
    availability: TICKETS_SOLD >= TOTAL_TICKETS ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    ...(phase?.start ? { validFrom: phase.start } : {}),
    ...(phase?.end ? { priceValidUntil: new Date(new Date(phase.end).getTime() - 1).toISOString().slice(0, 10) } : {}),
  }
}

/** Event-Schema für die Startseite, deutsch oder englisch */
export function eventSchema(lang: "de" | "en", config: SiteConfig = DEFAULT_SITE_CONFIG) {
  const en = lang === "en"
  return {
    "@type": "SportsEvent",
    "@id": `${SITE_URL}${en ? "/en" : "/"}#event-2027`,
    name: "Mountaincamp 2027",
    alternateName: ["Mountain Camp 2027", "The Mountain Camp 2027", "Trailrunning Camp Österreich", "Trail Running Camp Austria"],
    description: en
      ? "5-day trail running camp in Hochkrimml, Austria, for all levels: daily trail runs in groups by pace, workshops, evenings together and the summit rave."
      : "5-tägiges Trailrunning Camp in Hochkrimml, Österreich, für alle Level: tägliche Trailruns in Gruppen nach Tempo, Workshops, gemeinsame Abende und Summit Rave.",
    inLanguage: lang,
    url: en ? `${SITE_URL}/en` : SITE_URL,
    sport: "Trail Running",
    startDate: "2027-08-18",
    endDate: "2027-08-22",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    maximumAttendeeCapacity: config.tickets.total,
    location: {
      "@type": "Place",
      name: "Hochkrimml, Hohe Tauern",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hochkrimml",
        addressRegion: "Salzburg",
        postalCode: "5743",
        addressCountry: "AT",
      },
      geo: { "@type": "GeoCoordinates", latitude: 47.2393, longitude: 12.1735 },
    },
    image: [
      `${SITE_URL}${OG_IMAGE.url}`,
      `${SITE_URL}/images/hero-trail-runners.jpeg`,
      `${SITE_URL}/images/mountain-top-sunset-rave.jpg`,
    ],
    offers: currentOffer(config),
    organizer: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Mountaincamp", url: SITE_URL },
  }
}
