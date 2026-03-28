"use client"

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
