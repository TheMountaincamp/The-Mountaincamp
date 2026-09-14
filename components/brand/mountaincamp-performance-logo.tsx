import { cn } from "@/lib/utils"
import { MountaincampLogo, MountaincampMTC } from "@/components/brand/mountaincamp-logo"

// Exact "PERFORMANCE" tagline glyphs, extracted from the official combined artwork
// (viewBox 0 0 519.2 146.1), cropped to the tagline's tight bounding box so it can
// be sized and centered independently below the wordmark.
const PERFORMANCE_TAGLINE_LOGO_PATH =
  "M425.9,145.8h12v-1.5h-10.2v-7.2h9.2v-1.5h-9.2v-6.5h10.2v-1.5h-12v18.1ZM405.5,132.8c-.9-3.4-3.8-5.3-7.1-5.3-5,0-8,3.6-8,9.4s3,9.3,7.9,9.3,6.1-1.9,7.1-5.2h-1.9c-.9,2.4-2.8,3.7-5.2,3.7-3.9,0-6.1-2.9-6.1-7.8s2.3-7.8,6.1-7.8,4.5,1.4,5.3,3.7h1.9ZM355.7,145.8h1.8v-15.5l1,1.7,9.2,13.8h1.9v-18.1h-1.8v15.5l-.9-1.6-9.2-13.9h-1.9v18.1ZM327.1,130.9l.5-1.4.5,1.4,3.5,8.7h-8l3.5-8.7ZM334,145.8h1.9l-7.3-18.1h-2.1l-7.2,18.1h1.8l1.9-4.7h9.1l1.9,4.7ZM281.2,145.8h1.8v-15.9l1.3,3.4,5.4,12.5h1.3l5.4-12.5,1.3-3.5v16h1.8v-18.1h-2.4l-6.1,14.2-.5,1.5-.6-1.5-6.1-14.2h-2.5v18.1ZM254,129.2c2.6,0,4.2,1.4,4.2,3.6s-1.6,3.6-4.2,3.6h-4.3v-7.2h4.4ZM247.9,145.8h1.8v-7.9h4.2c2.4,0,3.4.5,4,3l1.2,4.9h1.9l-1.4-5.3c-.5-1.9-1.2-2.9-2.5-3.4,1.8-.7,2.9-2.2,2.9-4.4,0-3.1-2.3-5-6-5h-6.2v18.1ZM218.8,144.6c-4.1,0-6.5-2.9-6.5-7.8s2.4-7.8,6.5-7.8,6.5,3,6.5,7.8-2.4,7.8-6.5,7.8M218.8,146.1c5.2,0,8.3-3.6,8.3-9.3s-3.2-9.4-8.3-9.4-8.3,3.6-8.3,9.4,3.2,9.3,8.3,9.3M179.3,145.8h1.8v-8.2h9.2v-1.5h-9.2v-7h10.2v-1.5h-12v18.1ZM152.1,129.2c2.6,0,4.2,1.4,4.2,3.6s-1.6,3.6-4.2,3.6h-4.3v-7.2h4.4ZM145.9,145.8h1.8v-7.9h4.2c2.4,0,3.4.5,4,3l1.2,4.9h1.9l-1.4-5.3c-.5-1.9-1.2-2.9-2.5-3.4,1.8-.7,2.9-2.2,2.9-4.4,0-3.1-2.3-5-6-5h-6.2v18.1ZM113.8,145.8h12v-1.5h-10.2v-7.2h9.2v-1.5h-9.2v-6.5h10.2v-1.5h-12v18.1ZM87.2,129.2c2.9,0,4.6,1.6,4.6,4.1s-1.8,4.1-4.7,4.1h-4v-8.3h4.1ZM81.3,145.8h1.8v-6.8h4.1c3.9,0,6.5-2.1,6.5-5.6s-2.5-5.6-6.5-5.6h-5.9v18.1Z"

