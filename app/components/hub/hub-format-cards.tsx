import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Format = {
  caption: string
  badge: string
  badgeVariant: "filled" | "outline"
  title: string
  description: string
  cta: string
  href: string
  accent: string
  accentSoft: string
}

const formats: Format[] = [
  {
    caption: "COMMUNITY",
    badge: "Buchbar",
    badgeVariant: "filled",
    title: "Community",
    description:
      "Das Original-Camp. 18.–22. August 2027 in Hochkrimml. 4 Nächte, 3 Lauftage, jedes Level, jedes Tempo.",
    cta: "Ticket sichern",
    href: "/community",
    accent: "var(--mc-rose)",
    accentSoft: "color-mix(in srgb, var(--mc-rose) 14%, transparent)",
  },
  {
    caption: "PERFORMANCE",
    badge: "Coming Soon",
    badgeVariant: "outline",
    title: "Performance",
    description:
      "Für Läufer:innen, die an ihre Grenzen wollen — mehr Struktur, mehr Höhenmeter, ein klares Ziel.",
    cta: "Jetzt benachrichtigen lassen",
    href: "/performance",
    accent: "var(--mc-mist)",
    accentSoft: "color-mix(in srgb, var(--mc-mist) 14%, transparent)",
  },
  {
    caption: "ADVENTURE",
    badge: "Coming Soon",
    badgeVariant: "outline",
    title: "Adventure",
    description: "Der leichte Einstieg ins Trailrunning — kleine Gruppen, viel Anleitung, kein Druck.",
    cta: "Jetzt benachrichtigen lassen",
    href: "/adventure",
    accent: "var(--mc-sage)",
    accentSoft: "color-mix(in srgb, var(--mc-sage) 14%, transparent)",
  },
]

export function HubFormatCards() {
  return (
    <section className="container pb-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {formats.map((format) => (
          <Link
            key={format.caption}
            href={format.href}
            style={
              {
                "--accent": format.accent,
                background: `linear-gradient(160deg, ${format.accentSoft}, transparent 60%)`,
              } as React.CSSProperties
            }
            className="group flex flex-col gap-5 rounded-sm border border-mc-white/10 p-8 transition-all duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-oswald text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {format.caption}
              </span>
              <Badge
                variant={format.badgeVariant === "filled" ? "default" : "outline"}
                className={
                  format.badgeVariant === "filled"
                    ? "border-transparent bg-[var(--accent)] text-mc-black"
                    : "border-[var(--accent)] text-[var(--accent)]"
                }
              >
                {format.badge}
              </Badge>
            </div>

            <h2 className="font-oswald text-2xl font-semibold uppercase text-mc-white">{format.title}</h2>

            <p className="text-base leading-relaxed text-mc-dust">{format.description}</p>

            <span className="mt-auto flex items-center gap-2 font-oswald text-sm font-semibold uppercase tracking-wide text-mc-orange">
              {format.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
