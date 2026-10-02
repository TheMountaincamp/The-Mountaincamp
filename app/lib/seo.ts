/**
 * Gemeinsame SEO-Bausteine: Basis-URL, Vorschaubild, Profile, Hilfen für
 * Metadaten und strukturierte Daten (JSON-LD).
 */
import type { Metadata } from "next"

export const SITE_URL = "https://themountaincamp.de"
export const SITE_NAME = "The Mountaincamp"

/** Vorschaubild für Social Media und Suchergebnisse, exakt 1200 x 630 px */
export const OG_IMAGE = {
  url: "/images/og-mountaincamp.jpg",
  width: 1200,
  height: 630,
  alt: "Trailrunning Camp in den österreichischen Alpen: Teilnehmende des Mountaincamp in Hochkrimml",
}

export const SAME_AS = [
  "https://www.instagram.com/the_mountaincamp/",
  "https://www.youtube.com/@the_mountaincamp",
  "https://www.tiktok.com/@themountaincamp",
  "https://www.strava.com/clubs/1861496",
]

/** Metadaten für eine Unterseite mit eigener Canonical-URL und eigenem Vorschautext */
export function pageMetadata(opts: { path: string; title: string; description: string; noindex?: boolean }): Metadata {
  const url = opts.path === "/" ? SITE_URL : `${SITE_URL}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      locale: "de_DE",
      alternateLocale: ["en_US"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [OG_IMAGE.url],
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

/** Brotkrümel-Pfad für Unterseiten (Startseite > Unterseite) */
export function breadcrumb(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "The Mountaincamp", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  }
}

/** JSON-LD sicher als String für ein <script type="application/ld+json"> */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") }
}
