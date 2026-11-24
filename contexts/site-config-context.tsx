"use client"

import { createContext, useContext, type ReactNode } from "react"
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/app/lib/site-config"

const SiteConfigContext = createContext<SiteConfig>(DEFAULT_SITE_CONFIG)

export function SiteConfigProvider({ value, children }: { value: SiteConfig; children: ReactNode }) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>
}

/** Aktuelle Werte aus dem Admin-Bereich (Tickets, Preisphasen, Shuttles) */
export function useSiteConfig() {
  return useContext(SiteConfigContext)
}
