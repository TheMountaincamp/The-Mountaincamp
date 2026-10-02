import type { Metadata } from "next"
import { pageMetadata, breadcrumb, jsonLd } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/bus-departures",
  title: "Busanreise zum Trailrunning Camp",
  description:
    "Gemeinsame Busanreise zum Mountaincamp nach Hochkrimml: Abfahrten aus Berlin, München und Jenbach. Abfahrtsorte, Rückfahrt und alles zur Anreise ohne Auto.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb("Anreise", "/bus-departures"))} />
      {children}
    </>
  )
}
