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

const inter = Inter({ subsets: ["latin"] })

// Define critical images to preload
const CRITICAL_IMAGES = [
  "/images/hero-trail-runners.jpeg", // New hero image
  "/images/MTC-Logo_2025.png",
  "/images/MTC-Logo_2025_weiß.png",
  "/images/trail-runner-1.jpeg",
  "/images/mountain-rave.jpeg",
]

export const metadata: Metadata = {
  title: "The Mountaincamp - Trailrunning, Community, Party",
  description:
    "Trailrunning, Community, Party - Join the ultimate alpine adventure at The Mountaincamp 2025. Limited spots available. Book now and transform your running experience!",
  keywords: [
    "The Mountaincamp",
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
    description:
      "Experience the ultimate alpine adventure at The Mountaincamp. 4 nights, epic trails, unforgettable parties. Limited spots - secure yours today!",
    url: "https://themountaincamp.de",
    siteName: "The Mountaincamp",
    images: [
      {
        url: "/images/hero-trail-runners.jpeg",
        width: 1200,
        height: 630,
        alt: "The Mountaincamp - Trail runners in the Austrian Alps",
      },
      {
        url: "/images/mountain-rave.jpeg",
        width: 1200,
        height: 630,
        alt: "Sunset Rave at The Mountaincamp - Party in the mountains",
      },
      {
        url: "/images/trail-runner-1.jpeg",
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
    { media: "(prefers-color-scheme: light)", color: "#5f5c95" },
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
    <html lang="de" suppressHydrationWarning>
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
        {/* Vercel Speed Insights Script */}
        <Script strategy="afterInteractive" src="/_vercel/speed-insights/script.js" />
      </body>
    </html>
  )
}
