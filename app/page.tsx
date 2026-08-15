import type { Metadata } from "next"
import Script from "next/script"
import BusDeparturesClient from "./bus-departures-client"

export const metadata: Metadata = {
  title: "Anreise & Bus-Shuttle | The Mountaincamp 2027 Hochkrimml",
  description:
    "Bus-Shuttle zum Trailrunning Camp in Hochkrimml: Abfahrten ab Berlin, München und Jenbach zum Mountaincamp 2027 (18.–22. August). Hin- und Rückfahrt inklusive.",
  keywords: [
    "Anreise Mountaincamp",
    "Bus Hochkrimml",
    "Shuttle Trailrunning Camp",
    "Bus München Hochkrimml",
    "Bus Berlin Österreich Trailrunning",
    "Anreise Trailrunning Camp Österreich",
    "Jenbach Hochkrimml Transfer",
    "The Mountaincamp 2027 Transport",
  ],
  alternates: {
    canonical: "/bus-departures",
  },
  openGraph: {
    title: "Anreise & Bus-Shuttle | The Mountaincamp 2027",
    description:
      "Bus-Shuttle ab Berlin, München und Jenbach zum Trailrunning Camp in Hochkrimml. 18.–22. August 2027, Hin- und Rückfahrt inklusive.",
    url: "https://themountaincamp.de/bus-departures",
    siteName: "The Mountaincamp",
    images: [
      {
        url: "/images/bus-mountain-landscape.jpeg",
        width: 1200,
        height: 630,
        alt: "Bus-Shuttle durch die österreichischen Alpen zum Mountaincamp",
      },
    ],
    locale: "de_DE",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anreise & Bus-Shuttle | The Mountaincamp 2027",
    description:
      "Bus-Shuttle ab Berlin, München und Jenbach zum Trailrunning Camp in Hochkrimml, 18.–22. August 2027.",
    images: ["/images/bus-mountain-landscape.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      name: "Anreise & Transport",
      item: "https://themountaincamp.de/bus-departures",
    },
  ],
}

const busTripsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Bus-Shuttle Hinfahrt – The Mountaincamp 2027",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "BusTrip",
        name: "Bus-Shuttle Berlin – Hochkrimml",
        departureTime: "2027-08-18T06:35:00+02:00",
        departureBusStop: {
          "@type": "BusStation",
          name: "Berlin Hauptbahnhof",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Berlin",
            addressCountry: "DE",
          },
        },
        arrivalBusStop: {
          "@type": "BusStation",
          name: "Hochkrimml",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hochkrimml",
            addressRegion: "Salzburg",
            addressCountry: "AT",
          },
        },
        provider: {
          "@type": "Organization",
          name: "The Mountaincamp",
          url: "https://themountaincamp.de",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "BusTrip",
        name: "Bus-Shuttle München – Hochkrimml",
        departureTime: "2027-08-18T12:30:00+02:00",
        departureBusStop: {
          "@type": "BusStation",
          name: "München Zentraler Omnibusbahnhof (ZOB)",
          address: {
            "@type": "PostalAddress",
            addressLocality: "München",
            addressCountry: "DE",
          },
        },
        arrivalBusStop: {
          "@type": "BusStation",
          name: "Hochkrimml",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hochkrimml",
            addressRegion: "Salzburg",
            addressCountry: "AT",
          },
        },
        provider: {
          "@type": "Organization",
          name: "The Mountaincamp",
          url: "https://themountaincamp.de",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "BusTrip",
        name: "Bus-Shuttle Jenbach – Hochkrimml",
        departureTime: "2027-08-18T14:30:00+02:00",
        departureBusStop: {
          "@type": "BusStation",
          name: "Bahnhof Jenbach",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jenbach",
            addressRegion: "Tirol",
            addressCountry: "AT",
          },
        },
        arrivalBusStop: {
          "@type": "BusStation",
          name: "Hochkrimml",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hochkrimml",
            addressRegion: "Salzburg",
            addressCountry: "AT",
          },
        },
        provider: {
          "@type": "Organization",
          name: "The Mountaincamp",
          url: "https://themountaincamp.de",
        },
      },
    },
  ],
}

const transportFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Von welchen Städten fährt der Bus zum Mountaincamp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für das Mountaincamp 2027 gibt es Shuttles ab Berlin Hauptbahnhof (6:35 Uhr), München ZOB (12:30 Uhr) und Bahnhof Jenbach (14:30 Uhr). Alle drei Busse fahren am Anreisetag, dem 18. August 2027.",
      },
    },
    {
      "@type": "Question",
      name: "Ist die Rückfahrt im Bus-Ticket enthalten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die Buchung umfasst immer Hin- und Rückfahrt. Am Abreisetag, dem 22. August 2027, startet der Bus um 9:00 Uhr in Hochkrimml.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert die Rückfahrt nach Berlin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ab Hochkrimml um 9:00 Uhr, Ankunft München 12:30 Uhr, Zuganschluss um 14:21 Uhr und Ankunft in Berlin um 18:22 Uhr. Insgesamt rund neun Stunden inklusive Umstieg.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet das Bus-Ticket zum Trailrunning Camp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Bustickets werden separat zum Camp-Ticket gebucht. Die aktuellen Preise stehen auf der Buchungsseite, sobald der Ticketverkauf für 2027 startet.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich auch mit dem eigenen Auto anreisen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, eine Anreise mit dem eigenen Auto nach Hochkrimml ist möglich. Am Camp stehen Parkplätze zur Verfügung. Wer Mitfahrgelegenheiten sucht, findet diese in unserer Community-Gruppe.",
      },
    },
  ],
}

export default function BusDeparturesPage() {
  return (
    <>
      <Script
        id="structured-data-transport-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Script
        id="structured-data-bus-trips"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(busTripsStructuredData) }}
      />
      <Script
        id="structured-data-transport-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(transportFaqStructuredData) }}
      />
      <BusDeparturesClient />
    </>
  )
}
