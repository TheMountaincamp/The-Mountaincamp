"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useMobile } from "@/hooks/use-mobile"

export default function ModernActivities() {
  const { t } = useLanguage()
  const isMobile = useMobile()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Simplified activities data
  const activities = [
    {
      title: "Trailrunning Technique",
      image: "/images/mountain-trail-runner.jpeg",
      description: "Learn proper trailrunning techniques from experienced coaches on beautiful alpine trails.",
    },
    {
      title: "Archery",
      image: "/images/archery.jpeg",
      description: "Test your precision and focus with archery sessions in a stunning mountain backdrop.",
    },
    {
      title: "MTB Trip",
      image: "/images/mtb-trip.png",
      description: "Explore scenic mountain trails on two wheels with our guided mountain biking excursions.",
    },
    {
      title: "Movie Night",
      image: "/images/movie-night.png",
      description: "Relax and enjoy inspiring outdoor and adventure films under the stars with fellow campers.",
    },
    {
      title: "Backflip Lesson",
      image: "/images/backflip-lesson.png",
      description: "Challenge yourself with guided backflip lessons in a safe environment - for the adventurous!",
    },
    {
      title: "Canoeing",
      image: "/images/canoeing-lake.jpeg",
      description: "Paddle across crystal-clear alpine lakes while taking in breathtaking mountain views.",
    },
    {
      title: "Yoga",
      image: "/images/yoga.png",
      description: "Restore balance and recover with yoga sessions designed specifically for runners.",
    },
    {
      title: "Climbing Class",
      image: "/images/climbing-class.png",
      description: "Build strength and confidence with indoor climbing sessions led by experienced instructors.",
    },
    {
      title: "Campfire Evening",
      image: "/images/campfire-evening.jpeg",
      description: "Share stories and connect with fellow runners around a cozy campfire under the stars.",
    },
    {
      title: "Sunset Rave",
      image: "/images/mountain-rave-new.jpg",
      description: "Dance to great music with spectacular mountain views at our legendary sunset party.",
    },
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display uppercase mb-4 text-gradient">{t("activitiesTitle")}</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">{t("activitiesSubtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-square group rounded-xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={activity.image || "/placeholder.svg"}
                alt={activity.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-lg md:text-xl font-display uppercase text-white mb-2 transition-transform duration-300">
                  {activity.title}
                </h3>
                {(hoveredIndex === index || isMobile) && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-white/90"
                  >
                    {activity.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
