"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}

export default function AnimatedCounter({ end, duration = 2000, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const countRef = useRef(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    setHasAnimated(true)

    const startTime = Date.now()
    const endTime = startTime + duration

    const animateCount = () => {
      const now = Date.now()
      const progress = Math.min(1, (now - startTime) / duration)
      const currentCount = Math.floor(progress * end)

      if (countRef.current !== currentCount) {
        countRef.current = currentCount
        setCount(currentCount)
      }

      if (now < endTime) {
        requestAnimationFrame(animateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animateCount)
  }, [isInView, end, duration, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold text-primary">
        {prefix}
        {count}
        {suffix}
      </p>
    </div>
  )
}
