"use client"

import NextLink from "next/link"
import type { ComponentProps } from "react"
import { useLanguage } from "@/contexts/language-context"
import { localePath } from "@/app/lib/locale"

/** Wie next/link, hängt aber im Englischen /en vor interne Links, wenn es die Seite dort gibt. */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { language } = useLanguage()
  return <NextLink href={typeof href === "string" ? localePath(href, language) : href} {...props} />
}
