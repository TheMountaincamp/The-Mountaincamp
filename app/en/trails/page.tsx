import type { Metadata } from "next"
import Page from "@/app/trails/page"
import { pageMetadata, jsonLd, SITE_URL } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/trails",
  bilingual: "en",
  title: "Trail running routes around Hochkrimml",
  description:
    "Trail running around Hochkrimml, Austria: routes from the Seekarsee to the Zittauer Hütte and the Krimml Waterfalls. Daily trail runs in groups for every level.",
})

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Mountaincamp", item: `${SITE_URL}/en` },
    { "@type": "ListItem", position: 2, name: "Trails", item: `${SITE_URL}/en/trails` },
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
