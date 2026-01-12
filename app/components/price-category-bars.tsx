"use client"

import { motion } from "framer-motion"
import { Check, AlertTriangle, Clock, Lock } from "lucide-react"

interface PriceCategoryBarProps {
  category: string
  filled: number
  total: number
  label?: string
  status: "sold-out" | "almost-gone" | "available" | "coming-soon"
}

function PriceCategoryBar({ category, filled, total, label, status }: PriceCategoryBarProps) {
  const percentage = (filled / total) * 100

  const getStatusIcon = () => {
    switch (status) {
      case "sold-out":
        return <Lock className="h-5 w-5 text-white" />
      case "almost-gone":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "available":
        return <Check className="h-5 w-5 text-green-400" />
      case "coming-soon":
        return <Clock className="h-5 w-5 text-blue-400" />
      default:
        return null
    }
  }

  const getStatusClass = () => {
    switch (status) {
      case "sold-out":
        return "bg-gray-500"
      case "almost-gone":
        return "bg-primary"
      case "available":
        return "bg-green-500"
      case "coming-soon":
        return "bg-blue-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-full ${status === "sold-out" ? "bg-gray-700" : "bg-primary/20"}`}>
            {getStatusIcon()}
          </div>
          <span className="text-base font-bold text-white">{category}</span>
        </div>
        {label && <span className="text-base font-bold text-white">{label}</span>}
      </div>
      <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-3 rounded-full ${getStatusClass()} relative`}
          style={{
            boxShadow: status !== "sold-out" ? "0 0 10px rgba(95, 92, 149, 0.7)" : "none",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {status !== "sold-out" && percentage > 30 && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="w-full h-full opacity-30 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function PriceCategoryBars() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-primary/20 p-8">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Availability Status</h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Check the current availability of our different price categories. Book soon to secure your spot!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <PriceCategoryBar
            category="Price Category 1 - Early Bird"
            filled={100}
            total={100}
            label="Sold out"
            status="sold-out"
          />
          <PriceCategoryBar
            category="Price Category 2"
            filled={98}
            total={100}
            label="Available"
            status="almost-gone"
          />
          <PriceCategoryBar category="Price Category 3" filled={0} total={100} label="🔒" status="sold-out" />
          <PriceCategoryBar category="Price Category 4" filled={0} total={100} label="🔒" status="sold-out" />
        </div>
      </div>

      <motion.div
        className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        onError={() => console.error("Error loading background animation")}
      />
    </div>
  )
}
