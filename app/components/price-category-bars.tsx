"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"

export default function PriceCategoryBars() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null)

  // Price categories data - simplified without countdowns
  const categories = [
    {
      id: 1,
      name: "Early Bird",
      price: "€380",
      discount: "10%",
      status: "soldOut",
      color: "from-gray-600 to-gray-700",
      textColor: "text-white",
      description: "Frühe Anmeldung mit Rabatt - bereits ausverkauft",
    },
    {
      id: 2,
      name: "Regular",
      price: "€420",
      discount: "",
      status: "active",
      color: "from-gray-700 to-gray-800",
      textColor: "text-white",
      description: "Regulärer Preis für das Mountaincamp 2025",
    },
    {
      id: 3,
      name: "Late Bird",
      price: "€460",
      discount: "20%",
      status: "upcoming",
      color: "from-gray-800 to-gray-900",
      textColor: "text-white",
      description: "Späte Anmeldung mit Aufpreis",
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
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 md:p-8">
      <h3 className="text-3xl font-bold uppercase mb-6 text-white">Preiskategorien</h3>
      <p className="text-gray-300 mb-8 max-w-2xl">
        Verschiedene Preiskategorien je nach Anmeldezeitpunkt. Sichere dir jetzt deinen Platz!
      </p>

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
                      <h4 className={`text-xl md:text-2xl font-bold uppercase ${category.textColor}`}>
                        {category.name}
                      </h4>
                      {category.discount && (
                        <span className="ml-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
                          {category.discount}
                        </span>
                      )}
                      <button
                        onClick={() => toggleTooltip(category.id)}
                        className="ml-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="More information"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>
                    <p className={`text-sm ${category.textColor} opacity-80 mt-1`}>
                      {category.status === "soldOut"
                        ? "Ausverkauft"
                        : category.status === "active"
                          ? "Verfügbar"
                          : "Bald verfügbar"}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center">
                    <span className={`text-2xl md:text-3xl font-bold ${category.textColor}`}>{category.price}</span>
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
                className="absolute z-10 mt-2 p-4 bg-black/90 backdrop-blur-sm border border-gray-600 rounded-lg shadow-lg max-w-md"
              >
                <p className="text-gray-300 text-sm">{category.description}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
