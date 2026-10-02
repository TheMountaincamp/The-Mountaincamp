import type { Metadata } from "next"
import { pageMetadata } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/datenschutz",
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von The Mountaincamp: welche Daten wir auf themountaincamp.de verarbeiten und warum.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
