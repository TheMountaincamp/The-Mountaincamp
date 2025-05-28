"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mountain, Flame, Sparkles, Music } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import FeatureCard from "@/app/components/feature-card"

export default function ModernExperience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display uppercase mb-4 text-gradient">{t("experienceTitle")}</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">{t("experienceSubtitle")}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="transform hover:scale-105"
          >
            <FeatureCard
              title={t("trailrunningTitle")}
              description={t("trailrunningDesc")}
              icon={<Mountain className="h-8 w-8" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="transform hover:scale-105"
          >
            <FeatureCard
              title={t("recoveryTitle")}
              description={t("recoveryDesc")}
              icon={<Flame className="h-8 w-8" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="transform hover:scale-105"
          >
            <FeatureCard
              title={t("creativityTitle")}
              description={t("creativityDesc")}
              icon={<Sparkles className="h-8 w-8" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="transform hover:scale-105"
          >
            <FeatureCard title={t("raveTitle")} description={t("raveDesc")} icon={<Music className="h-8 w-8" />} />
          </motion.div>
        </div>

        {/* Featured experience highlight */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 relative overflow-hidden rounded-xl"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-black/80 backdrop-blur-sm p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-xl"></div>

              <div className="relative">
                <h3 className="text-3xl font-display uppercase mb-6 text-gradient">{t("raveHighlightTitle")}</h3>
                <p className="text-white/80 mb-8">{t("raveHighlightDesc")}</p>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>{t("raveBullet1")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-secondary"></div>
                    <span>{t("raveBullet2")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    <span>{t("raveBullet3")}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative h-[400px] md:h-auto">
              <Image src="/images/mountain-rave-new.jpg" alt="Mountain sunset rave" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent md:bg-gradient-to-l"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
