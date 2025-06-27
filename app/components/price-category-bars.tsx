"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import CountdownTimer from "@/app/components/countdown-timer"

export default function PriceCategoryBars() {
  const { t } = useLanguage()
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null)

  // Countdown dates for each category
  const earlyBirdDate = new Date("2024-12-31T23:59:59")
  const regularDate = new Date("2025-03-31T23:59:59")
  const lateDate = new Date("2025-07-15T23:59:59")

  // Price categories data
  const categories = [
    {
      id: 1,
      name: t("earlyBird"),
      price: "€380",
      discount: "10%",
      status: "active",
      date: earlyBirdDate,
      color: "from-accent to-accent-light",
      textColor: "text-black",
      description: t("earlyBirdDesc"),
    },
    {
      id: 2,
      name: t("regular"),
      price: "€420",
      discount: "",
      status: "soldOut",
      date: regularDate,
      color: "from-primary to-primary-light",
      textColor: "text-white",
      description: t("regularDesc"),
    },
    {
      id: 3,
      name: t("late"),
      price: "€460",
      discount: "20%", // Increased from 10% to 20%
      status: "upcoming",
      date: lateDate,
      color: "from-secondary to-secondary-light",
      textColor: "text-white",
      description: t("lateDesc"),
    },
  ]

  const toggleTooltip = (id: number) => {
    if (activeTooltip === id) {
      setActiveTooltip(null)
    } else {
      setActiveTooltip(id)
    }
  }

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8">
      <h3 className="text-3xl font-display uppercase mb-6 text-gradient">{t("priceCategories")}</h3>
      <p className="text-white/70 mb-8 max-w-2xl">{t("priceCategoriesDesc")}</p>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <div
              className={`rounded-xl overflow-hidden ${category.status === "soldOut" ? "opacity-60" : "opacity-100"}`}
            >
              <div className={`bg-gradient-to-r ${category.color} p-4 md:p-6 relative`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className={`text-xl md:text-2xl font-display uppercase ${category.textColor}`}>
                        {category.name}
                      </h4>
                      {category.discount && (
                        <span className="ml-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
                          {category.discount}
                        </span>
                      )}
                      <button
                        onClick={() => toggleTooltip(category.id)}
                        className="ml-2 text-white/80 hover:text-white transition-colors"
                        aria-label="More information"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>
                    <p className={`text-sm ${category.textColor} opacity-80 mt-1`}>
                      {category.status === "soldOut"
                        ? t("soldOut")
                        : category.status === "active"
                          ? t("availableUntil")
                          : t("availableFrom")}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center">
                    <span className={`text-2xl md:text-3xl font-display ${category.textColor}`}>{category.price}</span>
                    {category.status !== "soldOut" && (
                      <div className="ml-4">
                        <CountdownTimer targetDate={category.date} compact={true} textColor={category.textColor} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tooltip */}
            {activeTooltip === category.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-10 mt-2 p-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg max-w-md"
              >
                <p className="text-white/90 text-sm">{category.description}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
