"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Wifi, Utensils, Thermometer, Droplets, Dumbbell, Mountain } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ImagePreloader from "@/app/components/image-preloader"

// Define critical images for the House page
const CRITICAL_IMAGES = [
  "/images/mountain-lodge.jpeg",
  "/images/alpine-landscape.jpeg",
  "/images/trail-runner-1.jpeg",
  "/images/MTC-Logo_2025_weiß.png",
]

export default function HousePage() {
  const { t } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const facilities = [
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Wi-Fi",
      description: {
        en: "Free high-speed Wi-Fi throughout the house",
        de: "Kostenloses Highspeed-WLAN im ganzen Haus",
      },
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Breakfast,Lunch & Dinner",
      description: {
        en: "Three meals per day included",
        de: "Drei Mahlzeiten pro Tag inklusive",
      },
    },
    {
      icon: <Thermometer className="h-6 w-6" />,
      title: "Sauna",
      description: {
        en: "Relax your muscles after a day on the trails",
        de: "Entspanne deine Muskeln nach einem Tag auf den Trails",
      },
    },
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "Drink station",
      description: {
        en: "Always free water and icetea",
        de: "Kostensloses Wasser und Eistee",
      },
    },
    {
      icon: <Dumbbell className="h-6 w-6" />,
      title: "GYM",
      description: {
        en: "Small gym for strength training",
        de: "Kleiner Fitnessbereich für Krafttraining",
      },
    },
    {
      icon: <Mountain className="h-6 w-6" />,
      title: "Mountainview",
      description: {
        en: "Stunning panoramic views from most rooms",
        de: "Atemberaubende Panoramablicke aus den meisten Zimmern",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Preload critical images */}
      <ImagePreloader imageSources={CRITICAL_IMAGES} />

      {/* Header with background image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/images/mountain-lodge.jpeg"
          alt="Mountain house"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          unoptimized={true}
          onError={(e) => {
            console.error("Failed to load image:", e)
            e.currentTarget.src = "/placeholder.svg?height=800&width=1200"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("houseTitle")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-2xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("houseSubtitle")}
          </motion.p>
        </div>

        <motion.div
          className="absolute top-6 left-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">{t("houseDescription")}</h2>
            <p className="text-white/80 mb-4">
              {t("language") === "de"
                ? "Dieses gemütliche Gästehaus liegt auf 1.700 Metern Höhe und bietet einen atemberaubenden Blick auf die umliegenden Gipfel. Mit komfortablen Zimmern, einem großzügigen Gemeinschaftsbereich, einer Sauna und einer Turnhalle und vielem mehr ist es der perfekte Ort, um nach einem Tag auf den Trails zu entspannen."
                : "This cozy mountain house is located at an altitude of 1,700 meters and offers breathtaking views of the surrounding peaks. With comfortable rooms, a spacious common area, a sauna, and a gym, a skatepark and a lot more! It's the perfect place to relax after a day on the trails."}
            </p>
            <p className="text-white/80">
              {t("language") === "de"
                ? "Morgens, Mittags und Abends werden wir vom Küchenteam mit reichhaltigen Mahlzeiten verpflegt."
                : "In the morning, at noon and in the evening, we are getting served by the kitchen team with rich meals."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase">{t("facilitiesTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  className="bg-card p-6 border border-primary/20 hover:border-primary transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="text-primary mb-4">{facility.icon}</div>
                  <h3 className="text-xl font-bold mb-2">
                    {typeof facility.title === "object" ? facility.title[t("language")] : facility.title}
                  </h3>
                  <p className="text-white/70 text-sm">{facility.description[t("language")]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase">{t("roomsTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <Image src="/images/alpine-landscape.jpeg" alt="Room" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{t("language") === "de" ? "Doppelzimmer" : "Double Room"}</h3>
                  <p className="text-white/80 text-sm">
                    {t("language") === "de"
                      ? "Komfortable Zimmer mit zwei Einzelbetten oder einem Doppelbett"
                      : "Comfortable rooms with twin beds or a double bed"}
                  </p>
                </div>
              </div>
              <div className="relative h-80 overflow-hidden rounded-lg">
                <Image src="/images/trail-runner-1.jpeg" alt="Room" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {t("language") === "de" ? "Mehrbettzimmer" : "Shared Room"}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {t("language") === "de"
                      ? "Gemütliche Mehrbettzimmer für 4-6 Personen, perfekt für Gruppen"
                      : "Cozy shared rooms for 6-8 people"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase">{t("locationTitle")}</h2>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21493.756807086395!2d12.13922555!3d47.23286205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4776f9b1a0c8f4e9%3A0x3f4e01b6b0a2b6e0!2s6372%20Hochkrimml%2C%20Austria!5e0!3m2!1sen!2sde!4v1712593066345!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            <p className="mt-4 text-white/80">
              {t("language") === "de"
                ? "Unser Berghaus befindet sich in Hochkrimml, Österreich, umgeben von atemberaubenden Alpengipfeln und endlosen Trailrunning-Möglichkeiten."
                : "Our mountain house is located in Hochkrimml, Austria, surrounded by breathtaking alpine peaks and endless trail running possibilities."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-white/60 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/trails" className="text-white/60 hover:text-primary transition-colors">
                {t("trails")}
              </Link>
              <Link href="/impressum" className="text-white/60 hover:text-primary transition-colors">
                {t("imprint")}
              </Link>
              <Link href="/datenschutz" className="text-white/60 hover:text-primary transition-colors">
                {t("privacyPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
