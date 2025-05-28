"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import ImageWithFallback from "@/app/components/image-with-fallback"

export default function ModernGallery() {
  const { t } = useLanguage()

  // Gallery images - fixed to use only images that exist
  const galleryImages = [
    { src: "/images/trail-runner-1.jpeg", alt: "Trailrunner in the Alps", caption: "Alpine Trails" },
    { src: "/images/summit-view.jpeg", alt: "Summit view", caption: "Summit Views" },
    { src: "/images/canoeing-activity.jpeg", alt: "Canoeing on alpine lake", caption: "Lake Activities" },
    { src: "/images/table-tennis.png", alt: "Table tennis", caption: "Community Activities" },
    { src: "/images/summit-trail.jpeg", alt: "Trail to summit", caption: "Mountain Peaks" },
    { src: "/images/alpine-landscape.jpeg", alt: "Alpine landscape", caption: "Alpine Beauty" },
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 noise-bg"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display uppercase mb-4 text-gradient">{t("galleryTitle")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="aspect-square overflow-hidden group relative rounded-xl"
            >
              <ImageWithFallback
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={600}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                fallbackSrc="/placeholder.svg?height=600&width=600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <span className="font-display uppercase text-xl">{image.caption}</span>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
