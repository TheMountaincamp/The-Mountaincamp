"use client"

import { useState } from "react"

/** Blendet Textfelder aus, die nicht zum Suchbegriff passen */
export default function TextFilter() {
  const [q, setQ] = useState("")
  function apply(v: string) {
    setQ(v)
    const needle = v.trim().toLowerCase()
    document.querySelectorAll<HTMLElement>("[data-text-entry]").forEach((el) => {
      el.style.display = !needle || (el.dataset.search ?? "").includes(needle) ? "" : "none"
    })
    // Blöcke ohne Treffer ausblenden
    document.querySelectorAll<HTMLElement>("[data-text-block]").forEach((b) => {
      const any = Array.from(b.querySelectorAll<HTMLElement>("[data-text-entry]")).some((el) => el.style.display !== "none")
      b.style.display = any ? "" : "none"
    })
  }
  return (
    <input
      type="search"
      value={q}
      onChange={(e) => apply(e.target.value)}
      placeholder="Suchen, z. B. Summit Rave"
      className="w-full border border-gray-300 bg-white px-3 py-2 text-sm"
    />
  )
}
