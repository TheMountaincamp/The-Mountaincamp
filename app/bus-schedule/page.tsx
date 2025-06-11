import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Bus, Clock, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Bus Schedule | The Mountaincamp",
  description: "Bus schedule information for The Mountaincamp 2025. Find departure times from Munich and Jenbach.",
}

export default function BusSchedulePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary-light transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <h1 className="text-4xl md:text-5xl font-display uppercase mb-8 text-gradient">Bus Schedule</h1>

            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-display uppercase mb-6 text-white">Outbound Journey</h2>
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-primary mr-2" />
                        <h3 className="text-xl font-medium text-white">Munich (ZOB)</h3>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Clock className="h-4 w-4 mr-2" />
                        <p>Wednesday, 6.08.2025 at 1:00 PM</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-accent mr-2" />
                        <h3 className="text-xl font-medium text-white">Jenbach</h3>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Clock className="h-4 w-4 mr-2" />
                        <p>Wednesday, 6.08.2025 at 3:00 PM</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-secondary pl-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-secondary mr-2" />
                        <h3 className="text-xl font-medium text-white">Hochkrimml (Arrival)</h3>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Clock className="h-4 w-4 mr-2" />
                        <p>Wednesday, 6.08.2025 (Estimated arrival time)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-display uppercase mb-6 text-white">Return Journey</h2>
                  <div className="space-y-6">
                    <div className="border-l-4 border-secondary pl-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-secondary mr-2" />
                        <h3 className="text-xl font-medium text-white">Hochkrimml (Departure)</h3>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Clock className="h-4 w-4 mr-2" />
                        <p>Sunday, 10.08.2025 at 9:00 AM</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-accent mr-2" />
                        <h3 className="text-xl font-medium text-white">Jenbach (Arrival)</h3>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Clock className="h-4 w-4 mr-2" />
                        <p>Sunday, 10.08.2025 around 11:00 AM</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-primary mr-2" />
                        <h3 className="text-xl font-medium text-white">Munich (ZOB) (Arrival)</h3>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Clock className="h-4 w-4 mr-2" />
                        <p>Sunday, 10.08.2025 around 12:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex items-start">
                  <Bus className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Important Information</h3>
                    <ul className="list-disc pl-5 space-y-2 text-white/70">
                      <li>Please arrive at least 15 minutes before the scheduled departure time.</li>
                      <li>
                        The bus is equipped with air conditioning, comfortable seats, and storage space for luggage.
                      </li>
                      <li>Travel time may vary depending on traffic conditions.</li>
                      <li>Don't forget to bring your booking confirmation.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/#register"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary hover:bg-primary-light text-white font-medium transition-colors"
              >
                Book Your Spot Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
