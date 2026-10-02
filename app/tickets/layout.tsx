import type { Metadata } from "next"
import { pageMetadata, breadcrumb, jsonLd } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/tickets",
  title: "Tickets für das Trailrunning Camp 2027",
  description:
    "Tickets für The Mountaincamp 2027 direkt buchen: 5 Tage Trailrunning, Workshops und Community in Hochkrimml, 18. bis 22. August 2027.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb("Tickets", "/tickets"))} />
      {children}
    </>
  )
}
