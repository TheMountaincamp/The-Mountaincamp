"use client"
import { Button } from "antd"
import { useTranslation } from "react-i18next"
import { useIsMobile } from "hooks/useIsMobile"
import { useTimer } from "hooks/useTimer"

const Navbar = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const timeLeft = useTimer()

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Button
        className={`bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white border border-white/20 transition-colors ${
          isMobile ? "text-xs px-2 py-1 h-auto" : ""
        } ${!timeLeft.isActive ? "opacity-50 cursor-not-allowed" : ""}`}
        asChild={timeLeft.isActive}
        disabled={!timeLeft.isActive}
      >
        {timeLeft.isActive ? (
          <a
            href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=2467&termin_id=36011&locale=de#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("registerNow")}
          </a>
        ) : (
          <span>{t("registerNow")}</span>
        )}
      </Button>
    </div>
  )
}

export default Navbar
