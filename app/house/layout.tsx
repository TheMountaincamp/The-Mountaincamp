import type { Metadata } from "next"
import { pageMetadata, breadcrumb, jsonLd } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/house",
  title: "Unterkunft in Hochkrimml",
  description:
    "Das Berghaus des Mountaincamp in Hochkrimml: Zimmer, Frühstück, Lunch und Abendessen, Sauna und WLAN. Hier wohnst du während des Trailrunning Camps vom 18. bis 22. August 2027.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb("Unterkunft", "/house"))} />
      {children}
    </>
  )
}
