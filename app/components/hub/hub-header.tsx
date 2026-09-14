"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MountaincampLogo } from "@/components/brand/mountaincamp-logo"

export function HubHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-mc-black/80 backdrop-blur-md border-b border-mc-white/10" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-4"
        >
          <MountaincampLogo className="h-5 w-auto text-mc-white" />
          <span className="sr-only">Mountaincamp</span>
        </Link>
      </div>
    </header>
  )
}
