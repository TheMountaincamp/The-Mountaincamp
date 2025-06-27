"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  quote: string
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

export default function TestimonialSlider({ testimonials, autoPlay = true, interval = 8000 }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoPlay) return

    const intervalId = setInterval(goToNext, interval)
    return () => clearInterval(intervalId)
  }, [autoPlay, interval])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  return (
    <div className="relative overflow-hidden bg-transparent p-8">
      <div className="absolute right-8 top-8 text-gray-600">
        <Quote size={80} />
      </div>

      <div className="relative h-[200px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-center"
          >
            <p className="mb-8 text-lg italic text-gray-300 text-center max-w-4xl mx-auto">
              "{testimonials[currentIndex].quote}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2">
        <button
          onClick={goToPrevious}
          className="rounded-full bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goToNext}
          className="rounded-full bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? "w-4 bg-white" : "bg-gray-500"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
