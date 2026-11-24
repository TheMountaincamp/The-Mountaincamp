import type { Metadata } from "next"
import HomePageClient from "./home-page-client"
import { faqsDE } from "@/app/data/faq"
import { SITE_URL, SITE_NAME, OG_IMAGE, SAME_AS, jsonLd, languageAlternates } from "@/app/lib/seo"
import { eventSchema } from "@/app/lib/event-schema"
import { getSiteConfig } from "@/app/lib/site-config-server"
import type { SiteConfig } from "@/app/lib/site-config"

// Seite stündlich neu erzeugen, damit der Preis im Event-Schema der aktuellen Verkaufsphase folgt
export const revalidate = 3600

export const metadata: Metadata = {
  title: {
    absolute: "Trailrunning Camp Österreich 2027 | Mountaincamp",
  },
  description:
    "5 Tage Trailrunning in Hochkrimml: tägliche Trailruns für alle Level, Vollpension, Workshops und Bus ab Berlin und München. 18. bis 22. August 2027.",
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
    "Mountain Camp",
    "Mountain Camp 2027",
    "Mountain Camp Trailrunning",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: languageAlternates("/"),
  },
  openGraph: {
    title: "Mountaincamp 2027 | Trailrunning Camp in Österreich",
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
    title: "Mountaincamp 2027 | Trailrunning Camp in Österreich",
    description:
      "5 Tage Trailrunning, Workshops und Community in den österreichischen Alpen. Hochkrimml, 18. bis 22. August 2027.",
    images: [OG_IMAGE.url],
  },
}

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ["The Mountaincamp", "Mountain Camp", "The Mountain Camp", "Mountain Camp Hochkrimml"],
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

function buildStructuredData(config: SiteConfig) {
  return {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: ["The Mountaincamp", "Mountain Camp"],
      inLanguage: ["de", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    eventSchema("de", config),
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
}

export default async function Home() {
  const structuredData = buildStructuredData(await getSiteConfig())
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <HomePageClient />
    </>
  )
}
