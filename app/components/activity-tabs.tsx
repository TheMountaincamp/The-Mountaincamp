"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  title: string
  description: string
  image: string
  features: string[]
}

interface ActivityTabsProps {
  activities: Activity[]
}

export default function ActivityTabs({ activities }: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState(activities[0].id)

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        {activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => setActiveTab(activity.id)}
            className={cn(
              "flex flex-col rounded-lg border p-4 text-left transition-all",
              activeTab === activity.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50",
            )}
          >
            <h3 className="text-xl font-bold text-primary">{activity.title}</h3>
            <p className="text-gray-600">{activity.description}</p>
          </button>
        ))}
      </div>

      <div className="relative h-[400px] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          {activities.map(
            (activity) =>
              activeTab === activity.id && (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="mb-4 text-2xl font-bold">{activity.title}</h3>
                    <ul className="space-y-2">
                      {activity.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="h-2 w-2 rounded-full bg-secondary" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
