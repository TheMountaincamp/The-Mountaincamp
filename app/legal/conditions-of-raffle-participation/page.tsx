import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RaffleConditionsPage() {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors mr-4">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-primary">
            Terms and Conditions – Midnight Runners x The Mountaincamp 2025 Giveaway
          </h1>

          <div className="prose prose-invert max-w-none">
            <section className="mb-6">
              <h2 className="text-xl font-bold mt-8 mb-4">1. Organizer</h2>
              <p>
                This giveaway is organized by the respective Midnight Runners cities in Europe in collaboration with The
                Mountaincamp (@the_mountaincamp).
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mt-8 mb-4">2. Giveaway Period</h2>
              <p>The giveaway starts on Monday, May 5, 2025, and ends on Monday, May 19, 2025, at 11:59 PM (CET).</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mt-8 mb-4">3. How to Enter</h2>
              <p>To participate in the giveaway, you must:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Follow the Instagram account of the respective Midnight Runners city.</li>
                <li>Follow the Instagram account @the_mountaincamp.</li>
                <li>Tag at least two people in the comments under the giveaway post.</li>
              </ul>
              <p>
                Participants must be at least 18 years old and residents of Europe. Employees of Midnight Runners or
                Mountaincamp and their immediate family members are not eligible to participate.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mt-8 mb-4">4. Prize</h2>
              <p>
                Each winner will receive one ticket to The Mountaincamp 2025, valued at €380. The ticket covers only the
                camp participation fee; travel, accommodation, and other costs are not included.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mt-8 mb-4">5. Winner Selection and Notification</h2>
              <p>
                Winners will be randomly selected after the giveaway period and contacted via direct message on
                Instagram. Winners must respond within 72 hours to confirm their prize. If no response is received
                within this period, a new winner will be selected.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mt-8 mb-4">6. Disclaimer</h2>
              <p>
                This giveaway is not affiliated with, sponsored by, or endorsed by Instagram. Legal recourse is
                excluded. Prizes are non-exchangeable, non-transferable, and no cash alternative is offered.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mt-8 mb-4">7. Data Privacy</h2>
              <p>
                Only the necessary data (Instagram username) will be processed for the purpose of conducting the
                giveaway. Further information regarding data privacy can be provided upon request.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mt-8 mb-4">8. Other</h2>
              <p>
                The organizer reserves the right to amend, suspend, or terminate the giveaway at any time due to
                unforeseen circumstances.
              </p>
            </section>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
            <Link
              href="/"
              className="text-primary hover:text-primary-light hover:underline transition-colors mb-4 md:mb-0"
            >
              Back to Home
            </Link>
            <div className="flex gap-4">
              <Link href="/datenschutz" className="text-white/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/impressum" className="text-white/60 hover:text-primary transition-colors">
                Imprint
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
