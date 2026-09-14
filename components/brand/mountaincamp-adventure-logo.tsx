import { cn } from "@/lib/utils"
import { MountaincampLogo, MountaincampMTC } from "@/components/brand/mountaincamp-logo"

// Exact "ADVENTURE" tagline glyphs, extracted from the official combined artwork
// (viewBox 0 0 519.2 146.2), cropped to the tagline's tight bounding box so it can
// be sized and centered independently below the wordmark.
const ADVENTURE_TAGLINE_LOGO_PATH =
  "M393.8,145.9h12.2v-1.5h-10.4v-7.3h9.4v-1.5h-9.4v-6.6h10.4v-1.5h-12.2v18.4ZM366,128.9c2.6,0,4.3,1.4,4.3,3.7s-1.7,3.7-4.3,3.7h-4.4v-7.3h4.4ZM359.7,145.9h1.8v-8.1h4.3c2.5,0,3.5.5,4.1,3l1.2,5h1.9l-1.4-5.5c-.5-2-1.2-3-2.6-3.5,1.9-.7,3-2.3,3-4.4,0-3.1-2.4-5.1-6.1-5.1h-6.3v18.4ZM337.9,138.9v-11.4h-1.8v11.4c0,3.6-2,5.8-5.3,5.8s-5.3-2.2-5.3-5.8v-11.4h-1.8v11.4c0,4.5,2.7,7.3,7.2,7.3s7.2-2.8,7.2-7.3M295,145.9h1.8v-16.9h6.5v-1.6h-14.9v1.6h6.5v16.9ZM253.9,145.9h1.8v-15.8l1,1.7,9.4,14.1h1.9v-18.4h-1.8v15.8l-.9-1.6-9.4-14.2h-1.9v18.4ZM221.1,145.9h12.2v-1.5h-10.4v-7.3h9.4v-1.5h-9.4v-6.6h10.4v-1.5h-12.2v18.4ZM185.8,127.4h-1.9l7.4,18.4h2.1l7.4-18.4h-1.8l-6.1,15.2-.5,1.4-.5-1.4-6.1-15.2ZM156,144.4h-3.8v-15.5h3.8c4.6,0,7.4,2.9,7.4,7.8s-2.8,7.7-7.4,7.7M150.4,145.9h5.6c5.7,0,9.3-3.4,9.3-9.2s-3.6-9.2-9.3-9.2h-5.6v18.4ZM121.1,130.7l.5-1.4.5,1.4,3.6,8.9h-8.1l3.6-8.9ZM128.2,145.9h1.9l-7.4-18.4h-2.1l-7.4,18.4h1.8l1.9-4.8h9.3l1.9,4.8Z"

// Exact "ADVENTURE" tagline glyphs, extracted from the official combined MTC artwork
// (viewBox 0 0 120.4 101.6), cropped the same way.
const ADVENTURE_TAGLINE_MTC_PATH =
  "M115.4,101.4h5v-.6h-4.3v-3h3.9v-.6h-3.9v-2.7h4.3v-.6h-5v7.6ZM104,94.5c1.1,0,1.8.6,1.8,1.5s-.7,1.5-1.8,1.5h-1.8v-3h1.8ZM101.4,101.4h.7v-3.3h1.8c1,0,1.4.2,1.7,1.2l.5,2.1h.8l-.6-2.2c-.2-.8-.5-1.2-1.1-1.4.8-.3,1.2-.9,1.2-1.8,0-1.3-1-2.1-2.5-2.1h-2.6v7.6ZM92.4,98.6v-4.7h-.8v4.7c0,1.5-.8,2.4-2.2,2.4s-2.2-.9-2.2-2.4v-4.7h-.8v4.7c0,1.9,1.1,3,3,3s2.9-1.1,2.9-3M74.8,101.4h.8v-6.9h2.7v-.6h-6.1v.6h2.7v6.9ZM57.9,101.4h.7v-6.5l.4.7,3.9,5.8h.8v-7.6h-.8v6.5l-.4-.7-3.9-5.8h-.8v7.6ZM44.4,101.4h5v-.6h-4.3v-3h3.9v-.6h-3.9v-2.7h4.3v-.6h-5v7.6ZM29.9,93.9h-.8l3,7.6h.9l3-7.6h-.7l-2.5,6.3-.2.6-.2-.6-2.5-6.3ZM17.6,100.8h-1.6v-6.4h1.6c1.9,0,3,1.2,3,3.2s-1.1,3.2-3,3.2M15.3,101.4h2.3c2.3,0,3.8-1.4,3.8-3.8s-1.5-3.8-3.8-3.8h-2.3v7.6ZM3.3,95.2l.2-.6.2.6,1.5,3.7H1.8l1.5-3.7ZM6.2,101.4h.8l-3-7.6h-.9l-3,7.6h.7l.8-2h3.8l.8,2Z"

// Height ratios derived from the official combined artwork so the wordmark, gap,
// and tagline stay in the exact proportions of the original lockup.
const LOGO_RATIOS = { mark: 99.9 / 145.9, gap: 27.5 / 145.9, tagline: 18.5 / 145.9 }
const MTC_RATIOS = { mark: 73.8 / 101.4, gap: 20.1 / 101.4, tagline: 7.5 / 101.4 }

/**
 * Full wordmark stacked above the "ADVENTURE" tagline — use wherever the
 * sub-brand needs to be called out explicitly (adventure landing pages, hero
 * sections). `height` is the total lockup height in pixels.
 */
export function MountaincampLogoAdventure({
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
      aria-label="Mountaincamp Adventure"
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
        <path d={ADVENTURE_TAGLINE_LOGO_PATH} />
      </svg>
    </div>
  )
}

/**
 * Short-form "MTC" mark stacked above the "ADVENTURE" tagline — use only for
 * very small surfaces (e.g. the footer) where the sub-brand still needs to be
 * legible. `height` is the total lockup height in pixels.
 */
export function MountaincampMTCAdventure({
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
      aria-label="Mountaincamp Adventure"
    >
      <MountaincampMTC style={{ height: height * MTC_RATIOS.mark }} className="w-auto" />
      <div style={{ height: height * MTC_RATIOS.gap }} aria-hidden="true" />
      <svg
        viewBox="0 93 120.4 9"
        style={{ height: height * MTC_RATIOS.tagline }}
        className="w-auto"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={ADVENTURE_TAGLINE_MTC_PATH} />
      </svg>
    </div>
  )
}
