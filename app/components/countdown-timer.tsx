"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      <motion.div
        className="border border-primary/30 bg-black/50 p-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={timeLeft.days}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold"
          >
            {timeLeft.days}
          </motion.div>
        </AnimatePresence>
        <div className="text-xs uppercase text-white/70">Days</div>
      </motion.div>

      <motion.div
        className="border border-primary/30 bg-black/50 p-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={timeLeft.hours}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold"
          >
            {timeLeft.hours}
          </motion.div>
        </AnimatePresence>
        <div className="text-xs uppercase text-white/70">Hours</div>
      </motion.div>

      <motion.div
        className="border border-primary/30 bg-black/50 p-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={timeLeft.minutes}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold"
          >
            {timeLeft.minutes}
          </motion.div>
        </AnimatePresence>
        <div className="text-xs uppercase text-white/70">Minutes</div>
      </motion.div>

      <motion.div
        className="border border-primary/30 bg-black/50 p-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={timeLeft.seconds}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold"
          >
            {timeLeft.seconds}
          </motion.div>
        </AnimatePresence>
        <div className="text-xs uppercase text-white/70">Seconds</div>
      </motion.div>
    </div>
  )
}
