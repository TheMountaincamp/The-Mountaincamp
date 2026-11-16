import type { Metadata } from "next"
import Page from "@/app/house/page"
import { pageMetadata, jsonLd, SITE_URL } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/house",
  bilingual: "en",
  title: "Accommodation in Hochkrimml",
  description:
    "The mountain house of the Mountaincamp in Hochkrimml: rooms, full board, sauna and Wi-Fi. This is where you stay during the trail running camp, 18 to 22 August 2027.",
})

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Mountaincamp", item: `${SITE_URL}/en` },
    { "@type": "ListItem", position: 2, name: "Accommodation", item: `${SITE_URL}/en/house` },
  ],
}

export default function EnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbs)} />
      <Page />
    </>
  )
}
