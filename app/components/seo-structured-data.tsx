"use client"

import { useEffect } from "react"

interface StructuredDataProps {
  type: "event" | "organization" | "product" | "faq" | "website" | "breadcrumb"
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.id = `structured-data-${type}`
    script.text = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      const existingScript = document.getElementById(`structured-data-${type}`)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [type, data])

  return null
}
