import type { MetadataRoute } from "next"
import { SITE_URL, languageAlternates } from "@/app/lib/seo"

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
  // Seiten mit deutscher und englischer Fassung (/en), jeweils mit hreflang-Verweis
  const bilingual: [string, string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = [
    ["/", UPDATED.home, "weekly", 1],
    ["/trails", UPDATED.trails, "monthly", 0.8],
    ["/house", UPDATED.house, "monthly", 0.8],
    ["/bus-departures", UPDATED.bus, "monthly", 0.7],
  ]
  const pairs = bilingual.flatMap(([path, lastModified, changeFrequency, priority]) => {
    const languages = languageAlternates(path)
    return [
      { url: languages.de, lastModified, changeFrequency, priority, alternates: { languages } },
      { url: languages.en, lastModified, changeFrequency, priority: priority * 0.9, alternates: { languages } },
    ]
  })
  return [
    ...pairs,
    { url: `${SITE_URL}/tickets`, lastModified: UPDATED.tickets, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/agb`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/impressum`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified: UPDATED.legal, changeFrequency: "yearly", priority: 0.2 },
  ]
}
