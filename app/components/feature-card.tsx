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
      className="group relative overflow-hidden border-2 border-primary/30 bg-card p-8 hover:border-primary transition-all duration-500 shadow-lg hover:shadow-primary/20"
      whileHover={{
        y: -8,
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
      <div className="mb-6 flex h-12 w-12 items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold uppercase transition-transform duration-300 group-hover:translate-x-1">
        {title}
      </h3>
      <p className="text-sm text-white/70">{description}</p>
      <div className="absolute bottom-0 right-0 h-10 w-10 translate-y-full translate-x-full transform bg-primary opacity-20 transition-transform duration-700 ease-out group-hover:translate-y-0 group-hover:translate-x-0"></div>
    </motion.div>
  )
}
