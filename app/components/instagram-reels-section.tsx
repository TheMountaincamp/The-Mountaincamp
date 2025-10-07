"use client"

import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface InstagramReel {
  id: string
  url: string
}

const reels: InstagramReel[] = [
  { id: "DOY4eu9jNej", url: "https://www.instagram.com/reel/DOY4eu9jNej/" },
  { id: "DNcmu4FMUiW", url: "https://www.instagram.com/reel/DNcmu4FMUiW/" },
  { id: "DNFxZ4ns8Nr", url: "https://www.instagram.com/reel/DNFxZ4ns8Nr/" },
  { id: "DNIUf5jsUCL", url: "https://www.instagram.com/reel/DNIUf5jsUCL/" },
]

export default function InstagramReelsSection() {
  const { language } = useLanguage()

  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            {language === "de" ? "Live von den Trails" : "Live from the Trails"}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            {language === "de"
              ? "Erlebe die besten Momente vom Mountaincamp auf Instagram"
              : "Experience the best moments from The Mountaincamp on Instagram"}
          </p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {reels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-[300px] sm:w-[350px] snap-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden bg-gray-900 h-[500px] sm:h-[600px]"
                >
                  {/* Black overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10 pointer-events-none" />

                  {/* Instagram embed iframe */}
                  <iframe
                    src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                    className="w-full h-full border-0"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency
                    allow="encrypted-media"
                  />

                  {/* Hover overlay with Instagram icon */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                    >
                      <Instagram className="h-8 w-8" />
                      <span className="font-medium">
                        {language === "de" ? "Auf Instagram ansehen" : "View on Instagram"}
                      </span>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator gradient on right */}
          <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>

        {/* Follow button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8"
            asChild
          >
            <a
              href="https://www.instagram.com/the_mountaincamp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Instagram className="h-5 w-5" />
              <span>@the_mountaincamp</span>
            </a>
          </Button>
        </motion.div>
      </div>

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
