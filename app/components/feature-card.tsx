"use client"

import type React from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 p-8 hover:border-primary/50 transition-all duration-500"
      whileHover={{
        y: -8,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center text-primary bg-primary/10 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-display uppercase transition-transform duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">{description}</p>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 right-0 h-10 w-10 translate-y-full translate-x-full transform bg-primary opacity-20 transition-transform duration-700 ease-out group-hover:translate-y-0 group-hover:translate-x-0"></div>
    </motion.div>
  )
}
