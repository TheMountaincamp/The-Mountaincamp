import Image from "next/image"

const photos = [
  {
    src: "/images/main-group-photo.jpg",
    alt: "Gruppe von Freund:innen feiert gemeinsam am Berg",
    heightClass: "h-[220px] md:h-[280px]",
  },
  {
    src: "/images/mountain-top-sunset-rave.jpg",
    alt: "Ausgelassene Feier auf einem Gipfel bei Sonnenuntergang",
    heightClass: "h-[220px] md:h-[360px]",
  },
  {
    src: "/images/canoeing-lake.jpeg",
    alt: "Gruppe im Kanu auf einem türkisen Bergsee",
    heightClass: "h-[220px] md:h-[360px]",
  },
  {
    src: "/images/trail-runners-mountain-path.jpg",
    alt: "Läuferinnen und Läufer auf einem schmalen Bergpfad",
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
