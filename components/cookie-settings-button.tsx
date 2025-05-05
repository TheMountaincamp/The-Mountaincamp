"use client"

import { Button } from "@/components/ui/button"
import { useCookieConsent } from "@/contexts/cookie-consent-context"

export default function CookieSettingsButton() {
  const { openPreferences } = useCookieConsent()

  return (
    <Button
      variant="link"
      onClick={openPreferences}
      className="text-sm text-white/60 hover:text-primary transition-colors p-0 h-auto font-normal"
    >
      Cookie-Einstellungen
    </Button>
  )
}
