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

export const metadata: Metadata = {
  title: "The Mountaincamp - Das größte Trailrunning-Camp in den Alpen | August 2025",
  description:
    "🏔️ THE MOUNTAINCAMP - Das ultimative Trailrunning-Erlebnis in den österreichischen Alpen! 6.-10. August 2025 ⭐ 4 Nächte, epische Trails, unvergessliche Partys ⭐ Jetzt anmelden - begrenzte Plätze!",
  keywords: [
    "The Mountaincamp",
    "Mountaincamp",
    "Mountain Camp",
    "trailrunning camp",
    "trail running austria",
    "österreichische alpen",
    "hochkrimml",
    "salzburg",
    "trailrunning österreich",
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
  ],
  authors: [{ name: "The Mountaincamp Team" }],
  creator: "The Mountaincamp",
  publisher: "The Mountaincamp",
  metadataBase: new URL("https://themountaincamp.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Mountaincamp - Das größte Trailrunning-Camp in den Alpen",
    description:
      "🏔️ THE MOUNTAINCAMP - Das ultimative Trailrunning-Erlebnis in den österreichischen Alpen! 6.-10. August 2025",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp",
    images: [
      {
        url: "/images/hero-bg-new.jpg",
        width: 1200,
        height: 630,
        alt: "The Mountaincamp - Epic trail running in the Austrian Alps",
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
        <link rel="canonical" href="https://themountaincamp.de" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://my.camps.digital" />

        {/* Preload critical images */}
        <link rel="preload" href="/images/hero-bg-new.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/images/MTC-Logo-2025-new.png" as="image" fetchPriority="high" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FF5A5F" />

        {/* SEO Meta Tags */}
        <meta name="geo.region" content="AT-5" />
        <meta name="geo.placename" content="Hochkrimml, Austria" />
        <meta name="geo.position" content="47.2393;12.1735" />
        <meta name="ICBM" content="47.2393, 12.1735" />
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

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "The Mountaincamp 2025",
              description: "Das ultimative Trailrunning-Erlebnis in den österreichischen Alpen",
              startDate: "2025-08-06",
              endDate: "2025-08-10",
              location: {
                "@type": "Place",
                name: "Hochkrimml, Austrian Alps",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Hochkrimml",
                  addressRegion: "Salzburg",
                  addressCountry: "Austria",
                },
              },
              offers: {
                "@type": "Offer",
                price: "420",
                priceCurrency: "EUR",
                url: "https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/",
              },
              organizer: {
                "@type": "Organization",
                name: "The Mountaincamp",
                url: "https://themountaincamp.de",
              },
            }),
          }}
        />

        <Script
          id="organization-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Mountaincamp",
              url: "https://themountaincamp.de",
              logo: "https://themountaincamp.de/images/MTC-Logo-2025-new.png",
              sameAs: [
                "https://www.instagram.com/the_mountaincamp/",
                "https://www.facebook.com/profile.php?id=61566807910764",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+43-677-63455763",
                email: "themountaincampde@gmail.com",
                contactType: "customer service",
              },
            }),
          }}
        />

        {/* Vercel Speed Insights */}
        <Script strategy="afterInteractive" src="/_vercel/speed-insights/script.js" />
      </body>
    </html>
  )
}
