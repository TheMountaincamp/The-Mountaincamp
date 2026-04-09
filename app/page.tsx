import type { Metadata } from "next"
import HomePageClient from "./home-page-client"

export const metadata: Metadata = {
  title: "Trailrunning Camp Österreich 2026 | The Mountaincamp",
  description:
    "5 Tage Trailrunning Camp in Österreich. Trails, Techniktraining, Community und Workshops in den Alpen. Für Anfänger und Fortgeschrittene. Hochkrimml, 5.–9. August 2026.",
  alternates: {
    canonical: "https://themountaincamp.de",
  },
  openGraph: {
    title: "Trailrunning Camp Österreich 2026 | The Mountaincamp",
    description:
      "5 Tage Trailrunning Camp in Österreich. Trails, Techniktraining, Community und Workshops in den Alpen. Für Anfänger und Fortgeschrittene. Hochkrimml, 5.–9. August 2026.",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp",
    images: [
      {
        url: "https://themountaincamp.de/images/hero-trail-runners.jpeg",
        width: 1200,
        height: 630,
        alt: "Trailrunning Camp Österreich – The Mountaincamp",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
}

export default function Page() {
  return <HomePageClient />
}