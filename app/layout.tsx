import * as React from "react"
import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsentProvider } from "@/contexts/cookie-consent-context"
import { LanguageProvider } from "@/contexts/language-context"
import CookieBanner from "@/components/cookie-banner"
import MetaPixel from "@/components/meta-pixel"
import Script from "next/script"
import { OG_IMAGE } from "@/app/lib/seo"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

const CRITICAL_IMAGES = [
  "/images/hero-trail-runners.jpeg",
  "/images/mountaincamp-logo-black.png",
  "/images/mountaincamp-logo-white.png",
]

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://themountaincamp.de"),

  title: {
    default: "Trailrunning Camp Österreich 2027 | The Mountaincamp in Hochkrimml",
    template: "%s | The Mountaincamp",
  },

  description:
    "Trailrunning Camp in den österreichischen Alpen: 5 Tage tägliche Trailruns, Workshops und Community in Hochkrimml. Für alle Level, 18. bis 22. August 2027.",

  applicationName: "The Mountaincamp",
  authors: [{ name: "The Mountaincamp", url: "https://themountaincamp.de" }],
  creator: "The Mountaincamp",
  publisher: "The Mountaincamp",
  formatDetection: { telephone: false, email: false, address: false },

  openGraph: {
    title: "The Mountaincamp 2027 | Trailrunning Camp in Österreich",
    description:
      "5 Tage Trailrunning, Workshops und Community in den österreichischen Alpen. Hochkrimml, 18. bis 22. August 2027.",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp",
    images: [OG_IMAGE],
    locale: "de_DE",
    alternateLocale: ["en_US"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Mountaincamp 2027 | Trailrunning Camp in Österreich",
    description:
      "5 Tage Trailrunning, Workshops und Community in den österreichischen Alpen. Hochkrimml, 18. bis 22. August 2027.",
    images: [OG_IMAGE.url],
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

        <link rel="dns-prefetch" href="https://open.spotify.com" />
        <link rel="dns-prefetch" href="https://www.komoot.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {CRITICAL_IMAGES.map((src, index) =>
          React.createElement("link", {
            key: index,
            rel: "preload",
            href: src,
            as: "image",
            fetchpriority: "high",
          }),
        )}

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
                <MetaPixel />
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
