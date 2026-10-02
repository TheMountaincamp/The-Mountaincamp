import type { Metadata } from "next"
import { pageMetadata, breadcrumb, jsonLd } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/trails",
  title: "Trailrunning Routen rund um Hochkrimml",
  description:
    "Trailrunning rund um Hochkrimml: Beispielrouten vom Seekarsee über die Zittauer Hütte bis zu den Krimmler Wasserfällen. Tägliche Trailruns in Gruppen für jedes Level.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb("Trails", "/trails"))} />
      {children}
    </>
  )
}
