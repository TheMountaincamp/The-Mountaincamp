"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import ImageWithFallback from "@/app/components/image-with-fallback"

export type MasonryGalleryImage = {
  src: string
  alt: string
  caption?: string
}

export default function MasonryGallery({ images }: { images: MasonryGalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])

  const showPrev = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current - 1 + images.length) % images.length))
  }, [images.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (activeIndex === null) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close()
      if (event.key === "ArrowLeft") showPrev()
      if (event.key === "ArrowRight") showNext()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [activeIndex, close, showPrev, showNext])

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative mb-3 block w-full overflow-hidden bg-gray-100 md:mb-4"
          >
            <ImageWithFallback
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={800}
              height={1000}
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              fallbackSrc="/placeholder.svg?height=1000&width=800"
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex animate-in items-center justify-center bg-black/95 p-4 fade-in duration-200"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Bildergalerie"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              close()
            }}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
            aria-label="Schließen"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showPrev()
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white transition-colors hover:bg-black/80 md:left-6"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white transition-colors hover:bg-black/80 md:right-6"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            key={activeIndex}
            className="relative flex max-h-full max-w-5xl animate-in flex-col items-center fade-in zoom-in-95 duration-300"
            onClick={(event: React.MouseEvent) => event.stopPropagation()}
          >
            <img
              src={images[activeIndex].src || "/placeholder.svg"}
              alt={images[activeIndex].alt}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
            {images[activeIndex].caption && (
              <p className="mt-4 text-center text-sm text-white/70">{images[activeIndex].caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
