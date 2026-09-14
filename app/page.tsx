import { HubHeader } from "@/app/components/hub/hub-header"
import { InteractiveMap } from "@/app/components/hub/interactive-map"
import { HubPhotoStrip } from "@/app/components/hub/hub-photo-strip"
import { HubFooter } from "@/app/components/hub/hub-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-mc-dust text-mc-black">
      <HubHeader />
      <main>
        <InteractiveMap />
        <div className="py-8 md:py-12">
          <HubPhotoStrip />
        </div>
      </main>
      <HubFooter />
    </div>
  )
}