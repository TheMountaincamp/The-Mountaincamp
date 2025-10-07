"use client"

import { motion } from "framer-motion"
import { Instagram, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

interface InstagramReel {
  id: string
  url: string
  caption: string
  captionDe: string
}

const reels: InstagramReel[] = [
  {
    id: "DOY4eu9jNej",
    url: "https://www.instagram.com/reel/DOY4eu9jNej/",
    caption: "Trail Running",
    captionDe: "Trail Running",
  },
  {
    id: "DNFxZ4ns8Nr",
    url: "https://www.instagram.com/reel/DNFxZ4ns8Nr/",
    caption: "Mountain Views",
    captionDe: "Bergpanorama",
  },
  {
    id: "DNIUf5jsUCL",
    url: "https://www.instagram.com/reel/DNIUf5jsUCL/",
    caption: "Camp Life",
    captionDe: "Camp Leben",
  },
  {
    id: "DNcmu4FMUiW",
    url: "https://www.instagram.com/reel/DNcmu4FMUiW/",
    caption: "Alpine Adventure",
    captionDe: "Alpen Abenteuer",
  },
  {
    id: "DPgNPYhjMqW",
    url: "https://www.instagram.com/reel/DPgNPYhjMqW/",
    caption: "Summit Moments",
    captionDe: "Gipfelmomente",
  },
  {
    id: "DNaW6bKMuYr",
    url: "https://www.instagram.com/reel/DNaW6bKMuYr/",
    caption: "Trail Community",
    captionDe: "Trail Community",
  },
]

export default function InstagramReelsSection() {
  const { language } = useLanguage()

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {language === "de" ? "Live von den Trails" : "Live from the Trails"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === "de"
              ? "Erlebe die besten Momente vom Mountaincamp"
              : "Experience the best moments from The Mountaincamp"}
          </p>
        </motion.div>

        {/* Carousel container with peek effect */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left gradient fade for peek effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />

          {/* Right gradient fade for peek effect */}
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4 md:px-12">
            {reels.map((reel, index) => (
              <motion.a
                key={reel.id}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative flex-shrink-0 w-[240px] md:w-[280px] snap-center"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
                  <Image
                    src={`https://www.instagram.com/p/${reel.id}/media/?size=l`}
                    alt={language === "de" ? reel.captionDe : reel.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, 280px"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      <Play className="h-8 w-8 text-gray-900 fill-gray-900 ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 text-white">
                      <Instagram className="h-5 w-5" />
                      <span className="font-semibold text-sm">{language === "de" ? reel.captionDe : reel.caption}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a
              href="https://www.instagram.com/the_mountaincamp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <Instagram className="h-6 w-6" />
              <span>{language === "de" ? "Mehr auf Instagram" : "See more on Instagram"}</span>
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
