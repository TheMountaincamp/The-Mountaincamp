import { HubHeader } from "@/app/components/hub/hub-header"
import { InteractiveMap } from "@/app/components/hub/interactive-map"
import { HubFooter } from "@/app/components/hub/hub-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-mc-dust text-mc-black">
      <HubHeader />
      <main>
        <InteractiveMap />
      </main>
      <HubFooter />
    </div>
  )
}