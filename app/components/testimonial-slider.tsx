"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  name: string
  program?: string
  quote: string
  question?: string
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
    <div className="relative overflow-hidden bg-gray-50 p-8">
      <div className="absolute right-8 top-8 text-primary/20">
        <Quote size={80} />
      </div>

      <div className="relative h-[460px] sm:h-[340px] md:h-[300px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:justify-center sm:gap-10"
          >
            {testimonials[currentIndex].image && (
              <div className="relative -mb-8 h-44 w-32 flex-shrink-0 self-center sm:h-[calc(100%+2rem)] sm:w-[200px] sm:self-end">
                <Image
                  src={testimonials[currentIndex].image!}
                  alt={`${testimonials[currentIndex].name}, Teilnehmende am Mountaincamp`}
                  fill
                  sizes="(min-width: 640px) 190px, 128px"
                  className="object-contain object-bottom"
                />
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              {testimonials[currentIndex].question && (
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                  {testimonials[currentIndex].question}
                </p>
              )}
              <p className="text-lg italic text-gray-600">{testimonials[currentIndex].quote}</p>
              {testimonials[currentIndex].image && (
                <p className="mt-4 font-bold text-gray-900">
                  {testimonials[currentIndex].name}
                  {testimonials[currentIndex].program && (
                    <span className="font-normal text-gray-500">, {testimonials[currentIndex].program}</span>
                  )}
                </p>
              )}
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
