import type { Metadata } from "next"
import { pageMetadata } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/agb",
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen für die Teilnahme am Trailrunning Camp The Mountaincamp in Hochkrimml.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
