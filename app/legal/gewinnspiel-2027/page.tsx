import type { Metadata } from "next"

// Bewusst NICHT in der Navigation, im Footer oder in der Sitemap verlinkt —
// diese Seite wird ausschließlich über den direkten Link geteilt (z. B. in
// der Instagram-Bio für das Gewinnspiel). Daher auch `robots: noindex`.
export const metadata: Metadata = {
  title: "Teilnahmebedingungen Gewinnspiel | The Mountaincamp",
  description: "Teilnahmebedingungen zum Instagram-Gewinnspiel „Win a ticket to The Mountaincamp 2027“.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function GiveawayTermsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <article className="space-y-12">
          <section lang="de" className="space-y-6">
            <h1 className="text-balance text-xl font-semibold leading-snug">
              Teilnahmebedingungen zum Instagram-Gewinnspiel „Win a ticket to The Mountaincamp 2027“
            </h1>

            <div className="space-y-5 text-[15px] leading-relaxed text-neutral-800">
              <section>
                <h2 className="font-semibold">1. Veranstalter</h2>
                <p>
                  Veranstalter ist Jonas Westbrock, The Mountaincamp, Im Schulgarten 28, 49685 Höltinghausen,
                  Deutschland. Kontakt: themountaincampde@gmail.com.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">2. Teilnahmezeitraum</h2>
                <p>
                  Das Gewinnspiel läuft vom 1. Oktober 2026 bis zum 31. Oktober 2026, 23:59 Uhr (MEZ). Später
                  eingehende Teilnahmen werden nicht berücksichtigt.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">3. Teilnahmeberechtigung</h2>
                <p>
                  Teilnahmeberechtigt sind natürliche Personen ab 18 Jahren mit einem Instagram-Konto. Ausgeschlossen
                  sind Personen, die an der Organisation des Gewinnspiels beteiligt sind, sowie deren Angehörige.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">4. Teilnahme</h2>
                <p>
                  Die Teilnahme erfolgt durch das Folgen des Kontos @the_mountaincamp und einen Kommentar unter dem
                  Gewinnspielbeitrag, in dem eine andere Person markiert wird. Pro Person wird ein Los vergeben,
                  unabhängig davon, wie viele Kommentare abgegeben werden. Die Teilnahme ist kostenlos und unabhängig
                  vom Kauf eines Tickets.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">5. Gewinn</h2>
                <p>
                  Gewonnen wird ein Ticket für The Mountaincamp Community 2027 vom 18. bis 22. August 2027 in
                  Hochkrimml, Österreich. Enthalten sind die im Ticket beschriebenen Leistungen. Nicht enthalten sind
                  An- und Abreise, Versicherungen und zusätzlich buchbare Aktivitäten.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">6. Gewinnermittlung und Benachrichtigung</h2>
                <p>
                  Nach Ablauf des Teilnahmezeitraums wird unter allen gültigen Losen per Zufallsauswahl gezogen. Die
                  gewinnende Person wird per Instagram-Direktnachricht benachrichtigt und hat sieben Tage Zeit zu
                  antworten. Erfolgt innerhalb dieser Frist keine Rückmeldung, verfällt der Anspruch und es wird neu
                  gezogen.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">7. Übertragung und Barauszahlung</h2>
                <p>
                  Der Gewinn ist nicht übertragbar und wird nicht in bar ausgezahlt. Eine Umbuchung auf eine andere
                  Edition oder einen anderen Termin ist nicht möglich.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">8. Datenschutz</h2>
                <p>
                  Für die Durchführung verarbeitet der Veranstalter ausschließlich die auf Instagram öffentlich
                  sichtbaren Angaben, also Nutzername und Kommentar. Von der gewinnenden Person werden zusätzlich
                  Name und E-Mail-Adresse erhoben, soweit das für die Ausstellung des Tickets erforderlich ist. Die
                  Daten werden nicht an Dritte weitergegeben und nach Abschluss des Gewinnspiels gelöscht, soweit
                  keine gesetzlichen Aufbewahrungspflichten bestehen.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">9. Keine Verbindung zu Instagram</h2>
                <p>
                  Das Gewinnspiel steht in keiner Verbindung zu Instagram und wird in keiner Weise von Instagram
                  gesponsert, unterstützt oder organisiert. Alle Angaben und Anfragen richten sich ausschließlich an
                  den Veranstalter. Mit der Teilnahme stellen die Teilnehmenden Instagram von jeglicher Haftung im
                  Zusammenhang mit dem Gewinnspiel frei.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">10. Ausschluss von der Teilnahme</h2>
                <p>
                  Der Veranstalter kann Teilnahmen ausschließen, die gegen diese Bedingungen verstoßen, insbesondere
                  bei Mehrfachkonten, automatisierten Teilnahmen oder dem Markieren von Konten, die erkennbar keine
                  realen Personen sind.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">11. Änderung und Beendigung</h2>
                <p>
                  Der Veranstalter kann das Gewinnspiel aus wichtigem Grund ändern oder vorzeitig beenden, insbesondere
                  wenn eine ordnungsgemäße Durchführung nicht gewährleistet werden kann.
                </p>
              </section>

              <section>
                <h2 className="font-semibold">12. Anwendbares Recht</h2>
                <p>Es gilt deutsches Recht.</p>
              </section>
            </div>
          </section>

          <hr className="border-neutral-200" />

          <section lang="en" className="space-y-6">
            <h2 className="text-balance text-xl font-semibold leading-snug">
              Terms and conditions for the Instagram giveaway &ldquo;Win a ticket to The Mountaincamp 2027&rdquo;
            </h2>

            <div className="space-y-5 text-[15px] leading-relaxed text-neutral-800">
              <section>
                <h3 className="font-semibold">1. Organiser</h3>
                <p>
                  The giveaway is run by Jonas Westbrock, The Mountaincamp, Im Schulgarten 28, 49685 Höltinghausen,
                  Germany. Contact: themountaincampde@gmail.com.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">2. Entry period</h3>
                <p>
                  The giveaway runs from 1 October 2026 until 31 October 2026, 11:59 pm CET. Entries received after
                  that time are not considered.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">3. Who can enter</h3>
                <p>
                  Entry is open to individuals aged 18 and over with an Instagram account. Anyone involved in
                  organising the giveaway, and their immediate family, is excluded.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">4. How to enter</h3>
                <p>
                  Follow @the_mountaincamp and leave a comment on the giveaway post tagging another person. Each
                  person receives one entry, regardless of how many comments they leave. Entry is free and does not
                  require buying a ticket.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">5. The prize</h3>
                <p>
                  The prize is one ticket to The Mountaincamp Community 2027, 18 to 22 August 2027 in Hochkrimml,
                  Austria. It covers what the ticket itself includes. Travel to and from the camp, insurance and
                  separately bookable activities are not included.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">6. Draw and notification</h3>
                <p>
                  After the entry period closes, the winner is drawn at random from all valid entries. The winner is
                  notified by Instagram direct message and has seven days to reply. If there is no reply within that
                  period, the claim expires and a new winner is drawn.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">7. Transfer and cash alternative</h3>
                <p>
                  The prize is not transferable and will not be paid out in cash. It cannot be moved to a different
                  edition or a different date.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">8. Data protection</h3>
                <p>
                  To run the giveaway, the organiser processes only what is publicly visible on Instagram, meaning
                  username and comment. For the winner, name and email address are also collected, as far as this is
                  needed to issue the ticket. Data is not passed on to third parties and is deleted once the giveaway
                  is complete, unless legal retention obligations apply.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">9. No connection to Instagram</h3>
                <p>
                  This promotion is in no way sponsored, endorsed or administered by, or associated with, Instagram.
                  All information and questions go to the organiser, not to Instagram. By entering, participants
                  release Instagram from any liability in connection with this promotion.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">10. Exclusion from the draw</h3>
                <p>
                  The organiser may exclude entries that breach these terms, in particular multiple accounts,
                  automated entries, or tagging accounts that are clearly not real people.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">11. Changes and early closure</h3>
                <p>
                  The organiser may change or end the giveaway early for good cause, in particular if it cannot be
                  run properly.
                </p>
              </section>

              <section>
                <h3 className="font-semibold">12. Governing law</h3>
                <p>German law applies.</p>
              </section>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
