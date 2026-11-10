"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

/** Rechte Hälfte der Split-Sektion: randloses Bild mit sanftem Wechsel. */
export default function SplitImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % images.length), 6000)
    return () => window.clearInterval(id)
  }, [images.length, i])
  const go = (d: number) => setI((v) => (v + d + images.length) % images.length)

  return (
    <div className="relative h-[420px] overflow-hidden md:h-[560px] lg:h-auto lg:min-h-[720px]">
      {images.map((src, k) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`}
          loading={k === 0 ? "eager" : "lazy"}
        />
      ))}
      <button type="button" onClick={() => go(-1)} aria-label="Vorheriges Bild" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-900 hover:bg-white">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button type="button" onClick={() => go(1)} aria-label="Nächstes Bild" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-900 hover:bg-white">
        <ChevronRight className="h-4 w-4" />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, k) => (
          <button key={k} type="button" onClick={() => setI(k)} aria-label={`Bild ${k + 1}`} className={`h-2 w-2 rounded-full ${k === i ? "bg-white" : "bg-white/50"}`} />
        ))}
      </div>
    </div>
  )
}
