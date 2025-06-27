"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Mountain,
  Flame,
  Sparkles,
  Music,
  ArrowRight,
  ChevronDown,
  Users,
  Calendar,
  MapPin,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"

// Import components
import FeatureCard from "@/app/components/feature-card"
import TestimonialCard from "@/app/components/testimonial-card"
import SectionTitle from "@/app/components/section-title"
import CountdownTimer from "@/app/components/countdown-timer"
import CookieSettingsButton from "@/components/cookie-settings-button"
import ActivityCardMobile from "@/app/components/activity-card-mobile"
import LanguageSwitcher from "@/app/components/language-switcher"
import PriceCategoryBars from "@/app/components/price-category-bars"
// Import the ImageWithFallback component at the top of the file
import ImageWithFallback from "@/app/components/image-with-fallback"
import ImagePreloader from "@/app/components/image-preloader"
import PreloadLink from "@/app/components/preload-link"

// Define critical images for sections that will be visible later
const SECTION_IMAGES = [
  "/images/summit-view.jpeg",
  "/images/canoeing-activity.jpeg",
  "/images/table-tennis.png",
  "/images/summit-trail.jpeg",
  "/images/archery.jpeg",
  "/images/mtb-trip.png",
  "/images/movie-night.png",
  "/images/backflip-lesson.png",
  "/images/canoeing-lake.jpeg",
]

// Define images for the House page to preload when hovering over the link
const HOUSE_PAGE_IMAGES = ["/images/mountain-lodge.jpeg"]

// Define images for the Trails page to preload when hovering over the link
const TRAILS_PAGE_IMAGES = ["/images/mountain-trail-runner.jpeg", "/images/trail-runners-group.jpeg"]

