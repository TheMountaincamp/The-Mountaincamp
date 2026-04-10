"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Wifi, Utensils, Thermometer, Droplets, Mountain } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ImagePreloader from "@/app/components/image-preloader"
import SiteHeader from "@/app/components/site-header"

const CRITICAL_IMAGES = [
  "/images/mountain-lodge.jpeg",
  "/images/cozy-bunk-accommodation.jpg",
  "/images/wooden-dormitory-interior.jpg",
  "/images/house-bathroom-sink.jpeg",
  "/images/house-shower.jpeg",
  "/images/house-toilet.jpeg",
  "/images/MTC-Logo_2025.png",
]

type FacilityDescription = {
  en: string
  de: string
}

export default function HousePage() {
  const { t, language } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const lang: keyof FacilityDescription = language === "de" ? "de" : "en"

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
      title: "Breakfast, Lunch & Dinner",
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
        en: "Always free water and iced tea",
        de: "Kostenloses Wasser und Eistee jederzeit verfügbar",
      },
    },
    {
      icon: <Mountain className="h-6 w-6" />,
      title: "Mountain view",
      description: {
        en: "Stunning panoramic views from most rooms",
        de: "Atemberaubende Panoramablicke aus den meisten Zimmern",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ImagePreloader imageSources={CRITICAL_IMAGES} />

      <SiteHeader />

      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/images/mountain-lodge.jpeg"
          alt="Mountain house"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <motion.h1
            className="mb-4 text-4xl font-bold text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("houseTitle")}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-xl text-white/80 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("houseSubtitle")}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900">{t("houseDescription")}</h2>
            <p className="mb-4 text-gray-700">{t("houseMainDescription")}</p>
            <p className="text-gray-700">{t("houseMeals")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-2xl font-bold uppercase text-gray-900">{t("facilitiesTitle")}</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-primary hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="mb-4 text-primary">{facility.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{facility.title}</h3>
                  <p className="text-sm text-gray-600">{facility.description[lang]}</p>
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
            <h2 className="mb-8 text-2xl font-bold uppercase text-gray-900">{t("roomsTitle")}</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <Image
                  src="/images/cozy-bunk-accommodation.jpg"
                  alt="Cozy bunk bed accommodation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="mb-2 text-xl font-bold text-white">{t("cozySleepingAreas")}</h3>
                  <p className="text-sm text-white/80">{t("cozySleepingDesc")}</p>
                </div>
              </div>

              <div className="relative h-80 overflow-hidden rounded-lg">
                <Image
                  src="/images/wooden-dormitory-interior.jpg"
                  alt="Wooden dormitory interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="mb-2 text-xl font-bold text-white">{t("sharedDormitory")}</h3>
                  <p className="text-sm text-white/80">{t("sharedDormitoryDesc")}</p>
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
            <h2 className="mb-8 text-2xl font-bold uppercase text-gray-900">{t("bathroomFacilities")}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/images/house-bathroom-sink.jpeg"
                  alt="Modern bathroom with sink"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="mb-1 text-lg font-bold text-white">{t("washArea")}</h3>
                  <p className="text-sm text-white/80">{t("washAreaDesc")}</p>
                </div>
              </div>

              <div className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/images/house-shower.jpeg"
                  alt="Clean shower facilities"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="mb-1 text-lg font-bold text-white">{t("showers")}</h3>
                  <p className="text-sm text-white/80">{t("showersDesc")}</p>
                </div>
              </div>

              <div className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/images/house-toilet.jpeg"
                  alt="Modern toilet facilities"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="mb-1 text-lg font-bold text-white">{t("toilets")}</h3>
                  <p className="text-sm text-white/80">{t("toiletsDesc")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-2xl font-bold uppercase text-gray-900">{t("locationTitle")}</h2>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21493.756807086395!2d12.13922555!3d47.23286205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4776f9b1a0c8f4e9%3A0x3f4e01b6b0a2b6e0!2s6372%20Hochkrimml%2C%20Austria!5e0!3m2!1sen!2sde!4v1712593066345!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
            <p className="mt-4 text-gray-700">{t("houseLocation")}</p>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/MTC-Logo_2025.png"
                alt="The Mountaincamp Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-gray-600 transition-colors hover:text-primary">
                {language === "de" ? "Startseite" : "Home"}
              </Link>
              <Link href="/trails" className="text-gray-600 transition-colors hover:text-primary">
                {t("trails")}
              </Link>
              <Link href="/impressum" className="text-gray-600 transition-colors hover:text-primary">
                {t("imprint")}
              </Link>
              <Link href="/datenschutz" className="text-gray-600 transition-colors hover:text-primary">
                {t("privacyPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}