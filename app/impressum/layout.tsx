import type { Metadata } from "next"
import { pageMetadata } from "@/app/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/impressum",
  title: "Impressum",
  description: "Impressum von the Mountaincamp, Trailrunning Camp in Hochkrimml, Österreich.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
