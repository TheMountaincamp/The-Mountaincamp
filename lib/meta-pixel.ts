// Meta Pixel: wird erst nach Einwilligung in Marketing-Cookies geladen (siehe components/meta-pixel.tsx).
// trackMeta() ist ohne Einwilligung ein No-op, weil window.fbq dann nicht existiert.

export const META_PIXEL_ID = "1409955967166261"

type FbqParams = Record<string, string | number | boolean | string[]>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

export function trackMeta(event: string, params?: FbqParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return
  if (params) window.fbq("track", event, params)
  else window.fbq("track", event)
}
