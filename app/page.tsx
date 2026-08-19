import type { Metadata } from "next"
import Script from "next/script"
import HomePageClient from "./home-page-client"

export const metadata: Metadata = {
  title: "The Mountaincamp 2027 | Trailrunning Camp Österreich in Hochkrimml",
  description:
    "Phase 2 startet am Mittwoch, 26. August, 00–24 Uhr, für 500€. 5-tägiges Trailrunning Camp in den österreichischen Alpen: tägliche Trailruns, Techniktraining, Community und Workshops in Hochkrimml, 18.–22. August 2027.",
  keywords: [
    "Trailrunning Camp",
    "Trailrunning Camp Österreich",
    "Trail Running Camp Austria",
    "Mountaincamp",
    "The Mountaincamp",
    "Hochkrimml",
    "Trailrunning Anfänger",
    "Trailrunning Alpen",
    "Laufcamp Österreich",
    "Trail Running Workshop",
    "Trailrunning Community",
    "Mountaincamp Early Bird",
    "Mountaincamp Tickets 2027",
  ],
  authors: [{ name: "The Mountaincamp" }],
  creator: "The Mountaincamp",
  publisher: "The Mountaincamp",
  openGraph: {
    title: "The Mountaincamp 2027 | Trailrunning Camp Österreich",
    description:
      "5 Tage Trailrunning, Community und Abenteuer in den österreichischen Alpen. Hochkrimml, 18.-22. August 2027.",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp",
    images: [
      {
        url: "https://themountaincamp.de/images/hero-trail-runners.jpeg",
        width: 1200,
        height: 630,
        alt: "Trailrunning Camp Österreich - The Mountaincamp 2027",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mountaincamp 2027 | Trailrunning Camp Österreich",
    description:
      "5 Tage Trailrunning, Community und Abenteuer in den österreichischen Alpen. Hochkrimml, 18.-22. August 2027.",
    images: ["https://themountaincamp.de/images/hero-trail-runners.jpeg"],
  },
  alternates: {
    canonical: "https://themountaincamp.de",
    languages: {
      "de-DE": "https://themountaincamp.de",
      "en-US": "https://themountaincamp.de",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "The Mountaincamp 2027",
  alternateName: [
    "The Mountaincamp",
    "Trailrunning Camp Austria",
    "Trailrunning Camp Österreich",
    "Trail Running Camp Austria",
  ],
  description:
    "A 5-day trail running camp in Hochkrimml, Austria, for beginners, intermediate runners and experienced athletes. Trails, coaching, community and workshops in the Austrian Alps.",
  sport: "Trail Running",
  startDate: "2027-08-18",
  endDate: "2027-08-22",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Hochkrimml, Austrian Alps",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hochkrimml",
      addressLocality: "Hochkrimml",
      addressRegion: "Salzburg",
      postalCode: "5743",
      addressCountry: "AT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.2393,
      longitude: 12.1735,
    },
  },
  image: [
    "https://themountaincamp.de/images/hero-trail-runners.jpeg",
    "https://themountaincamp.de/images/alpine-village-group.jpg",
    "https://themountaincamp.de/images/mountain-summit.jpeg",
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Early-Bird-Ticket",
      availability: "https://schema.org/SoldOut",
      url: "https://themountaincamp.de",
      validFrom: "2026-08-16T12:00:00+02:00",
      validThrough: "2026-08-17T00:00:00+02:00",
      priceCurrency: "EUR",
    },
    {
      "@type": "Offer",
      name: "Phase 2 Ticket",
      availability: "https://schema.org/PreOrder",
      url: "https://themountaincamp.de",
      price: "500",
      validFrom: "2026-08-26T00:00:00+02:00",
      validThrough: "2026-08-27T00:00:00+02:00",
      priceCurrency: "EUR",
    },
  ],
  organizer: {
    "@type": "Organization",
    name: "The Mountaincamp",
    url: "https://themountaincamp.de",
    logo: "https://themountaincamp.de/images/mountaincamp-logo-black.png",
    sameAs: [
      "https://www.instagram.com/the_mountaincamp/",
      "https://www.youtube.com/@the_mountaincamp",
      "https://www.tiktok.com/@themountaincamp",
    ],
  },
  performer: {
    "@type": "Organization",
    name: "The Mountaincamp Coaching Team",
  },
}

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Mountaincamp",
  url: "https://themountaincamp.de",
  logo: "https://themountaincamp.de/images/mountaincamp-logo-black.png",
  image: "https://themountaincamp.de/images/hero-trail-runners.jpeg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hochkrimml",
    addressRegion: "Salzburg",
    addressCountry: "AT",
  },
  sameAs: [
    "https://www.instagram.com/the_mountaincamp/",
    "https://www.youtube.com/@the_mountaincamp",
    "https://www.tiktok.com/@themountaincamp",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "themountaincampde@gmail.com",
    contactType: "Customer Service",
    availableLanguage: ["German", "English"],
  },
}

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://themountaincamp.de",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "The Mountaincamp",
      item: "https://themountaincamp.de",
    },
  ],
}

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist The Mountaincamp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Mountaincamp ist ein 5-tägiges Trailrunning Camp in Hochkrimml, Österreich, für Anfänger, Fortgeschrittene und ambitionierte Läufer. Es kombiniert tägliche Trailruns, Techniktraining, Workshops und Community-Events in den österreichischen Alpen.",
      },
    },
    {
      "@type": "Question",
      name: "Wann und wo findet das Camp statt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Mountaincamp 2027 findet vom 18. bis 22. August in Hochkrimml in den österreichischen Alpen (Salzburg) statt.",
      },
    },
    {
      "@type": "Question",
      name: "Ist das Camp für Anfänger geeignet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, das Camp ist für alle Level geeignet – von Trailrunning-Anfängern bis zu erfahrenen Athleten. Es gibt verschiedene Laufgruppen und Routen für jedes Fitnesslevel.",
      },
    },
    {
      "@type": "Question",
      name: "Wann startet der Ticketverkauf für das Mountaincamp 2027?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Phase 2 für das Mountaincamp 2027 startet am Mittwoch, dem 26. August, von 00:00 bis 24:00 Uhr zum Preis von 500€. Das Kontingent ist begrenzt und nur in diesem Zeitfenster verfügbar.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Aktivitäten gibt es neben dem Trailrunning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Neben den täglichen Trailruns gibt es Yoga, Workshops (Töpfern, Aquarellmalerei, Stricken), MTB-Touren, Kanufahren, Bogenschießen, Klettern, Filmabende, Lagerfeuer und die legendäre Sunset Rave Party.",
      },
    },
    {
      "@type": "Question",
      name: "Wie komme ich zum Camp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Es gibt organisierte Busshuttles von verschiedenen deutschen Städten (München, Stuttgart, Hamburg, Frankfurt, Köln) nach Hochkrimml. Alternativ ist eine Anreise mit dem eigenen Auto möglich.",
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <Script
        id="structured-data-event"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <Script
        id="structured-data-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Script
        id="structured-data-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <HomePageClient />
    </>
  )
}
