import type { Metadata } from "next"
import HomePageClient from "@/app/home-page-client"
import { faqsEN } from "@/app/data/faq"
import { SITE_URL, SITE_NAME, OG_IMAGE, jsonLd, languageAlternates } from "@/app/lib/seo"
import { eventSchema } from "@/app/lib/event-schema"

// Stündlich neu erzeugen, damit der Preis im Event-Schema der aktuellen Verkaufsphase folgt
export const revalidate = 3600

const TITLE = "Trail Running Camp Austria 2027 | Mountaincamp"
const DESCRIPTION =
  "5 days of trail running in Hochkrimml, Austria: daily trail runs for all levels, full board, workshops and shuttles from Berlin and Munich. 18 to 22 August 2027."

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/en`, languages: languageAlternates("/") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/en`,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "en_US",
    alternateLocale: ["de_DE"],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    eventSchema("en"),
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/en#faq`,
      inLanguage: "en",
      mainEntity: faqsEN.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
}

export default function EnHome() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <HomePageClient />
    </>
  )
}
