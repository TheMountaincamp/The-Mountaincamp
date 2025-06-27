import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { Montserrat, Space_Mono, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsentProvider } from "@/contexts/cookie-consent-context"
import { LanguageProvider } from "@/contexts/language-context"
import CookieBanner from "@/components/cookie-banner"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"

// Schriftarten bleiben unverändert
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
})

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue",
})

// Erweiterte SEO-Metadaten (nur für Suchmaschinen, kein visueller Einfluss)
export const metadata: Metadata = {
  title: "The Mountaincamp - Das größte Trailrunning-Camp in den Alpen | August 2025",
  description:
    "🏔️ THE MOUNTAINCAMP - Das ultimative Trailrunning-Erlebnis in den österreichischen Alpen! 6.-10. August 2025 ⭐ 4 Nächte, epische Trails, unvergessliche Partys ⭐ Jetzt anmelden - begrenzte Plätze!",

  // Erweiterte Keywords für bessere Auffindbarkeit (unsichtbar für User)
  keywords: [
    "The Mountaincamp",
    "Mountaincamp",
    "trail running camps austria",
    "trailrunning camp österreich",
    "mountain camp austria",
    "österreichische alpen",
    "hochkrimml",
    "salzburg",
    "trailrunning österreich",
    "trail running austria",
    "mountain running",
    "alpine running",
    "running community",
    "sunset rave",
    "bergläufe",
    "laufcamp",
    "aktivurlaub",
    "bergsport",
    "outdoor adventure",
    "august 2025",
    "trail running vacation",
    "mountaincamp 2025",
    "the mountaincamp 2025",
    "austrian alps",
    "trail running camps austrian alps",
    "best trail running camps austria",
    "premier trail running camps",
  ],

  authors: [{ name: "The Mountaincamp Team" }],
  creator: "The Mountaincamp",
  publisher: "The Mountaincamp",
  metadataBase: new URL("https://themountaincamp.de"),

  alternates: {
    canonical: "/",
    languages: {
      de: "/",
      "de-AT": "/",
      en: "/en",
      "x-default": "/",
    },
  },

  // Erweiterte Open Graph Daten
  openGraph: {
    title: "The Mountaincamp - Das größte Trailrunning-Camp in den Alpen",
    description:
      "🏔️ THE MOUNTAINCAMP - Das ultimative Trailrunning-Erlebnis in den österreichischen Alpen! 6.-10. August 2025",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp - Austria's Premier Trail Running Experience",
    images: [
      {
        url: "/images/hero-bg-new.jpg",
        width: 1200,
        height: 630,
        alt: "The Mountaincamp - Epic trail running in the Austrian Alps",
      },
      {
        url: "/images/mountain-rave-new.jpg",
        width: 1200,
        height: 630,
        alt: "Sunset Rave Party at The Mountaincamp",
      },
    ],
    locale: "de_DE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Mountaincamp - Das größte Trailrunning-Camp in den Alpen",
    description:
      "🏔️ THE MOUNTAINCAMP - Das ultimative Trailrunning-Erlebnis! 6.-10. August 2025 in den österreichischen Alpen",
    images: ["/images/hero-bg-new.jpg"],
    creator: "@themountaincamp",
    site: "@themountaincamp",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/favicon.png" },
      { url: "/apple-icon.png" },
      { url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${montserrat.variable} ${spaceMono.variable} ${bebasNeue.variable}`}
    >
      <head>
        {/* SEO-kritische Tags (unsichtbar für User) */}
        <link rel="canonical" href="https://themountaincamp.de" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://my.camps.digital" />

        {/* Preload kritische Bilder für Performance */}
        <link rel="preload" href="/images/hero-bg-new.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/images/MTC-Logo-2025-new.png" as="image" fetchPriority="high" />

        {/* Favicon (unverändert) */}
        <link rel="icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FF5A5F" />

        {/* Geo-Location für lokale SEO (unsichtbar) */}
        <meta name="geo.region" content="AT-5" />
        <meta name="geo.placename" content="Hochkrimml, Austria" />
        <meta name="geo.position" content="47.2393;12.1735" />
        <meta name="ICBM" content="47.2393, 12.1735" />

        {/* Sprach-Alternativen für internationale SEO */}
        <link rel="alternate" hrefLang="de" href="https://themountaincamp.de" />
        <link rel="alternate" hrefLang="de-at" href="https://themountaincamp.de" />
        <link rel="alternate" hrefLang="en" href="https://themountaincamp.de/en" />
        <link rel="alternate" hrefLang="x-default" href="https://themountaincamp.de" />
      </head>

      <body className="antialiased">
        <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
          <LanguageProvider>
            <CookieConsentProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                {children}
                <CookieBanner />
                <Analytics />
              </ThemeProvider>
            </CookieConsentProvider>
          </LanguageProvider>
        </Suspense>

        {/* Strukturierte Daten für Suchmaschinen (komplett unsichtbar für User) */}
        <Script
          id="mountaincamp-organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "@id": "https://themountaincamp.de/#organization",
              name: "The Mountaincamp",
              alternateName: [
                "Mountaincamp",
                "Mountain Camp",
                "THE MOUNTAINCAMP",
                "Trail Running Camps Austria",
                "Austria's Premier Trail Running Camp",
              ],
              url: "https://themountaincamp.de",
              logo: {
                "@type": "ImageObject",
                url: "https://themountaincamp.de/images/MTC-Logo-2025-new.png",
                width: 1000,
                height: 400,
              },
              description:
                "The Mountaincamp is Austria's premier trail running camp, offering the ultimate trail running camps Austria experience in the Austrian Alps.",
              sport: "Trail Running",
              areaServed: {
                "@type": "Country",
                name: "Austria",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hochkrimml",
                addressRegion: "Salzburg",
                addressCountry: "AT",
                postalCode: "5743",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.2393,
                longitude: 12.1735,
              },
              sameAs: [
                "https://www.instagram.com/the_mountaincamp/",
                "https://www.facebook.com/profile.php?id=61566807910764",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+43-677-63455763",
                email: "themountaincampde@gmail.com",
                contactType: "customer service",
                availableLanguage: ["German", "English"],
              },
            }),
          }}
        />

        <Script
          id="mountaincamp-event-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsEvent",
              "@id": "https://themountaincamp.de/#event",
              name: "The Mountaincamp 2025 - Austria's Premier Trail Running Camp",
              alternateName: ["Mountaincamp 2025", "Trail Running Camps Austria 2025", "The Mountain Camp Austria"],
              description:
                "Join The Mountaincamp 2025 - Austria's premier trail running camp in the Austrian Alps. The ultimate trail running camps Austria experience.",
              startDate: "2025-08-06T00:00:00+02:00",
              endDate: "2025-08-10T23:59:59+02:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              sport: "Trail Running",
              location: {
                "@type": "Place",
                name: "Hochkrimml, Austrian Alps",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Hochkrimml",
                  addressRegion: "Salzburg",
                  addressCountry: "AT",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 47.2393,
                  longitude: 12.1735,
                },
              },
              image: [
                "https://themountaincamp.de/images/hero-bg-new.jpg",
                "https://themountaincamp.de/images/mountain-rave-new.jpg",
              ],
              offers: {
                "@type": "Offer",
                name: "The Mountaincamp 2025 - Complete Package",
                price: "420",
                priceCurrency: "EUR",
                availability: "https://schema.org/LimitedAvailability",
                url: "https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/",
              },
              organizer: {
                "@type": "Organization",
                "@id": "https://themountaincamp.de/#organization",
                name: "The Mountaincamp",
              },
            }),
          }}
        />

        <Script
          id="mountaincamp-website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://themountaincamp.de/#website",
              name: "The Mountaincamp - Austria's Premier Trail Running Camps",
              alternateName: "Mountaincamp Austria",
              url: "https://themountaincamp.de",
              description:
                "The Mountaincamp offers Austria's premier trail running camps experience in the Austrian Alps.",
              inLanguage: ["de", "en"],
              about: [
                {
                  "@type": "Thing",
                  name: "Trail Running Camps Austria",
                },
                {
                  "@type": "Thing",
                  name: "The Mountaincamp",
                },
                {
                  "@type": "Thing",
                  name: "Mountaincamp",
                },
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://themountaincamp.de/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Vercel Speed Insights (unverändert) */}
        <Script strategy="afterInteractive" src="/_vercel/speed-insights/script.js" />
      </body>
    </html>
  )
}
