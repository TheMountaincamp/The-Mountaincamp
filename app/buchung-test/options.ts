/** Auswahlmöglichkeiten der Testbuchung, angelehnt an die CADI-Maske (Termin 38057) */
/** Hin- und Rückfahrt werden einzeln gebucht, Preise pro Strecke */
export const TRAVEL = [
  { id: "eigen", label: "Eigene Anreise", sub: "Auto, Zug oder Fahrgemeinschaft", price: 0 },
  { id: "berlin", label: "Shuttle Berlin", sub: "Zug und Bus", price: 70 },
  { id: "muenchen", label: "Shuttle München", sub: "Bus ab ZOB", price: 40 },
  { id: "jenbach", label: "Shuttle Jenbach", sub: "Bus ab Bahnhof", price: 20 },
] as const

export const ROOMS = [
  { id: "8er", label: "8er-Zimmer", sub: "Gruppenhaus, im Preis enthalten", price: 0 },
  { id: "4er", label: "4er-Zimmer", sub: "für alle 4 Nächte", price: 60 },
  { id: "dz", label: "Doppelzimmer", sub: "für alle 4 Nächte", price: 180 },
] as const

export const DIETS = [
  "Vegetarisch",
  "Vegan",
  "Laktosefrei",
  "Ohne Milchprodukte",
  "Glutenfrei",
  "Fruktosefrei",
  "Nussfrei",
  "Ohne Schweinefleisch",
] as const

export const SHIRTS = ["XS", "S", "M", "L", "XL", "XXL"] as const
export const SHIRT_CUTS = ["Damen", "Herren"] as const

export type TravelId = (typeof TRAVEL)[number]["id"]
export type RoomId = (typeof ROOMS)[number]["id"]

export interface Person {
  firstName: string
  lastName: string
  email: string
  birthDate: string
  gender: "" | "f" | "m" | "d"
  travel: TravelId
  travelBack: TravelId
  room: RoomId
  diets: string[]
  shirtCut: "" | (typeof SHIRT_CUTS)[number]
  shirtSize: "" | (typeof SHIRTS)[number]
}

export interface BookingRequest {
  persons: Person[]
  phone: string
  street: string
  zip: string
  city: string
  country: string
  message: string
  voucher: string
  payment: "invoice" | "card"
  acceptTerms: boolean
  acceptPrivacy: boolean
}

export function emptyPerson(): Person {
  return { firstName: "", lastName: "", email: "", birthDate: "", gender: "", travel: "eigen", travelBack: "eigen", room: "8er", diets: [], shirtCut: "", shirtSize: "" }
}

export function personPrice(p: Person, base: number) {
  const t = (TRAVEL.find((x) => x.id === p.travel)?.price ?? 0) + (TRAVEL.find((x) => x.id === p.travelBack)?.price ?? 0)
  const r = ROOMS.find((x) => x.id === p.room)?.price ?? 0
  return base + t + r
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
