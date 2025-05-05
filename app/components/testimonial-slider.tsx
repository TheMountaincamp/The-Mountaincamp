"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  name: string
  program: string
  quote: string
  image?: string
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
    <div className="relative overflow-hidden rounded-xl bg-gray-50 p-8 shadow-lg">
      <div className="absolute right-8 top-8 text-primary/20">
        <Quote size={80} />
      </div>

      <div className="relative h-[300px]">
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
            <p className="mb-8 text-lg italic text-gray-600">{testimonials[currentIndex].quote}</p>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src={testimonials[currentIndex].image || "/placeholder.svg?height=100&width=100"}
                  alt={testimonials[currentIndex].name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">{testimonials[currentIndex].name}</h3>
                <p className="text-secondary font-medium">{testimonials[currentIndex].program}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2">
        <button
          onClick={goToPrevious}
          className="rounded-full bg-gray-200 p-2 text-primary transition-colors hover:bg-primary hover:text-white"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goToNext}
          className="rounded-full bg-gray-200 p-2 text-primary transition-colors hover:bg-primary hover:text-white"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
