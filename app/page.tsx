"use client"

import { useLanguage } from "@/contexts/language-context"

// Import modern components (alle unverändert)
import ModernNavbar from "@/app/components/modern-navbar"
import ModernHero from "@/app/components/modern-hero"
import ModernFeatures from "@/app/components/modern-features"
import ModernAbout from "@/app/components/modern-about"
import ModernExperience from "@/app/components/modern-experience"
import ModernActivities from "@/app/components/modern-activities"
import ModernGallery from "@/app/components/modern-gallery"
import ModernTestimonials from "@/app/components/modern-testimonials"
import ModernRegister from "@/app/components/modern-register"
import ModernFooter from "@/app/components/modern-footer"

export default function Home() {
  const { language } = useLanguage()

  return (
    <>
      {/* Bestehende Seitenstruktur bleibt 100% unverändert */}
      <div className="flex min-h-screen flex-col bg-black text-white">
        <ModernNavbar />

        <main className="flex-1">
          <ModernHero />
          <ModernFeatures />
          <ModernAbout />
          <ModernExperience />
          <ModernActivities />
          <ModernGallery />
          <ModernTestimonials />
          <ModernRegister />
        </main>

        <ModernFooter />
      </div>

      {/* Unsichtbare SEO-Inhalte nur für Suchmaschinen (screen reader only) */}
      <div className="sr-only" aria-hidden="true">
        <h1>The Mountaincamp - Austria's Premier Trail Running Camps</h1>
        <h2>Mountaincamp 2025 - Trail Running Camps Austria Experience</h2>
        <p>
          The Mountaincamp offers Austria's premier trail running camps experience. Join Mountaincamp 2025 for the
          ultimate trail running camps Austria adventure in the Austrian Alps. The Mountaincamp - where trail running
          camps Austria dreams become reality.
        </p>
        <div>
          Keywords: the mountaincamp, mountaincamp, trail running camps austria, trail running camps Austria, mountain
          camp austria, österreichische alpen, hochkrimml, salzburg, trailrunning österreich, trail running austria,
          mountaincamp 2025, the mountaincamp 2025, austrian alps trail running, best trail running camps austria,
          premier trail running camps austria
        </div>
      </div>
    </>
  )
}
