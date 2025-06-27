"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useMobile } from "@/hooks/use-mobile"

export default function ModernHero() {
  const { t, language } = useLanguage()
  const isMobile = useMobile()
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg-new.jpg"
          alt="Mountain landscape"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />

        {/* Animated color overlay */}
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay animate-pulse-light" />
      </div>

      {/* Diagonal lines decoration */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg width="100%" height="100%" className="opacity-20">
          <defs>
            <pattern
              id="diagonalLines"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: heroTextY, opacity: heroOpacity, scale: heroScale }}
        className="container relative z-20 flex flex-col items-center justify-center text-center text-white px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 inline-block border-2 border-primary px-6 py-2 rounded-full"
        >
          <span className="text-sm md:text-base font-mono uppercase tracking-widest">{t("heroDate")}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tight text-shadow-glow shadow-primary">
            THE
            <br />
            MOUNTAIN<span className="text-primary">CAMP</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8 max-w-2xl text-lg md:text-xl font-light"
        >
          <span className="bg-black/50 px-2 py-1 rounded-sm">
            {t("heroSubtitle1")}
            <br />
            {t("heroSubtitle2")}
            <br />
            <span className="font-bold text-primary">{t("heroSubtitle3")}</span>
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white rounded-full text-lg px-8 shadow-lg"
              asChild
            >
              <Link href="#about">{t("learnMore")}</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white/10 rounded-full text-lg px-8"
              asChild
            >
              <a
                href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("registerNow")}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="h-10 w-10 text-white" />
      </motion.div>
    </section>
  )
}
