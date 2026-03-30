"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function PlaylistPage() {
  const { t, language } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with background image */}
      <div className="relative h-[40vh] min-h-[300px]">
        <Image
          src="/images/mountain-top-sunset-rave.jpg"
          alt="Mountain rave sunset"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("playlistTitle")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-2xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("playlistDesc")}
          </motion.p>
        </div>

        <motion.div
          className="absolute top-6 left-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>{language === "de" ? "Zuruck" : "Back"}</span>
          </Link>
        </motion.div>
      </div>

      {/* Spotify Embed */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              style={{ borderRadius: "12px" }}
              src={`https://open.spotify.com/embed/playlist/33kezN4oDEMyKsFBCicpu6?utm_source=generator&theme=0`}
              width="100%"
              height="552"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="shadow-2xl"
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/MTC-Logo_2025_wei&#xDF;.png"
                alt="The Mountaincamp Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
                unoptimized={true}
              />
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-white/60 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/house" className="text-white/60 hover:text-primary transition-colors">
                {language === "de" ? "Haus" : "House"}
              </Link>
              <Link href="/trails" className="text-white/60 hover:text-primary transition-colors">
                Trails
              </Link>
            </div>
          </div>
        </div>
      </footer>
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"
import SiteFooter from "@/app/components/site-footer"

export default function PlaylistPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Spotify Playlist Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 mb-16 relative overflow-hidden rounded-xl"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/mountain-top-sunset-rave.jpg"
                alt="Mountain rave"
                fill
                className="object-cover"
                loading="lazy"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-12 text-white">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4 text-white">{t("playlistTitle")}</h1>
                <p className="max-w-2xl mx-auto text-white/80">{t("playlistDesc")}</p>
              </div>
              <div className="flex justify-center">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/playlist/33kezN4oDEMyKsFBCicpu6?utm_source=generator&theme=0&cache=${Date.now()}`}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="max-w-3xl shadow-2xl"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
