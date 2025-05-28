"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook to preload images
 * @param imageSources Array of image URLs to preload
 * @returns Object containing loading status
 */
export function useImagePreload(imageSources: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)

  useEffect(() => {
    if (!imageSources || imageSources.length === 0) {
      setImagesPreloaded(true)
      return
    }

    let isMounted = true
    const totalImages = imageSources.length
    let loaded = 0
    let errors = 0

    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
      img.crossOrigin = "anonymous"

      img.onload = () => {
        if (!isMounted) return
        loaded++
        setLoadedCount(loaded)

        if (loaded + errors === totalImages) {
          setImagesPreloaded(true)
        }
      }

      img.onerror = () => {
        if (!isMounted) return
        errors++
        setErrorCount(errors)
        console.error(`Failed to preload image: ${src}`)

        if (loaded + errors === totalImages) {
          setImagesPreloaded(true)
        }
      }
    }

    // Start preloading all images
    imageSources.forEach(preloadImage)

    return () => {
      isMounted = false
    }
  }, [imageSources])

  return {
    imagesPreloaded,
    loadedCount,
    errorCount,
    progress: imageSources.length > 0 ? (loadedCount / imageSources.length) * 100 : 100,
  }
}
