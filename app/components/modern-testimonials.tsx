"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import TestimonialCard from "@/app/components/testimonial-card"
import PriceCategoryBars from "@/app/components/price-category-bars"

export default function ModernTestimonials() {
  const { t } = useLanguage()

  // Testimonial data
  const testimonials = [
    {
      quote: "The overall organisation of the whole stay there, really good! All the friendly faces, the nature etc.",
      name: "Sarah K.",
      role: "Intermediate Runner",
    },
    {
      quote:
        "I loved the experience as a whole, but what stood out was the variety in not only runs, but generally activities, there was always something exciting happening!",
      name: "Michael T.",
      role: "Advanced Runner",
    },
    {
      quote: "The location was spectacular, the organisation was really detailed.",
      name: "Emma L.",
      role: "Beginner Runner",
    },
    {
      quote:
        "The opportunities to do different routes, activities and always meeting different people. The area is awesome and the house is very nice. Loved the sauna / lounge area a lot and the flexibility we had.",
      name: "David R.",
      role: "Trailrunning Enthusiast",
    },
  ]

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display uppercase mb-4 text-gradient">{t("testimonialsTitle")}</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard quote={testimonial.quote} />
            </motion.div>
          ))}
        </div>

        {/* Spotify Playlist Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 mb-16 relative overflow-hidden rounded-xl"
        >
          {/* Hintergrundbild */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/mountain-rave-new.jpg" alt="Mountain rave" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70 backdrop-blur-sm"></div>
          </div>

          {/* Inhalt */}
          <div className="relative z-10 p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-display uppercase mb-4 text-gradient">{t("playlistTitle")}</h3>
              <p className="max-w-2xl mx-auto text-white/80">{t("playlistDesc")}</p>
            </div>
            <div className="flex justify-center">
              <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/playlist/33kezN4oDEMyKsFBCicpu6?utm_source=generator&theme=0&cache=${Date.now()}`}
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="max-w-3xl shadow-2xl"
              ></iframe>
            </div>
          </div>
        </motion.div>

        {/* Community highlight */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm text-white p-12 rounded-xl text-center border border-white/10"
        >
          <h3 className="text-3xl font-display uppercase mb-6 text-gradient">{t("communityTitle")}</h3>
          <p className="max-w-2xl mx-auto text-white/80 mb-8">{t("communityDesc")}</p>
        </motion.div>

        {/* Add the Price Category Bars here, after the Community highlight */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <PriceCategoryBars />
        </motion.div>
      </div>
    </section>
  )
}
