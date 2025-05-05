"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ActivityCardMobileProps {
  title: string
  description: string
  image: string
}

export default function ActivityCardMobile({ title, description, image }: ActivityCardMobileProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="aspect-square overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring", damping: 20 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
        animate={{
          opacity: isExpanded ? 0.95 : 0.8,
        }}
        transition={{ duration: 0.4 }}
      />
      <div className="absolute bottom-0 left-0 p-3 text-white w-full">
        <h3 className="text-base font-bold">{title}</h3>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-white/90 mt-2">{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="mt-1 text-[10px] text-white/70"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {isExpanded ? "Tap to close" : "Tap for details"}
        </motion.div>
      </div>
    </motion.div>
  )
}
