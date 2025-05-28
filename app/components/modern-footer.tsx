"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import CookieSettingsButton from "@/components/cookie-settings-button"

export default function ModernFooter() {
  const { t, language } = useLanguage()

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 text-primary/10"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <Image
                src="/images/MTC-Logo-2025-new.png"
                alt="The Mountaincamp Logo"
                width={180}
                height={40}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/60 mb-6">
              {language === "de"
                ? "Trailrunning-Camp in den österreichischen Alpen"
                : "Trailrunning camp in the Austrian Alps"}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/the_mountaincamp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61566807910764"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:themountaincampde@gmail.com"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+43677634557633"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display uppercase mb-4 text-white">{t("navigation")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-white/60 hover:text-primary transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-white/60 hover:text-primary transition-colors">
                  {t("experience")}
                </Link>
              </li>
              <li>
                <Link href="/house" className="text-white/60 hover:text-primary transition-colors">
                  {t("house")}
                </Link>
              </li>
              <li>
                <Link href="/trails" className="text-white/60 hover:text-primary transition-colors">
                  {t("trails")}
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-white/60 hover:text-primary transition-colors">
                  {t("testimonials")}
                </Link>
              </li>
              <li>
                <Link href="#register" className="text-white/60 hover:text-primary transition-colors">
                  {t("register")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display uppercase mb-4 text-white">{t("contact")}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:themountaincampde@gmail.com"
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  themountaincampde@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+43677634557633" className="text-white/60 hover:text-primary transition-colors">
                  +43 677 63455763
                </a>
              </li>
              <li className="pt-4 text-white/60">
                {language === "de" ? "Hochkrimml, Österreich" : "Hochkrimml, Austria"}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display uppercase mb-4 text-white">{t("legal")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/datenschutz" className="text-white/60 hover:text-primary transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-white/60 hover:text-primary transition-colors">
                  {t("imprint")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/conditions-of-raffle-participation"
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  {t("raffleConditions")}
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} The Mountaincamp. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
