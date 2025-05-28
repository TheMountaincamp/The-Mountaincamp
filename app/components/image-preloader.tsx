"use client"

import { useEffect } from "react"
import { useImagePreload } from "@/hooks/use-image-preload"

interface ImagePreloaderProps {
  imageSources: string[]
  onComplete?: () => void
}

export default function ImagePreloader({ imageSources, onComplete }: ImagePreloaderProps) {
  const { imagesPreloaded, progress } = useImagePreload(imageSources)

  useEffect(() => {
    if (imagesPreloaded && onComplete) {
      onComplete()
    }
  }, [imagesPreloaded, onComplete])

  // This component doesn't render anything visible
  return null
}
