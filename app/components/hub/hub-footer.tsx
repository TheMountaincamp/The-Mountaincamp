import Link from "next/link"
import { MountaincampMTC } from "@/components/brand/mountaincamp-logo"
import { MountaincampClaim } from "@/components/brand/mountaincamp-claim"

export function HubFooter() {
  return (
    <footer className="border-t border-mc-white/10 py-12">
      <div className="container flex flex-col items-center gap-4 text-center">
        <MountaincampMTC className="h-[18px] w-auto text-mc-dust" />
        <MountaincampClaim className="h-[10px] w-auto text-mc-dust/70" />
        <p className="text-xs text-mc-dust/70">
          {"© 2027 Mountaincamp. Alle Rechte vorbehalten."}
          {" · "}
          <Link
            href="/impressum"
            className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange"
          >
            Impressum
          </Link>
          {" · "}
          <Link
            href="/datenschutz"
            className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange"
          >
            Datenschutz
          </Link>
        </p>
      </div>
    </footer>
  )
}
