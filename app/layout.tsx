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
import DebugImagePaths from "@/app/components/debug-image-paths"

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
  title: "Trailrunning Camp Österreich | The Mountaincamp 2026 – 5.–9. August in den Alpen",
  description:
    "Trailrunning Camp in Österreich – The Mountaincamp 2026 vom 5.–9. August: Lauf, erlebe & verbinde dich mit anderen auf den Trails der Alpen. Für jedes Level.",
  keywords: [
    // Primary keywords - German
    "trailrunning camp Österreich",
    "trailrunning camp Austria",
    "trailrunning camp Alpen",
    "trailrunning camp alps",
    // Training camp variations
    "trailrunning trainings camp",
    "trailrunning trainings camp Österreich",
    "trailrunning trainings camp Austria",
    "trailrunning trainings camp alps",
    "trailrunning training camp Alpen",
    // Festival variations
    "trailrunning festival Alpen",
    "trailrunning festival Österreich",
    "trailrunning festival Austria",
    "trailrunning festival alps",
    // Trip variations
    "trailrunning trip Österreich",
    "trailrunning trip Austria",
    "trailrunning trip Alpen",
    "trailrunning trip alps",
    // Additional variations
    "alpine trailrunning camp",
    "trailrunning camp europe",
    "trail running camp Austria",
    "trail running camp alps",
    "mountain running camp alps",
    "trail running trainings camp",
    "trail running festival Austria",
    "trail running trip alps",
    // Brand and location
    "Lovetrails",
    "Lovetrails Festival",
    "The Mountaincamp",
    "trail running Austria",
    "alpine trail running",
    "mountain running Austria",
    "trail running holiday Austria",
    "trail running vacation alps",
    "Hochkrimml trailrunning",
    "Austrian Alps running",
    "trail running event Austria",
    "mountain training camp",
    "alpine running camp",
    "trail running coaching Austria",
    "running camp Austrian Alps",
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
    canonical: "https://themountaincamp.de",
    languages: {
      "de-DE": "https://themountaincamp.de",
      "en-US": "https://themountaincamp.de/en",
      "x-default": "https://themountaincamp.de",
    },
  },
  openGraph: {
    title: "Trailrunning Camp Österreich | The Mountaincamp 2026 – 5.–9. August in den Alpen",
    description:
      "Erlebe das ultimative Trailrunning Camp in Österreich! 5 Tage epische Trails, Training & Community in den Alpen. Trailrunning Festival für alle Levels. Hochkrimml, 5.-9. August 2026.",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp - Alpine Trailrunning Camp Austria",
    images: [
      {
        url: "https://themountaincamp.de/images/hero-trail-runners.jpeg",
        width: 1200,
        height: 630,
        alt: "Trailrunning Camp Austria Alps - The Mountaincamp group running in Austrian Alps mountains",
      },
    ],
    locale: "de_DE",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trailrunning Camp Österreich | The Mountaincamp 2026 – 5.–9. August",
    description:
      "Ultimatives Trailrunning Camp in Österreich: 5 Tage epische Trails, Training & Community in den Alpen. Für alle Levels. Hochkrimml, August 2026.",
    images: ["https://themountaincamp.de/images/hero-trail-runners.jpeg"],
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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="title" content="Trailrunning Camp Österreich | The Mountaincamp 2026 – 5.–9. August in den Alpen" />
        <meta
          name="description"
          content="Trailrunning Camp in Österreich – The Mountaincamp 2026 vom 5.–9. August: Lauf, erlebe & verbinde dich mit anderen auf den Trails der Alpen. Für jedes Level."
        />

        <link rel="alternate" hrefLang="de" href="https://themountaincamp.de" />
        <link rel="alternate" hrefLang="en" href="https://themountaincamp.de/en" />
        <link rel="alternate" hrefLang="x-default" href="https://themountaincamp.de" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://my.camps.digital" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />

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
              <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                {children}
                <CookieBanner />
                <Analytics />
                <DebugImagePaths />
              </ThemeProvider>
            </CookieConsentProvider>
          </LanguageProvider>
        </Suspense>
        <Script strategy="afterInteractive" src="/_vercel/speed-insights/script.js" async />
      </body>
    </html>
  )
}
