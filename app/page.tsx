"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Mountain, Flame, Sparkles, Music, ArrowRight, ChevronDown, Calendar, MapPin, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"

// Import components
import FeatureCard from "@/app/components/feature-card"
import SectionTitle from "@/app/components/section-title"
import ActivityCardMobile from "@/app/components/activity-card-mobile"
import LanguageSwitcher from "@/app/components/language-switcher"
import PriceCategoryBars from "@/app/components/price-category-bars"
import ImageWithFallback from "@/app/components/image-with-fallback"
import ImagePreloader from "@/app/components/image-preloader"
import PreloadLink from "@/app/components/preload-link"
import { useScrollVideo } from "@/hooks/use-scroll-video"
import TestimonialSlider from "@/app/components/testimonial-slider"

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
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedActivities, setExpandedActivities] = useState<{ [key: number]: boolean }>({})
  const [scrollY, setScrollY] = useState(0)
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
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
          "https://themountaincamp.de/images/mountain-top-sunset-rave.jpg",
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
  // const isMobile = useMobile()

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
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3])

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
  // const [expandedActivities, setExpandedActivities] = useState<Record<number, boolean>>({})

  const toggleActivity = (index: number) => {
    setExpandedActivities((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  const testimonials = [
    {
      quote:
        "Overall, it was my first experience trail running and I loved it – the running, the people, the amazing scenery etc.",
      name: "Trail Runner",
    },
    {
      quote: "Bringing the people together and sharing the pain/fun during the run was a great experience.",
      name: "Community Member",
    },
    {
      quote: "Great atmosphere, amazing mountains, a lot of activities offered.",
      name: "Mountain Lover",
    },
    {
      quote: "Got me hooked on trail running hobby and made unique, lovely, crazy friends.",
      name: "New Trail Runner",
    },
    {
      quote:
        "Being able to do great sport activities all day from early morning to late night with super nice friends! Thank you!",
      name: "Active Participant",
    },
    {
      quote:
        "Thank you. Just thank you, Jonas. You are doing great. It will be the greatest Trailcamp in the World soon.",
      name: "Grateful Runner",
    },
    {
      quote:
        "Just a big thank you – I had the best time! Overall an amazing experience, definitely one of the highlights of this year!",
      name: "Happy Camper",
    },
    {
      quote:
        "Thanks Jonas for organising, the last few days have been truly amazing, I was able to combine community, trail running and hard training!",
      name: "Dedicated Athlete",
    },
    {
      quote: "Many thanks for the organisation and the great time! Was purely amazing ☺️",
      name: "Satisfied Participant",
    },
    {
      quote: "I loved the Mountaincamp 2025 really much and I am proud of everybody!!!",
      name: "Proud Member",
    },
  ]

  const galleryImages = [
    {
      src: "/images/camp-social-gathering.jpg",
      alt: "Camp participants socializing on lodge terrace",
      caption: "Community Vibes",
    },
    {
      src: "/images/lodge-group-start.jpg",
      alt: "Group of runners gathered at mountain lodge",
      caption: "Ready to Run",
    },
    {
      src: "/images/terrace-community-time.jpg",
      alt: "Large group gathering on lodge terrace at sunset",
      caption: "Mountain Community",
    },
    {
      src: "/images/trail-runners-mountain-path.jpg",
      alt: "Two female trail runners on mountain path",
      caption: "Trail Adventures",
    },
    { src: "/images/runner-golden-meadow.jpg", alt: "Runner in golden mountain meadow", caption: "Mountain Freedom" },
    {
      src: "/images/mountain-trail-aerial.jpg",
      alt: "Aerial view of runners on mountain trail",
      caption: "Epic Trails",
    },
    { src: "/images/forest-runner-celebration.jpg", alt: "Joyful runner celebrating in forest", caption: "Pure Joy" },
    { src: "/images/lodge-terrace-relaxation.jpg", alt: "Campers relaxing on lodge terrace", caption: "Recovery Time" },
    {
      src: "/images/peaceful-terrace-moment.jpg",
      alt: "Person relaxing under umbrella on mountain lodge terrace",
      caption: "Peaceful Moments",
    },
  ]

  // Activities data
  const activities = [
    {
      title: "Trailrunning Technique",
      image: "/images/trailrunning-technique-class.jpg",
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
      image: "/images/mountain-top-sunset-rave.jpg",
      description: "Dance to great music with spectacular mountain views at our legendary sunset party.",
    },
  ]

  // Handle menu button click
  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const { videoRef, isVideoLoaded } = useScrollVideo()

  const nextActivity = () => {
    setCurrentActivityIndex((prev) => (prev + 1) % activities.length)
  }

  const prevActivity = () => {
    setCurrentActivityIndex((prev) => (prev - 1 + activities.length) % activities.length)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Preload section images in the background */}
      <ImagePreloader imageSources={SECTION_IMAGES} />

      {/* Dynamic header - transparent on top, dark when scrolled */}
      <header className="absolute top-0 z-50 w-full bg-transparent">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo container with fixed width on mobile */}
          <div className="flex items-center">
            <div className={`relative ${isMobile ? "w-32 h-10" : "w-auto h-14"}`}>
              <ImageWithFallback
                src="/images/favicon_weiß.png"
                alt="The Mountaincamp Logo"
                width={200}
                height={200}
                className="h-full w-auto object-contain transition-opacity duration-300 opacity-100"
                priority
                unoptimized={true}
                fallbackSrc="/placeholder.svg?height=200&width=200&text=MTC"
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
        {/* Hero section with scroll-driven video */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <motion.div style={{ scale: heroScale }} className="h-full w-full">
              <Image
                src="/images/waterfall-group-photo.jpg"
                alt="Mountain Training Camp group photo with participants celebrating at a spectacular waterfall"
                fill
                className="object-cover object-center"
                priority
                fetchPriority="high"
                unoptimized={true}
              />
            </motion.div>

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
              <span className="text-sm font-medium uppercase tracking-widest">Date coming soon</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0,
                duration: 0,
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
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0 }}
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

        {/* About section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-24 bg-transparent"
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
                <SectionTitle title={t("aboutTitle")} subtitle={t("aboutSubtitle")} light={true} />
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg leading-relaxed whitespace-pre-line">{t("aboutText1")}</p>
                  <p className="text-lg leading-relaxed whitespace-pre-line">{t("aboutText2")}</p>
                  <p className="text-lg leading-relaxed whitespace-pre-line font-bold text-gray-900">
                    {t("aboutText3")}
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-gray-900">Date coming soon</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-gray-900">
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
                  src="/images/alpine-village-group.jpg"
                  alt="Mountain camp participants walking together in Alpine village"
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

        {/* Experience section with animated cards */}
        <section id="experience" className="py-24 bg-gray-50">
          <div className="container">
            <SectionTitle title={t("experienceTitle")} subtitle={t("experienceSubtitle")} align="center" light={true} />

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
                  light={true}
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
                  light={true}
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
                  light={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="transform hover:scale-105"
              >
                <FeatureCard
                  title={t("raveTitle")}
                  description={t("raveDesc")}
                  icon={<Music className="h-8 w-8" />}
                  light={true}
                />
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
                      <span className="text-white/80">{t("raveBullet1")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-white/80">{t("raveBullet2")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-white/80">{t("raveBullet3")}</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[400px] md:h-auto">
                  <Image
                    src="/images/mountain-top-sunset-rave.jpg"
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
        <section className="py-24 bg-white">
          <div className="container">
            <SectionTitle title={t("activitiesTitle")} subtitle={t("activitiesSubtitle")} align="center" light={true} />

            <div className="relative max-w-2xl mx-auto">
              {/* Activity Card */}
              <motion.div
                key={currentActivityIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {isMobile ? (
                  <ActivityCardMobile
                    title={activities[currentActivityIndex].title}
                    description={activities[currentActivityIndex].description}
                    image={activities[currentActivityIndex].image}
                  />
                ) : (
                  <div className="activity-card aspect-square group mx-auto max-w-md">
                    <Image
                      src={activities[currentActivityIndex].image || "/placeholder.svg"}
                      alt={activities[currentActivityIndex].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized={true}
                    />
                    <div className="activity-card-overlay opacity-80 group-hover:opacity-90" />
                    <div className="activity-card-content">
                      <h3 className="text-2xl font-bold text-white">{activities[currentActivityIndex].title}</h3>
                      <p className="text-base text-white/90 mt-4 max-h-32 overflow-y-auto">
                        {activities[currentActivityIndex].description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              <button
                onClick={prevActivity}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 z-10 shadow-lg border border-white/20"
                aria-label="Previous activity"
              >
                <ChevronDown className="w-8 h-8 rotate-90" />
              </button>

              <button
                onClick={nextActivity}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 z-10 shadow-lg border border-white/20"
                aria-label="Next activity"
              >
                <ChevronDown className="w-8 h-8 -rotate-90" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 gap-2">
                {activities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentActivityIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentActivityIndex ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to activity ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery section with hover effects */}
        <section className="py-24 bg-gray-50">
          <div className="container">
            <SectionTitle title={t("galleryTitle")} align="center" light={true} />

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
                    <span className="font-bold text-white">{image.caption}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

          <div className="container relative z-10">
            <SectionTitle title={t("testimonialsTitle")} align="center" light={true} />

            <div className="max-w-4xl mx-auto">
              <TestimonialSlider testimonials={testimonials} autoPlay={true} interval={6000} />
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
                  src="/images/mountain-top-sunset-rave.jpg"
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
                  <h3 className="text-3xl font-bold mb-4 text-white">{t("playlistTitle")}</h3>
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

        {/* Partners section */}
        <section className="py-24 bg-gray-50">
          <div className="container">
            <SectionTitle title={t("partnersTitle")} subtitle={t("partnersSubtitle")} align="center" light={true} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-center justify-items-center max-w-4xl mx-auto"
            >
              {/* Altra Logo */}
              <motion.a
                href="https://www.altrarunning.eu/de/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full h-32"
                whileHover={{ y: -5 }}
              >
                <Image
                  src="/images/altra-logo.png"
                  alt="Altra Running"
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain"
                  unoptimized={true}
                />
              </motion.a>

              {/* Reboots Logo */}
              <motion.a
                href="https://reboots.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center p-8 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full h-32"
                whileHover={{ y: -5 }}
              >
                <Image
                  src="/images/reboots-logo-white.png"
                  alt="Reboots"
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain"
                  unoptimized={true}
                />
              </motion.a>

              {/* Lebepur Logo */}
              <motion.a
                href="https://www.lebepur.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full h-32"
                whileHover={{ y: -5 }}
              >
                <Image
                  src="/images/lebepur-logo.jpg"
                  alt="Lebepur"
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain"
                  unoptimized={true}
                />
              </motion.a>

              {/* PowerBar Logo */}
              <motion.a
                href="https://www.powerbar.eu"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full h-32"
                whileHover={{ y: -5 }}
              >
                <Image
                  src="/images/powerbar-logo.png"
                  alt="PowerBar"
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain"
                  unoptimized={true}
                />
              </motion.a>
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
                <h2 className="text-4xl font-bold uppercase tracking-tight mb-6 text-white">{t("joinTitle")}</h2>
                <p className="text-xl mb-8 text-white">
                  Coming Soon
                  <br />
                  {language === "de" ? "Österreichische Alpen" : "Austrian Alps"}
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-white">{t("accommodation")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-white">{t("meals")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-white">{t("allLevels")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-white">{t("limitedSpots")}</span>
                  </li>
                </ul>

                <div className="mt-12 inline-block">
                  <div className="bg-primary px-6 py-3 rounded-t-lg">
                    <span className="text-sm font-medium text-white uppercase">{t("packageTitle")}</span>
                  </div>
                  <div className="bg-gray-800 px-6 py-4 rounded-b-lg">
                    <span className="text-3xl font-bold text-white">Coming Soon</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gray-800 p-8 text-white rounded-xl border border-gray-700">
                  <h3 className="text-2xl font-bold uppercase mb-6 text-center text-white">Coming Soon</h3>
                  <p className="text-white/70 mb-6 text-center">
                    {language === "de"
                      ? "Die Buchung wird bald verfügbar sein. Bleiben Sie dran für weitere Updates!"
                      : "Booking will be available soon. Stay tuned for updates!"}
                  </p>
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
                <h4 className="footer-heading text-white">{t("navigation")}</h4>
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
                <h4 className="footer-heading text-white">{t("contact")}</h4>
                <a href="mailto:themountaincampde@gmail.com" className="footer-link">
                  themountaincampde@gmail.com
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="footer-heading text-white">{t("followUs")}</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/the_mountaincamp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-4.262 9.781c-2.448 0-4.262-1.814-4.262-4.262s1.814-4.262 4.262-4.262 4.262 1.814 4.262 4.262-1.814 4.262-4.262 4.262z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@the_mountaincamp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://open.spotify.com/playlist/33kezN4oDEMyKsFBCicpu6?go=1&sp_cid=6cbbc4d6562c94dccb0ca417c102a028&utm_source=embed_player_p&utm_medium=desktop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors"
                    aria-label="Spotify"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-.181 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@themountaincamp?_t=ZN-8xYSIlpRmkw&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary transition-colors"
                    aria-label="TikTok"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24.67.62 1.32 1.24 1.76.84.6 1.91.75 2.91.46.01-1.49.01-2.99.01-4.48s.01-2.99.01-4.48c0-1.63-.8-3.2-2.1-4.25-1.07-.87-2.44-1.26-3.81-1.15-2.9.24-5.22 2.7-5.22 5.61 0 .33 0 .66-.02.99.02.33.02.66.04.99.04.6.18 1.19.42 1.74.49 1.11 1.44 2 2.66 2.46.6.22 1.23.34 1.86.36.02-1.48.04-2.96.04-4.44-.01-.46.24-.9.6-1.2.36-.3.84-.42 1.29-.32.41.1.74.42.86.83.19.61.42 1.19.66 1.77.34 1.04.83 2.06 1.51 2.86 1.3 1.54 3.33 2.46 5.41 2.54 1.24.01 2.48-.15 3.64-.51 0-.01 0 0 0 0z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="footer-heading text-white">{t("legal")}</h4>
                <Link href="/legal-notice" className="footer-link">
                  {language === "de" ? "Impressum" : "Legal Notice"}
                </Link>
                <Link href="/privacy-policy" className="footer-link">
                  {language === "de" ? "Datenschutz" : "Privacy Policy"}
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center text-white/60">
            &copy; {new Date().getFullYear()} The Mountaincamp. {t("allRightsReserved")}
          </div>
        </div>
      </footer>
    </div>
  )
}
