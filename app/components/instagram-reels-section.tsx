"use client"

import { motion } from "framer-motion"
import { Instagram, Play } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface InstagramReel {
  id: string
  url: string
  caption: {
    en: string
    de: string
  }
  thumbnailUrl: string
}

const reels: InstagramReel[] = [
  {
    id: "DOY4eu9jNej",
    url: "https://www.instagram.com/reel/DOY4eu9jNej/",
    caption: {
      en: "Summit Views",
      de: "Gipfelblicke",
    },
    thumbnailUrl: "https://www.instagram.com/p/DOY4eu9jNej/media/?size=l",
  },
  {
    id: "DNcmu4FMUiW",
    url: "https://www.instagram.com/reel/DNcmu4FMUiW/",
    caption: {
      en: "Trail Adventures",
      de: "Trail Abenteuer",
    },
    thumbnailUrl: "https://www.instagram.com/p/DNcmu4FMUiW/media/?size=l",
  },
  {
    id: "DNFxZ4ns8Nr",
    url: "https://www.instagram.com/reel/DNFxZ4ns8Nr/",
    caption: {
      en: "Community Vibes",
      de: "Gemeinschaft",
    },
    thumbnailUrl: "https://www.instagram.com/p/DNFxZ4ns8Nr/media/?size=l",
  },
  {
    id: "DNIUf5jsUCL",
    url: "https://www.instagram.com/reel/DNIUf5jsUCL/",
    caption: {
      en: "Sunset Sessions",
      de: "Sonnenuntergang",
    },
    thumbnailUrl: "https://www.instagram.com/p/DNIUf5jsUCL/media/?size=l",
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
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Right gradient fade for peek effect */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Horizontal scroll container */}
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-8 md:px-16">
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
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  style={{ aspectRatio: "9/16" }}
                >
                  {/* Reel cover image */}
                  <Image
                    src={reel.thumbnailUrl || "/placeholder.svg"}
                    alt={reel.caption[language]}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 280px, 320px"
                    unoptimized
                  />

                  {/* Bottom gradient overlay for caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover overlay with play icon */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white/90 rounded-full p-5 shadow-xl"
                    >
                      <Play className="h-8 w-8 text-gray-900 fill-gray-900" />
                    </motion.div>
                  </motion.div>

                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Instagram className="h-4 w-4 text-white" />
                      <span className="text-xs text-white/80 font-medium">@the_mountaincamp</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{reel.caption[language]}</h3>
                  </div>

                  {/* Instagram reel indicator */}
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-2 shadow-lg">
                    <Instagram className="h-4 w-4 text-white" />
                  </div>
                </motion.div>
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
          <p className="text-gray-600 mb-6">
            {language === "de"
              ? "Aktive Erwachsene in ihren späten 20ern und frühen 30ern, gemeinschaftsorientiert, abenteuerlustig und sozial."
              : "Active adults in their late 20s and early 30s, community-driven, adventurous, and social."}
          </p>
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
