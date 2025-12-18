"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowUp, Clock, RouteIcon, ExternalLink } from "lucide-react"

interface RouteData {
  title: string
  difficulty: string
  duration: string
  distance: string
  elevation: string
  link: string
  image: string
}

interface RouteCarouselProps {
  routes: RouteData[]
}

export default function RouteCarousel({ routes }: RouteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % routes.length)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + routes.length) % routes.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Swipe handlers for mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext()
    }
    if (touchStart - touchEnd < -75) {
      goToPrevious()
    }
  }

  const currentRoute = routes[currentIndex]

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <div className="relative py-8">
      {/* Main carousel container */}
      <div
        ref={carouselRef}
        className="relative h-[450px] md:h-[500px] mx-auto flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute"
          >
            <RouteCard route={currentRoute} isActive={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-primary/80 p-2 md:p-3 text-white backdrop-blur-sm transition-all hover:bg-primary"
        aria-label="Previous route"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-primary/80 p-2 md:p-3 text-white backdrop-blur-sm transition-all hover:bg-primary"
        aria-label="Next route"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Route counter */}
      <div className="text-center mt-4 text-gray-600 font-medium">
        {currentIndex + 1} / {routes.length}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {routes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to route ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

interface RouteCardProps {
  route: RouteData
  isActive?: boolean
}

function RouteCard({ route, isActive = false }: RouteCardProps) {
  return (
    <div className="relative w-[280px] sm:w-[320px] md:w-[380px] h-[380px] md:h-[420px] rounded-xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 z-10">
        <Image
          src={route.image || "/placeholder.svg"}
          alt={route.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20"></div>

      <div className="absolute bottom-0 left-0 p-4 md:p-6 z-30 w-full">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-primary/80 px-2 py-1 rounded text-white text-xs font-medium mb-2 inline-block">
              {route.difficulty}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white mt-2">{route.title}</h3>
          </div>
          {isActive && (
            <a
              href={route.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/80 p-2 rounded-full text-white hover:bg-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 my-3 text-sm text-white/90">
          <div className="flex items-center gap-1">
            <RouteIcon className="h-4 w-4" />
            <span>{route.distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowUp className="h-4 w-4" />
            <span>{route.elevation}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{route.duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
