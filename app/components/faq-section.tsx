"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAllFaqs, setShowAllFaqs] = useState(false)

  const faqsDE: FAQItem[] = [
    {
      question: "Was ist Trailrunning?",
      answer:
        "Trailrunning ist Laufen abseits befestigter Straßen auf natürlichen Wegen in den Bergen, Wäldern oder Hügeln. Im Gegensatz zum Straßenlauf läufst du auf unbefestigten Pfaden mit Wurzeln, Steinen und wechselndem Untergrund. Trailrunning verbindet Laufsport mit Naturerlebnis und Abenteuer in den Bergen.",
    },
    {
      question: "Wo kann man Trailrunning machen?",
      answer:
        "Trailrunning kannst du überall machen, wo es natürliche Wege gibt: in den Alpen, im Mittelgebirge, in Wäldern oder sogar in Parks. Die österreichischen Alpen bieten mit ihren spektakulären Bergpfaden ideale Bedingungen. Unser Camp in Hochkrimml auf 1.600m Höhe liegt inmitten eines der schönsten Trailrunning-Gebiete Österreichs mit hunderten Kilometern alpiner Trails.",
    },
    {
      question: "Wie fange ich mit Trailrunning an?",
      answer:
        "Starte mit kurzen, einfachen Trails in deiner Umgebung. Du brauchst gute Trailrunning-Schuhe mit Profil und solltest langsam beginnen, um dich an den unebenen Untergrund zu gewöhnen. Unser Trailrunning Camp ist perfekt für Anfänger, Fortgeschrittene und Profis.",
    },
    {
      question: "Was muss ich beim Trailrunning beachten?",
      answer:
        "Wichtig sind: gute Trailrunning-Schuhe mit Grip, ausreichend Wasser, Wetterschutz für die Berge, ein Handy für Notfälle und eine realistische Einschätzung deiner Fitness. In den Alpen solltest du auch Höhenmeter und Wetter beachten. In unserem Camp lernst du alle wichtigen Sicherheitsaspekte und die richtige Ausrüstung kennen.",
    },
    {
      question: "Wie schnell läuft man beim Trailrunning?",
      answer:
        "Trailrunning ist deutlich langsamer als Straßenlauf - das ist völlig normal! Bergauf gehst du oft, bergab läufst du kontrolliert. Das Tempo hängt stark vom Gelände und den Höhenmetern ab. In unserem Camp bieten wir verschiedene Gruppen für unterschiedliche Geschwindigkeiten, sodass jeder sein passendes Tempo findet.",
    },
    {
      question: "Warum Trailrunning?",
      answer:
        "Trailrunning bietet mehr als nur Sport: Du erlebst atemberaubende Natur, trainierst den ganzen Körper durch das abwechslungsreiche Gelände, schonst deine Gelenke durch den weichen Untergrund und findest mentale Erholung in den Bergen. Es ist Abenteuer, Fitness und Naturerlebnis in einem - perfekt für alle, die mehr wollen als nur auf Asphalt zu laufen.",
    },
    {
      question: "Was sind die schönsten Trailrunning-Strecken?",
      answer:
        "Die österreichischen Alpen gehören zu den spektakulärsten Trailrunning-Regionen Europas. Hochkrimml bietet Trails mit Panoramablicken auf 3.000er-Gipfel, kristallklare Bergseen und alpine Hochwege. In unserem Camp läufst du täglich auf verschiedenen Routen - von flowigen Waldpfaden bis zu anspruchsvollen Gipfeltouren mit atemberaubenden Ausblicken.",
    },
    {
      question: "Was sind die schönsten Trailrunning-Events?",
      answer:
        "The Mountaincamp ist mehr als ein Event - es ist ein 5-tägiges Trailrunning-Festival in den Alpen! Neben täglichen geführten Läufen erlebst du eine einzigartige Community, Workshops, Yoga, Klettern und die legendäre Sunset Rave auf dem Berg. Es verbindet die Schönheit alpiner Trails mit unvergesslichen Gemeinschaftserlebnissen.",
    },
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
        "Der Preis von €480 inkludiert 4 Nächte Unterkunft in unserem gemütlichen Berghaus, Halbpension mit zwei Mahlzeiten täglich (Frühstück und Abendessen) und geführte Trailrunning-Touren durch die Alpen.",
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
        "Ja! Wir haben spezielle Anfängergruppen mit kürzeren Distanzen und Technik-Coaching. Du solltest eine Grundfitness haben und Freude am Laufen in den Bergen. Unsere Guides helfen dir, die richtige Trailrunning-Technik zu lernen.",
    },
  ]

  const faqsEN: FAQItem[] = [
    {
      question: "What is trailrunning?",
      answer:
        "Trailrunning is running off paved roads on natural paths in mountains, forests, or hills. Unlike road running, you run on unpaved trails with roots, rocks, and changing terrain. Trailrunning combines running with nature experiences and mountain adventures.",
    },
    {
      question: "Where can you do trailrunning?",
      answer:
        "You can do trailrunning anywhere with natural paths: in the Alps, low mountain ranges, forests, or even parks. The Austrian Alps offer ideal conditions with spectacular mountain trails. Our camp in Hochkrimml at 1,600m altitude is in one of Austria's most beautiful trailrunning areas with hundreds of kilometers of alpine trails.",
    },
    {
      question: "How do I start trailrunning?",
      answer:
        "Start with short, easy trails in your area. You need good trail running shoes with grip and should start slowly to get used to uneven terrain. Our trailrunning camp is perfect for beginners, intermediates and pros.",
    },
    {
      question: "What should I consider when trailrunning?",
      answer:
        "Important: good trail running shoes with grip, sufficient water, weather protection for mountains, a phone for emergencies, and realistic fitness assessment. In the Alps, also consider elevation gain and weather. In our camp, you learn all important safety aspects and proper equipment.",
    },
    {
      question: "How fast do you run when trailrunning?",
      answer:
        "Trailrunning is significantly slower than road running - that's completely normal! Uphill you often walk, downhill you run controlled. Pace depends heavily on terrain and elevation. In our camp, we offer different groups for different speeds, so everyone finds their suitable pace.",
    },
    {
      question: "Why trailrunning?",
      answer:
        "Trailrunning offers more than just sport: you experience breathtaking nature, train your whole body through varied terrain, protect your joints with soft ground, and find mental recovery in the mountains. It's adventure, fitness, and nature experience in one - perfect for those who want more than just running on asphalt.",
    },
    {
      question: "What are the most beautiful trailrunning routes?",
      answer:
        "The Austrian Alps are among Europe's most spectacular trailrunning regions. Hochkrimml offers trails with panoramic views of 3,000m peaks, crystal-clear mountain lakes, and alpine high paths. In our camp, you run daily on different routes - from flowy forest paths to challenging summit tours with breathtaking views.",
    },
    {
      question: "What are the most beautiful trailrunning events?",
      answer:
        "The Mountaincamp is more than an event - it's a 5-day trailrunning festival in the Alps! Besides daily guided runs, you experience a unique community, workshops, yoga, climbing, and the legendary Sunset Rave on the mountain. It combines the beauty of alpine trails with unforgettable community experiences.",
    },
    {
      question: "Who is the trailrunning camp in Austria suitable for?",
      answer:
        "Our alpine trailrunning camp in the Austrian Alps is suitable for all levels – from beginners to experienced trail runners. We offer different groups based on pace and experience, so everyone finds the perfect challenge.",
    },
    {
      question: "Where exactly does the Alpine Trailrunning Camp take place?",
      answer:
        "The camp takes place in Hochkrimml in the Austrian Alps, at 1,600m altitude. The region offers spectacular alpine trails with breathtaking mountain panoramas and is perfect for trailrunning in the Alps.",
    },
    {
      question: "What's included in the trailrunning camp price?",
      answer:
        "The price of €480 includes 4 nights accommodation in our cozy mountain house, half board with two meals daily (breakfast and dinner) and guided trailrunning tours through the Alps.",
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
        "Yes! We have special beginner groups with shorter distances and technique coaching. You should have basic fitness and enjoy running in the mountains. Our guides will help you learn proper trailrunning technique.",
    },
  ]

  const faqs = language === "de" ? faqsDE : faqsEN
  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 5)
  const hasMoreFaqs = faqs.length > 5

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
          {visibleFaqs.map((faq, index) => (
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

        {hasMoreFaqs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-8 text-center"
          >
            <Button onClick={() => setShowAllFaqs(!showAllFaqs)} variant="outline" size="lg" className="gap-2">
              {showAllFaqs
                ? language === "de"
                  ? "Weniger anzeigen"
                  : "Show less"
                : language === "de"
                  ? `Weitere ${faqs.length - 5} Fragen anzeigen`
                  : `Show ${faqs.length - 5} more questions`}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAllFaqs ? "rotate-180" : ""}`} />
            </Button>
          </motion.div>
        )}

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
