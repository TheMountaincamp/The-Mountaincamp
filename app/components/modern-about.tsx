"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function ModernAbout() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content side with keyword optimization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Section heading with primary keywords */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl md:text-6xl font-display uppercase mb-6 text-gradient"
              >
                About The Mountaincamp
              </motion.h2>

              {/* Keyword-rich subtitle */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl md:text-2xl text-primary font-semibold mb-4"
              >
                Austria's Premier Trail Running Camps Experience
              </motion.h3>
            </div>

            {/* Keyword-optimized content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6 text-lg text-white/80"
            >
              <p>
                <strong className="text-white">The Mountaincamp</strong> is Austria's leading destination for
                <strong className="text-primary"> trail running camps</strong>. Located in the heart of the Austrian
                Alps,
                <strong className="text-white"> Mountaincamp</strong> offers an unparalleled
                <strong className="text-primary"> trail running camps Austria</strong> experience that combines
                world-class training, breathtaking alpine scenery, and an international community of passionate runners.
              </p>

              <p>
                Our <strong className="text-white">Mountaincamp 2025</strong> program represents the pinnacle of
                <strong className="text-primary"> trail running camps Austria</strong> has to offer. From
                beginner-friendly trails to challenging alpine routes,{" "}
                <strong className="text-white">The Mountaincamp</strong> caters to every level of trail runner seeking
                the ultimate
                <strong className="text-primary"> trail running camps Austria</strong> adventure.
              </p>

              <p>
                What sets <strong className="text-white">The Mountaincamp</strong> apart from other
                <strong className="text-primary"> trail running camps Austria</strong>? Our unique combination of
                professional coaching, all-inclusive packages, legendary mountain parties, and the stunning backdrop of
                Hochkrimml in the Austrian Alps makes <strong className="text-white">Mountaincamp</strong>
                the definitive <strong className="text-primary">trail running camps Austria</strong> experience.
              </p>
            </motion.div>

            {/* Key features with keyword integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-white">Why Choose The Mountaincamp?</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Austria's #1 rated trail running camps
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Professional Mountaincamp coaching
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    All-inclusive trail running camps Austria packages
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Legendary Mountaincamp parties
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-white">Mountaincamp 2025 Highlights</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">🏔️</span>
                    Austrian Alps location
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">🏃</span>
                    All-level trail running camps
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">🌍</span>
                    International community
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">🎉</span>
                    Sunset rave parties
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/trail-runner-action.jpg"
                alt="The Mountaincamp - Trail running camps Austria in the Austrian Alps"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Overlay text with keywords */}
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-2xl font-bold text-white mb-2">Experience The Mountaincamp Difference</h4>
                <p className="text-white/90">
                  Join Austria's premier trail running camps in the heart of the Austrian Alps
                </p>
              </div>
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-primary rounded-xl p-6 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9/5</div>
                <div className="text-white/90 text-sm">Trail Running Camps Austria Rating</div>
                <div className="text-white/80 text-xs mt-1">Based on 127+ Mountaincamp reviews</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hidden SEO content */}
      <div className="sr-only">
        <h3>The Mountaincamp - Leading Trail Running Camps Austria Provider</h3>
        <p>
          The Mountaincamp has established itself as the premier provider of trail running camps Austria experiences.
          Our Mountaincamp programs in the Austrian Alps offer unmatched trail running camps Austria adventures,
          combining professional training, stunning alpine locations, and world-class hospitality. Choose The
          Mountaincamp for your trail running camps Austria journey and discover why we're rated as Austria's #1 trail
          running camps provider.
        </p>
      </div>
    </section>
  )
}
