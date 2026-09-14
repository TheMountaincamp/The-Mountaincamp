"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MountaincampClaim } from "@/components/brand/mountaincamp-claim"
import { cn } from "@/lib/utils"

type FormatId = "community" | "performance" | "adventure"

type Format = {
  id: FormatId
  label: string
  image: string
  alt: string
  badge: string
  badgeVariant: "filled" | "outline"
  title: string
  description: string
  cta: string
  href: string
  accent: string
}

const formats: Format[] = [
  {
    id: "community",
    label: "Community",
    image: "/images/hero-trail-runners.jpeg",
    alt: "Gruppe von Trailrunnerinnen und Trailrunnern läuft gemeinsam durch die Berge",
    badge: "Buchbar",
    badgeVariant: "filled",
    title: "4 Nächte. 3 Lauftage. 100% Community.",
    description:
      "Das Original-Camp. 18.–22. August 2027 in Hochkrimml. Jedes Level, jedes Tempo — der Trail verbindet.",
    cta: "Ticket sichern",
    href: "/community",
    accent: "var(--mc-rose)",
  },
  {
    id: "performance",
    label: "Performance",
    image: "/images/mountain-trail-runner.jpeg",
    alt: "Trailrunnerin läuft konzentriert einen steilen Bergpfad hinauf",
    badge: "Coming Soon",
    badgeVariant: "outline",
    title: "Für die, die weiter wollen.",
    description: "Mehr Struktur, mehr Höhenmeter, ein klares Ziel. Details folgen 2027.",
    cta: "Jetzt benachrichtigen lassen",
    href: "/performance",
    accent: "var(--mc-mist)",
  },
  {
    id: "adventure",
    label: "Adventure",
    image: "/images/waterfall-group-photo.jpg",
    alt: "Gruppe steht gemeinsam vor einem Wasserfall in den Bergen",
    badge: "Coming Soon",
    badgeVariant: "outline",
    title: "Dein erster Schritt auf den Trail.",
    description: "Kleine Gruppen, viel Anleitung, kein Druck. Details folgen 2027.",
    cta: "Jetzt benachrichtigen lassen",
    href: "/adventure",
    accent: "var(--mc-sage)",
  },
]

export function FormatSwitcher() {
  const [activeFormat, setActiveFormat] = useState<FormatId>("community")
  const format = formats.find((f) => f.id === activeFormat) ?? formats[0]

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-[88vh] w-full flex-col overflow-hidden bg-mc-black">
        {/* Background image crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div
              key={format.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <Image
                src={format.image || "/placeholder.svg"}
                alt={format.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Readability gradient (static) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-mc-black/95 via-mc-black/35 to-transparent"
        />

        {/* Subbrand color wash (fades with format) */}
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
          <AnimatePresence>
            <motion.div
              key={format.id}
              className="absolute inset-0"
              style={{ backgroundColor: format.accent }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        <div className="container relative z-20 flex flex-1 flex-col">
          <div className="pt-6 md:pt-8">
            <MountaincampClaim className="h-4 w-auto text-mc-orange" />
          </div>

          {/* Format tabs */}
          <div
            role="tablist"
            aria-label="Format wählen"
            className="mt-8 flex gap-1 overflow-x-auto pb-1 md:mt-12 md:gap-2"
          >
            {formats.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={activeFormat === f.id}
                onClick={() => setActiveFormat(f.id)}
                style={{ "--accent": f.accent } as React.CSSProperties}
                className={cn(
                  "relative shrink-0 rounded-sm px-3 py-2 font-oswald text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-4 md:text-sm",
                  activeFormat === f.id ? "text-mc-white" : "text-mc-dust/60 hover:text-mc-dust",
                )}
              >
                {f.label.toUpperCase()}
                {activeFormat === f.id && (
                  <motion.span
                    layoutId="format-tab-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--accent)]"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="relative mt-auto max-w-2xl pb-16 pt-10 md:pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={format.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col gap-5"
              >
                <Badge
                  variant={format.badgeVariant === "filled" ? "default" : "outline"}
                  style={{ "--accent": format.accent } as React.CSSProperties}
                  className={cn(
                    "w-fit",
                    format.badgeVariant === "filled"
                      ? "border-transparent bg-[var(--accent)] text-mc-black"
                      : "border-[var(--accent)] text-[var(--accent)]",
                  )}
                >
                  {format.badge}
                </Badge>

                <h1 className="font-oswald max-w-xl text-balance text-[clamp(2rem,5.5vw,3.5rem)] font-semibold uppercase leading-[1.15] text-mc-white">
                  {format.title}
                </h1>

                <p className="max-w-lg text-lg leading-relaxed text-mc-dust">{format.description}</p>

                <Link
                  href={format.href}
                  style={{ "--accent": format.accent } as React.CSSProperties}
                  className={cn(
                    "group mt-2 flex w-fit items-center gap-2 rounded-sm px-6 py-3 font-oswald text-sm font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-4",
                    format.badgeVariant === "filled"
                      ? "bg-[var(--accent)] text-mc-black hover:opacity-90"
                      : "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10",
                  )}
                >
                  {format.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
