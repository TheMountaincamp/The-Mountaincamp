"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Bus, Calendar, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SectionTitle from "./section-title"

export default function ModernRegister() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="register" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title={t("registerNow")} subtitle={t("registerSubtitle")} centered light />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto mt-12"
        >
          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-3xl font-display uppercase mb-2 text-gradient">{t("mountaincamp")} 2025</h3>
                <p className="text-white/70 mb-4">{t("joinUs")}</p>
                <div className="flex items-center text-white mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <span>6. - 10. August 2025</span>
                </div>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-accent mt-0.5" />
                    <span className="text-white/80">{t("allMealsIncluded")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-accent mt-0.5" />
                    <span className="text-white/80">{t("professionalCoaches")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-accent mt-0.5" />
                    <span className="text-white/80">{t("accommodationIncluded")}</span>
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl md:text-5xl font-display text-white mb-2">€420</div>
                <p className="text-white/60 mb-6">{t("perPerson")}</p>
                <a
                  href="https://www.cadi.me/events/the-mountaincamp-2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary hover:bg-primary-light text-white font-medium transition-colors"
                >
                  {t("bookNow")}
                </a>
                <div className="mt-4">
                  <Link
                    href="/bus-schedule"
                    className="inline-flex items-center text-primary hover:text-primary-light transition-colors"
                  >
                    <Bus className="mr-2 h-4 w-4" />
                    {t("busSchedule")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
