/** Seiten, die es zusätzlich unter /en gibt. Tickets und Rechtstexte haben nur eine URL. */
export const EN_PATHS = ["/", "/trails", "/house", "/bus-departures"]

export function isEnPath(pathname: string | null | undefined) {
  return !!pathname && (pathname === "/en" || pathname.startsWith("/en/"))
}

/** "/en/trails" -> "/trails", "/en" -> "/" */
export function stripEn(pathname: string) {
  if (!isEnPath(pathname)) return pathname
  return pathname.slice(3) || "/"
}

/** Interner Link passend zur Sprache: im Englischen /en davor, wenn es die Seite dort gibt. */
export function localePath(href: string, language: "de" | "en") {
  if (language !== "en" || !href.startsWith("/")) return href
  const [path, hash = ""] = href.split("#")
  const clean = path.replace(/\/$/, "") || "/"
  if (!EN_PATHS.includes(clean)) return href
  const target = clean === "/" ? "/en" : `/en${clean}`
  return hash ? `${target}#${hash}` : target
}
