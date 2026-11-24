import registry from "@/app/data/text-registry.json"

export type TextEntry = { key: string; page: string; section: string; de: string; en: string }

export const TEXT_ENTRIES = registry as TextEntry[]

export const TEXT_PAGES: { id: string; label: string; href: string }[] = [
  { id: "start", label: "Startseite", href: "/" },
  { id: "tickets", label: "Tickets", href: "/tickets" },
  { id: "anreise", label: "Anreise", href: "/bus-departures" },
  { id: "haus", label: "Haus", href: "/house" },
  { id: "trails", label: "Trails", href: "/trails" },
  { id: "allgemein", label: "Allgemein (Navigation, Formulare)", href: "/" },
]
