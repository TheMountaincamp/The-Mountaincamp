"use client"

import { tx, txo } from "@/app/lib/texts"
import { useSiteConfig } from "@/contexts/site-config-context"
import { shuttlePrice } from "@/app/lib/site-config"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "@/app/components/locale-link"
import { motion } from "framer-motion"
import { ArrowLeft, Bus, MapPin, TrainFront, Mountain } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function BusDeparturesPage() {
  const { language } = useLanguage()
  const siteConfig = useSiteConfig()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // @block 03 Anreise und Preise
  const busRoutes = [
    {
      city: txo("anreise.berlin", "Berlin", "Berlin"),
      location: txo("anreise.hauptbahnhof", "Hauptbahnhof", "Central Station"),
      price: shuttlePrice(siteConfig, "berlin"),
      modes: ["train", "bus"] as const,
    },
    {
      city: txo("anreise.muenchen", "München", "Munich"),
      location: txo("anreise.zentraler-omnibusbahnhof-zob", "Zentraler Omnibusbahnhof (ZOB)", "Central Bus Station (ZOB)"),
      price: shuttlePrice(siteConfig, "muenchen"),
      modes: ["bus"] as const,
    },
    {
      city: txo("anreise.jenbach", "Jenbach", "Jenbach"),
      location: txo("anreise.bahnhof", "Bahnhof", "Train station"),
      price: shuttlePrice(siteConfig, "jenbach"),
      modes: ["bus"] as const,
    },
  ]

  const routeStops: { name: { de: string; en: string }; next?: "train" | "bus"; final?: boolean }[] = [
    { name: txo("anreise.berlin", "Berlin", "Berlin"), next: "train" },
    { name: txo("anreise.muenchen", "München", "Munich"), next: "bus" },
    { name: txo("anreise.jenbach", "Jenbach", "Jenbach"), next: "bus" },
    { name: txo("anreise.hochkrimml", "Hochkrimml", "Hochkrimml"), final: true },
  ]

  const fmt = (n: number) => (language === "de" ? `${n} €` : `€${n}`)

  // @block 01 Kopfbereich
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative h-[60vh] min-h-[420px]">
        <Image
          src="/images/bus-hochkrimml.jpg"
          alt={tx(language, "anreise.mountaincamp-bus-vor-den-bergen-in", "Mountaincamp-Bus vor den Bergen in Hochkrimml", "Mountaincamp bus in front of the mountains in Hochkrimml")}
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
              {tx(language, "anreise.busanreise-zum-trailrunning-camp-in-hochkrimml", ": Busanreise zum Trailrunning Camp in Hochkrimml", ": bus travel to the trail running camp in Hochkrimml")}
            </span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-xl text-white/90 drop-shadow md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {tx(language, "anreise.gemeinsam-nachhaltig-ins-mountaincamp", "Gemeinsam nachhaltig ins Mountaincamp", "Travel sustainably, together, to the Mountaincamp")}
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
            <span>{tx(language, "anreise.zurueck", "Zurück", "Back")}</span>
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
            {/* @block 02 Intro */}
            <h2 className="mb-6 text-3xl font-bold uppercase text-gray-900">
              {tx(language, "anreise.dein-camp-beginnt-schon-unterwegs", "Dein Camp beginnt schon unterwegs", "Your camp starts on the way")}
            </h2>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-gray-600">
              {tx(language, "anreise.trailrunning-selbst-ist-nahezu-co2-frei", "Trailrunning selbst ist nahezu CO2-frei. Den Unterschied macht, wie du zum Camp und wieder nach Hause kommst. Die gemeinsame Anreise mit Bus und Bahn ist dabei der nachhaltigste Weg und obendrein richtig bequem: Du lernst deine Gruppe schon unterwegs kennen, und dein Camp beginnt nicht erst auf dem Berg, sondern schon am Bahnhof.", "Trail running itself is almost carbon free. What makes the difference is how you get to the camp and back home. Travelling together by bus and train is the most sustainable way, and a comfortable one too: you get to know your group on the way, and your camp starts at the station, not just on the mountain.")}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Bus className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {tx(language, "anreise.hin-und-rueckfahrt-zubuchbar-bei-der", "Hin- und Rückfahrt, zubuchbar bei der Ticketbuchung", "Return trip, add it when you book your ticket")}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            {/* @block 03 Anreise und Preise */}
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold uppercase text-gray-900">
              <Bus className="h-6 w-6 text-primary" />
              {tx(language, "anreise.anreise-und-preise", "Anreise und Preise", "Route and prices")}
            </h2>

            <div className="mb-8 border border-gray-200 bg-gray-50 p-6 md:p-8">
              <div className="flex flex-col gap-0 md:flex-row md:items-center">
                {routeStops.map((stop, index) => (
                  <div key={stop.name.en} className="flex flex-col md:flex-1 md:flex-row md:items-center last:md:flex-none">
                    <div className="flex items-center gap-3 md:flex-col md:gap-2">
                      <div
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                          stop.final ? "bg-primary text-white" : "border-2 border-primary bg-white text-primary"
                        }`}
                      >
                        {stop.final ? <Mountain className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                      </div>
                      <span className="whitespace-nowrap font-bold text-gray-900">{stop.name[language]}</span>
                    </div>
                    {stop.next && (
                      <div className="ml-[21px] flex items-center gap-2 border-l-2 border-dashed border-primary/50 py-4 pl-6 md:ml-0 md:flex-1 md:flex-col md:gap-1 md:border-l-0 md:py-0 md:pl-0">
                        <div className="hidden w-full border-t-2 border-dashed border-primary/50 md:block" />
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm md:-mt-4">
                          {stop.next === "train" ? <TrainFront className="h-4 w-4 text-primary" /> : <Bus className="h-4 w-4 text-primary" />}
                          {stop.next === "train" ? (tx(language, "anreise.zug", "Zug", "Train")) : "Bus"}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

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
                  <p className="mb-4 text-sm text-gray-600">{route.location[language]}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {route.modes.map((mode) => (
                      <span
                        key={mode}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {mode === "train" ? <TrainFront className="h-3.5 w-3.5" /> : <Bus className="h-3.5 w-3.5" />}
                        {mode === "train" ? (tx(language, "anreise.zug", "Zug", "Train")) : "Bus"}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto border-t border-gray-200 pt-4">
                    <p className="text-3xl font-bold text-gray-900">{fmt(route.price)}</p>
                    <p className="text-sm text-gray-500">{tx(language, "anreise.hin-und-rueckfahrt", "Hin- und Rückfahrt", "Return trip")}</p>
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
            {/* @block 04 Wichtige Informationen */}
            <h2 className="mb-8 text-2xl font-bold uppercase text-gray-900">
              {tx(language, "anreise.wichtige-informationen", "Wichtige Informationen", "Important information")}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary">
                  {tx(language, "anreise.buchung-und-kosten", "Buchung und Kosten", "Booking and costs")}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {tx(language, "anreise.den-transfer-buchst-du-direkt-bei", "Den Transfer buchst du direkt bei der Ticketbuchung dazu", "Add the transfer directly when you book your ticket")}</li>
                  <li>• {tx(language, "anreise.preise-gelten-fuer-hin-und-rueckfahrt", "Preise gelten für Hin- und Rückfahrt", "Prices are for the return trip")}</li>
                  <li>• {tx(language, "anreise.begrenzte-plaetze-verfuegbar", "Begrenzte Plätze verfügbar", "Limited seats available")}</li>
                </ul>
              </div>

              <div className="border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary">
                  {tx(language, "anreise.was-mitbringen", "Was mitbringen?", "What to bring?")}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {tx(language, "anreise.gueltiger-personalausweis-oder-reisepass", "Gültiger Personalausweis oder Reisepass", "Valid ID or passport")}</li>
                  <li>• {tx(language, "anreise.bequeme-kleidung-fuer-die-fahrt", "Bequeme Kleidung für die Fahrt", "Comfortable clothes for the journey")}</li>
                  <li>• {tx(language, "anreise.snacks-und-getraenke-optional", "Snacks und Getränke (optional)", "Snacks and drinks (optional)")}</li>
                  <li>• {tx(language, "anreise.gute-laune-fuer-die-gruppe", "Gute Laune für die Gruppe", "Good vibes for the group")}</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border border-primary/30 bg-primary/10 p-8 text-center"
          >
            {/* @block 05 Fragen zur Anreise */}
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              {tx(language, "anreise.fragen-zur-anreise", "Fragen zur Anreise?", "Questions about getting there?")}
            </h3>
            <p className="mb-6 text-gray-600">
              {tx(language, "anreise.schreib-uns-wenn-du-fragen-zur", "Schreib uns, wenn du Fragen zur Anreise oder besondere Wünsche hast.", "Get in touch if you have questions about travel or special requests.")}
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

      {/* @block 06 Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/mountaincamp-logo-black.png"
                alt="the Mountaincamp Logo"
                width={150}
                height={29}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="text-gray-500 transition-colors hover:text-primary">Home</Link>
              <Link href="/house" className="text-gray-500 transition-colors hover:text-primary">{tx(language, "anreise.haus", "Haus", "House")}</Link>
              <Link href="/trails" className="text-gray-500 transition-colors hover:text-primary">Trails</Link>
              <Link href="/impressum" className="text-gray-500 transition-colors hover:text-primary">{tx(language, "anreise.impressum", "Impressum", "Imprint")}</Link>
              <Link href="/datenschutz" className="text-gray-500 transition-colors hover:text-primary">{tx(language, "anreise.datenschutz", "Datenschutz", "Privacy")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
