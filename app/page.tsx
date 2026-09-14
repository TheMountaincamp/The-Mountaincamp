import { HubHeader } from "@/app/components/hub/hub-header"
import { HubHero } from "@/app/components/hub/hub-hero"
import { HubFormatCards } from "@/app/components/hub/hub-format-cards"
import { HubValueStrip } from "@/app/components/hub/hub-value-strip"
import { HubFooter } from "@/app/components/hub/hub-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-mc-black text-mc-white">
      <HubHeader />
      <main>
        <HubHero />
        <HubFormatCards />
        <HubValueStrip />
      </main>
      <HubFooter />
    </div>
  )
}
