"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Bereich unter der Buchungsmaske: Strava Club beitreten und Story-Bild teilen.
 * Immer sichtbar ("Schon gebucht?"). Wird zusätzlich hervorgehoben und angescrollt,
 * wenn die Buchungsmaske einen Abschluss meldet oder die Seite mit ?booked=1 aufgerufen wird.
 * Mit ?debug=cadi werden alle Meldungen der Buchungsmaske in der Konsole ausgegeben,
 * um bei einer Testbuchung das Abschluss-Signal zu finden.
 */
const STRAVA_URL = "https://www.strava.com/clubs/1861496"
const STORY_SRC = "/images/story/mountaincamp-2027-story.jpg"
const STORY_PREVIEW = "/images/story/mountaincamp-2027-story-preview.jpg"
const DONE_PATTERN = /booking[_-]?(complete|success|done|finished)|buchung[_-]?(abgeschlossen|erfolgreich)|confirmation|bestaetigung|bestätigung|thank[_-]?you|danke/i

const T = {
  de: {
    titleIdle: "Schon gebucht?",
    titleDone: "Du bist dabei. Willkommen in der Crew.",
    stravaText: "Im Strava Club laufen wir schon vor dem Camp gemeinsam: Challenges, Updates und die Leute, die du im August triffst.",
    stravaBtn: "Strava Club beitreten",
    storyText: "Sag deinen Leuten Bescheid. Vielleicht kommt ja noch jemand mit.",
    storyBtn: "In der Instagram-Story teilen",
    storyDl: "Bild herunterladen",
    storyHint: "Markiere @the_mountaincamp in deiner Story, dann teilen wir sie weiter.",
    alt: "Story-Bild: I'll be at the Mountaincamp 2027, 18 to 22 August, Hochkrimml",
  },
  en: {
    titleIdle: "Already booked?",
    titleDone: "You're in. Welcome to the crew.",
    stravaText: "We start running together long before the camp in our Strava club: challenges, updates and the people you will meet in August.",
    stravaBtn: "Join the Strava club",
    storyText: "Tell your people. Maybe someone comes along.",
    storyBtn: "Share to your Instagram story",
    storyDl: "Download image",
    storyHint: "Tag @the_mountaincamp in your story and we will share it.",
    alt: "Story image: I'll be at the Mountaincamp 2027, 18 to 22 August, Hochkrimml",
  },
} as const

export default function AfterBooking({ lang }: { lang: "de" | "en" }) {
  const t = T[lang]
  const [done, setDone] = useState(false)
  const [canShare, setCanShare] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const debug = params.get("debug") === "cadi"
    if (params.get("booked") === "1") setDone(true)
    try {
      const probe = new File([new Blob(["x"], { type: "image/jpeg" })], "x.jpg", { type: "image/jpeg" })
      setCanShare(!!navigator.canShare && navigator.canShare({ files: [probe] }))
    } catch {
      setCanShare(false)
    }
    const onMsg = (e: MessageEvent) => {
      if (e.origin === window.location.origin) return
      let raw = ""
      try {
        raw = typeof e.data === "string" ? e.data : JSON.stringify(e.data)
      } catch {
        return
      }
      if (debug) console.log("[CADI]", e.origin, raw)
      if (DONE_PATTERN.test(raw)) setDone(true)
    }
    window.addEventListener("message", onMsg)
    return () => window.removeEventListener("message", onMsg)
  }, [])

  useEffect(() => {
    if (done) ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [done])

  async function share() {
    try {
      const blob = await (await fetch(STORY_SRC)).blob()
      const file = new File([blob], "mountaincamp-2027.jpg", { type: "image/jpeg" })
      await navigator.share({ files: [file] })
    } catch {
      /* abgebrochen oder nicht unterstützt: Download bleibt als Weg */
    }
  }

  return (
    <section
      ref={ref}
      id="nach-der-buchung"
      className={`mx-auto mt-14 max-w-3xl scroll-mt-28 border-t pt-10 ${done ? "border-gray-900" : "border-gray-200"}`}
    >
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{done ? t.titleDone : t.titleIdle}</h2>
      <div className="mt-6 grid gap-10 md:grid-cols-[1fr_200px]">
        <div>
          <p className="leading-relaxed text-gray-700">{t.stravaText}</p>
          <a
            href={STRAVA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            {t.stravaBtn}
          </a>

          <p className="mt-10 leading-relaxed text-gray-700">{t.storyText}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {canShare && (
              <button onClick={share} className="bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800">
                {t.storyBtn}
              </button>
            )}
            <a
              href={STORY_SRC}
              download="mountaincamp-2027.jpg"
              className={
                canShare
                  ? "text-sm underline underline-offset-4"
                  : "bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              }
            >
              {t.storyDl}
            </a>
          </div>
          <p className="mt-3 text-sm text-gray-500">{t.storyHint}</p>
        </div>
        <img src={STORY_PREVIEW} alt={t.alt} width={200} height={356} className="hidden w-[200px] md:block" />
      </div>
    </section>
  )
}
