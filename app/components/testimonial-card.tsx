"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
}

export default function TestimonialCard({ quote }: TestimonialCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 p-8 hover:border-primary/50 transition-all duration-500 group"
      whileHover={{
        y: -8,
        boxShadow: "0 10px 30px -15px rgba(255, 90, 95, 0.3)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
    >
      <motion.div
        className="absolute right-4 top-4 text-primary/20 group-hover:text-primary/40 transition-colors duration-500"
        whileHover={{
          rotate: 15,
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
      >
        <Quote size={40} />
      </motion.div>

      <div className="relative">
        <p className="mb-4 text-white/70 group-hover:text-white/90 transition-colors duration-300 italic">"{quote}"</p>

        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  )
}