// Exact "PERFORMANCE" tagline glyphs, extracted from the official combined MTC artwork
// (viewBox 0 0 146.9 101.7), cropped the same way.
const PERFORMANCE_TAGLINE_MTC_PATH =
  "M141.9,101.6h4.9v-.6h-4.2v-3h3.8v-.6h-3.8v-2.7h4.2v-.6h-4.9v7.4ZM133.5,96.2c-.4-1.4-1.6-2.2-2.9-2.2-2.1,0-3.3,1.5-3.3,3.9s1.2,3.8,3.3,3.8,2.5-.8,2.9-2.1h-.8c-.4,1-1.2,1.5-2.2,1.5-1.6,0-2.5-1.2-2.5-3.2s.9-3.2,2.5-3.2,1.9.6,2.2,1.5h.8ZM113,101.6h.7v-6.4l.4.7,3.8,5.7h.8v-7.4h-.7v6.4l-.4-.7-3.8-5.7h-.8v7.4ZM101.2,95.4l.2-.6.2.6,1.4,3.6h-3.3l1.4-3.6ZM104.1,101.6h.8l-3-7.4h-.9l-3,7.4h.7l.8-1.9h3.8l.8,1.9ZM82.3,101.6h.7v-6.6l.5,1.4,2.2,5.2h.5l2.2-5.2.5-1.4v6.6h.7v-7.4h-1l-2.5,5.9-.2.6-.2-.6-2.5-5.9h-1v7.4ZM71.1,94.7c1.1,0,1.7.6,1.7,1.5s-.7,1.5-1.7,1.5h-1.8v-3h1.8ZM68.6,101.6h.7v-3.3h1.7c1,0,1.4.2,1.7,1.2l.5,2h.8l-.6-2.2c-.2-.8-.5-1.2-1-1.4.8-.3,1.2-.9,1.2-1.8,0-1.3-1-2-2.5-2h-2.5v7.4ZM56.6,101c-1.7,0-2.7-1.2-2.7-3.2s1-3.2,2.7-3.2,2.7,1.2,2.7,3.2-1,3.2-2.7,3.2M56.6,101.7c2.1,0,3.4-1.5,3.4-3.8s-1.3-3.9-3.4-3.9-3.4,1.5-3.4,3.9,1.3,3.8,3.4,3.8M40.4,101.6h.7v-3.4h3.8v-.6h-3.8v-2.9h4.2v-.6h-4.9v7.4ZM29.1,94.7c1.1,0,1.7.6,1.7,1.5s-.7,1.5-1.7,1.5h-1.8v-3h1.8ZM26.6,101.6h.7v-3.3h1.7c1,0,1.4.2,1.7,1.2l.5,2h.8l-.6-2.2c-.2-.8-.5-1.2-1-1.4.8-.3,1.2-.9,1.2-1.8,0-1.3-1-2-2.5-2h-2.5v7.4ZM13.4,101.6h4.9v-.6h-4.2v-3h3.8v-.6h-3.8v-2.7h4.2v-.6h-4.9v7.4ZM2.4,94.7c1.2,0,1.9.7,1.9,1.7s-.7,1.7-1.9,1.7H.7v-3.4h1.7ZM0,101.6h.7v-2.8h1.7c1.6,0,2.7-.9,2.7-2.3s-1-2.3-2.7-2.3H0v7.4Z"

// Height ratios derived from the official combined artwork so the wordmark, gap,
// and tagline stay in the exact proportions of the original lockup.
const LOGO_RATIOS = { mark: 99.9 / 145.9, gap: 27.5 / 145.9, tagline: 18.5 / 145.9 }
const MTC_RATIOS = { mark: 73.8 / 101.4, gap: 20.1 / 101.4, tagline: 7.5 / 101.4 }

/**
 * Full wordmark stacked above the "PERFORMANCE" tagline — use wherever the
 * sub-brand needs to be called out explicitly (performance landing pages, hero
 * sections). `height` is the total lockup height in pixels.
 */
export function MountaincampLogoPerformance({
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
      aria-label="Mountaincamp Performance"
    >
      <MountaincampLogo style={{ height: height * LOGO_RATIOS.mark }} className="w-auto" />
      <div style={{ height: height * LOGO_RATIOS.gap }} aria-hidden="true" />
      <svg
        viewBox="81 127 357 19"
        style={{ height: height * LOGO_RATIOS.tagline }}
        className="w-auto"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={PERFORMANCE_TAGLINE_LOGO_PATH} />
      </svg>
    </div>
  )
}

/**
 * Short-form "MTC" mark stacked above the "PERFORMANCE" tagline — use only for
 * very small surfaces (e.g. the footer) where the sub-brand still needs to be
 * legible. `height` is the total lockup height in pixels.
 */
export function MountaincampMTCPerformance({
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
      aria-label="Mountaincamp Performance"
    >
      <MountaincampMTC style={{ height: height * MTC_RATIOS.mark }} className="w-auto" />
      <div style={{ height: height * MTC_RATIOS.gap }} aria-hidden="true" />
      <svg
        viewBox="0 93 146.9 9"
        style={{ height: height * MTC_RATIOS.tagline }}
        className="w-auto"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={PERFORMANCE_TAGLINE_MTC_PATH} />
      </svg>
    </div>
  )
}
