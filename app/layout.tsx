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

// Kritische Bilder zum Vorladen - Updated with new hero image
const CRITICAL_IMAGES = [
  "/images/hero-mountaincamp-runners.jpg",
  "/images/MTC-Logo-2025-new.png",
  "/images/trail-runner-action.jpg",
  "/images/mountain-rave-new.jpg",
]

export const metadata: Metadata = {
  title: "The Mountaincamp - Trailrunning, Community, Party",
  description: "Das größte Trailrunning-Camp in den österreichischen Alpen. 6.-10. August 2025 in Hochkrimml.",
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
    description: "Das größte Trailrunning-Camp in den österreichischen Alpen. 6.-10. August 2025 in Hochkrimml.",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp",
    images: ["/images/hero-mountaincamp-runners.jpg"],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mountaincamp - Trailrunning, Community, Party",
    description:
      "Experience the ultimate alpine adventure at The Mountaincamp. 4 nights, epic trails, unforgettable parties. Limited spots - secure yours today!",
    images: ["/images/hero-mountaincamp-runners.jpg"],
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
        {/* Vercel Speed Insights Script */}
        <Script strategy="afterInteractive" src="/_vercel/speed-insights/script.js" />
      </body>
    </html>
  )
}
