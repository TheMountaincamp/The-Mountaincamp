"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Mountain, Users, Calendar, MapPin, Star, Menu, X, Instagram, Facebook, Mail, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PriceCategoryBars from "@/app/components/price-category-bars"
import CountdownTimer from "@/app/components/countdown-timer"
import ActivityCard from "@/app/components/activity-card"
import TestimonialSlider from "@/app/components/testimonial-slider"
import ImageCarousel from "@/app/components/image-carousel"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const activities = [
    {
      title: "Trail Running",
      description: "Geführte Läufe auf spektakulären Alpenpfaden für alle Levels",
      image: "/images/trail-runner-1.jpeg",
      icon: <Mountain className="h-6 w-6" />,
    },
    {
      title: "Mountain Biking",
      description: "Erkunde die Berge auf zwei Rädern mit unseren MTB-Touren",
      image: "/images/mtb-trip.png",
      icon: <Mountain className="h-6 w-6" />,
    },
    {
      title: "Yoga & Recovery",
      description: "Entspannung und Regeneration nach intensiven Trainingseinheiten",
      image: "/images/yoga.png",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Klettern",
      description: "Indoor-Klettern für Kraft und Techniktraining",
      image: "/images/climbing-class.png",
      icon: <Mountain className="h-6 w-6" />,
    },
    {
      title: "Bogenschießen",
      description: "Konzentration und Präzision in alpiner Kulisse",
      image: "/images/archery.jpeg",
      icon: <Star className="h-6 w-6" />,
    },
    {
      title: "Kanufahren",
      description: "Paddeln auf kristallklaren Bergseen",
      image: "/images/canoeing-lake.jpeg",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Lagerfeuer",
      description: "Gemeinschaftsabende am Lagerfeuer unter dem Sternenhimmel",
      image: "/images/campfire-evening.jpeg",
      icon: <Star className="h-6 w-6" />,
    },
    {
      title: "Sunset Rave",
      description: "Legendäre Bergparty mit DJs und spektakulärem Panorama",
      image: "/images/mountain-rave.jpeg",
      icon: <Star className="h-6 w-6" />,
    },
  ]

  const testimonials = [
    {
      name: "Sarah K.",
      program: "Intermediate Runner",
      quote: "The overall organisation of the whole stay there, really good! All the friendly faces, the nature etc.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Michael T.",
      program: "Advanced Runner",
      quote:
        "I loved the experience as a whole, but what stood out was the variety in not only runs, but generally activities, there was always something exciting happening!",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Emma L.",
      program: "Beginner Runner",
      quote: "The location was spectacular, the organisation was really detailed.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const galleryImages = [
    { src: "/images/trail-runner-1.jpeg", alt: "Trail running in the Alps" },
    { src: "/images/summit-view.jpeg", alt: "Summit view" },
    { src: "/images/canoeing-activity.jpeg", alt: "Canoeing activity" },
    { src: "/images/campfire-evening.jpeg", alt: "Campfire evening" },
    { src: "/images/mountain-rave.jpeg", alt: "Mountain rave party" },
    { src: "/images/alpine-landscape.jpeg", alt: "Alpine landscape" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hasScrolled ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/MTC-Logo_2025_weiß.png"
              alt="The Mountaincamp"
              width={200}
              height={50}
              className="h-8 w-auto"
              unoptimized
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-white hover:text-gray-300 transition-colors">
              Über uns
            </Link>
            <Link href="#activities" className="text-white hover:text-gray-300 transition-colors">
              Aktivitäten
            </Link>
            <Link href="#testimonials" className="text-white hover:text-gray-300 transition-colors">
              Bewertungen
            </Link>
            <Link href="#register" className="text-white hover:text-gray-300 transition-colors">
              Anmeldung
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:inline-flex">
              <a
                href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jetzt anmelden
              </a>
            </Button>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link href="#about" className="block text-white hover:text-gray-300 transition-colors">
                  Über uns
                </Link>
                <Link href="#activities" className="block text-white hover:text-gray-300 transition-colors">
                  Aktivitäten
                </Link>
                <Link href="#testimonials" className="block text-white hover:text-gray-300 transition-colors">
                  Bewertungen
                </Link>
                <Link href="#register" className="block text-white hover:text-gray-300 transition-colors">
                  Anmeldung
                </Link>
                <Button asChild className="w-full">
                  <a
                    href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jetzt anmelden
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section with new image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-mountaincamp-runners.jpg"
            alt="The Mountaincamp - Trail running in the Austrian Alps"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              6.-10. August 2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            THE MOUNTAINCAMP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Das größte Trailrunning-Camp in den österreichischen Alpen
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild>
              <Link href="#about">Mehr erfahren</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jetzt anmelden
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Über The Mountaincamp</h2>
            <p className="text-lg text-gray-300 mb-8">
              Bei The Mountaincamp glauben wir, dass Trailrunning mehr ist als nur Kilometer sammeln – es geht darum,
              Grenzen zu überwinden, Gemeinschaft zu bilden und das Leben in den Bergen zu feiern.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Mountain className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">Epische Trails</h3>
                <p className="text-gray-400">Atemberaubende Routen in den österreichischen Alpen</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-400">Verbinde dich mit Gleichgesinnten aus ganz Europa</p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">Unvergesslich</h3>
                <p className="text-gray-400">Erlebnisse, die ein Leben lang in Erinnerung bleiben</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Das nächste Mountaincamp beginnt in</h2>
          <CountdownTimer targetDate={new Date("2025-08-06T00:00:00")} />
          <p className="mt-8 text-gray-400">Sichere dir jetzt deinen Platz!</p>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Aktivitäten & Erlebnisse</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Von anspruchsvollen Gipfelläufen bis hin zu entspannenden Yoga-Sessions – bei uns ist für jeden etwas
              dabei.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                icon={activity.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Impressionen</h2>
            <p className="text-lg text-gray-300">Erlebe die Magie der österreichischen Alpen</p>
          </div>
          <ImageCarousel images={galleryImages} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Was unsere Teilnehmer sagen</h2>
          </div>
          <TestimonialSlider testimonials={testimonials} />

          {/* Price Category Bars */}
          <div className="mt-16">
            <PriceCategoryBars />
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Begleite uns in den österreichischen Alpen</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span>6.-10. August 2025</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span>Hochkrimml, Österreichische Alpen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-400" />
                    <span>4 Übernachtungen inklusive</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-blue-400" />
                    <span>Alle Mahlzeiten inklusive</span>
                  </div>
                </div>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">€420</div>
                    <div className="text-gray-400">pro Person</div>
                  </div>

                  <Button className="w-full mb-4" size="lg" asChild>
                    <a
                      href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Jetzt buchen
                    </a>
                  </Button>

                  {/* Bus Schedule Link */}
                  <div className="text-center">
                    <Link
                      href="/bus-schedule"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      <Bus className="mr-2 h-4 w-4" />
                      Bus Schedule & Transport Info
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp"
                width={150}
                height={40}
                className="h-8 w-auto mb-4"
                unoptimized
              />
              <p className="text-gray-400 text-sm">
                Das ultimative Trailrunning-Erlebnis in den österreichischen Alpen.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                <Link href="#about" className="block text-gray-400 hover:text-white transition-colors">
                  Über uns
                </Link>
                <Link href="#activities" className="block text-gray-400 hover:text-white transition-colors">
                  Aktivitäten
                </Link>
                <Link href="#testimonials" className="block text-gray-400 hover:text-white transition-colors">
                  Bewertungen
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>themountaincampde@gmail.com</p>
                <p>+43 677 63455763</p>
                <p>Hochkrimml, Österreich</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Folge uns</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/the_mountaincamp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61566807910764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="mailto:themountaincampde@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 The Mountaincamp. Alle Rechte vorbehalten.</p>
            <div className="mt-2 space-x-4">
              <Link href="/datenschutz" className="hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link href="/impressum" className="hover:text-white transition-colors">
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
