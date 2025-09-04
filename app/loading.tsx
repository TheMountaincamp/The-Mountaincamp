"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useImagePreload } from "@/hooks/use-image-preload"

// Critical images to preload before showing the homepage
const CRITICAL_IMAGES = [
  "/images/hero-trail-runners.jpeg", // New hero image
  "/images/MTC-Logo_2025.png",
  "/images/MTC-Logo_2025_weiß.png",
  "/images/trail-runner-1.jpeg",
  "/images/mountain-top-sunset-rave.jpg", // Updated mountain rave image reference
  "/images/mountain-trail-runner.jpeg",
  "/images/campfire-evening.jpeg",
]

export default function Loading() {
  const { imagesPreloaded, progress } = useImagePreload(CRITICAL_IMAGES)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (imagesPreloaded) {
      // Add a small delay before hiding the loader for a smoother transition
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [imagesPreloaded])

  if (!showLoader) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative mb-8 h-20 w-60">
        <img
          src="/images/MTC-Logo_2025_weiß.png"
          alt="The Mountaincamp Logo"
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="w-64 overflow-hidden rounded-full bg-gray-800">
        <motion.div
          className="h-1 bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <p className="mt-4 text-sm text-white/60">Loading experience... {Math.round(progress)}%</p>
    </div>
  )
}
