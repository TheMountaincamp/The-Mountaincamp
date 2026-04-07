"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Bus, Clock, MapPin, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function BusDeparturesPage() {
  const { language } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const busRoutes = [
    {
      city: "Berlin",
      departure: {
        time: "06:35",
        location: "Hauptbahnhof (HBF)",
        description: {
          en: "Departure at 6:35am from Central Station",
          de: "Abfahrt um 6:35 Uhr vom Hauptbahnhof",
        },
      },
      capacity: { sold: 23, total: 30 },
    },
    {
      city: "Munich",
      departure: {
        time: "12:30",
        location: "Zentraler Omnibusbahnhof (ZOB)",
        description: {
          en: "Departure at 12:30pm from Central Bus Station",
          de: "Abfahrt um 12:30 Uhr vom Zentralen Omnibusbahnhof",
        },
      },
      capacity: { sold: 7, total: 20 },
    },
    {
      city: "Jenbach",
      departure: {
        time: "14:30",
        location: "Hauptbahnhof (HBF)",
        description: {
          en: "Departure at 2:30pm from Central Station",
          de: "Abfahrt um 14:30 Uhr vom Hauptbahnhof",
        },
      },
      capacity: { sold: 11, total: 19 },
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
        en: "Arrival at Jenbach Station",
        de: "Ankunft am Bahnhof Jenbach",
      },
    },
    {
      time: "12:30",
      location: "Munich",
      description: {
        en: "Arrival at Munich Station",
        de: "Ankunft am Bahnhof München",
      },
    },
    {
      time: "14:21",
      location: "Munich",
      description: {
        en: "Train departure from Munich to Berlin",
        de: "Zugabfahrt von München nach Berlin",
      },
    },
    {
      time: "18:22",
      location: "Berlin",
      description: {
        en: "Arrival in Berlin",
        de: "Ankunft in Berlin",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/images/bus-mountain-landscape.jpeg"
          alt="Bus transport through the mountains"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <motion.h1
            className="mb-4 text-4xl font-bold md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TRANSPORT
          </motion.h1>

          <motion.p
            className="max-w-2xl text-xl text-white/80 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === "de"
              ? "Bequeme Anreise zum Mountaincamp"
              : "Convenient transport to The Mountaincamp"}
          </motion.p>
        </div>

        <motion.div
          className="absolute left-6 top-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2 text-white transition-colors hover:text-primary">
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
            <h2 className="mb-6 text-3xl font-bold text-white">
              {language === "de"
                ? "Entspannt zum Mountaincamp"
                : "Relax on your way to The Mountaincamp"}
            </h2>

            <p className="mx-auto mb-4 max-w-2xl text-white/80">
              {language === "de"
                ? "Wir bieten bequeme Bus- und Zugverbindungen von Berlin, München und Jenbach."
                : "We offer convenient bus and train transport from Berlin, Munich and Jenbach."}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-4 py-2">
              <Bus className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {language === "de"
                  ? "Die Buchung beinhaltet Hin- und Rückfahrt"
                  : "Booking includes transport to the camp and back"}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold uppercase text-white">
              <Bus className="h-6 w-6 text-primary" />
              {language === "de" ? "Hinfahrt" : "Departure"}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {busRoutes.map((route, index) => (
                <motion.div
                  key={route.city}
                  className="rounded-lg border-2 border-gray-600 bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-primary/20 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{route.city}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="h-4 w-4" />
                      <span className="text-lg font-bold text-white">{route.departure.time}</span>
                    </div>

                    <p className="text-sm font-medium text-white/80">{route.departure.location}</p>
                    <p className="text-sm text-white/70">{route.departure.description[language]}</p>

                    <div className="border-t border-gray-600 pt-3">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-white/70">
                          {language === "de" ? "Kapazität" : "Capacity"}
                        </span>
                        <span className="font-medium text-white">
                          {route.capacity.sold} / {route.capacity.total}{" "}
                          {language === "de" ? "gebucht" : "sold"}
                        </span>
                      </div>

                      <div className="h-2 w-full rounded-full bg-gray-700">
                        <div
                          className={`h-2 rounded-full transition-all ${route.capacity.sold / route.capacity.total > 0.8
                              ? "bg-red-500"
                              : route.capacity.sold / route.capacity.total > 0.5
                                ? "bg-yellow-500"
                                : "bg-primary"
                            }`}
                          style={{ width: `${(route.capacity.sold / route.capacity.total) * 100}%` }}
                        />
                      </div>

                      <p className="mt-1 text-xs text-white/50">
                        {route.capacity.total - route.capacity.sold}{" "}
                        {language === "de" ? "Plätze verfügbar" : "seats available"}
                      </p>
                    </div>
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
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold uppercase text-white">
              <Calendar className="h-6 w-6 text-primary" />
              {language === "de" ? "Rückfahrt" : "Return"}
            </h2>

            <div className="rounded-lg border border-gray-600 bg-gray-800 p-8 shadow-lg">
              <div className="space-y-6">
                {returnSchedule.map((stop, index) => (
                  <motion.div
                    key={`${stop.location}-${stop.time}`}
                    className="flex items-center gap-6 rounded-lg bg-black/30 p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                      <span className="font-bold text-primary">{stop.time}</span>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white">{stop.location}</h4>
                      <p className="text-sm text-white/80">{stop.description[language]}</p>
                    </div>

                    {index < returnSchedule.length - 1 && (
                      <div className="hidden h-0.5 w-8 bg-primary/30 md:block" />
                    )}
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
            <h2 className="mb-8 text-2xl font-bold uppercase text-white">
              {language === "de" ? "Wichtige Informationen" : "Important Information"}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-gray-600 bg-gray-800 p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold text-primary">
                  {language === "de" ? "Buchung & Kosten" : "Booking & Costs"}
                </h3>

                <ul className="space-y-2 text-white/80">
                  <li>
                    •{" "}
                    {language === "de"
                      ? "Bustickets können separat gebucht werden"
                      : "Bus tickets can be booked separately"}
                  </li>
                  <li>• {language === "de" ? "Preis: Siehe Buchungsseite" : "Price: See booking page"}</li>
                  <li>• {language === "de" ? "Begrenzte Plätze verfügbar" : "Limited seats available"}</li>
                  <li>
                    •{" "}
                    {language === "de"
                      ? "Buchung über unser Anmeldeformular"
                      : "Booking via our registration form"}
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-600 bg-gray-800 p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold text-primary">
                  {language === "de" ? "Was mitbringen?" : "What to bring?"}
                </h3>

                <ul className="space-y-2 text-white/80">
                  <li>• {language === "de" ? "Gültiger Personalausweis/Reisepass" : "Valid ID/passport"}</li>
                  <li>
                    •{" "}
                    {language === "de"
                      ? "Bequeme Kleidung für die Fahrt"
                      : "Comfortable clothing for the journey"}
                  </li>
                  <li>• {language === "de" ? "Snacks und Getränke (optional)" : "Snacks and drinks (optional)"}</li>
                  <li>• {language === "de" ? "Unterhaltung für die Fahrt" : "Entertainment for the journey"}</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="rounded-lg border border-primary/40 bg-primary/20 p-8 text-center"
          >
            <h3 className="mb-4 text-2xl font-bold text-white">
              {language === "de" ? "Fragen zur Anreise?" : "Questions about transport?"}
            </h3>

            <p className="mb-6 text-white/80">
              {language === "de"
                ? "Kontaktiere uns für weitere Informationen zur Busanreise oder bei speziellen Anfragen."
                : "Contact us for more information about bus transport or for special requests."}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="mailto:themountaincampde@gmail.com"
                className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
              >
                themountaincampde@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/MTC-Logo_2025_weiß.png"
                alt="The Mountaincamp Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
                unoptimized
              />
            </div>

            <div className="flex gap-8">
              <Link href="/" className="text-white/60 transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/house" className="text-white/60 transition-colors hover:text-primary">
                {language === "de" ? "Haus" : "House"}
              </Link>
              <Link href="/trails" className="text-white/60 transition-colors hover:text-primary">
                Trails
              </Link>
              <Link href="/impressum" className="text-white/60 transition-colors hover:text-primary">
                {language === "de" ? "Impressum" : "Imprint"}
              </Link>
              <Link href="/datenschutz" className="text-white/60 transition-colors hover:text-primary">
                {language === "de" ? "Datenschutz" : "Privacy"}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
