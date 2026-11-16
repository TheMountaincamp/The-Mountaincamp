import type { MetadataRoute } from "next"
import { SITE_URL } from "@/app/lib/seo"

// Ersetzt die frühere statische sitemap.xml. Englische Fassungen liegen unter
// derselben URL (Sprachumschalter), deshalb keine eigenen /en-Adressen.
// Feste Änderungsdaten: nur anpassen, wenn sich der Inhalt der Seite wirklich
// ändert. Ein Datum, das bei jedem Aufruf "heute" ist, wertet Google ab.
const UPDATED = {
  home: "2026-11-16",
  tickets: "2026-11-16",
  trails: "2026-11-01",
  house: "2026-11-01",
  bus: "2026-11-10",
  legal: "2026-11-11",
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: UPDATED.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${SITE_URL}/tickets`, lastModified: UPDATED.tickets, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/trails`, lastModified: UPDATED.trails, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/house`, lastModified: UPDATED.house, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/bus-departures`, lastModified: UPDATED.bus, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/agb`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/impressum`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
  ]
}
