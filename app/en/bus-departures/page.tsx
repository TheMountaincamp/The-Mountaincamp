import type { Metadata } from "next"
import Page from "@/app/bus-departures/page"
import { pageMetadata, jsonLd, SITE_URL } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/bus-departures",
  bilingual: "en",
  title: "Bus travel to the trail running camp",
  description:
    "Shared travel to the Mountaincamp in Hochkrimml: departures from Berlin, Munich and Jenbach. Stops, prices and everything about getting there without a car.",
})

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Mountaincamp", item: `${SITE_URL}/en` },
    { "@type": "ListItem", position: 2, name: "Getting there", item: `${SITE_URL}/en/bus-departures` },
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
