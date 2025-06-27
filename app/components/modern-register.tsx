"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ModernRegister() {
  const { t, language } = useLanguage()

  return (
    <section id="register" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display uppercase mb-6 text-gradient">{t("joinTitle")}</h2>
            <p className="text-xl mb-8 text-white/80">
              {t("heroDate")}
              <br />
              {language === "de" ? "Österreichische Alpen" : "Austrian Alps"}
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  {t("accommodation")}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  {t("meals")}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 text-accent group-hover:text-black transition-colors duration-300" />
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  {t("allLevels")}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  {t("limitedSpots")}
                </span>
              </li>
            </ul>

            {/* Price tag */}
            <div className="mt-12 inline-block">
              <div className="bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-t-lg">
                <span className="text-sm font-mono uppercase text-white">{t("packageTitle")}</span>
              </div>
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-b-lg">
                <span className="text-4xl font-display text-white">€420</span>
                <span className="text-white/70 ml-2">{t("perPerson")}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-black/50 backdrop-blur-sm border border-white/10 p-8 text-white rounded-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-xl"></div>

              <div className="relative">
                <h3 className="text-2xl font-display uppercase mb-6">
                  <a
                    href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gradient hover:underline transition-colors"
                  >
                    {t("bookSpot")}
                  </a>
                </h3>
                <p className="text-white/70 mb-6">{t("bookDesc")}</p>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark transition-colors text-white py-3 text-lg rounded-full"
                  asChild
                >
                  <a
                    href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("registerNow")}
                  </a>
                </Button>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary transform rotate-45 translate-x-8 -translate-y-8"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
