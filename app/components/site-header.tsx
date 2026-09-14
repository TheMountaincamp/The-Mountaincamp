"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/app/components/language-switcher"
import { Button } from "@/components/ui/button"
import { MountaincampLogo } from "@/components/brand/mountaincamp-logo"

interface SiteHeaderProps {
  transparent?: boolean
}

export default function SiteHeader({ transparent = true }: SiteHeaderProps) {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navItems = [
    { key: "about", href: "/#about", label: t("about") },
    { key: "experience", href: "/#experience", label: t("experience") },
    { key: "house", href: "/house", label: t("house") },
    { key: "trails", href: "/trails", label: t("trails") },
    { key: "testimonials", href: "/#testimonials", label: t("testimonials") },
    { key: "busTransport", href: "/bus-departures", label: t("busTransport") },
  ]

  return (
    <>
      <header
        className={`absolute top-0 z-50 w-full ${transparent ? "bg-transparent" : "bg-mc-black/80 backdrop-blur-sm"}`}
      >
        <div className="container flex h-20 items-center justify-between">
          {/* Logo + back link */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden text-sm font-medium uppercase tracking-wide text-mc-dust hover:text-mc-orange transition-colors md:inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-4"
            >
              ← Mountaincamp
            </Link>
            <Link href="/" className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-4">
              <MountaincampLogo className="h-8 w-auto md:h-10 text-white" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium uppercase hover:text-primary transition-colors text-white"
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              className="bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white border border-white/20 transition-colors text-xs px-2 py-1 h-auto md:text-sm md:px-4 md:py-2 md:h-10"
              asChild
            >
              <a
                href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=2467&termin_id=36011&locale=de#/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("registerNow")}
              </a>
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center w-12 h-12"
              onClick={handleMenuToggle}
              aria-label="Open menu"
              type="button"
            >
              <Menu className="h-7 w-7 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
          >
            <div className="container flex justify-between items-center h-20">
              <MountaincampLogo className="h-8 w-auto text-white" />
              <motion.button
                onClick={handleMenuToggle}
                aria-label="Close menu"
                className="w-12 h-12 flex items-center justify-center"
                type="button"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <X className="h-7 w-7 text-white" />
              </motion.button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-12 py-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="text-2xl font-bold text-white hover:text-primary transition-colors py-4 px-8"
                    onClick={handleMenuToggle}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <LanguageSwitcher />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
