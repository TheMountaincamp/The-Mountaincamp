"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bus, Clock, MapPin, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function BusDeparturesPage() {
  const { t, language } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const busRoutes = [
    {
      city: "Berlin",
      departure: {
        time: "5:30am",
        location: "Hauptbahnhof (HBF)",
        description: {
          en: "Departure at 5:30am from Central Station",
          de: "Abfahrt um 5:30 Uhr vom Hauptbahnhof",
        },
      },
    },
    {
      city: "Munich",
      departure: {
        time: "13:00",
        location: "Zentraler Omnibusbahnhof (ZOB)",
        description: {
          en: "Departure approximately 1pm from Central Bus Station",
          de: "Abfahrt ca. 13 Uhr vom Zentralen Omnibusbahnhof",
        },
      },
    },
    {
      city: "Jenbach",
      departure: {
        time: "15:00",
        location: "Hauptbahnhof (HBF)",
        description: {
          en: "Departure approximately 3pm from Central Station",
          de: "Abfahrt ca. 15 Uhr vom Hauptbahnhof",
        },
      },
    },
  ]

  const returnSchedule = [
    {
      time: "09:00",
      location: "Hochkrimml",
      description: {
        en: "Departure from The Mountaincamp",
        de: "Abfahrt vom Mountaincamp",
      },
    },
    {
      time: "10:30",
      location: "Jenbach",
      description: {
        en: "Arrival at Jenbach Central Station",
        de: "Ankunft Jenbach Hauptbahnhof",
      },
    },
    {
      time: "12:30",
      location: "Munich",
      description: {
        en: "Arrival at Munich Central Bus Station",
        de: "Ankunft München ZOB",
      },
    },
    {
      time: "Evening",
      location: "Berlin",
      description: {
        en: "Arrival in Berlin in the evening",
        de: "Ankunft in Berlin am Abend",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with background image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/images/bus-mountain-landscape.jpeg"
          alt="Bus transport through the mountains"
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
            {language === "de" ? "TRANSPORT" : "TRANSPORT"}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-2xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === "de" ? "Bequeme Anreise zum Mountaincamp" : "Convenient transport to The Mountaincamp"}
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
            <span>{language === "de" ? "Zurück" : "Back"}</span>
          </Link>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              {language === "de" ? "Entspannt zum Mountaincamp" : "Relax on your way to The Mountaincamp"}
            </h2>
            <p className="text-white/80 mb-4 max-w-2xl mx-auto">
              {language === "de"
                ? "Wir bieten bequeme Busverbindungen von verschiedenen deutschen Städten direkt zum Mountaincamp. Lehne dich zurück und genieße die Fahrt durch die wunderschöne Alpenlandschaft."
                : "We offer convenient bus connections from various German cities directly to The Mountaincamp. Sit back and enjoy the ride through the beautiful Alpine landscape."}
            </p>
          </motion.div>

          {/* Departure Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase flex items-center gap-3 text-white">
              <Bus className="h-6 w-6 text-primary" />
              {language === "de" ? "HINFAHRT - COMING SOON" : "DEPARTURE - COMING SOON"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {busRoutes.map((route, index) => (
                <motion.div
                  key={index}
                  className={`bg-gray-800 p-6 border-2 transition-all duration-300 rounded-lg shadow-lg ${"border-gray-600 hover:border-primary hover:shadow-xl"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full bg-primary/20`}>
                      <MapPin className={`h-5 w-5 text-primary`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{route.city}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="h-4 w-4" />
                      <span className="font-bold text-lg text-white">{route.departure.time}</span>
                    </div>
                    <p className="text-white/80 text-sm font-medium">{route.departure.location}</p>
                    <p className="text-white/70 text-sm">{route.departure.description[language]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Return Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase flex items-center gap-3 text-white">
              <Calendar className="h-6 w-6 text-primary" />
              {language === "de" ? "RÜCKFAHRT - COMING SOON" : "RETURN - COMING SOON"}
            </h2>

            <div className="bg-gray-800 p-8 border border-gray-600 rounded-lg shadow-lg">
              <div className="space-y-6">
                {returnSchedule.map((stop, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-6 p-4 bg-black/30 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full">
                      <span className="text-primary font-bold">{stop.time}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white">{stop.location}</h4>
                      <p className="text-white/80 text-sm">{stop.description[language]}</p>
                    </div>
                    {index < returnSchedule.length - 1 && (
                      <div className="hidden md:block w-8 h-0.5 bg-primary/30"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase text-white">
              {language === "de" ? "WICHTIGE INFORMATIONEN" : "IMPORTANT INFORMATION"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 border border-gray-600 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {language === "de" ? "Buchung & Kosten" : "Booking & Costs"}
                </h3>
                <ul className="space-y-2 text-white/80">
                  <li>
                    •{" "}
                    {language === "de"
                      ? "Bustickets können separat gebucht werden"
                      : "Bus tickets can be booked separately"}
                  </li>
                  <li>• {language === "de" ? "Preis: Coming Soon" : "Price: Coming Soon"}</li>
                  <li>• {language === "de" ? "Begrenzte Plätze verfügbar" : "Limited seats available"}</li>
                  <li>
                    • {language === "de" ? "Buchung über unser Anmeldeformular" : "Booking über unser Anmeldeformular"}
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 border border-gray-600 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {language === "de" ? "Was mitbringen?" : "What to bring?"}
                </h3>
                <ul className="space-y-2 text-white/80">
                  <li>• {language === "de" ? "Gültiger Personalausweis/Reisepass" : "Valid ID/passport"}</li>
                  <li>
                    • {language === "de" ? "Bequeme Kleidung für die Fahrt" : "Comfortable clothing for the journey"}
                  </li>
                  <li>• {language === "de" ? "Snacks und Getränke (optional)" : "Snacks and drinks (optional)"}</li>
                  <li>• {language === "de" ? "Unterhaltung für die Fahrt" : "Entertainment for the journey"}</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center bg-primary/20 p-8 rounded-lg border border-primary/40"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              {language === "de" ? "Fragen zur Anreise?" : "Questions about transport?"}
            </h3>
            <p className="text-white/80 mb-6">
              {language === "de"
                ? "Kontaktiere uns für weitere Informationen zur Busanreise oder bei speziellen Anfragen."
                : "Contact us for more information about bus transport or for special requests."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:themountaincampde@gmail.com"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors"
              >
                themountaincampde@gmail.com
              </a>
            </div>
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
                unoptimized={true}
              />
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-white/60 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/house" className="text-white/60 hover:text-primary transition-colors">
                {language === "de" ? "Haus" : "House"}
              </Link>
              <Link href="/trails" className="text-white/60 hover:text-primary transition-colors">
                {language === "de" ? "Trails" : "Trails"}
              </Link>
              <Link href="/impressum" className="text-white/60 hover:text-primary transition-colors">
                {language === "de" ? "Impressum" : "Imprint"}
              </Link>
              <Link href="/datenschutz" className="text-white/60 hover:text-primary transition-colors">
                {language === "de" ? "Datenschutz" : "Privacy"}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
