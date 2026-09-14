import Link from "next/link"
import { MountaincampLogo } from "@/components/brand/mountaincamp-logo"
import { NotifySignupForm } from "@/app/components/notify-signup-form"
import { HubFooter } from "@/app/components/hub/hub-footer"

export const metadata = {
  title: "Adventure | Mountaincamp",
  description: "Adventure ist der einfache Einstieg: kleine Gruppen, viel Anleitung, kein Druck. Details folgen 2027.",
}

export default function AdventurePage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-mc-black text-mc-white"
      style={{ backgroundImage: "linear-gradient(to bottom, var(--mc-black), var(--mc-moss))" }}
    >
      <header className="container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-4"
        >
          <MountaincampLogo className="h-8 w-auto text-mc-white" />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium uppercase tracking-wide text-mc-dust hover:text-mc-sage transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-mc-orange focus-visible:outline-offset-4"
        >
          ← Mountaincamp
        </Link>
      </header>

      <main className="container flex flex-1 flex-col justify-center gap-6 py-16">
        <p className="font-oswald text-sm font-medium uppercase tracking-[0.2em] text-mc-sage">Coming Soon</p>
        <h1 className="font-oswald max-w-3xl text-balance text-[clamp(2.25rem,6vw,4rem)] font-semibold uppercase leading-[1.15] pt-1">
          Dein erster Schritt auf den Trail.
        </h1>
        <p className="max-w-[620px] text-lg leading-relaxed text-mc-dust">
          Adventure ist der einfache Einstieg: kleine Gruppen, viel Anleitung, kein Druck. Details folgen 2027.
        </p>
        <div className="mt-4">
          <NotifySignupForm format="adventure" accentClassName="focus-visible:outline-mc-sage" />
        </div>
      </main>

      <HubFooter />
    </div>
  )
}
