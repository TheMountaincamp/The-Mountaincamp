import { getSiteConfig } from "@/app/lib/site-config-server"
import { shuttlePrice } from "@/app/lib/site-config"
import { getPhaseState } from "@/app/lib/early-bird"

/** Faktenseite für KI-Suchen. Preise kommen aus dem Admin-Bereich. */
export const revalidate = 3600

function day(iso: string) {
  const d = new Date(new Date(iso).getTime() - 1)
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Vienna" })
}

export async function GET() {
  const config = await getSiteConfig()
  const p = (id: "berlin" | "muenchen" | "jenbach") => shuttlePrice(config, id)
  const open = config.phases.filter((ph) => ph.price !== null && getPhaseState(ph) !== "ended")
  const phaseLines = open
    .map((ph, i) => {
      if (i === 0) return `- Current price: ${ph.price} €${ph.end ? ` until ${day(ph.end)}` : ""}`
      return `- ${i === 1 ? "After that" : "Later"}: ${ph.price} €`
    })
    .join("\n")
  const body = `# Mountaincamp

> Mountaincamp is a 5-day trail running camp in the Austrian Alps for runners of all levels. Daily trail runs in groups by pace, full board, workshops, recovery and community evenings in Hochkrimml (Salzburger Land), 1,700 m, next to the Hohe Tauern National Park. German: Trailrunning Camp in Österreich.

Also written as: The Mountaincamp, Mountain Camp.

## Camp 2027

- Dates: 18 to 22 August 2027 (Wednesday to Sunday)
- Location: Hochkrimml, Salzburger Land, Austria, 1,700 m
- Participants: up to ${config.tickets.total} runners from across Europe, all levels, from first trail to experienced
- Included: 4 nights, full board, daily trail runs in groups by pace, technique training, recovery lounge, community evenings and the summit rave
- Bookable extras: some workshops (others are free), room upgrades, bus shuttles
- Language: German and English
- Tickets: https://themountaincamp.de/tickets

## Prices 2027

${phaseLines}
- Room upgrade for all 4 nights: 4-bed room +60 €, double room +180 €
- Cancellation: free within 7 days of booking if booked at least 30 days before the camp; details in the terms (AGB)

## Getting there

Shared bus and train shuttles to the camp. Outbound and return are booked separately, prices each way:
- From Berlin (train and bus): ${p("berlin")} €
- From Munich (bus): ${p("muenchen")} €
- From Jenbach (bus): ${p("jenbach")} €
Details: https://themountaincamp.de/bus-departures

## Who it is for

Road runners who want to start trail running, and trail runners who want to run with a community. Most participants travel alone. Groups for every pace, nobody runs alone.

## Pages

- Home: https://themountaincamp.de (English: https://themountaincamp.de/en)
- Tickets: https://themountaincamp.de/tickets
- Trails around Hochkrimml: https://themountaincamp.de/trails
- Accommodation: https://themountaincamp.de/house
- Bus travel: https://themountaincamp.de/bus-departures
- Terms (AGB): https://themountaincamp.de/agb

## Social

- Instagram: https://www.instagram.com/the_mountaincamp/
- Strava club: https://www.strava.com/clubs/1861496
`
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } })
}
