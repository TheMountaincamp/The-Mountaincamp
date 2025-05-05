"use client"

import type React from "react"

import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import Image from "next/image"

interface ParallaxSectionProps {
  image: string
  title: string
  subtitle: string
  children?: React.ReactNode
}

export default function ParallaxSection({ image, title, subtitle, children }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="container relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-5xl font-bold">{title}</h2>
          <p className="mb-8 text-xl text-white/80">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
