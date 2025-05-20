"use client"

import { useEffect } from "react"

export default function DebugImagePaths() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") return

    console.log("Checking for image paths...")

    // Get all image elements
    const images = document.querySelectorAll("img")

    // Log image paths
    images.forEach((img, index) => {
      console.log(`Image ${index}:`, {
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        currentSrc: img.currentSrc,
      })

      // Add error event listener
      img.addEventListener("error", () => {
        console.error(`Failed to load image ${index}:`, img.src)
      })
    })
  }, [])

  return null
}
