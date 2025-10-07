import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // Try to fetch Instagram oEmbed data
    const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&fields=thumbnail_url`

    const response = await fetch(oembedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    })

    if (!response.ok) {
      // Fallback: try to extract media ID and construct thumbnail URL
      const reelId = url.match(/reel\/([^/]+)/)?.[1]
      if (reelId) {
        return NextResponse.json({
          thumbnail_url: `https://www.instagram.com/p/${reelId}/media/?size=l`,
        })
      }
      throw new Error("Failed to fetch thumbnail")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Instagram thumbnail:", error)
    return NextResponse.json({ error: "Failed to fetch thumbnail" }, { status: 500 })
  }
}
