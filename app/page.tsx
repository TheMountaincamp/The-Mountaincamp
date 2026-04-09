"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Mountain,
  Flame,
  Sparkles,
  Music,
  ArrowRight,
  ChevronDown,
  Calendar,
  MapPin,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"

import FeatureCard from "@/app/components/feature-card"
import SectionTitle from "@/app/components/section-title"
import ActivityCardMobile from "@/app/components/activity-card-mobile"
import LanguageSwitcher from "@/app/components/language-switcher"
import PriceCategoryBars from "@/app/components/price-category-bars"
import ImageWithFallback from "@/app/components/image-with-fallback"
import ImagePreloader from "@/app/components/image-preloader"
import PreloadLink from "@/app/components/preload-link"
import TestimonialSlider from "@/app/components/testimonial-slider"
import InstagramReelsSection from "@/app/components/instagram-reels-section"
import FAQSection from "@/app/components/faq-section"
import RouteOverviewSection from "@/app/components/route-overview-section"

const SECTION_IMAGES = ["/images/MTC-Logo_2025_weiß.png"]
const HOUSE_PAGE_IMAGES = ["/images/mountain-lodge.jpeg"]
const TRAILS_PAGE_IMAGES = ["/images/mountain-trail-runner.jpeg", "/images/trail-runners-group.jpeg"]

