"use client"

import { useEffect } from "react"
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

  // Add enhanced structured data for SEO
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Main event structured data
      const eventStructuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "The Mountaincamp 2025",
        description: "Trailrunning, Community, Party - Join the ultimate alpine adventure at The Mountaincamp 2025.",
        startDate: "2025-08-06T00:00:00",
        endDate: "2025-08-10T00:00:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Hochkrimml, Austrian Alps",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hochkrimml",
            addressRegion: "Salzburg",
            addressCountry: "Austria",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 47.2393,
            longitude: 12.1735,
          },
        },
        image: [
          "https://themountaincamp.de/images/hero-bg-new.jpg",
          "https://themountaincamp.de/images/mountain-rave-new.jpg",
          "https://themountaincamp.de/images/trail-runner-action.jpg",
        ],
        offers: {
          "@type": "Offer",
          price: "420",
          priceCurrency: "EUR",
          availability: "https://schema.org/LimitedAvailability",
          url: "https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/",
          validFrom: "2023-01-01T00:00:00",
          priceValidUntil: "2025-08-01T00:00:00",
        },
        organizer: {
          "@type": "Organization",
          name: "The Mountaincamp",
          url: "https://themountaincamp.de",
          logo: "https://themountaincamp.de/images/MTC-Logo-2025-new.png",
        },
        performer: {
          "@type": "PerformingGroup",
          name: "Trailrunning Coaches",
        },
      }

      // FAQs structured data
      const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is included in The Mountaincamp package?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Mountaincamp package includes 4 nights accommodation, all meals, guided trail runs for all levels, access to all activities including yoga, creative workshops, and the legendary sunset rave party.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to be an experienced trail runner to join?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Not at all! The Mountaincamp welcomes runners of all levels, from beginners to advanced. We offer different trail groups based on experience and pace, ensuring everyone has a great time.",
            },
          },
          {
            "@type": "Question",
            name: "How do I get to Hochkrimml in the Austrian Alps?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The nearest airports are Salzburg (100km) and Innsbruck (90km). From there, you can rent a car or take public transportation. Detailed travel information will be provided after registration.",
            },
          },
          {
            "@type": "Question",
            name: "What should I pack for The Mountaincamp?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Trailrunning gear, comfortable clothes for activities, swimwear for lake activities, warm clothes for evenings, and party outfit for the sunset rave. A detailed packing list will be sent to all participants.",
            },
          },
        ],
      }

      // Product structured data
      const productStructuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "The Mountaincamp 2025 Package",
        description: "Trailrunning, Community, Party - The ultimate alpine adventure at The Mountaincamp 2025.",
        image: [
          "https://themountaincamp.de/images/hero-bg-new.jpg",
          "https://themountaincamp.de/images/mountain-rave-new.jpg",
        ],
        sku: "MTC2025-FULL",
        mpn: "MTC2025-001",
        brand: {
          "@type": "Brand",
          name: "The Mountaincamp",
        },
        offers: {
          "@type": "Offer",
          url: "https://themountaincamp.de/#register",
          priceCurrency: "EUR",
          price: "420",
          priceValidUntil: "2025-08-01",
          availability: "https://schema.org/LimitedAvailability",
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "87",
        },
        review: [
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Sarah K.",
            },
            reviewBody:
              "The overall organisation of the whole stay there, really good! All the friendly faces, the nature etc.",
          },
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Michael T.",
            },
            reviewBody:
              "I loved the experience as a whole, but what stood out was the variety in not only runs, but generally activities, there was always something exciting happening!",
          },
        ],
      }

      // Organization structured data
      const organizationStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "The Mountaincamp",
        url: "https://themountaincamp.de",
        logo: "https://themountaincamp.de/images/MTC-Logo-2025-new.png",
        sameAs: [
          "https://www.instagram.com/the_mountaincamp/",
          "https://www.facebook.com/profile.php?id=61566807910764",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+43-677-63455763",
          contactType: "customer service",
          email: "themountaincampde@gmail.com",
          availableLanguage: ["English", "German"],
        },
      }

      // Breadcrumb structured data
      const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://themountaincamp.de",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Register",
            item: "https://themountaincamp.de/#register",
          },
        ],
      }

      // Add all structured data to the page
      const structuredDataElements = [
        eventStructuredData,
        faqStructuredData,
        productStructuredData,
        organizationStructuredData,
        breadcrumbStructuredData,
      ]

      structuredDataElements.forEach((data) => {
        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.text = JSON.stringify(data)
        document.head.appendChild(script)
      })

      return () => {
        // Clean up scripts when component unmounts
        const scripts = document.querySelectorAll('script[type="application/ld+json"]')
        scripts.forEach((script) => {
          document.head.removeChild(script)
        })
      }
    }
  }, [])

  return (
    <>
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

      {/* Unsichtbare SEO-Inhalte für Keyword-Targeting */}
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
