import Image from "next/image"

const values = [
  {
    title: "3 Formate",
    subtitle: "Für jedes Level und jedes Ziel",
    image: "/images/participants/gravel-ascent-line.jpg",
    alt: "Lange Reihe von Läufer:innen auf einem Schotterweg Richtung Gipfel",
  },
  {
    title: "1 Community",
    subtitle: "Läufer:innen, die sich auf dem Trail verbinden",
    image: "/images/participants/group-gravel-road.jpg",
    alt: "Gruppe von Läufer:innen dicht beieinander auf einem Schotterweg im Nebel",
  },
  {
    title: "Hochkrimml",
    subtitle: "Mitten in den Österreichischen Alpen",
    image: "/images/participants/summit-above-clouds.jpg",
    alt: "Gruppe auf einem Gipfel über einem Wolkenmeer in den Alpen",
  },
]

export function HubValueStrip() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid grid-cols-1 divide-y divide-mc-white/10 md:grid-cols-3 md:gap-3 md:divide-y-0">
        {values.map((value) => (
          <div
            key={value.title}
            className="isolate relative flex flex-col gap-2 overflow-hidden rounded-sm px-0 py-6 text-center md:aspect-[4/5] md:px-8 md:py-0"
          >
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={value.image || "/placeholder.svg"}
                alt={value.alt}
                fill
                sizes="33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mc-black via-mc-black/70 to-mc-black/20" />
            </div>
            <div className="relative z-10 flex flex-col gap-2 md:mt-auto md:pb-8">
              <p className="font-oswald text-xl font-semibold uppercase text-mc-white">{value.title}</p>
              <p className="text-sm leading-relaxed text-mc-dust/80">{value.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