export default function Home() {
  const { t, language } = useLanguage()
  const isMobile = useMobile()

  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef(null)

  const bookingUrl = `https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=2467&termin_id=36011&locale=${language === "de" ? "de" : "en"
    }#/`

  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "The Mountaincamp 2026",
    alternateName: [
      "The Mountaincamp",
      "Trailrunning Camp Austria",
      "Trailrunning Camp Österreich",
      "Trail Running Camp Austria",
    ],
    description:
      "A 5-day trail running camp in Hochkrimml, Austria, for beginners, intermediate runners and experienced athletes. Trails, coaching, community and workshops in the Austrian Alps.",
    sport: "Trail Running",
    startDate: "2026-08-05",
    endDate: "2026-08-09",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Hochkrimml, Austrian Alps",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hochkrimml",
        addressLocality: "Hochkrimml",
        addressRegion: "Salzburg",
        postalCode: "5743",
        addressCountry: "AT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.2393,
        longitude: 12.1735,
      },
    },
    image: [
      "https://themountaincamp.de/images/hero-trail-runners.jpeg",
      "https://themountaincamp.de/images/alpine-village-group.jpg",
      "https://themountaincamp.de/images/mountain-summit.jpeg",
    ],
    offers: {
      "@type": "Offer",
      price: "530",
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      url: bookingUrl,
      validFrom: "2026-04-01T19:00:00+02:00",
      priceValidUntil: "2026-08-01T00:00:00+02:00",
    },
    organizer: {
      "@type": "Organization",
      name: "The Mountaincamp",
      url: "https://themountaincamp.de",
      logo: "https://themountaincamp.de/images/MTC-Logo_2025.png",
      sameAs: [
        "https://www.instagram.com/the_mountaincamp/",
        "https://www.youtube.com/@the_mountaincamp",
        "https://www.tiktok.com/@themountaincamp",
      ],
    },
    performer: {
      "@type": "Organization",
      name: "The Mountaincamp Coaching Team",
    },
  }

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Mountaincamp",
    url: "https://themountaincamp.de",
    logo: "https://themountaincamp.de/images/MTC-Logo_2025.png",
    image: "https://themountaincamp.de/images/hero-trail-runners.jpeg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hochkrimml",
      addressRegion: "Salzburg",
      addressCountry: "AT",
    },
    sameAs: [
      "https://www.instagram.com/the_mountaincamp/",
      "https://www.youtube.com/@the_mountaincamp",
      "https://www.tiktok.com/@themountaincamp",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "themountaincampde@gmail.com",
      contactType: "Customer Service",
      availableLanguage: ["German", "English"],
    },
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://themountaincamp.de",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "The Mountaincamp",
        item: "https://themountaincamp.de",
      },
    ],
  }

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3])

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => { })
      }
    }

    playVideo()

    const handleInteraction = () => {
      playVideo()
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("click", handleInteraction)
    }

    document.addEventListener("touchstart", handleInteraction, { once: true })
    document.addEventListener("click", handleInteraction, { once: true })

    return () => {
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("click", handleInteraction)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
      }
      if (window.scrollY <= 100 && hasScrolled) {
        setHasScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolled])

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
      alt:
        language === "de"
          ? "Camp-Teilnehmer beim Socializen auf der Terrasse der Lodge"
          : "Camp participants socializing on lodge terrace",
      caption: "Community Vibes",
    },
    {
      src: "/images/lodge-group-start.jpg",
      alt:
        language === "de"
          ? "Gruppe von Läufern versammelt an der Berghütte"
          : "Group of runners gathered at mountain lodge",
      caption: language === "de" ? "Bereit zum Laufen" : "Ready to Run",
    },
    {
      src: "/images/terrace-community-time.jpg",
      alt:
        language === "de"
          ? "Große Gruppe auf der Terrasse der Lodge bei Sonnenuntergang"
          : "Large group gathering on lodge terrace at sunset",
      caption: "Community Vibes",
    },
    {
      src: "/images/trail-runners-mountain-path.jpg",
      alt:
        language === "de"
          ? "Zwei Trailrunnerinnen auf einem Bergpfad"
          : "Two female trail runners on mountain path",
      caption: language === "de" ? "Trail Abenteuer" : "Trail Adventures",
    },
    {
      src: "/images/runner-golden-meadow.jpg",
      alt: language === "de" ? "Läufer auf goldener Bergwiese" : "Runner in golden mountain meadow",
      caption: language === "de" ? "Bergfreiheit" : "Mountain Freedom",
    },
    {
      src: "/images/mountain-trail-aerial.jpg",
      alt: language === "de" ? "Luftaufnahme von Läufern auf Bergpfad" : "Aerial view of runners on mountain trail",
      caption: language === "de" ? "Epische Trails" : "Epic Trails",
    },
    {
      src: "/images/forest-runner-celebration.jpg",
      alt: language === "de" ? "Fröhlicher Läufer feiert im Wald" : "Joyful runner celebrating in forest",
      caption: language === "de" ? "Pure Freude" : "Pure Joy",
    },
    {
      src: "/images/lodge-terrace-relaxation.jpg",
      alt: language === "de" ? "Camper entspannen auf der Lodge-Terrasse" : "Campers relaxing on lodge terrace",
      caption: language === "de" ? "Erholungszeit" : "Recovery Time",
    },
    {
      src: "/images/peaceful-terrace-moment.jpg",
      alt:
        language === "de"
          ? "Person entspannt unter Sonnenschirm auf der Terrasse der Berghütte"
          : "Person relaxing under umbrella on mountain lodge terrace",
      caption: language === "de" ? "Ruhige Momente" : "Peaceful Moments",
    },
  ]

  const activities = [
    {
      title: language === "de" ? "Trailrunning Technik" : "Trailrunning Technique",
      image: "/images/trailrunning-technique-class.jpg",
      description:
        language === "de"
          ? "Lerne die richtige Trailrunning-Technik von erfahrenen Coaches auf wunderschönen Alpenpfaden."
          : "Learn proper trailrunning techniques from experienced coaches on beautiful alpine trails.",
    },
    {
      title: language === "de" ? "Bogenschießen" : "Archery",
      image: "/images/archery.jpeg",
      description:
        language === "de"
          ? "Teste deine Präzision und Konzentration beim Bogenschießen vor atemberaubender Bergkulisse."
          : "Test your precision and focus with archery sessions in a stunning mountain backdrop.",
    },
    {
      title: language === "de" ? "MTB Tour" : "MTB Trip",
      image: "/images/mtb-trip.png",
      description:
        language === "de"
          ? "Erkunde malerische Bergpfade auf zwei Rädern bei unseren geführten Mountainbike-Touren."
          : "Explore scenic mountain trails on two wheels with our guided mountain biking excursions.",
    },
    {
      title: language === "de" ? "Filmabend" : "Movie Night",
      image: "/images/movie-night.png",
      description:
        language === "de"
          ? "Entspanne und genieße inspirierende Outdoor- und Abenteuerfilme unter dem Sternenhimmel mit anderen Campern."
          : "Relax and enjoy inspiring outdoor and adventure films under the stars with fellow campers.",
    },
    {
      title: language === "de" ? "Kanufahren" : "Canoeing",
      image: "/images/canoeing-lake.jpeg",
      description:
        language === "de"
          ? "Paddle über kristallklare Alpenseen und genieße dabei atemberaubende Bergblicke."
          : "Paddle across crystal-clear alpine lakes while taking in breathtaking mountain views.",
    },
    {
      title: language === "de" ? "Aquarellmalerei" : "Aquarell Painting",
      image: "/images/aquarell-painting.png",
      description:
        language === "de"
          ? "Drücke deine Kreativität aus, indem du die atemberaubenden Alpenlandschaften mit Wasserfarben malst."
          : "Express your creativity by painting the stunning alpine landscapes with watercolors.",
    },
    {
      title: language === "de" ? "Töpferkurs" : "Clay Class",
      image: "/images/clay-class.png",
      description:
        language === "de"
          ? "Mach dir die Hände schmutzig und erschaffe wunderschöne Keramik, inspiriert von der natürlichen Umgebung."
          : "Get your hands dirty and create beautiful pottery inspired by the natural surroundings.",
    },
    {
      title: "Yoga",
      image: "/images/yoga.png",
      description:
        language === "de"
          ? "Finde Balance und erhole dich mit Yoga-Sessions, die speziell für Läufer konzipiert sind."
          : "Restore balance and recover with yoga sessions designed specifically for runners.",
    },
    {
      title: language === "de" ? "Stricken" : "Knitting",
      image: "/images/knitting.png",
      description:
        language === "de"
          ? "Lerne Stricken in entspannter Atmosphäre – eine perfekte achtsame Aktivität nach einem Lauftag."
          : "Learn to knit in a relaxed setting - a perfect mindful activity after a day of running.",
    },
    {
      title: language === "de" ? "Kletterkurs" : "Climbing Class",
      image: "/images/climbing-class-real.jpeg",
      description:
        language === "de"
          ? "Baue Kraft und Selbstvertrauen auf mit Indoor-Klettersessions unter Anleitung erfahrener Instruktoren."
          : "Build strength and confidence with indoor climbing sessions led by experienced instructors.",
    },
    {
      title: language === "de" ? "Upcycling Kurs" : "Upcycling Class",
      image: "/images/upcycling-class.png",
      description:
        language === "de"
          ? "Verwandle alte Materialien in neue Schätze in unserem kreativen und umweltfreundlichen Upcycling-Workshop."
          : "Transform old materials into new treasures in our creative and eco-friendly upcycling workshop.",
    },
    {
      title: language === "de" ? "Lagerfeuer Abend" : "Campfire Evening",
      image: "/images/campfire-evening.jpeg",
      description:
        language === "de"
          ? "Teile Geschichten und verbinde dich mit anderen Läufern am gemütlichen Lagerfeuer unter dem Sternenhimmel."
          : "Share stories and connect with fellow runners around a cozy campfire under the stars.",
    },
    {
      title: "Sunset Rave",
      image: "/images/mountain-top-sunset-rave.jpg",
      description:
        language === "de"
          ? "Tanze zu großartiger Musik mit spektakulärem Bergblick bei unserer legendären Sunset Party."
          : "Dance to great music with spectacular mountain views at our legendary sunset party.",
    },
  ]

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const nextActivity = () => {
    setCurrentActivityIndex((prev) => (prev + 1) % activities.length)
  }

  const prevActivity = () => {
    setCurrentActivityIndex((prev) => (prev - 1 + activities.length) % activities.length)
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Script
        id="structured-data-event"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <Script
        id="structured-data-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <ImagePreloader imageSources={SECTION_IMAGES} onComplete={() => { }} />

      {isMobile && hasScrolled && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/95 px-4 py-3 backdrop-blur-md safe-area-pb"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm font-bold text-white">
                {language === "de" ? "Sichere dir deinen Platz!" : "Secure your spot!"}
              </p>
              <p className="text-xs text-white/60">
                {language === "de" ? "Ab €530 - Begrenzte Plätze" : "From €530 - Limited spots"}
              </p>
            </div>
            <Button
              size="sm"
              className="whitespace-nowrap bg-primary px-4 py-2 font-bold text-white hover:bg-primary/90"
              asChild
            >
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                {language === "de" ? "Jetzt buchen" : "Book now"}
              </a>
            </Button>
          </div>
        </motion.div>
      )}

      <header className="absolute top-0 z-50 w-full bg-transparent">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center">
            <div className={`relative ${isMobile ? "h-10 w-32" : "h-14 w-auto"}`}>
              <ImageWithFallback
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp Logo"
                width={isMobile ? 128 : 200}
                height={isMobile ? 40 : 56}
                className="h-full w-auto object-contain"
                priority
                sizes="(max-width: 768px) 128px, 200px"
              />
            </div>
          </div>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            <Link
              href="#about"
              className="whitespace-nowrap text-sm font-bold uppercase text-white transition-colors hover:text-primary"
            >
              {t("about")}
            </Link>
            <Link
              href="#experience"
              className="whitespace-nowrap text-sm font-bold uppercase text-white transition-colors hover:text-primary"
            >
              {t("experience")}
            </Link>
            <PreloadLink
              href="/house"
              imagesToPreload={HOUSE_PAGE_IMAGES}
              className="whitespace-nowrap text-sm font-bold uppercase text-white transition-colors hover:text-primary"
            >
              {t("house")}
            </PreloadLink>
            <PreloadLink
              href="/trails"
              imagesToPreload={TRAILS_PAGE_IMAGES}
              className="whitespace-nowrap text-sm font-bold uppercase text-white transition-colors hover:text-primary"
            >
              {t("trails")}
            </PreloadLink>
            <Link
              href="#testimonials"
              className="whitespace-nowrap text-sm font-bold uppercase text-white transition-colors hover:text-primary"
            >
              {t("testimonials")}
            </Link>
            <Link
              href="/bus-departures"
              className="whitespace-nowrap text-sm font-bold uppercase text-white transition-colors hover:text-primary"
            >
              Transport
            </Link>
            <LanguageSwitcher />
          </nav>

          <div className="flex items-center">
            <button
              className="flex h-12 w-12 items-center justify-center md:hidden"
              onClick={handleMenuToggle}
              aria-label="Open menu"
              type="button"
            >
              <Menu className="h-7 w-7 text-white" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-black"
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
            <div className="container flex h-20 items-center justify-between">
              <Image
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp Logo"
                width={128}
                height={40}
                className="h-10 w-auto"
                sizes="128px"
              />
              <motion.button
                onClick={handleMenuToggle}
                aria-label="Close menu"
                className="flex h-12 w-12 items-center justify-center"
                type="button"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <X className="h-7 w-7 text-white" />
              </motion.button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8 overflow-y-auto py-8">
              {[
                { key: "about", href: "#about", label: t("about") },
                { key: "experience", href: "#experience", label: t("experience") },
                { key: "house", href: "/house", label: t("house") },
                { key: "trails", href: "/trails", label: t("trails") },
                { key: "testimonials", href: "#testimonials", label: t("testimonials") },
                { key: "transport", href: "/bus-departures", label: "Transport" },
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="px-8 py-4 text-2xl font-bold text-white transition-colors hover:text-primary"
                    onClick={handleMenuToggle}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <LanguageSwitcher />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full overflow-x-hidden">
        <section ref={heroRef} className="relative min-h-[140vh] overflow-hidden">
          <div className="absolute inset-0">
            <motion.div style={{ scale: heroScale }} className="h-full w-full">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover object-center"
                poster="/images/forest-group-photo.jpg"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1127%20%281%29-FEgWVPpCJfcsT3ni35EZXLPrKTpGVQ.mp4"
              />
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="container relative z-20 flex h-screen flex-col items-center justify-center text-center text-white"
          >
            <div className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 backdrop-blur-sm" />

            <div className="relative z-10 mx-auto w-full max-w-md px-5 md:max-w-4xl">
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
                    sizes="250px"
                  />
                ) : null}

                <h1
                  className={`${isMobile ? "sr-only" : "block text-center font-bold uppercase leading-[0.9] tracking-tight text-5xl lg:text-6xl xl:text-7xl"
                    }`}
                >
                  <span className="block">Trailrunning Camp Österreich</span>
                  <span className="block">The Mountaincamp 2026</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mx-auto max-w-3xl px-4 md:px-0"
              >
                <p className="text-base leading-relaxed text-white/90 md:text-2xl">
                  {language === "de"
                    ? "5 Tage Trailrunning Camp, Community und Abenteuer in den österreichischen Alpen."
                    : "5 days of trail running camp, community and adventure in the Austrian Alps."}
                </p>

                <p className="mt-3 text-sm font-semibold text-white/90 md:text-xl">
                  {language === "de" ? "Hochkrimml | 5.–9. August 2026" : "Hochkrimml | August 5–9, 2026"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-5 flex w-full flex-col items-center gap-2"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex w-full justify-center">
                  <Button
                    size="lg"
                    className="btn-primary w-full max-w-[280px] px-6 py-3 text-base"
                    asChild
                  >
                    <Link href="#experience">{language === "de" ? "Entdecke das Camp" : "Discover the Camp"}</Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex w-full justify-center">
                  <Button
                    size="lg"
                    className="btn-outline w-full max-w-[280px] px-6 py-3 text-base"
                    asChild
                  >
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                      {language === "de" ? "Jetzt buchen" : "Book Now"}
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
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
        <section className="bg-white py-10 md:py-14">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
              {language === "de"
                ? "Trailrunning Camp in den österreichischen Alpen"
                : "Trail Running Camp in the austrian Alps"}
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              {language === "de"
                ? "The Mountaincamp ist ein 5-tägiges Trailrunning Camp in Österreich in Hochkrimml. Dich erwarten geführte Trailruns, Techniktraining, Community, Workshops und Erholung in den Alpen – für Anfänger, Fortgeschrittene und ambitionierte Läufer."
                : "The Mountaincamp is a 5-day trail running camp in Austria in Hochkrimml. Expect guided trail runs, technique coaching, community, workshops and recovery in the Alps for beginners, intermediate runners and ambitious athletes."}
            </p>
          </div>
        </section>

        <section className="bg-white py-10 md:py-14">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
              {language === "de"
                ? "Trailrunning Camp Österreich in den Alpen"
                : "Trail Running Camp Austria in the Alps"}
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              {language === "de"
                ? "The Mountaincamp ist ein 5-tägiges Trailrunning Camp in Österreich in Hochkrimml. Dich erwarten geführte Trailruns, Techniktraining, Community, Workshops und Erholung in den Alpen – für Anfänger, Fortgeschrittene und ambitionierte Läufer."
                : "The Mountaincamp is a 5-day trail running camp in Austria in Hochkrimml. Expect guided trail runs, technique coaching, community, workshops and recovery in the Alps for beginners, intermediate runners and ambitious athletes."}
            </p>
          </div>
        </section>

        <section id="about" className="relative z-30 -mt-32">
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-64 bg-gradient-to-b from-transparent via-white/5 via-white/10 via-white/15 via-white/20 via-white/25" />

          <div className="bg-white pb-16 pt-24 md:pb-24 md:pt-40">
            <div className="container">
              <div className="grid items-center gap-8 lg:grid-cols-2 md:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="mb-6 text-2xl font-bold text-gray-900 md:mb-8 md:text-4xl">{t("aboutTitle")}</h2>
                  <div className="space-y-3 text-gray-600">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div className="flex items-start gap-3" key={n}>
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <p className="text-lg leading-relaxed">{t(`aboutFeature${n}`)}</p>
                      </div>
                    ))}

                    <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/20 p-2">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-lg text-gray-900">
                          {language === "de" ? "5.–9. August 2026" : "August 5–9, 2026"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/20 p-2">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-lg text-gray-900">
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
                  className="relative h-[300px] overflow-hidden rounded-xl md:h-[500px]"
                >
                  <Image
                    src="/images/alpine-village-group.jpg"
                    alt="Trailrunning camp Austria - Mountain camp participants walking together in Alpine village Hochkrimml"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="bg-primary px-4 py-2 text-sm font-bold uppercase text-white">
                      {language === "de" ? "Entdecken" : "Explore"}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-8 md:py-12">
          <div className="container">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                  {language === "de" ? "Bereit für dein Abenteuer?" : "Ready for your adventure?"}
                </h3>
                <p className="text-sm text-white/80 md:text-base">
                  {language === "de"
                    ? "Nur noch wenige Plätze verfügbar - Sichere dir jetzt deinen Spot!"
                    : "Only a few spots left - Secure yours now!"}
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white px-8 py-3 text-base font-bold text-primary hover:bg-white/90 md:text-lg"
                  asChild
                >
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    {language === "de" ? "Jetzt Ticket sichern" : "Get Your Ticket"}
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="experience" className="bg-gray-50 py-16 md:py-24">
          <div className="container">
            <SectionTitle title={t("experienceTitle")} subtitle={t("experienceSubtitle")} align="center" light={true} />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-8">
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
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="container">
            <SectionTitle title={t("activitiesTitle")} subtitle={t("activitiesSubtitle")} align="center" light={true} />

            <div className="relative mx-auto max-w-2xl">
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
                  <div className="activity-card group mx-auto aspect-square max-w-md">
                    <Image
                      src={activities[currentActivityIndex].image || "/placeholder.svg"}
                      alt={activities[currentActivityIndex].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 448px"
                    />
                    <div className="activity-card-overlay opacity-80 group-hover:opacity-90" />
                    <div className="activity-card-content">
                      <h3 className="text-2xl font-bold text-white">{activities[currentActivityIndex].title}</h3>
                      <p className="mt-4 max-h-32 overflow-y-auto text-lg text-white/90">
                        {activities[currentActivityIndex].description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              <button
                onClick={prevActivity}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-4 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-black/80"
                aria-label="Previous activity"
              >
                <ChevronDown className="h-8 w-8 rotate-90" />
              </button>

              <button
                onClick={nextActivity}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-4 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-black/80"
                aria-label="Next activity"
              >
                <ChevronDown className="h-8 w-8 -rotate-90" />
              </button>

              <div className="mt-8 flex justify-center gap-2">
                {activities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentActivityIndex(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentActivityIndex ? "scale-125 bg-primary" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    aria-label={`Go to activity ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <RouteOverviewSection />

        <section className="bg-gray-50 py-24">
          <div className="container">
            <SectionTitle title={t("galleryTitle")} align="center" light={true} />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-square overflow-hidden"
                >
                  <ImageWithFallback
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    fallbackSrc="/placeholder.svg?height=600&width=600"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-bold text-white">{image.caption}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <InstagramReelsSection />

        <section id="testimonials" className="relative overflow-hidden bg-white py-24">
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

          <div className="container relative z-10">
            <SectionTitle title={t("testimonialsTitle")} align="center" light={true} />

            <div className="mx-auto max-w-4xl">
              <TestimonialSlider testimonials={testimonials} autoPlay={true} interval={6000} />
            </div>

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

        <FAQSection />

        <section className="overflow-hidden bg-gray-900 py-12 md:py-24">
          <div className="container mb-12">
            <SectionTitle title={t("partnersTitle")} subtitle={t("partnersSubtitle")} align="center" light={false} />
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-0 top-0 z-10 w-32 bg-gradient-to-r from-gray-900 to-transparent" />
            <div className="absolute bottom-0 right-0 top-0 z-10 w-32 bg-gradient-to-l from-gray-900 to-transparent" />

            <motion.div
              className="flex items-center gap-20"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 30,
                  ease: "linear",
                },
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0 items-center gap-20">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div key={`${setIndex}-${num}`} className="flex h-36 shrink-0 items-center justify-center">
                      <Image
                        src={`/images/partner-${num}.png`}
                        alt={`Partner ${num}`}
                        width={600}
                        height={150}
                        className={`w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 ${num === 8 ? "h-24" : "h-36"
                          }`}
                        loading="lazy"
                        sizes="600px"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="register" className="bg-black py-16 text-white md:py-24">
          <div className="container">
            <div className="grid items-center gap-8 lg:grid-cols-2 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white md:mb-6 md:text-4xl">
                  {t("joinTitle")}
                </h2>
                <p className="mb-8 text-xl text-white">
                  {language === "de" ? "5.–9. August 2026" : "August 5–9, 2026"}
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
                  <div className="rounded-t-lg bg-primary px-6 py-3">
                    <span className="text-sm font-medium uppercase text-white">{t("packageTitle")}</span>
                  </div>
                  <div className="rounded-b-lg bg-gray-800 px-6 py-4">
                    <span className="text-3xl font-bold text-white">€530</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="rounded-xl border border-gray-700 bg-gray-800 p-8 text-white">
                  <h3 className="mb-6 text-center text-2xl font-bold uppercase text-white">
                    {language === "de" ? "Jetzt anmelden" : "Register Now"}
                  </h3>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-primary px-8 py-4 text-lg font-bold text-white hover:bg-primary/90"
                      asChild
                    >
                      <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                        {t("registerNow")}
                      </a>
                    </Button>
                    <p className="mt-4 text-sm text-white/70">
                      {language === "de"
                        ? "Sichere dir jetzt deinen Platz im Mountaincamp!"
                        : "Secure your spot at The Mountaincamp now!"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black py-16 text-white md:py-24">
          <div className="absolute inset-0">
            <Image
              src="/images/mountain-summit.jpeg"
              alt="Mountain summit view"
              fill
              className="object-cover opacity-30"
              loading="lazy"
              sizes="100vw"
            />
          </div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 text-2xl font-bold md:mb-8 md:text-4xl lg:text-5xl"
              >
                {language === "de" ? "Sei dabei" : "Join us"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12 text-xl text-gray-300"
              >
                {language === "de"
                  ? "Fünf Tage Trailrunning, Community und unvergessliche Momente in den österreichischen Alpen."
                  : "Five days of trail running, community and unforgettable moments in the Austrian Alps."}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center justify-center gap-6 sm:flex-row"
              >
                <Button size="lg" className="btn-primary px-8 text-lg" asChild>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    {t("registerNow")}
                  </a>
                </Button>
                <div className="flex items-center gap-4 text-gray-300">
                  <Calendar className="h-5 w-5" />
                  <span>{language === "de" ? "5.–9. August 2026" : "August 5–9, 2026"}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer pb-24 md:pb-16">
        <div className="container">
          <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <Image
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp Logo"
                width={180}
                height={40}
                className="mb-4 h-12 w-auto"
                loading="lazy"
                sizes="180px"
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
                  Transport
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
                    className="text-white/60 transition-colors hover:text-primary"
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
                    className="text-white/60 transition-colors hover:text-primary"
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
                    className="text-white/60 transition-colors hover:text-primary"
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
                    className="text-white/60 transition-colors hover:text-primary"
                    aria-label="TikTok"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="footer-heading text-white">{t("legal")}</h4>
                <Link href="/legal/privacy-policy" className="footer-link">
                  {language === "de" ? "Datenschutz" : "Privacy Policy"}
                </Link>
                <Link href="/legal/imprint" className="footer-link">
                  {language === "de" ? "Impressum" : "Imprint"}
                </Link>
                <Link href="/agb" className="footer-link">
                  {language === "de" ? "AGB" : "Terms & Conditions"}
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-6 text-center text-white/60">
            © 2025 The Mountaincamp. {language === "de" ? "Alle Rechte vorbehalten." : "All rights reserved."}
          </div>
        </div>
      </footer>
    </div>
  )
}