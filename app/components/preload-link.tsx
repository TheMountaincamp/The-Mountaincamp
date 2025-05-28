"use client"

import { useState } from "react"
import Link from "next/link"
import type { LinkProps } from "next/link"
import type { ReactNode } from "react"

interface PreloadLinkProps extends LinkProps {
  children: ReactNode
  imagesToPreload?: string[]
  className?: string
}

export default function PreloadLink({ children, imagesToPreload = [], className = "", ...props }: PreloadLinkProps) {
  const [preloaded, setPreloaded] = useState(false)

  const preloadImages = () => {
    if (preloaded || imagesToPreload.length === 0) return

    imagesToPreload.forEach((src) => {
      const img = new Image()
      img.src = src
      img.crossOrigin = "anonymous"
    })

    setPreloaded(true)
  }

  return (
    <Link {...props} className={className} onMouseEnter={preloadImages} onTouchStart={preloadImages}>
      {children}
    </Link>
  )
}
