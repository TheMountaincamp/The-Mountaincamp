import type { MetadataRoute } from "next"
import { SITE_URL } from "@/app/lib/seo"

// Ersetzt die frühere statische robots.txt. CSS- und JS-Dateien bleiben
// bewusst erlaubt, damit Google die Seiten vollständig rendern kann.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
