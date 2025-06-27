"use client"

import { useLanguage } from "@/contexts/language-context"

// Import modern components
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
  )
}
