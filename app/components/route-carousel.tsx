"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
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
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCurrentX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      const diff = currentX - startX
      if (diff > 50) {
        goToPrevious()
      } else if (diff < -50) {
        goToNext()
      }
      setIsDragging(false)
    }
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      setCurrentX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    if (isDragging) {
      const diff = currentX - startX
      if (diff > 50) {
        goToPrevious()
      } else if (diff < -50) {
        goToNext()
      }
      setIsDragging(false)
    }
  }

  // Calculate indices for visible routes
  const prevIndex = (currentIndex - 1 + routes.length) % routes.length
  const nextIndex = (currentIndex + 1) % routes.length
  const prev2Index = (currentIndex - 2 + routes.length) % routes.length
  const next2Index = (currentIndex + 2) % routes.length

  return (
    <div className="relative py-8 overflow-hidden">
      <div
        ref={carouselRef}
        className="relative h-[500px] mx-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Previous 2 Route */}
          <div
            className="absolute transform -translate-x-[500px] scale-50 opacity-30 z-10 transition-all duration-500"
            style={{ filter: "blur(2px)" }}
          >
            <RouteCard route={routes[prev2Index]} />
          </div>

          {/* Previous Route */}
          <div className="absolute transform -translate-x-[250px] scale-75 opacity-60 z-20 transition-all duration-500">
            <RouteCard route={routes[prevIndex]} />
          </div>

          {/* Current Route */}
          <div className="absolute z-30 transition-all duration-500">
            <RouteCard route={routes[currentIndex]} isActive={true} />
          </div>

          {/* Next Route */}
          <div className="absolute transform translate-x-[250px] scale-75 opacity-60 z-20 transition-all duration-500">
            <RouteCard route={routes[nextIndex]} />
          </div>

          {/* Next 2 Route */}
          <div
            className="absolute transform translate-x-[500px] scale-50 opacity-30 z-10 transition-all duration-500"
            style={{ filter: "blur(2px)" }}
          >
            <RouteCard route={routes[next2Index]} />
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-primary/80 p-3 text-white backdrop-blur-sm transition-all hover:bg-primary"
        aria-label="Previous route"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-primary/80 p-3 text-white backdrop-blur-sm transition-all hover:bg-primary"
        aria-label="Next route"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {routes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-primary" : "bg-white/50"
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
    <motion.div
      className="relative w-[320px] h-[400px] rounded-xl overflow-hidden shadow-xl"
      whileHover={{ scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 z-10">
        <Image
          src={route.image || "/placeholder.svg"}
          alt={route.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20"></div>

      <div className="absolute bottom-0 left-0 p-6 z-30 w-full">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-primary/80 px-2 py-1 rounded text-white text-xs font-medium mb-2 inline-block">
              {route.difficulty}
            </span>
            <h3 className="text-xl font-bold text-white mt-2">{route.title}</h3>
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

        <div className="flex flex-wrap gap-4 my-3 text-sm text-white/90">
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
    </motion.div>
  )
}
