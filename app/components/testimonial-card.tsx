"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  light?: boolean
}

export default function TestimonialCard({ quote, light = false }: TestimonialCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden border p-8 hover:border-primary transition-all duration-500 ${
        light ? "border-gray-200 bg-white shadow-md hover:shadow-lg" : "border-primary/20 bg-card"
      }`}
      whileHover={{
        y: -8,
        boxShadow: light ? "0 10px 30px -15px rgba(95, 92, 149, 0.3)" : "0 10px 30px -15px rgba(95, 92, 149, 0.3)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`absolute right-4 top-4 ${light ? "text-primary/20" : "text-primary/20"}`}
        whileHover={{
          rotate: 15,
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
      >
        <Quote size={40} />
      </motion.div>
      <p className={`mb-4 text-sm italic ${light ? "text-gray-600" : "text-white/70"}`}>{quote}</p>
    </motion.div>
  )
}
