import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AGBPage() {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors mr-4">
              <ArrowLeft className="h-5 w-5" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-primary">Allgemeine Geschäftsbedingungen</h1>

          <div className="prose prose-invert max-w-none">
            <div className="mb-6">
              <p className="font-bold">
                Mountaincamp Jonas Westbrock e.U.
                <br />
                Im Schulgarten 28
                <br />
                49685 Höltinghausen
              </p>
            </div>

            <p className="mb-6">
              Die nachfolgenden Bestimmungen regeln das Rechtsverhältnis innerhalb eines zustande kommenden
              Reisevertrages zwischen dem Kunden und Mountaincamp Jonas Westbrock e.U. (im Folgenden „Reiseveranstalter"
              oder „Mountaincamp" genannt), der als Reiseveranstalter tätig ist. Zusätzlich gilt das Reisevertragsrecht
              gemäß §§ 651a ff. BGB. Diese AGB gelten für alle von Mountaincamp durchgeführten Reisen und
              Veranstaltungen.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold mt-8 mb-4">§ 1 Vertragsschluss</h2>

              <h3 className="text-lg font-semibold mb-2">1.1</h3>
              <p className="mb-4">
                Der Kunde bietet dem Reiseveranstalter Mountaincamp verbindlich den Abschluss eines Reisevertrages auf
                Basis der ausgeschriebenen Angebote oder eines per E-Mail zugesendeten Angebots an, indem er die Buchung
                schriftlich oder online bestätigt. Alternativ kann der Vertrag durch schriftliche Anfrage per E-Mail und
                die Überweisung des Betrages zustande kommen. Zahlungen sind per Banküberweisung, Kreditkarte oder
                anderen angegebenen Zahlungsarten möglich.
              </p>

              <h3 className="text-lg font-semibold mb-2">1.2</h3>
              <p className="mb-4">
                Der Reisevertrag kommt mit der Annahme durch Mountaincamp zustande. Die Annahme erfolgt durch die
                Übermittlung einer Buchungsbestätigung. Die Annahmeerklärung bedarf keiner bestimmten Form.
              </p>

              <h3 className="text-lg font-semibold mb-2">1.3</h3>
              <p className="mb-4">
                Die Rechte und Pflichten der Parteien ergeben sich aus den individuellen Vereinbarungen, diesen
                Geschäftsbedingungen und den gesetzlichen Vorschriften.
              </p>

              <h3 className="text-lg font-semibold mb-2">1.4</h3>
              <p className="mb-4">
                Leistungen Dritter, die durch Mountaincamp vermittelt werden, unterliegen ausschließlich den Geschäfts-
                und Reisebedingungen der jeweiligen Leistungsträger. Mountaincamp wird den Kunden über diese Bedingungen
                informieren und den Zugang zu den entsprechenden Informationen ermöglichen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mt-8 mb-4">§ 2 Allgemeine Vertragspflichten des Reiseveranstalters</h2>

              <h3 className="text-lg font-semibold mb-2">2.1</h3>
              <p className="mb-4">
                Mountaincamp ist verantwortlich für die Organisation, Durchführung und den reibungslosen Ablauf der
                angebotenen Reisen.
              </p>

              <h3 className="text-lg font-semibold mb-2">2.2</h3>
              <p className="mb-4">
                Bei der Vermittlung externer Leistungen übernimmt Mountaincamp lediglich die Abwicklung der Buchung und
                übermittelt die notwendigen Unterlagen, soweit nicht anders vereinbart.
              </p>

              <h3 className="text-lg font-semibold mb-2">2.3</h3>
              <p className="mb-4">
                Der Reiseveranstalter kann von Kundenwünschen abweichen, wenn dies zur ordnungsgemäßen Durchführung der
                Reise erforderlich ist und die Abweichung dem Kunden zumutbar ist.
              </p>

              <h3 className="text-lg font-semibold mb-2">2.4</h3>
              <p className="mb-4">
                Mountaincamp haftet bei der Erteilung von Hinweisen und Auskünften nur für die richtige Weitergabe der
                Informationen, soweit diese nicht ausdrücklich als verbindlich gekennzeichnet wurden.
              </p>

              <h3 className="text-lg font-semibold mb-2">2.5</h3>
              <p className="mb-4">
                Der Kunde wird auf die Möglichkeit des Abschlusses einer Reiserücktrittsversicherung hingewiesen. Eine
                solche Versicherung ist nicht in den Reiseleistungen enthalten.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mt-8 mb-4">§ 3 Einreisevorschriften, Visa und Bescheinigungen</h2>

              <h3 className="text-lg font-semibold mb-2">3.1</h3>
              <p className="mb-4">
                Mountaincamp informiert Kunden auf Anfrage über Einreise-, Visa- und Gesundheitsbestimmungen.
              </p>

              <h3 className="text-lg font-semibold mb-2">3.2</h3>
              <p className="mb-4">
                Der Kunde ist selbst verantwortlich für die Beschaffung und Mitführung notwendiger Reisedokumente, es
                sei denn, Mountaincamp hat sich ausdrücklich zur Beschaffung verpflichtet.
              </p>

              <h3 className="text-lg font-semibold mb-2">3.3</h3>
              <p className="mb-4">
                Der Veranstalter haftet nicht für die rechtzeitige Ausstellung von Visa oder Dokumenten durch Dritte,
                außer bei eigenem Verschulden.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mt-8 mb-4">§ 4 Rücktritt, Stornierung und Ersatzpersonen</h2>

              <h3 className="text-lg font-semibold mb-2">4.1</h3>
              <p className="mb-4">
                Der Kunde kann jederzeit vor Reisebeginn vom Vertrag zurücktreten. Der Rücktritt ist schriftlich zu
                erklären. Die Rücktrittskosten betragen:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Bis 30 Tage vor Reisebeginn: 20 % des Reisepreises</li>
                <li>29 bis 22 Tage vor Reisebeginn: 30 % des Reisepreises</li>
                <li>21 bis 15 Tage vor Reisebeginn: 40 % des Reisepreises</li>
                <li>14 bis 7 Tage vor Reisebeginn: 60 % des Reisepreises</li>
                <li>Ab 6 Tage vor Reisebeginn: 80 % des Reisepreises</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">4.2</h3>
              <p className="mb-4">
                Es bleibt dem Kunden unbenommen, nachzuweisen, dass kein oder ein geringerer Schaden entstanden ist.
              </p>

              <h3 className="text-lg font-semibold mb-2">4.3</h3>
              <p className="mb-4">
                Der Kunde kann bis zum Reisebeginn verlangen, dass ein Dritter an seiner Stelle in den Vertrag eintritt.
                Mountaincamp kann dem Eintritt widersprechen, wenn der Dritte den besonderen Erfordernissen der Reise
                nicht entspricht.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mt-8 mb-4">§ 5 Preis- und Leistungsänderungen</h2>

              <h3 className="text-lg font-semibold mb-2">5.1</h3>
              <p className="mb-4">
                Geringfügige Änderungen von Reiseleistungen, die nach Vertragsschluss erforderlich werden, sind
                zulässig, sofern sie den Gesamtzuschnitt der Reise nicht beeinträchtigen.
              </p>

              <h3 className="text-lg font-semibold mb-2">5.2</h3>
              <p className="mb-4">
                Im Falle einer erheblichen Änderung hat der Kunde das Recht, unentgeltlich vom Vertrag zurückzutreten
                oder eine gleichwertige Ersatzleistung zu verlangen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mt-8 mb-4">§ 6 Haftung</h2>

              <h3 className="text-lg font-semibold mb-2">6.1</h3>
              <p className="mb-4">
                Mountaincamp haftet im Rahmen der gesetzlichen Vorschriften für die ordnungsgemäße Durchführung der
                angebotenen Leistungen.
              </p>

              <h3 className="text-lg font-semibold mb-2">6.2</h3>
              <p className="mb-4">
                Eine Haftung für vermittelte Leistungen Dritter ist ausgeschlossen, es sei denn, Mountaincamp hat die
                Auswahl dieser Dritten grob fahrlässig oder vorsätzlich falsch getroffen.
              </p>

              <h3 className="text-lg font-semibold mb-2">6.3</h3>
              <p className="mb-4">
                Eine Haftung des Reiseveranstalters für Schäden, die durch die Reisenden selbst, durch Dritte oder durch
                unvermeidbare, außergewöhnliche Umstände entstehen, ist ausgeschlossen, soweit solche Schäden nicht auf
                einer Verletzung von Leben, Körper oder Gesundheit beruhen, die auf einer vorsätzlichen oder
                fahrlässigen Pflichtverletzung des Reiseveranstalters, seiner gesetzlichen Vertreter oder
                Erfüllungsgehilfen beruhen.
              </p>

              <h3 className="text-lg font-semibold mb-2">6.4</h3>
              <p className="mb-4">
                Der Reiseveranstalter haftet nicht für Unfälle, Verletzungen oder Schäden, die während der Teilnahme an
                sportlichen Aktivitäten oder anderen Freizeitangeboten entstehen, es sei denn, diese wurden durch den
                Reiseveranstalter, seine gesetzlichen Vertreter oder Erfüllungsgehilfen vorsätzlich oder grob fahrlässig
                verursacht.
              </p>

              <h3 className="text-lg font-semibold mb-2">6.5</h3>
              <p className="mb-4">
                Die Reisenden sind verpflichtet, sich an die Sicherheitsanweisungen des Reiseveranstalters sowie der vor
                Ort tätigen Dienstleister zu halten. Der Abschluss einer Unfall- und Krankenversicherung wird dringend
                empfohlen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mt-8 mb-4">§ 7 Datenschutz</h2>
              <p className="mb-4">
                Mountaincamp behandelt personenbezogene Daten des Kunden vertraulich und verwendet diese ausschließlich
                zur Abwicklung des Vertragsverhältnisses. Weitere Informationen sind der Datenschutzerklärung zu
                entnehmen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mt-8 mb-4">§ 8 Schlussbestimmungen</h2>

              <h3 className="text-lg font-semibold mb-2">8.1</h3>
              <p className="mb-4">Es gilt deutsches Recht.</p>

              <h3 className="text-lg font-semibold mb-2">8.2</h3>
              <p className="mb-4">
                Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis ist der Sitz des Veranstalters, sofern
                der Kunde Kaufmann oder eine juristische Person des öffentlichen Rechts ist.
              </p>

              <h3 className="text-lg font-semibold mb-2">8.3</h3>
              <p className="mb-4">
                Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen
                unberührt.
              </p>
            </section>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
            <Link
              href="/"
              className="text-primary hover:text-primary-light hover:underline transition-colors mb-4 md:mb-0"
            >
              Zurück zur Startseite
            </Link>
            <div className="flex gap-4">
              <Link href="/datenschutz" className="text-white/60 hover:text-primary transition-colors">
                Datenschutzerklärung
              </Link>
              <Link href="/impressum" className="text-white/60 hover:text-primary transition-colors">
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
