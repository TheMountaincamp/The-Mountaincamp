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
  "/images/trails-header-group.jpeg",
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
  const [headerImageSrc, setHeaderImageSrc] = useState("/images/trails-header-group.jpeg")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const lang = t("language") === "de" ? "de" : "en"

  const komootTrails = [
    {
      title: "Bergtour nach Seekarsee",
      difficulty: "Medium",
      duration: "08:16",
      distance: "18,0 km",
      elevation: "1530 hm",
      link: "https://www.komoot.com/de-de/tour/1739287990",
      image: "/images/trail-route-1.jpg",
    },
    {
      title: "Laufrunde nach Zittauerhütte",
      difficulty: "Hard",
      duration: "04:44",
      distance: "32,5 km",
      elevation: "1390 hm",
      link: "https://www.komoot.com/de-de/tour/1736740939",
      image: "/images/trail-route-2.jpg",
    },
    {
      title: "Hausberg",
      difficulty: "Medium",
      duration: "02:12",
      distance: "15,4 km",
      elevation: "710 hm",
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
      elevation: "1590 hm",
      link: "https://www.komoot.com/de-de/tour/1736297300",
      image: "/images/trail-route-5.jpg",
    },
    {
      title: "Mountaincamp Pro Tour",
      difficulty: "Hard",
      duration: "08:17",
      distance: "36,3 km",
      elevation: "2260 hm",
      link: "https://www.komoot.com/de-de/tour/1211980592",
      image: "/images/trail-route-6.jpg",
    },
    {
      title: "Königsleiten Gipfelliner",
      difficulty: "Hard",
      duration: "06:26",
      distance: "17,7 km",
      elevation: "1030 hm",
      link: "https://www.komoot.com/de-de/tour/1193607677",
      image: "/images/trail-route-7.jpg",
    },
    {
      title: "Laufrunde nach Geislhochalm",
      difficulty: "Hard",
      duration: "03:52",
      distance: "25,3 km",
      elevation: "1670 hm",
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
      distance: "8–12 km",
      elevation: "600 hm",
      duration: "2–3h",
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
      distance: "12–18 km",
      elevation: "1000 hm",
      duration: "2–4h",
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
      elevation: "1500+ hm",
      duration: "3–5h",
      description: {
        en: "Prolong your route as much as you want.",
        de: "Verlängere die Route so viel du willst.",
      },
      image: "/images/summit-view.jpeg",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ImagePreloader imageSources={CRITICAL_IMAGES} />

      <SiteHeader />

      {/* Header with background image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={headerImageSrc}
          alt="Trail running group on mountain ridge at sunrise"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          onError={() => {
            setHeaderImageSrc("/placeholder.svg?height=800&width=1200")
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <motion.h1
            className="mb-4 text-4xl font-bold text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("trailsTitle")}
          </motion.h1>

          <motion.p
            className="max-w-2xl text-xl text-white/80 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("trailsSubtitle")}
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h2 className="mb-6 text-3xl font-bold">{t("trailsDescription")}</h2>
            <p className="mb-4 text-gray-600">{t("trailsMainDescription")}</p>
            <p className="text-gray-600">{t("trailsGuideDescription")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="mb-8 text-2xl font-bold uppercase">{t("routesTitle")}</h2>

            <h3 className="mb-6 text-xl font-bold">{t("ourTrailRoutes")}</h3>

            <div className="mb-12">
              <RouteCarousel routes={komootTrails} />
            </div>

            <h3 className="mb-6 text-xl font-bold">{t("sampleRoutes")}</h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {trails.map((trail, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-all duration-300 hover:border-primary hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-48">
                    <Image
                      src={trail.image || "/placeholder.svg"}
                      alt={trail.title[lang]}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{trail.title[lang]}</h3>

                    <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                      <span className="rounded bg-primary/20 px-2 py-1 text-primary">
                        {trail.difficulty[lang]}
                      </span>
                    </div>

                    <div className="my-3 flex flex-wrap gap-4 text-sm text-gray-500">
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

                    <p className="text-sm text-gray-600">{trail.description[lang]}</p>
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
            <h2 className="mb-8 text-2xl font-bold uppercase">{t("guidedRunsTitle")}</h2>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold">{t("dailyGuidedRuns")}</h3>
              <p className="mb-6 text-gray-600">{t("guidedRunsDescription")}</p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                    <Mountain className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-bold">{t("beginnerGroup")}</span>
                    <p className="text-sm text-gray-500">{t("beginnerGroupDesc")}</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                    <Mountain className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-bold">{t("intermediateGroup")}</span>
                    <p className="text-sm text-gray-500">{t("intermediateGroupDesc")}</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                    <Mountain className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-bold">{t("advancedGroup")}</span>
                    <p className="text-sm text-gray-500">{t("advancedGroupDesc")}</p>
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
            <h2 className="mb-8 text-2xl font-bold uppercase">{t("trailTipsTitle")}</h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold">{t("equipment")}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("trailShoes")}</li>
                  <li>• {t("hydrationPack")}</li>
                  <li>• {t("weatherJacket")}</li>
                  <li>• {t("sunProtection")}</li>
                  <li>• {t("firstAidKit")}</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold">{t("safety")}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("informSomeone")}</li>
                  <li>• {t("checkWeather")}</li>
                  <li>• {t("stayOnTrails")}</li>
                  <li>• {t("respectNature")}</li>
                  <li>• {t("packOutTrash")}</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
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
              <Link href="/" className="text-gray-600 transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/house" className="text-gray-600 transition-colors hover:text-primary">
                {t("house")}
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