export default function Home() {
  const { t, language } = useLanguage()
  const [isPreloading, setIsPreloading] = useState(true)

  // Preload section images after the page has loaded
  useEffect(() => {
    setIsPreloading(false)
  }, [])

  // Add enhanced structured data for SEO
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Main event structured data
      const eventStructuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "The Mountaincamp 2025",
        description: "Trailrunning, Community, Party - Join the ultimate alpine adventure at The Mountaincamp 2025.",
        startDate: "2025-08-06T00:00:00",
        endDate: "2025-08-10T00:00:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Hochkrimml, Austrian Alps",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hochkrimml",
            addressRegion: "Salzburg",
            addressCountry: "Austria",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 47.2393,
            longitude: 12.1735,
          },
        },
        image: [
          "https://themountaincamp.de/images/hero-trail-runners.jpeg",
          "https://themountaincamp.de/images/mountain-rave.jpeg",
          "https://themountaincamp.de/images/trail-runner-1.jpeg",
        ],
        offers: {
          "@type": "Offer",
          price: "420",
          priceCurrency: "EUR",
          availability: "https://schema.org/LimitedAvailability",
          url: "https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/",
          validFrom: "2023-01-01T00:00:00",
          priceValidUntil: "2025-08-01T00:00:00",
        },
        organizer: {
          "@type": "Organization",
          name: "The Mountaincamp",
          url: "https://themountaincamp.de",
          logo: "https://themountaincamp.de/images/MTC-Logo_2025.png",
        },
        performer: {
          "@type": "PerformingGroup",
          name: "Trailrunning Coaches",
        },
      }

      // Add structured data to the page
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.text = JSON.stringify(eventStructuredData)
      document.head.appendChild(script)

      return () => {
        // Clean up scripts when component unmounts
        const scripts = document.querySelectorAll('script[type="application/ld+json"]')
        scripts.forEach((scriptEl) => {
          if (document.head.contains(scriptEl)) {
            document.head.removeChild(scriptEl)
          }
        })
      }
    }
  }, [])

  // Detect if on mobile
  const isMobile = useMobile()

  // Camp start date: August 6, 2025
  const campStartDate = new Date("2025-08-06T00:00:00")

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Parallax effect for hero section
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Intersection observer for animations
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolled])

  // State to track if the activity card is expanded on mobile
  const [expandedActivities, setExpandedActivities] = useState<Record<number, boolean>>({})

  const toggleActivity = (index: number) => {
    setExpandedActivities((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  // Testimonial data
  const testimonials = [
    {
      quote: "The overall organisation of the whole stay there, really good! All the friendly faces, the nature etc.",
      name: "Sarah K.",
      role: "Intermediate Runner",
    },
    {
      quote:
        "I loved the experience as a whole, but what stood out was the variety in not only runs, but generally activities, there was always something exciting happening!",
      name: "Michael T.",
      role: "Advanced Runner",
    },
    {
      quote: "The location was spectacular, the organisation was really detailed.",
      name: "Emma L.",
      role: "Beginner Runner",
    },
    {
      quote:
        "The opportunities to do different routes, activities and always meeting different people. The area is awesome and the house is very nice. Loved the sauna / lounge area a lot and the flexibility we had.",
      name: "David R.",
      role: "Trailrunning Enthusiast",
    },
  ]

  // Gallery images
  const galleryImages = [
    { src: "/images/trail-runner-1.jpeg", alt: "Trailrunner in the Alps", caption: "Alpine Trails" },
    { src: "/images/summit-view.jpeg", alt: "Summit view", caption: "Summit Views" },
    { src: "/images/canoeing-activity.jpeg", alt: "Canoeing on alpine lake", caption: "Lake Activities" },
    { src: "/images/table-tennis.png", alt: "Table tennis", caption: "Community Activities" },
    { src: "/images/summit-trail.jpeg", alt: "Trail to summit", caption: "Mountain Peaks" },
    { src: "/images/alpine-landscape.jpeg", alt: "Alpine landscape", caption: "Alpine Beauty" },
  ]

  // Activities data
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
      title: "Aquarell Painting",
      image: "/images/aquarell-painting.png",
      description: "Express your creativity by painting the stunning alpine landscapes with watercolors.",
    },
    {
      title: "Clay Class",
      image: "/images/clay-class.png",
      description: "Get your hands dirty and create beautiful pottery inspired by the natural surroundings.",
    },
    {
      title: "Yoga",
      image: "/images/yoga.png",
      description: "Restore balance and recover with yoga sessions designed specifically for runners.",
    },
    {
      title: "Knitting",
      image: "/images/knitting.png",
      description: "Learn to knit in a relaxed setting - a perfect mindful activity after a day of running.",
    },
    {
      title: "Climbing Class",
      image: "/images/climbing-class-real.jpeg",
      description: "Build strength and confidence with indoor climbing sessions led by experienced instructors.",
    },
    {
      title: "Upcycling Class",
      image: "/images/upcycling-class.png",
      description: "Transform old materials into new treasures in our creative and eco-friendly upcycling workshop.",
    },
    {
      title: "Campfire Evening",
      image: "/images/campfire-evening.jpeg",
      description: "Share stories and connect with fellow runners around a cozy campfire under the stars.",
    },
    {
      title: "Sunset Rave",
      image: "/images/mountain-rave.jpeg",
      description: "Dance to great music with spectacular mountain views at our legendary sunset party.",
    },
  ]

  // Handle menu button click
  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Preload section images in the background */}
      <ImagePreloader imageSources={SECTION_IMAGES} />

      {/* Dynamic header - transparent on top, dark when scrolled */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          hasScrolled ? "bg-black/90 nav-blur border-b border-primary/20" : "bg-transparent"
        }`}
      >
        <div className="container flex h-20 items-center justify-between">
          {/* Logo container with fixed width on mobile */}
          <div className="flex items-center">
            <div className={`relative ${isMobile ? "w-32 h-10" : "w-auto h-14"}`}>
              <ImageWithFallback
                src="/images/MTC-Logo_2025.png"
                alt="The Mountaincamp Logo"
                width={1000}
                height={400}
                className={`h-full w-auto object-contain transition-opacity duration-300 ${hasScrolled ? "opacity-0" : "opacity-0"}`}
                priority
                unoptimized={true}
                fallbackSrc="/placeholder.svg?height=400&width=1000&text=MTC"
              />
              <ImageWithFallback
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp Logo"
                width={1000}
                height={400}
                className="absolute top-0 left-0 h-full w-auto object-contain transition-opacity duration-300 opacity-100"
                priority
                unoptimized={true}
                fallbackSrc="/placeholder.svg?height=400&width=1000&text=MTC"
              />
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              href="#about"
              className="text-sm font-medium uppercase hover:text-primary transition-colors text-white"
            >
              {t("about")}
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium uppercase hover:text-primary transition-colors text-white"
            >
              {t("experience")}
            </Link>
            <PreloadLink
              href="/house"
              imagesToPreload={HOUSE_PAGE_IMAGES}
              className="text-sm font-medium uppercase hover:text-primary transition-colors text-white"
            >
              {t("house")}
            </PreloadLink>
            <PreloadLink
              href="/trails"
              imagesToPreload={TRAILS_PAGE_IMAGES}
              className="text-sm font-medium uppercase hover:text-primary transition-colors text-white"
            >
              {t("trails")}
            </PreloadLink>
            <Link
              href="#testimonials"
              className="text-sm font-medium uppercase hover:text-primary transition-colors text-white"
            >
              {t("testimonials")}
            </Link>
            <Link
              href="#register"
              className="text-sm font-medium uppercase hover:text-primary transition-colors text-white"
            >
              {t("register")}
            </Link>
            <LanguageSwitcher />
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Smaller button on mobile */}
            <Button
              className={`bg-primary hover:bg-primary-dark text-white transition-colors ${
                isMobile ? "text-xs px-2 py-1 h-auto" : ""
              }`}
              asChild
            >
              <a
                href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("registerNow")}
              </a>
            </Button>

            {/* Mobile menu button with improved touch target */}
            <button
              className="md:hidden flex items-center justify-center w-12 h-12"
              onClick={handleMenuToggle}
              aria-label="Open menu"
              type="button"
            >
              <Menu className="h-7 w-7 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
          >
            <div className="container flex justify-between items-center h-20">
              <Image
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp Logo"
                width={1000}
                height={400}
                className="h-10 w-auto"
                unoptimized={true}
              />
              <motion.button
                onClick={handleMenuToggle}
                aria-label="Close menu"
                className="w-12 h-12 flex items-center justify-center"
                type="button"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <X className="h-7 w-7 text-white" />
              </motion.button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-12 py-8">
              {[
                { key: "about", href: "#about" },
                { key: "experience", href: "#experience" },
                { key: "house", href: "/house" },
                { key: "trails", href: "/trails" },
                { key: "testimonials", href: "#testimonials" },
                { key: "register", href: "#register" },
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="text-2xl font-bold text-white hover:text-primary transition-colors py-4 px-8"
                    onClick={handleMenuToggle}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <LanguageSwitcher />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero section with parallax effect */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-trail-runners.jpeg"
              alt="Trail runners in the Austrian Alps"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>

          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 inline-block border border-primary px-4 py-2"
            >
              <span className="text-sm font-medium uppercase tracking-widest">{t("heroDate")}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="mb-6"
            >
              {isMobile ? (
                <Image
                  src="/images/MTC-Logo_2025_weiß.png"
                  alt="The Mountaincamp Logo"
                  width={250}
                  height={100}
                  className="mx-auto"
                  priority
                  unoptimized={true}
                />
              ) : (
                <h1 className="text-6xl font-bold uppercase tracking-tight">THE MOUNTAINCAMP</h1>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-6 max-w-2xl text-lg sm:text-xl md:text-2xl font-light px-4 sm:px-0"
            >
              {t("heroSubtitle1")}
              <br />
              {t("heroSubtitle2")}
              <br />
              <span className="font-bold">{t("heroSubtitle3")}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="btn-primary text-lg px-8" asChild>
                  <Link href="#about">{t("learnMore")}</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="btn-outline text-lg px-8" asChild>
                  <a
                    href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("registerNow")}
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-10 w-10 text-white" />
          </motion.div>
        </section>

        {/* Key features section */}
        <section className="py-20 bg-black text-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="mb-6 rounded-full bg-primary/20 p-4">
                  <Mountain className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t("epicTrails")}</h3>
                <p className="text-white/80">{t("epicTrailsDesc")}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="mb-6 rounded-full bg-primary/20 p-4">
                  <Music className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t("sunsetRave")}</h3>
                <p className="text-white/80">{t("sunsetRaveDesc")}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="mb-6 rounded-full bg-primary/20 p-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t("community")}</h3>
                <p className="text-white/80">{t("communityDesc")}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About section with diagonal design */}
        <section id="about" className="py-24 relative overflow-hidden bg-card">
          <div
            className="absolute top-0 left-0 w-full h-24 bg-black"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
          ></div>

          <div className="container relative z-10 mt-12">
            <div className="grid gap-16 md:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <SectionTitle title={t("aboutTitle")} subtitle={t("aboutSubtitle")} />
                <div className="space-y-6 text-white/80">
                  <p className="text-lg">{t("aboutText1")}</p>
                  <p className="text-lg">{t("aboutText2")}</p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{t("heroDate")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">
                        {language === "de" ? "Hochkrimml, Österreich" : "Hochkrimml, Austria"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] overflow-hidden rounded-xl"
              >
                <Image
                  src="/images/trail-runner-1.jpeg"
                  alt="Trailrunner in the Alps"
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="bg-primary text-white px-4 py-2 font-bold uppercase text-sm">
                    {language === "de" ? "Entdecken" : "Explore"}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Countdown section with animated background */}
        <section className="py-24 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl"></div>
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="section-title mb-8">{t("countdownTitle")}</h2>
              <CountdownTimer targetDate={campStartDate} />
              <div className="mt-12">
                <Button size="lg" className="btn-outline text-lg px-8 hover:bg-primary hover:border-primary" asChild>
                  <Link href="#register">{t("secureSpot")}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience section with animated cards */}
        <section id="experience" className="py-24 bg-card">
          <div className="container">
            <SectionTitle title={t("experienceTitle")} subtitle={t("experienceSubtitle")} align="center" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="transform hover:scale-105"
              >
                <FeatureCard
                  title={t("trailrunningTitle")}
                  description={t("trailrunningDesc")}
                  icon={<Mountain className="h-8 w-8" />}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="transform hover:scale-105"
              >
                <FeatureCard
                  title={t("recoveryTitle")}
                  description={t("recoveryDesc")}
                  icon={<Flame className="h-8 w-8" />}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="transform hover:scale-105"
              >
                <FeatureCard
                  title={t("creativityTitle")}
                  description={t("creativityDesc")}
                  icon={<Sparkles className="h-8 w-8" />}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="transform hover:scale-105"
              >
                <FeatureCard title={t("raveTitle")} description={t("raveDesc")} icon={<Music className="h-8 w-8" />} />
              </motion.div>
            </div>

            {/* Featured experience highlight */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 relative overflow-hidden rounded-xl"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-black p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-6">{t("raveHighlightTitle")}</h3>
                  <p className="text-white/80 mb-8">{t("raveHighlightDesc")}</p>
                  <ul className="space-y-4 text-white/80">
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{t("raveBullet1")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{t("raveBullet2")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{t("raveBullet3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[400px] md:h-auto">
                  <Image
                    src="/images/mountain-rave.jpeg"
                    alt="Mountain sunset rave"
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent md:bg-gradient-to-l"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Activities showcase */}
        <section className="py-24 bg-background">
          <div className="container">
            <SectionTitle title={t("activitiesTitle")} subtitle={t("activitiesSubtitle")} align="center" />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {activities.map((activity, index) =>
                isMobile ? (
                  <ActivityCardMobile
                    key={index}
                    title={activity.title}
                    description={activity.description}
                    image={activity.image}
                  />
                ) : (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="activity-card aspect-square group"
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        toggleActivity(index)
                      }
                    }}
                  >
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized={true}
                    />
                    <div
                      className={`activity-card-overlay 
                        ${expandedActivities[index] ? "opacity-90" : "opacity-80 group-hover:opacity-90"}`}
                    />
                    <div className="activity-card-content">
                      <h3 className="text-xl font-bold">{activity.title}</h3>
                      <p
                        className={`text-sm text-white/90 transition-all duration-300 
                          ${
                            expandedActivities[index]
                              ? "max-h-32 mt-2 overflow-y-auto"
                              : "max-h-0 overflow-hidden md:group-hover:max-h-20 md:group-hover:mt-2"
                          }`}
                      >
                        {activity.description}
                      </p>
                      <div className="md:hidden mt-2 text-xs text-white/70">
                        {expandedActivities[index] ? t("tapToClose") : t("tapForDetails")}
                      </div>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Gallery section with hover effects */}
        <section className="py-24 bg-card">
          <div className="container">
            <SectionTitle title={t("galleryTitle")} align="center" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="aspect-square overflow-hidden group relative"
                >
                  <ImageWithFallback
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    fallbackSrc="/placeholder.svg?height=600&width=600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-bold">{image.caption}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials section with improved cards */}
        <section id="testimonials" className="py-24 relative overflow-hidden bg-background">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

          <div className="container relative z-10">
            <SectionTitle title={t("testimonialsTitle")} align="center" />

            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TestimonialCard quote={testimonial.quote} />
                </motion.div>
              ))}
            </div>

            {/* Spotify Playlist Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 mb-16 relative overflow-hidden rounded-xl"
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/mountain-rave.jpeg"
                  alt="Mountain rave"
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-12 text-white">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">{t("playlistTitle")}</h3>
                  <p className="max-w-2xl mx-auto text-white/80">{t("playlistDesc")}</p>
                </div>
                <div className="flex justify-center">
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src={`https://open.spotify.com/embed/playlist/33kezN4oDEMyKsFBCicpu6?utm_source=generator&theme=0&cache=${Date.now()}`}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    className="max-w-3xl shadow-2xl"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            {/* Community highlight */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 bg-black text-white p-12 rounded-xl text-center"
            >
              <h3 className="text-3xl font-bold mb-6">{t("communityTitle")}</h3>
              <p className="max-w-2xl mx-auto text-white/80 mb-8">{t("communityDesc")}</p>
            </motion.div>

            {/* Price Category Bars */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <PriceCategoryBars />
            </motion.div>
          </div>
        </section>

        {/* Registration section with improved form */}
        <section id="register" className="py-24 bg-black text-white">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold uppercase tracking-tight mb-6">{t("joinTitle")}</h2>
                <p className="text-xl mb-8">
                  {t("heroDate")}
                  <br />
                  {language === "de" ? "Österreichische Alpen" : "Austrian Alps"}
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{t("accommodation")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{t("meals")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{t("allLevels")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{t("limitedSpots")}</span>
                  </li>
                </ul>

                {/* Price tag */}
                <div className="mt-12 inline-block">
                  <div className="bg-primary px-6 py-3 rounded-t-lg">
                    <span className="text-sm font-medium text-white uppercase">{t("packageTitle")}</span>
                  </div>
                  <div className="bg-card px-6 py-4 rounded-b-lg">
                    <span className="text-3xl font-bold text-white">€420</span>
                    <span className="text-white/70 ml-2">{t("perPerson")}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-card p-8 text-white rounded-xl border border-primary/20">
                  <h3 className="text-2xl font-bold uppercase mb-6">
                    <a
                      href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline transition-colors"
                    >
                      {t("bookSpot")}
                    </a>
                  </h3>
                  <p className="text-white/70 mb-6">{t("bookDesc")}</p>
                  <Button
                    className="w-full bg-primary hover:bg-primary-dark transition-colors text-white py-3 text-lg rounded-md"
                    asChild
                  >
                    <a
                      href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("registerNow")}
                    </a>
                  </Button>
                  {/* Add the bus transfer button here */}
                  <Button
                    className="w-full mt-4 bg-card hover:bg-primary/20 text-white py-3 text-lg rounded-md border border-primary/20 transition-colors"
                    asChild
                  >
                    <Link href="/bus-departures">
                      {language === "de" ? "Bus Anreise Details" : "Bus Transfer Details"}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with improved design */}
      <footer className="footer">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0">
              <Image
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp Logo"
                width={180}
                height={40}
                className="h-12 w-auto mb-4"
                unoptimized={true}
              />
              <p className="text-white/60">
                {language === "de"
                  ? "Trailrunning-Camp in den österreichischen Alpen"
                  : "Trailrunning camp in the Austrian Alps"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
              <div className="flex flex-col gap-3">
                <h4 className="footer-heading">{t("navigation")}</h4>
                <Link href="#about" className="footer-link">
                  {t("about")}
                </Link>
                <Link href="#experience" className="footer-link">
                  {t("experience")}
                </Link>
                <Link href="#testimonials" className="footer-link">
                  {t("testimonials")}
                </Link>
                <Link href="#register" className="footer-link">
                  {t("register")}
                </Link>
                <Link href="/bus-departures" className="footer-link">
                  {language === "de" ? "Bus Anreise" : "Bus Transport"}
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="footer-heading">{t("contact")}</h4>
                <a href="mailto:themountaincampde@gmail.com" className="footer-link">
                  themountaincampde@gmail.com
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="footer-heading">{t("followUs")}</h4>
                <a
                  href="https://www.instagram.com/the_mountaincamp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61566807910764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Facebook
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="footer-heading">{t("legal")}</h4>
                <Link href="/datenschutz" className="footer-link">
                  {t("privacyPolicy")}
                </Link>
                <Link href="/impressum" className="footer-link">
                  {t("imprint")}
                </Link>
                <Link href="/legal/conditions-of-raffle-participation" className="footer-link">
                  {t("raffleConditions")}
                </Link>
                <CookieSettingsButton />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
            © {new Date().getFullYear()} The Mountaincamp. {t("rights")}
          </div>
        </div>
      </footer>
    </div>
  )
}
