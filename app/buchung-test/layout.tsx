import type { Metadata } from "next"
import type { ReactNode } from "react"

// Testseite für eine eigene Buchungsstrecke. Nicht indexieren, nicht in die Sitemap.
export const metadata: Metadata = {
  title: "Buchung (Test)",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
