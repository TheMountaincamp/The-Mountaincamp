import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Trailrunning Camp Austria Alps | The Mountaincamp 2026",
  description:
    "Join Austria's premier trailrunning camp in the Alps! 5-day alpine adventure with epic trails, expert coaching & community. August 5-9, 2026 Hochkrimml.",
  keywords: [
    "trailrunning camp Austria",
    "trailrunning camp alps",
    "alpine trailrunning camp",
    "trailrunning camp europe",
    "Austria trailrunning camp",
    "alps trailrunning camp",
    "trail running camp Austria",
    "mountain running camp alps",
    "trailrunning Österreich",
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
    "trail running festival alps",
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
    title: "Trailrunning Camp Austria Alps | The Mountaincamp 2026",
    description:
      "Austria's premier trailrunning camp in the Alps. 5 days of epic alpine trails, expert coaching, and unforgettable community. August 5-9, 2026 in Hochkrimml.",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp - Alpine Trailrunning Camp Austria",
    images: [
      {
        url: "https://themountaincamp.de/images/hero-trail-runners.jpeg",
        width: 1200,
        height: 630,
        alt: "Trailrunning Camp Austria Alps - The Mountaincamp group running in Austrian Alps",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trailrunning Camp Austria Alps | The Mountaincamp",
    description:
      "Join Austria's premier alpine trailrunning camp! Epic trails, expert coaching & community in the Austrian Alps. August 5-9, 2026.",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5f5c95" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
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
