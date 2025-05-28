"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ModernAbout() {
  const { t, language } = useLanguage()

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black">
      {/* Diagonal top decoration */}
      <div
        className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-secondary opacity-80"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
      ></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 noise-bg"></div>

      <div className="container mx-auto px-4 relative z-10 mt-12">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-secondary"></div>

            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-display uppercase mb-6 text-gradient">{t("aboutTitle")}</h2>
              <p className="text-xl text-white/80 mb-8 font-light">{t("aboutSubtitle")}</p>
              <div className="space-y-6 text-white/80">
                <p className="text-lg">{t("aboutText1")}</p>
                <p className="text-lg">{t("aboutText2")}</p>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{t("heroDate")}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2">
                    <div className="rounded-full bg-primary/20 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">
                      {language === "de" ? "Hochkrimml, Österreich" : "Hochkrimml, Austria"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] overflow-hidden rounded-xl">
              <Image
                src="/images/trail-runner-action.jpg"
                alt="Trailrunner in the Alps"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-mono">
                TRAILRUNNING
              </div>

              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-primary text-white px-4 py-2 font-bold uppercase text-sm rounded-full">
                  {language === "de" ? "Entdecken" : "Explore"}
                </span>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
