"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

import { faqsDE, faqsEN } from "@/app/data/faq"

export default function FAQSection() {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAllFaqs, setShowAllFaqs] = useState(false)

  const faqs = language === "de" ? faqsDE : faqsEN
  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 5)
  const hasMoreFaqs = faqs.length > 5

  // FAQ Schema is now rendered server-side in page.tsx for better SEO

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
              ? "Alles, was du über The Mountaincamp wissen musst"
              : "Everything you need to know about The Mountaincamp"}
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
              className="border border-gray-200 overflow-hidden bg-white hover:transition-shadow"
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
