import Image from "next/image"

const photos = [
  {
    src: "/images/participants/waterfall-group.jpg",
    alt: "Gruppe von Trailrunner:innen feiert gemeinsam vor einem Wasserfall",
    heightClass: "h-[220px] md:h-[280px]",
  },
  {
    src: "/images/participants/lodge-runner-back.jpg",
    alt: "Läuferin von hinten vor der Mountaincamp-Lodge",
    heightClass: "h-[220px] md:h-[360px]",
  },
  {
    src: "/images/participants/craft-workshop.jpg",
    alt: "Teilnehmende gestalten gemeinsam beim Kreativ-Workshop",
    heightClass: "h-[220px] md:h-[360px]",
  },
  {
    src: "/images/participants/runner-portrait-smile.jpg",
    alt: "Lächelnder Läufer mit Trailrunning-Ausrüstung im Wald",
    heightClass: "h-[220px] md:h-[280px]",
  },
  {
    src: "/images/participants/ridge-descent-poles.jpg",
    alt: "Trailrunner:innen mit Stöcken auf einem Bergrücken vor Gletscherkulisse",
    heightClass: "h-[220px] md:h-[360px]",
  },
  {
    src: "/images/participants/hut-stop-valley.jpg",
    alt: "Gruppe macht Rast an einer Berghütte mit Tiefblick ins Tal",
    heightClass: "h-[220px] md:h-[280px]",
  },
  {
    src: "/images/participants/lakeside-walk.jpg",
    alt: "Zwei Läufer:innen wandern an einem Bergsee entlang",
    heightClass: "h-[220px] md:h-[360px]",
  },
  {
    src: "/images/participants/foggy-trail-valley.jpg",
    alt: "Läufer:innen auf nebligem Bergpfad über einem Wolkenmeer",
    heightClass: "h-[220px] md:h-[280px]",
  },
]

export function HubPhotoStrip() {
  return (
    <section className="container">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:items-end md:gap-3">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className={`group relative overflow-hidden rounded-sm ${photo.heightClass}`}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
