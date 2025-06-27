import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://themountaincamp.de"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/", "/api/", "/temp/", "/_next/", "/node_modules/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "bingbot",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        crawlDelay: 10,
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap-images.xml`, `${baseUrl}/sitemap-news.xml`],
    host: baseUrl,
  }
}
