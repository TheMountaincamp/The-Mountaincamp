import { cn } from "@/lib/utils"
import { MountaincampLogo, MountaincampMTC } from "@/components/brand/mountaincamp-logo"

// Exact "COMMUNITY" tagline glyphs, extracted from the official combined artwork
// (viewBox 0 0 519.2 146.4), cropped to the tagline's tight bounding box so it can
// be sized and centered independently below the wordmark.
const COMMUNITY_TAGLINE_LOGO_PATH =
  "M399.3,145.9h1.8v-6.9l6.6-11.4h-1.9l-4.7,8.1-.8,1.7-.9-1.7-4.7-8.1h-2.1l6.7,11.4v6.9ZM364.9,145.9h1.8v-16.7h6.5v-1.6h-14.8v1.6h6.5v16.7ZM336.5,145.9h1.8v-18.3h-1.8v18.3ZM300.7,145.9h1.8v-15.7l1,1.7,9.3,14h1.9v-18.3h-1.8v15.7l-.9-1.6-9.4-14.1h-1.9v18.3h0ZM279.1,139.1v-11.3h-1.8v11.3c0,3.6-2,5.8-5.3,5.8s-5.3-2.2-5.3-5.8v-11.3h-1.8v11.3c0,4.5,2.7,7.3,7.1,7.3s7.1-2.8,7.1-7.3M224.8,145.9h1.8v-16.1l1.3,3.4,5.4,12.7h1.3l5.4-12.7,1.3-3.5v16.2h1.8v-18.3h-2.4l-6.2,14.4-.5,1.6-.6-1.6-6.2-14.4h-2.5v18.3h0ZM184.6,145.9h1.8v-16.1l1.3,3.4,5.4,12.7h1.3l5.4-12.7,1.3-3.5v16.2h1.8v-18.3h-2.4l-6.2,14.4-.5,1.6-.6-1.6-6.2-14.4h-2.5v18.3h0ZM155.2,144.7c-4.1,0-6.6-3-6.6-7.9s2.5-7.9,6.6-7.9,6.6,3,6.6,7.9-2.5,7.9-6.6,7.9M155.2,146.2c5.2,0,8.4-3.6,8.4-9.4s-3.2-9.5-8.4-9.5-8.4,3.7-8.4,9.5,3.2,9.4,8.4,9.4M126.9,132.7c-.9-3.5-3.8-5.4-7.2-5.4-5.1,0-8.1,3.7-8.1,9.5s3,9.4,8,9.4,6.2-1.9,7.2-5.3h-1.9c-.9,2.4-2.9,3.7-5.3,3.7-3.9,0-6.2-3-6.2-7.9s2.3-7.9,6.2-7.9,4.6,1.4,5.4,3.8h1.9Z"

// Exact "COMMUNITY" tagline glyphs, extracted from the official combined MTC artwork
// (viewBox 0 0 121.9 101.7), cropped the same way.
const COMMUNITY_TAGLINE_MTC_PATH =
  "M118.4,101.6h.8v-2.8l2.7-4.7h-.8l-1.9,3.3-.3.7-.4-.7-1.9-3.3h-.9l2.7,4.7v2.8ZM104.3,101.6h.8v-6.9h2.7v-.6h-6.1v.6h2.7v6.9ZM92.6,101.6h.7v-7.5h-.7v7.5ZM77.9,101.6h.7v-6.5l.4.7,3.8,5.8h.8v-7.5h-.8v6.5l-.4-.7-3.9-5.8h-.8v7.5ZM69,98.7v-4.7h-.8v4.7c0,1.5-.8,2.4-2.2,2.4s-2.2-.9-2.2-2.4v-4.7h-.8v4.7c0,1.8,1.1,3,2.9,3s2.9-1.1,2.9-3M46.6,101.6h.7v-6.6l.5,1.4,2.2,5.2h.5l2.2-5.2.5-1.5v6.7h.7v-7.5h-1l-2.5,5.9-.2.6-.2-.6-2.5-5.9h-1v7.5ZM30.1,101.6h.7v-6.6l.5,1.4,2.2,5.2h.5l2.2-5.2.5-1.5v6.7h.7v-7.5h-1l-2.5,5.9-.2.6-.2-.6-2.5-5.9h-1v7.5ZM18,101c-1.7,0-2.7-1.2-2.7-3.2s1-3.3,2.7-3.3,2.7,1.3,2.7,3.3-1,3.2-2.7,3.2M18,101.7c2.1,0,3.5-1.5,3.5-3.9s-1.3-3.9-3.5-3.9-3.5,1.5-3.5,3.9,1.3,3.9,3.5,3.9M6.3,96.1c-.4-1.4-1.6-2.2-3-2.2-2.1,0-3.3,1.5-3.3,3.9s1.3,3.9,3.3,3.9,2.5-.8,3-2.2h-.8c-.4,1-1.2,1.5-2.2,1.5-1.6,0-2.6-1.2-2.6-3.2s1-3.3,2.6-3.3,1.9.6,2.2,1.6h.8Z"

// Height ratios derived from the official combined artwork so the wordmark, gap,
// and tagline stay in the exact proportions of the original lockup.
const LOGO_RATIOS = { mark: 99.9 / 145.9, gap: 27.5 / 145.9, tagline: 18.5 / 145.9 }
const MTC_RATIOS = { mark: 73.8 / 101.4, gap: 20.1 / 101.4, tagline: 7.5 / 101.4 }

/**
 * Full wordmark stacked above the "COMMUNITY" tagline — use wherever the
 * sub-brand needs to be called out explicitly (community landing pages, hero
 * sections). `height` is the total lockup height in pixels.
 */
export function MountaincampLogoCommunity({
  className,
  height = 56,
}: {
  className?: string
  height?: number
}) {
  return (
    <div
      className={cn("inline-flex flex-col items-center", className)}
      role="img"
      aria-label="Mountaincamp Community"
    >
      <MountaincampLogo style={{ height: height * LOGO_RATIOS.mark }} className="w-auto" />
      <div style={{ height: height * LOGO_RATIOS.gap }} aria-hidden="true" />
      <svg
        viewBox="113 127 293 19"
        style={{ height: height * LOGO_RATIOS.tagline }}
        className="w-auto"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={COMMUNITY_TAGLINE_LOGO_PATH} />
      </svg>
    </div>
  )
}

/**
 * Short-form "MTC" mark stacked above the "COMMUNITY" tagline — use only for
 * very small surfaces (e.g. the footer) where the sub-brand still needs to be
 * legible. `height` is the total lockup height in pixels.
 */
export function MountaincampMTCCommunity({
  className,
  height = 40,
}: {
  className?: string
  height?: number
}) {
  return (
    <div
      className={cn("inline-flex flex-col items-center", className)}
      role="img"
      aria-label="Mountaincamp Community"
    >
      <MountaincampMTC style={{ height: height * MTC_RATIOS.mark }} className="w-auto" />
      <div style={{ height: height * MTC_RATIOS.gap }} aria-hidden="true" />
      <svg
        viewBox="0 93 121.9 9"
        style={{ height: height * MTC_RATIOS.tagline }}
        className="w-auto"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={COMMUNITY_TAGLINE_MTC_PATH} />
      </svg>
    </div>
  )
}
