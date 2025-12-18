"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mountain, ArrowUp, Clock, Route } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import RouteCarousel from "@/app/components/route-carousel"
import ImagePreloader from "@/app/components/image-preloader"
import SiteHeader from "@/app/components/site-header"

// Define critical images for the Trails page
const CRITICAL_IMAGES = [
  "/images/trails-header-group.jpeg", // New header image
  "/images/alpine-landscape.jpeg",
  "/images/trail-runner-1.jpeg",
  "/images/summit-view.jpeg",
  "/images/trail-runners-group.jpeg",
  "/images/mountain-lake.png",
  "/images/canoeing-lake.jpeg",
  "/images/MTC-Logo_2025_weiß.png",
]

export default function TrailsPage() {
  const { t } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Neue Trailrouten
  const komootTrails = [
    {
      title: "Bergtour nach Seekarsee",
      difficulty: "Medium",
      duration: "08:16",
      distance: "18,0 km",
      elevation: "1.530 hm",
      link: "https://www.komoot.com/de-de/tour/1739287990",
      image: "/images/trail-route-1.jpg",
    },
    {
      title: "Laufrunde nach Zittauerhütte",
      difficulty: "Hard",
      duration: "04:44",
      distance: "32,5 km",
      elevation: "1.390 hm",
      link: "https://www.komoot.com/de-de/tour/1736740939",
      image: "/images/trail-route-2.jpg",
    },
    {
      title: "Hausberg",
      difficulty: "Medium",
      duration: "02:12",
      distance: "15,4 km",
      elevation: "710 m",
      link: "https://www.komoot.com/de-de/tour/1730869942",
      image: "/images/trail-route-3.jpg",
    },
    {
      title: "Krimmler Wasserfälle",
      difficulty: "Medium",
      duration: "02:21",
      distance: "14,5 km",
      elevation: "970 hm",
      link: "https://www.komoot.com/de-de/tour/1736310471",
      image: "/images/trail-route-4.jpg",
    },
    {
      title: "Zittauerhütte Option 2",
      difficulty: "Hard",
      duration: "04:18",
      distance: "25,4 km",
      elevation: "1.590 m",
      link: "https://www.komoot.com/de-de/tour/1736297300",
      image: "/images/trail-route-5.jpg",
    },
    {
      title: "Mountaincamp Pro Tour",
      difficulty: "Hard",
      duration: "08:17",
      distance: "36,3 km",
      elevation: "2.260 m",
      link: "https://www.komoot.com/de-de/tour/1211980592",
      image: "/images/trail-route-6.jpg",
    },
    {
      title: "Königsleiten Gipfelliner",
      difficulty: "Hard",
      duration: "06:26",
      distance: "17,7 km",
      elevation: "1.030 m",
      link: "https://www.komoot.com/de-de/tour/1193607677",
      image: "/images/trail-route-7.jpg",
    },
    {
      title: "Laufrunde nach Geislhochalm",
      difficulty: "Hard",
      duration: "03:52",
      distance: "25,3 km",
      elevation: "1.670 m",
      link: "https://www.komoot.com/de-de/tour/1191154659",
      image: "/images/trail-route-1.jpg",
    },
  ]

  const trails = [
    {
      title: {
        en: "Summit Trail",
        de: "Gipfelweg",
      },
      difficulty: {
        en: "Challenging",
        de: "Anspruchsvoll",
      },
      distance: "8-12 km",
      elevation: "600 m",
      duration: "2-3h",
      description: {
        en: "A beautiful loop with moderate elevation gain.",
        de: "Eine schöne Schleife mit moderatem Höhengewinn.",
      },
      image: "/images/summit-trail.jpeg",
    },
    {
      title: {
        en: "Valley Loop",
        de: "Tal-Rundweg",
      },
      difficulty: {
        en: "Moderate",
        de: "Mittel",
      },
      distance: "12-18 km",
      elevation: "1000 m",
      duration: "2-4h",
      description: {
        en: "A challenging trail that takes you to the summit with breathtaking panoramic views.",
        de: "Ein anspruchsvoller Trail, der dich zum Gipfel mit atemberaubenden Panoramablicken führt.",
      },
      image: "/images/alpine-landscape.jpeg",
    },
    {
      title: {
        en: "Lake Trail",
        de: "See-Trail",
      },
      difficulty: {
        en: "Easy",
        de: "Leicht",
      },
      distance: "18+ km",
      elevation: "1500+ m",
      duration: "3-5h",
      description: {
        en: "Prolong your route as much as you want.",
        de: "Verlängere die Route so viel du willst.",
      },
      image: "/images/summit-view.jpeg",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Preload critical images */}
      <ImagePreloader imageSources={CRITICAL_IMAGES} />

      <SiteHeader />

      {/* Header with background image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/images/trails-header-group.jpeg"
          alt="Trail running group on mountain ridge at sunrise"
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
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("trailsTitle")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-2xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("trailsSubtitle")}
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-6">{t("trailsDescription")}</h2>
            <p className="text-gray-600 mb-4">
              {t("language") === "de"
                ? "Die österreichischen Alpen bieten einige der spektakulärsten Trailrunning-Strecken Europas. Von sanften Waldwegen bis hin zu anspruchsvollen alpinen Pfaden - hier findet jeder Läufer die perfekte Route."
                : "The Austrian Alps offer some of the most spectacular trail running routes in Europe. From gentle forest paths to challenging alpine trails - every runner will find the perfect route here."}
            </p>
            <p className="text-gray-600">
              {t("language") === "de"
                ? "Während des Mountaincamps bieten wir täglich geführte Läufe für verschiedene Niveaus an, sodass du die besten Trails der Region mit erfahrenen Guides erkunden kannst."
                : "During the Mountaincamp, we offer daily guided runs for different levels, allowing you to explore the best trails in the region with experienced guides."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase">{t("routesTitle")}</h2>

            {/* Komoot Trail Cards */}
            <h3 className="text-xl font-bold mb-6">
              {t("language") === "de" ? "Unsere Trailrouten" : "Our Trail Routes"}
            </h3>

            <div className="mb-12">
              <RouteCarousel routes={komootTrails} />
            </div>

            {/* Trail Cards */}
            <h3 className="text-xl font-bold mb-6">
              {t("language") === "de" ? "Beispielrouten nach Schwierigkeit" : "Sample Routes by Difficulty"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trails.map((trail, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-48">
                    <Image
                      src={trail.image || "/placeholder.svg"}
                      alt={typeof trail.title === "object" ? trail.title[t("language")] : trail.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {typeof trail.title === "object" ? trail.title[t("language")] : trail.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <span className="bg-primary/20 px-2 py-1 rounded text-primary">
                        {typeof trail.difficulty === "object" ? trail.difficulty[t("language")] : trail.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 my-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Route className="h-4 w-4" />
                        <span>{trail.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="h-4 w-4" />
                        <span>{trail.elevation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{trail.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {typeof trail.description === "object" ? trail.description[t("language")] : trail.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase">{t("guidedRunsTitle")}</h2>
            <div className="bg-gray-50 p-8 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">
                {t("language") === "de" ? "Tägliche geführte Läufe" : "Daily Guided Runs"}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("language") === "de"
                  ? "Während des Mountaincamps bieten wir täglich mehrere geführte Läufe an, die auf verschiedene Erfahrungsstufen und Vorlieben zugeschnitten sind:"
                  : "During the Mountaincamp, we offer multiple guided runs daily, tailored to different experience levels and preferences:"}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mountain className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-bold">{t("language") === "de" ? "Anfänger-Gruppe" : "Beginner Group"}</span>
                    <p className="text-gray-500 text-sm">
                      {t("language") === "de"
                        ? "Gemütliches Tempo, flachere Trails, perfekt für Trailrunning-Neulinge."
                        : "Easy pace, flatter trails, perfect for trail running beginners."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mountain className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-bold">
                      {t("language") === "de" ? "Mittlere Gruppe" : "Intermediate Group"}
                    </span>
                    <p className="text-gray-500 text-sm">
                      {t("language") === "de"
                        ? "Moderates Tempo, abwechslungsreiche Trails mit mittleren Höhenunterschieden."
                        : "Moderate pace, varied trails with medium elevation gains."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mountain className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-bold">
                      {t("language") === "de" ? "Fortgeschrittene Gruppe" : "Advanced Group"}
                    </span>
                    <p className="text-gray-500 text-sm">
                      {t("language") === "de"
                        ? "Schnelleres Tempo, technisch anspruchsvollere Trails mit größeren Höhenunterschieden."
                        : "Faster pace, more technically challenging trails with significant elevation gains."}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase">{t("trailTipsTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">{t("language") === "de" ? "Ausrüstung" : "Equipment"}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    •{" "}
                    {t("language") === "de"
                      ? "Trailrunning-Schuhe mit gutem Profil"
                      : "Trail running shoes with good traction"}
                  </li>
                  <li>
                    • {t("language") === "de" ? "Wasserflasche oder Hydration Pack" : "Water bottle or hydration pack"}
                  </li>
                  <li>• {t("language") === "de" ? "Wetterfeste Jacke" : "Weather-appropriate jacket"}</li>
                  <li>• {t("language") === "de" ? "Sonnenschutz" : "Sun protection"}</li>
                  <li>• {t("language") === "de" ? "Kleine Erste-Hilfe-Ausrüstung" : "Small first aid kit"}</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">{t("language") === "de" ? "Sicherheit" : "Safety"}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    •{" "}
                    {t("language") === "de"
                      ? "Informiere immer jemanden über deine Route"
                      : "Always inform someone about your route"}
                  </li>
                  <li>• {t("language") === "de" ? "Überprüfe die Wettervorhersage" : "Check the weather forecast"}</li>
                  <li>• {t("language") === "de" ? "Bleibe auf den markierten Wegen" : "Stay on marked trails"}</li>
                  <li>
                    • {t("language") === "de" ? "Respektiere die Natur und Wildtiere" : "Respect nature and wildlife"}
                  </li>
                  <li>• {t("language") === "de" ? "Nimm deinen Müll wieder mit" : "Pack out what you pack in"}</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8">
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
              <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/house" className="text-gray-600 hover:text-primary transition-colors">
                {t("house")}
              </Link>
              <Link href="/impressum" className="text-gray-600 hover:text-primary transition-colors">
                {t("imprint")}
              </Link>
              <Link href="/datenschutz" className="text-gray-600 hover:text-primary transition-colors">
                {t("privacyPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
