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

// Definiere die Schriftarten
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

// Kritische Bilder zum Vorladen
const CRITICAL_IMAGES = [
  "/images/hero-bg-new.jpg",
  "/images/MTC-Logo-2025-new.png",
  "/images/trail-runner-action.jpg",
  "/images/mountain-rave-new.jpg",
]

// Verbesserte SEO-Metadaten
export const metadata: Metadata = {
  title: "The Mountaincamp - Trailrunning, Community, Party",
  description:
    "Trailrunning, Community, Party - Join the ultimate alpine adventure at The Mountaincamp 2025. Limited spots available. Book now and transform your running experience!",
  keywords: [
    "The Mountaincamp",
    "Mountaincamp",
    "trail running camps austria",
    "trailrunning",
    "trail running camp",
    "mountain running",
    "running community",
    "trail races",
    "Austrian Alps",
    "mountain training",
    "trail community",
    "outdoor adventure",
    "running retreat",
    "alpine running",
    "trail running training",
    "mountain party",
    "running vacation",
    "trail running holiday",
    "mountain experience",
    "trail running event",
    "trail running festival",
    "mountain fitness",
    "trail running coaching",
    "alpine trails",
    "mountain adventure",
    "trail running Austria",
    "Hochkrimml",
    "mountaincamp 2025",
    "the mountaincamp 2025",
    "austria trail running camps",
    "best trail running camps austria",
    "premier trail running camps",
  ],
  authors: [{ name: "The Mountaincamp Team" }],
  creator: "The Mountaincamp",
  publisher: "The Mountaincamp",
  category: "Sports & Recreation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://themountaincamp.de"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: "The Mountaincamp - Trailrunning, Community, Party",
    description:
      "Experience the ultimate alpine adventure at The Mountaincamp. 4 nights, epic trails, unforgettable parties. Limited spots - secure yours today!",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp",
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
        alt: "Sunset Rave at The Mountaincamp - Party in the mountains",
      },
      {
        url: "/images/trail-runner-action.jpg",
        width: 1200,
        height: 630,
        alt: "Trail running adventures at The Mountaincamp",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mountaincamp - Trailrunning, Community, Party",
    description:
      "Experience the ultimate alpine adventure at The Mountaincamp. 4 nights, epic trails, unforgettable parties. Limited spots - secure yours today!",
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
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["info@themountaincamp.de"],
    },
  },
  appLinks: {
    ios: {
      url: "https://themountaincamp.de/",
      app_store_id: "app-store-id",
    },
    android: {
      package: "de.themountaincamp.app",
      app_name: "The Mountaincamp",
    },
    web: {
      url: "https://themountaincamp.de/",
      should_fallback: true,
    },
  },
  archives: ["https://themountaincamp.de/archive"],
  bookmarks: ["https://themountaincamp.de/archive"],
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
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF5A5F" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
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
        <link rel="canonical" href="https://themountaincamp.de" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://my.camps.digital" />

        {/* Preload critical images */}
        {CRITICAL_IMAGES.map((src, index) => (
          <link key={index} rel="preload" href={src} as="image" fetchPriority="high" crossOrigin="anonymous" />
        ))}

        {/* Favicon für Safari und andere Browser */}
        <link rel="icon" href="/favicon.png" />
        {/* Favicon für moderne Browser */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Apple Touch Icon für iOS */}
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180.png" />
        {/* Safari Pinned Tab Icon */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FF5A5F" />

        {/* SEO-Verbesserungen - unsichtbar für User */}
        <meta name="geo.region" content="AT-5" />
        <meta name="geo.placename" content="Hochkrimml, Austria" />
        <meta name="geo.position" content="47.2393;12.1735" />
        <meta name="ICBM" content="47.2393, 12.1735" />

        {/* Sprach-Alternativen */}
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

        {/* Strukturierte Daten für SEO */}
        <Script
          id="mountaincamp-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "@id": "https://themountaincamp.de/#organization",
              name: "The Mountaincamp",
              alternateName: ["Mountaincamp", "Mountain Camp", "THE MOUNTAINCAMP", "Trail Running Camps Austria"],
              url: "https://themountaincamp.de",
              logo: {
                "@type": "ImageObject",
                url: "https://themountaincamp.de/images/MTC-Logo-2025-new.png",
                width: 1000,
                height: 400,
              },
              description:
                "The Mountaincamp is Austria's premier trail running camp, offering the ultimate trail running camps Austria experience.",
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
          id="mountaincamp-event"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsEvent",
              "@id": "https://themountaincamp.de/#event",
              name: "The Mountaincamp 2025 - Austria's Premier Trail Running Camp",
              alternateName: ["Mountaincamp 2025", "Trail Running Camps Austria 2025"],
              description: "Join The Mountaincamp 2025 - Austria's premier trail running camp in the Austrian Alps.",
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

        {/* Vercel Speed Insights Script */}
        <Script strategy="afterInteractive" src="/_vercel/speed-insights/script.js" />
      </body>
    </html>
  )
}
