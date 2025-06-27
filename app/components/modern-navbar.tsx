"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function ModernNavbar({ transparent = true }: { transparent?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(!transparent)

  useEffect(() => {
    if (!transparent) return

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [transparent])

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navLinks = [
    { key: "about", href: "#about", label: "Über uns" },
    { key: "experience", href: "#experience", label: "Erlebnis" },
    { key: "house", href: "/house", label: "Berghaus" },
    { key: "trails", href: "/trails", label: "Trails" },
    { key: "testimonials", href: "#testimonials", label: "Bewertungen" },
    { key: "register", href: "#register", label: "Anmeldung" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled ? "bg-black/80 backdrop-blur-md border-b border-primary/20 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <div className="relative h-10 w-40 md:h-12 md:w-48">
            <Image
              src="/images/MTC-Logo_2025_weiß.png"
              alt="The Mountaincamp"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="nav-link text-base font-medium text-white hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://my.camps.digital/masken/buchungen/vuejs?&vendor=mountaincamp&destination_id=1475&termin_id=35113#/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-dark text-white rounded-full font-medium px-6 py-2 transition-colors"
          >
            Jetzt anmelden
          </a>

          <button
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center"
            onClick={handleMenuToggle}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-0 z-40 bg-black flex flex-col pt-24"
          >
            <div className="container mx-auto px-4 flex flex-col h-full">
              <nav className="flex flex-col space-y-6 py-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-2xl font-display text-white hover:text-primary transition-colors"
                      onClick={handleMenuToggle}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
