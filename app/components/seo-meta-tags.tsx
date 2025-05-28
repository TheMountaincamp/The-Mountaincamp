import Head from "next/head"

interface SEOMetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
  locale?: string
  siteName?: string
}

export default function SEOMetaTags({
  title = "The Mountaincamp - Das größte Trailrunning-Camp in den österreichischen Alpen",
  description = "🏔️ THE MOUNTAINCAMP - Das ultimative Trailrunning-Erlebnis in den österreichischen Alpen! 6.-10. August 2025 ⭐ 4 Nächte, epische Trails, unvergessliche Partys ⭐ Jetzt anmelden!",
  keywords = [],
  image = "https://themountaincamp.de/images/hero-bg-new.jpg",
  url = "https://themountaincamp.de",
  type = "website",
  locale = "de_DE",
  siteName = "The Mountaincamp",
}: SEOMetaTagsProps) {
  const keywordString = keywords.length > 0 ? keywords.join(", ") : ""

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordString && <meta name="keywords" content={keywordString} />}
      <meta name="author" content="The Mountaincamp Team" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@themountaincamp" />
      <meta name="twitter:creator" content="@themountaincamp" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Mountaincamp" />

      {/* Geo Meta Tags */}
      <meta name="geo.region" content="AT-5" />
      <meta name="geo.placename" content="Hochkrimml, Austria" />
      <meta name="geo.position" content="47.2393;12.1735" />
      <meta name="ICBM" content="47.2393, 12.1735" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Alternate Language URLs */}
      <link rel="alternate" hrefLang="de" href="https://themountaincamp.de" />
      <link rel="alternate" hrefLang="en" href="https://themountaincamp.de/en" />
      <link rel="alternate" hrefLang="x-default" href="https://themountaincamp.de" />
    </Head>
  )
}
