"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bus, MapPin, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function BusDeparturesPage() {
  const { language } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const busRoutes = [
    {
      city: { de: "Berlin", en: "Berlin" },
      location: { de: "Hauptbahnhof", en: "Central Station" },
      price: 120,
    },
    {
      city: { de: "München", en: "Munich" },
      location: { de: "Zentraler Omnibusbahnhof (ZOB)", en: "Central Bus Station (ZOB)" },
      price: 80,
    },
    {
      city: { de: "Jenbach", en: "Jenbach" },
      location: { de: "Bahnhof", en: "Train station" },
      price: 40,
    },
  ]

  const returnSchedule = [
    {
      location: "Hochkrimml",
      description: {
        en: "Departure from The Mountaincamp",
        de: "Abfahrt vom Mountaincamp",
      },
    },
    {
      location: "Jenbach",
      description: {
        en: "Arrival at Jenbach Station",
        de: "Ankunft am Bahnhof Jenbach",
      },
    },
    {
      location: language === "de" ? "München" : "Munich",
      description: {
        en: "Arrival at Munich Station",
        de: "Ankunft am Bahnhof München",
      },
    },
    {
      location: language === "de" ? "München" : "Munich",
      description: {
        en: "Train departure from Munich to Berlin",
        de: "Zugabfahrt von München nach Berlin",
      },
    },
    {
      location: "Berlin",
      description: {
        en: "Arrival in Berlin",
        de: "Ankunft in Berlin",
      },
    },
  ]

  const fmt = (n: number) => (language === "de" ? `${n} €` : `€${n}`)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative h-[60vh] min-h-[420px]">
        <Image
          src="/images/bus-hochkrimml.jpg"
          alt={language === "de" ? "Mountaincamp-Bus vor den Bergen in Hochkrimml" : "Mountaincamp bus in front of the mountains in Hochkrimml"}
          fill
          className="object-cover object-[center_45%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
          <motion.h1
            className="mb-4 text-4xl font-bold drop-shadow md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TRANSPORT
            <span className="sr-only">
              {language === "de" ? ": Busanreise zum Trailrunning Camp in Hochkrimml" : ": bus travel to the trail running camp in Hochkrimml"}
            </span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-xl text-white/90 drop-shadow md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === "de" ? "Gemeinsam ins Mountaincamp" : "Together to The Mountaincamp"}
          </motion.p>
        </div>

        <motion.div
          className="absolute left-6 top-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2 text-white drop-shadow transition-colors hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
            <span>{language === "de" ? "Zurück" : "Back"}</span>
          </Link>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-3xl font-bold uppercase text-gray-900">
              {language === "de" ? "Dein Camp beginnt schon unterwegs" : "Your camp starts on the way"}
            </h2>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-gray-600">
              {language === "de"
                ? "Trailrunning selbst ist nahezu CO2-frei. Den Unterschied macht, wie du zum Camp und wieder nach Hause kommst. Die gemeinsame Anreise mit Bus und Bahn ist dabei der nachhaltigste Weg und obendrein richtig bequem: Du lernst deine Gruppe schon unterwegs kennen, und dein Camp beginnt nicht erst auf dem Berg, sondern schon am Bahnhof."
                : "Trail running itself is almost carbon free. What makes the difference is how you get to the camp and back home. Travelling together by bus and train is the most sustainable way, and a comfortable one too: you get to know your group on the way, and your camp starts at the station, not just on the mountain."}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Bus className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {language === "de"
                  ? "Hin- und Rückfahrt, zubuchbar bei der Ticketbuchung"
                  : "Return trip, add it when you book your ticket"}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold uppercase text-gray-900">
              <Bus className="h-6 w-6 text-primary" />
              {language === "de" ? "Abfahrtsorte und Preise" : "Departure points and prices"}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {busRoutes.map((route, index) => (
                <motion.div
                  key={route.city.en}
                  className="flex flex-col border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-primary hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{route.city[language]}</h3>
                  </div>
                  <p className="mb-6 text-sm text-gray-600">{route.location[language]}</p>
                  <div className="mt-auto border-t border-gray-200 pt-4">
                    <p className="text-3xl font-bold text-gray-900">{fmt(route.price)}</p>
                    <p className="text-sm text-gray-500">{language === "de" ? "Hin- und Rückfahrt" : "Return trip"}</p>
                  </div>
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
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold uppercase text-gray-900">
              <Calendar className="h-6 w-6 text-primary" />
              {language === "de" ? "Rückfahrt" : "Return"}
            </h2>

            <div className="border border-gray-200 bg-gray-50 p-6 md:p-8">
              <div className="space-y-4">
                {returnSchedule.map((stop, index) => (
                  <motion.div
                    key={`${stop.location}-${index}`}
                    className="flex items-center gap-6 bg-white p-4 shadow-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900">{stop.location}</h4>
                      <p className="text-sm text-gray-600">{stop.description[language]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-2xl font-bold uppercase text-gray-900">
              {language === "de" ? "Wichtige Informationen" : "Important information"}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary">
                  {language === "de" ? "Buchung und Kosten" : "Booking and costs"}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {language === "de" ? "Den Transfer buchst du direkt bei der Ticketbuchung dazu" : "Add the transfer directly when you book your ticket"}</li>
                  <li>• {language === "de" ? "Preise gelten für Hin- und Rückfahrt" : "Prices are for the return trip"}</li>
                  <li>• {language === "de" ? "Begrenzte Plätze verfügbar" : "Limited seats available"}</li>
                </ul>
              </div>

              <div className="border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary">
                  {language === "de" ? "Was mitbringen?" : "What to bring?"}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {language === "de" ? "Gültiger Personalausweis oder Reisepass" : "Valid ID or passport"}</li>
                  <li>• {language === "de" ? "Bequeme Kleidung für die Fahrt" : "Comfortable clothes for the journey"}</li>
                  <li>• {language === "de" ? "Snacks und Getränke (optional)" : "Snacks and drinks (optional)"}</li>
                  <li>• {language === "de" ? "Gute Laune für die Gruppe" : "Good vibes for the group"}</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border border-primary/30 bg-primary/10 p-8 text-center"
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              {language === "de" ? "Fragen zur Anreise?" : "Questions about getting there?"}
            </h3>
            <p className="mb-6 text-gray-600">
              {language === "de"
                ? "Schreib uns, wenn du Fragen zur Anreise oder besondere Wünsche hast."
                : "Get in touch if you have questions about travel or special requests."}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="mailto:themountaincampde@gmail.com"
                className="bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
              >
                themountaincampde@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/mountaincamp-logo-black.png"
                alt="The Mountaincamp Logo"
                width={150}
                height={29}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="text-gray-500 transition-colors hover:text-primary">Home</Link>
              <Link href="/house" className="text-gray-500 transition-colors hover:text-primary">{language === "de" ? "Haus" : "House"}</Link>
              <Link href="/trails" className="text-gray-500 transition-colors hover:text-primary">Trails</Link>
              <Link href="/impressum" className="text-gray-500 transition-colors hover:text-primary">{language === "de" ? "Impressum" : "Imprint"}</Link>
              <Link href="/datenschutz" className="text-gray-500 transition-colors hover:text-primary">{language === "de" ? "Datenschutz" : "Privacy"}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
