"use client"

import { motion } from "framer-motion"
import { Mountain, Music, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ModernFeatures() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Mountain className="h-10 w-10" />,
      title: t("epicTrails"),
      description: t("epicTrailsDesc"),
      color: "bg-primary",
    },
    {
      icon: <Music className="h-10 w-10" />,
      title: t("sunsetRave"),
      description: t("sunsetRaveDesc"),
      color: "bg-secondary",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: t("community"),
      description: t("communityDesc"),
      color: "bg-accent",
    },
  ]

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full transition-all duration-500 group-hover:border-primary/50">
                <div
                  className={`mb-6 rounded-full ${feature.color} p-4 w-16 h-16 flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display uppercase mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div
                  className={`absolute bottom-0 right-0 w-0 h-0 border-t-[25px] border-l-[25px] border-transparent ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
