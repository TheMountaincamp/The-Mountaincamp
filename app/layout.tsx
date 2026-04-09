import type React from "react"
import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsentProvider } from "@/contexts/cookie-consent-context"
import { LanguageProvider } from "@/contexts/language-context"
import CookieBanner from "@/components/cookie-banner"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

const CRITICAL_IMAGES = [
  "/images/hero-trail-runners.jpeg",
  "/images/MTC-Logo_2025.png",
  "/images/MTC-Logo_2025_weiß.png",
]

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5f5c95" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://themountaincamp.de"),

  title: "Trailrunning Camp Österreich 2026 | The Mountaincamp",

  description:
    "5 Tage Trailrunning Camp in Österreich. Trails, Techniktraining, Community und Workshops in den Alpen. Für Anfänger und Fortgeschrittene. Hochkrimml, 5.–9. August 2026.",

  alternates: {
    canonical: "https://themountaincamp.de",
  },

  openGraph: {
    title: "Trailrunning Camp Österreich 2026 | The Mountaincamp",
    description:
      "Trailrunning Camp in Österreich: 5 Tage in den Alpen für alle Levels. Join 130 runners for a trail running camp in the Austrian Alps with coaching, trails and community. Hochkrimml, 5.–9. August 2026.",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp",
    images: [
      {
        url: "/images/hero-trail-runners.jpeg",
        width: 1200,
        height: 630,
        alt: "The Mountaincamp Trailrunning Camp in den österreichischen Alpen",
      },
    ],
    locale: "de_DE",
    alternateLocale: ["en_US"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Trailrunning Camp Österreich 2026 | The Mountaincamp",
    description:
      "5 Tage Trailrunning in den österreichischen Alpen. Join 130 runners for coaching, trails and community in Hochkrimml, 5.–9. August 2026.",
    images: ["/images/hero-trail-runners.jpeg"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.instagram.com" />

        <link rel="dns-prefetch" href="https://my.camps.digital" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />
        <link rel="dns-prefetch" href="https://www.komoot.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {CRITICAL_IMAGES.map((src, index) => (
          <link key={index} rel="preload" href={src} as="image" fetchPriority="high" />
        ))}

        <link rel="icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      </head>

      <body className={inter.className}>
        <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
          <LanguageProvider>
            <CookieConsentProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <CookieBanner />
                <Analytics />
              </ThemeProvider>
            </CookieConsentProvider>
          </LanguageProvider>
        </Suspense>

        <Script
          strategy="afterInteractive"
          src="/_vercel/speed-insights/script.js"
          async
        />
      </body>
    </html>
  )
}