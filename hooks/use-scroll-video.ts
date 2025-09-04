"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsVideoLoaded(true)
    }

    const handleScroll = () => {
      if (!video || !isVideoLoaded) return

      // Get scroll position as percentage of viewport height
      const scrollTop = window.pageYOffset
      const windowHeight = window.innerHeight
      const scrollPercent = Math.min(scrollTop / windowHeight, 1)

      // Set video time based on scroll position
      const videoDuration = video.duration
      if (videoDuration && !isNaN(videoDuration)) {
        video.currentTime = scrollPercent * videoDuration
      }
    }

    video.addEventListener("loadeddata", handleLoadedData)
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial call to set video position
    handleScroll()

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isVideoLoaded])

  return { videoRef, isVideoLoaded }
}
