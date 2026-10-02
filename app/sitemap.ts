import type { MetadataRoute } from "next"
import { SITE_URL } from "@/app/lib/seo"

// Ersetzt die frühere statische sitemap.xml. Englische Fassungen liegen unter
// derselben URL (Sprachumschalter), deshalb keine eigenen /en-Adressen.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${SITE_URL}/trails`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/house`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/bus-departures`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/agb`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]
}
