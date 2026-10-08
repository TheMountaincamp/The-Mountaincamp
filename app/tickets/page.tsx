"use client"

import { useLanguage } from "@/contexts/language-context"
import SiteHeader from "@/app/components/site-header"
import BookingMask from "./booking-mask"
import SocialProof from "./social-proof"
import { BOOKING_URL } from "@/app/lib/early-bird"

export default function TicketsPage() {
  const { language } = useLanguage()
  const lang = language === "de" ? "de" : "en"

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader transparent={false} />

      <div className="frost-grey px-6 pb-5 pt-24 text-center text-white md:pb-12 md:pt-32">
        <h1 className="mb-1 text-2xl font-bold md:mb-3 md:text-5xl">
          {lang === "de" ? "Tickets" : "Tickets"}
          <span className="sr-only">
            {lang === "de"
              ? ": Trailrunning Camp in Hochkrimml buchen"
              : ": book the trail running camp in Hochkrimml"}
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-white/80 md:text-lg">
          {lang === "de"
            ? "The Mountaincamp 2027, 18. bis 22. August 2027 in Hochkrimml"
            : "The Mountaincamp 2027, 18 to 22 August 2027 in Hochkrimml"}
        </p>
      </div>

      <div className="container mx-auto px-4 py-5 md:py-10">
        <SocialProof lang={lang} />
        <BookingMask lang={lang} />
        <p className="mt-10 text-center text-sm text-gray-500">
          {lang === "de" ? "Probleme bei der Buchung? " : "Trouble booking? "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="underline">
            {lang === "de" ? "Buchungsseite in neuem Tab öffnen" : "Open the booking page in a new tab"}
          </a>
          {lang === "de" ? " oder schreib uns an " : " or email us at "}
          <a href="mailto:themountaincampde@gmail.com" className="underline">
            themountaincampde@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
