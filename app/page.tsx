import type { Metadata } from "next"
import HomePageClient from "./home-page-client"
import { faqsDE } from "@/app/data/faq"
import { SITE_URL, SITE_NAME, OG_IMAGE, SAME_AS, jsonLd } from "@/app/lib/seo"
import { NEXT_LAUNCH_PRICE, NEXT_LAUNCH_START, TICKET_URL, TICKETS_SOLD, TOTAL_TICKETS } from "@/app/lib/early-bird"

export const metadata: Metadata = {
  title: {
    absolute: "Trailrunning Camp Österreich 2027 | The Mountaincamp in Hochkrimml",
  },
  description:
    "Trailrunning Camp in den österreichischen Alpen: 5 Tage tägliche Trailruns, Workshops und Community in Hochkrimml. Für alle Level, 18. bis 22. August 2027.",
  keywords: [
    "Trailrunning Camp",
    "Trailrunning Camp Österreich",
    "Trail Running Camp Austria",
    "Trailrunning Camp Alpen",
    "Trailrunning Anfänger",
    "Laufcamp Österreich",
    "Trailrunning Hochkrimml",
    "Trailrunning Community",
    "The Mountaincamp",
    "Mountaincamp 2027",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "The Mountaincamp 2027 | Trailrunning Camp in Österreich",
    description:
      "5 Tage Trailrunning, Workshops und Community in den österreichischen Alpen. Hochkrimml, 18. bis 22. August 2027.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "de_DE",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mountaincamp 2027 | Trailrunning Camp in Österreich",
    description:
      "5 Tage Trailrunning, Workshops und Community in den österreichischen Alpen. Hochkrimml, 18. bis 22. August 2027.",
    images: [OG_IMAGE.url],
  },
}

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/mountaincamp-logo-black.png`,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  slogan: "Connected by the Trail.",
  sameAs: SAME_AS,
  contactPoint: {
    "@type": "ContactPoint",
    email: "themountaincampde@gmail.com",
    contactType: "customer service",
    availableLanguage: ["German", "English"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["de", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SportsEvent",
      "@id": `${SITE_URL}/#event-2027`,
      name: "The Mountaincamp 2027",
      alternateName: ["Trailrunning Camp Österreich", "Trail Running Camp Austria"],
      description:
        "5-tägiges Trailrunning Camp in Hochkrimml, Österreich, für alle Level: tägliche Trailruns in Gruppen nach Tempo, Workshops, gemeinsame Abende und Sunset Rave.",
      sport: "Trail Running",
      startDate: "2027-08-18",
      endDate: "2027-08-22",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      maximumAttendeeCapacity: TOTAL_TICKETS,
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
      offers: {
        "@type": "Offer",
        url: TICKET_URL,
        price: String(NEXT_LAUNCH_PRICE),
        priceCurrency: "EUR",
        availability: TICKETS_SOLD >= TOTAL_TICKETS ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
        validFrom: NEXT_LAUNCH_START,
      },
      organizer: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqsDE.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <HomePageClient />
    </>
  )
}
