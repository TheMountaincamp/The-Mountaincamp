"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqsDE: FAQItem[] = [
    {
      question: "Für wen ist das Trailrunning Camp in Österreich geeignet?",
      answer:
        "Unser alpines Trailrunning Camp in den österreichischen Alpen ist für alle Level geeignet – von Anfängern bis zu erfahrenen Trail Runnern. Wir bieten verschiedene Gruppen nach Tempo und Erfahrung, sodass jeder die perfekte Herausforderung findet.",
    },
    {
      question: "Wo genau findet das Alpine Trailrunning Camp statt?",
      answer:
        "Das Camp findet in Hochkrimml in den österreichischen Alpen statt, auf 1.600m Höhe. Die Region bietet spektakuläre alpine Trails mit atemberaubenden Bergpanoramen und ist perfekt für Trailrunning in den Alpen.",
    },
    {
      question: "Was ist im Preis des Trailrunning Camps enthalten?",
      answer:
        "Der Preis von €480 inkludiert 4 Nächte Unterkunft in unserem gemütlichen Berghaus, Vollpension mit drei Mahlzeiten täglich, geführte Trailrunning-Touren durch die Alpen, Technik-Workshops, alle Freizeitaktivitäten (Yoga, Klettern, Bogenschießen, etc.) und die legendäre Sunset Rave.",
    },
    {
      question: "Wie schwierig sind die Trails im Austria Trailrunning Camp?",
      answer:
        "Wir bieten täglich mehrere Gruppen mit unterschiedlichen Distanzen und Höhenmetern an. Von entspannten 10km-Läufen bis zu anspruchsvollen 25km+ Bergtouren mit 1.500+ Höhenmetern ist alles dabei. Unsere erfahrenen Guides passen die Routen an die Gruppe an.",
    },
    {
      question: "Muss ich meine eigene Trailrunning-Ausrüstung mitbringen?",
      answer:
        "Ja, bitte bringe deine eigenen Trailrunning-Schuhe, Laufbekleidung und einen kleinen Rucksack mit. Wir empfehlen auch Trinkflaschen, Sonnenschutz und wetterfeste Kleidung für die Alpen. Eine detaillierte Packliste erhältst du nach der Anmeldung.",
    },
    {
      question: "Wie komme ich zum Trailrunning Camp in den österreichischen Alpen?",
      answer:
        "Hochkrimml ist gut erreichbar: Mit dem Auto über die Gerlosstraße, mit öffentlichen Verkehrsmitteln bis Krimml und dann mit dem Bus nach Hochkrimml. Wir organisieren auch gemeinsame Busfahrten aus verschiedenen deutschen Städten. Details zur Anreise findest du auf unserer Bus-Anreise Seite.",
    },
    {
      question: "Gibt es vegetarische oder vegane Optionen beim Essen?",
      answer:
        "Absolut! Wir bieten täglich vegetarische und vegane Optionen an. Bitte gib bei der Anmeldung deine Ernährungspräferenzen oder Allergien an, damit wir uns optimal vorbereiten können.",
    },
    {
      question: "Kann ich als Anfänger am Alpine Trailrunning Camp teilnehmen?",
      answer:
        "Ja! Wir haben spezielle Anfängergruppen mit kürzeren Distanzen und Technik-Coaching. Du solltest eine Grundfitness haben und Freude am Laufen in den Bergen. Unsere Coaches helfen dir, die richtige Trailrunning-Technik zu lernen.",
    },
  ]

  const faqsEN: FAQItem[] = [
    {
      question: "Who is the trailrunning camp in Austria suitable for?",
      answer:
        "Our alpine trailrunning camp in the Austrian Alps is suitable for all levels – from beginners to experienced trail runners. We offer different groups based on pace and experience, so everyone finds the perfect challenge.",
    },
    {
      question: "Where exactly does the Alpine Trailrunning Camp take place?",
      answer:
        "The camp takes place in Hochkrimml in the Austrian Alps, at 1,700m altitude. The region offers spectacular alpine trails with breathtaking mountain panoramas and is perfect for trailrunning in the Alps.",
    },
    {
      question: "What's included in the trailrunning camp price?",
      answer:
        "The price of €480 includes 4 nights accommodation in our cozy mountain house, board with two meals daily, guided trailrunning tours through the Alps, technique workshops, all leisure activities (yoga, climbing, archery, etc.) and the legendary Sunset Rave.",
    },
    {
      question: "How difficult are the trails in the Austria Trailrunning Camp?",
      answer:
        "We offer multiple groups daily with different distances and elevation gains. From relaxed 10km runs to challenging 25km+ mountain tours with 1,500+ meters elevation gain. Our experienced guides adapt routes to the group.",
    },
    {
      question: "Do I need to bring my own trailrunning equipment?",
      answer:
        "Yes, please bring your own trail running shoes, running clothes and a small backpack. We also recommend water bottles, sun protection and weatherproof clothing for the Alps. You'll receive a detailed packing list after registration.",
    },
    {
      question: "How do I get to the trailrunning camp in the Austrian Alps?",
      answer:
        "Hochkrimml is easily accessible: By car via Gerlosstraße, by public transport to Krimml and then by bus to Hochkrimml. We also organize shared bus trips from various German cities. Find travel details on our bus transport page.",
    },
    {
      question: "Are there vegetarian or vegan food options?",
      answer:
        "We offer daily vegetarian and vegan options. Please indicate your dietary preferences or allergies during registration so we can prepare optimally.",
    },
    {
      question: "Can I participate as a beginner in the Alpine Trailrunning Camp?",
      answer:
        "Yes! We have special beginner groups with shorter distances and technique coaching. You should have basic fitness and enjoy running in the mountains. Our coaches will help you learn proper trailrunning technique.",
    },
  ]

  const faqs = language === "de" ? faqsDE : faqsEN

  // Add FAQ structured data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }

      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.text = JSON.stringify(faqStructuredData)
      script.id = "faq-structured-data"
      document.head.appendChild(script)

      return () => {
        const existingScript = document.getElementById("faq-structured-data")
        if (existingScript && document.head.contains(existingScript)) {
          document.head.removeChild(existingScript)
        }
      }
    }
  }, [faqs])

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            {language === "de" ? "Häufig gestellte Fragen" : "Frequently Asked Questions"}
          </h2>
          <p className="text-xl text-gray-600">
            {language === "de"
              ? "Alles, was du über unser Trailrunning Camp in den österreichischen Alpen wissen musst"
              : "Everything you need to know about our trailrunning camp in the Austrian Alps"}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">{language === "de" ? "Noch Fragen?" : "Still have questions?"}</p>
          <a
            href="mailto:themountaincampde@gmail.com"
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            themountaincampde@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
