"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ActivityCardProps {
  title: string
  description: string
  image: string
  icon: React.ReactNode
}

export default function ActivityCard({ title, description, image, icon }: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative h-80 overflow-hidden rounded-xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <motion.p
          className="text-sm text-white/80"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}
