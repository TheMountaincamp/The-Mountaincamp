import Link from "next/link"

export default function DatenschutzPage() {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-primary">Datenschutzerklärung</h1>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Begriffsbestimmungen</h2>
            <p>
              Die Datenschutzerklärung beruht auf den Begrifflichkeiten, die durch den Europäischen Richtlinien- und
              Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere
              Datenschutzerklärung soll sowohl für die Öffentlichkeit als auch für unsere Kunden und Geschäftspartner
              einfach lesbar und verständlich sein. Um dies zu gewährleisten, möchten wir vorab die verwendeten
              Begrifflichkeiten erläutern.
            </p>
            <p>Wir verwenden in dieser Datenschutzerklärung unter anderem die folgenden Begriffe:</p>

            <p>
              <strong>o personenbezogene Daten</strong>
            </p>
            <p>
              Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare
              natürliche Person (im Folgenden „betroffene Person") beziehen. Als identifizierbar wird eine natürliche
              Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem
              Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren
              besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen,
              wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind, identifiziert werden
              kann.
            </p>

            <p>
              <strong>o betroffene Person</strong>
            </p>
            <p>
              Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene
              Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden.
            </p>

            <p>
              <strong>o Verarbeitung</strong>
            </p>
            <p>
              Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche
              Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation,
              das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung,
              die Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich
              oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.
            </p>

            <p>
              <strong>o Einschränkung der Verarbeitung</strong>
            </p>
            <p>
              Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre
              künftige Verarbeitung einzuschränken.
            </p>

            <p>
              <strong>o Profiling</strong>
            </p>
            <p>
              Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass
              diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine
              natürliche Person beziehen, zu bewerten, insbesondere, um Aspekte bezüglich Arbeitsleistung,
              wirtschaftlicher Lage, Gesundheit, persönlicher Vorlieben, Interessen, Zuverlässigkeit, Verhalten,
              Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.
            </p>

            <p>
              <strong>o Pseudonymisierung</strong>
            </p>
            <p>
              Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die
              personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen
              betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt
              werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die
              personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen
              werden.
            </p>

            <p>
              <strong>o Verantwortlicher oder für die Verarbeitung Verantwortlicher</strong>
            </p>
            <p>
              Verantwortlicher oder für die Verarbeitung Verantwortlicher ist die natürliche oder juristische Person,
              Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel
              der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung
              durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche
              beziehungsweise können die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der
              Mitgliedstaaten vorgesehen werden.
            </p>

            <p>
              <strong>o Auftragsverarbeiter</strong>
            </p>
            <p>
              Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle,
              die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.
            </p>

            <p>
              <strong>o Empfänger</strong>
            </p>
            <p>
              Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, der
              personenbezogene Daten offengelegt werden, unabhängig davon, ob es sich bei ihr um einen Dritten handelt
              oder nicht. Behörden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem
              Recht der Mitgliedstaaten möglicherweise personenbezogene Daten erhalten, gelten jedoch nicht als
              Empfänger.
            </p>

            <p>
              <strong>o Dritter</strong>
            </p>
            <p>
              Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle außer der
              betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der
              unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die
              personenbezogenen Daten zu verarbeiten.
            </p>

            <p>
              <strong>o Einwilligung</strong>
            </p>
            <p>
              Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten Fall in informierter Weise
              und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung oder einer sonstigen
              eindeutigen bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der
              Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. Verantwortlichkeit</h2>
            <p>
              Der Verantwortliche im Sinne der EU-Datenschutzgrundverordnung (im Folgenden: DSGVO) und anderer
              nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen
              ist:
            </p>
            <p>
              Jonas Westbrock
              <br />
              Im Schulgarten 28
              <br />
              49685 Höltinghausen
              <br />
              <br />
              themountaincampde@gmail.com
            </p>
            <p>Bei allen Fragen zum Thema Datenschutz können Sie uns unter themountaincampde@gmail.com erreichen.</p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. Grundsätze der Datenverarbeitung</h2>
            <p>
              Wir fragen Sie nach bestimmten personenbezogenen Daten, um Ihnen die Produkte oder Dienstleistungen
              bereitzustellen, die Sie erhalten möchten. Personenbezogene Daten sind alle Informationen, die sich auf
              eine identifizierte oder identifizierbare natürliche Person beziehen. Hierzu gehören beispielsweise
              Informationen wie Ihr Name, Ihr Alter, Ihre Anschrift, Ihre Telefonnummer, Ihr Geburtsdatum, Ihre
              E-Mail-Adresse, Ihre IP-Adresse oder das Nutzerverhalten. Informationen, bei denen wir keinen (oder nur
              mit einem unverhältnismäßigen Aufwand einen) Bezug zu Ihrer Person herstellen können, z.B. durch
              Anonymisierung der Informationen, sind keine personenbezogenen Daten. Die Verarbeitung von
              personenbezogenen Daten (bspw. das Erheben, das Abfragen, die Verwendung, die Speicherung oder die
              Übermittlung) bedarf immer einer gesetzlichen Grundlage oder Ihrer Einwilligung. Verarbeitete
              personenbezogene Daten werden gelöscht, sobald der Zweck der Verarbeitung erreicht wurde und keine
              gesetzlich vorgeschriebenen Aufbewahrungspflichten mehr zu wahren sind.
            </p>
            <p>
              Sofern wir für die Bereitstellung bestimmter Services Ihre personenbezogenen Daten verarbeiten,
              informieren wir Sie nachfolgend über die konkreten Vorgänge, den Umfang und den Zweck der
              Datenverarbeitung, die Rechtsgrundlage für die Verarbeitung und die jeweilige Speicherdauer.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">4. Speicherort der personenbezogenen Daten</h2>
            <p>
              Unsere Website www.themountaincamp.de liegt auf einem Server, der von Ionos betrieben wird. Mit großem
              Aufwand wurde ein ausgefeiltes Sicherheits- und Redundanzkonzept umgesetzt, das die Höchstverfügbarkeit
              Ihrer Daten garantiert.
            </p>
            <p>
              Die EU-weit erlassene Datenschutzrichtlinie setzt Mindeststandards für einen angemessenen Datenschutz, die
              von nationalen Gesetzen sicherzustellen sind. Dies gilt gleichermaßen für Deutschland und für Frankreich.
              Die Nutzung des Servers in Frankreich bedeutet für unsere Kunden faktisch kein verändertes Qualitäts- oder
              Sicherheitsniveau als eine Nutzung am Standort Deutschland.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">5. Einzelne Verarbeitungsvorgänge</h2>

            <p>
              <strong>o Besuch unserer Website www.themountaincamp.de</strong>
            </p>
            <p>
              Die Internetseite von the mountaincamp erfasst mit jedem Aufruf der Internetseite durch eine betroffene
              Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese
              allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden können
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>die verwendeten Browsertypen und Versionen</li>
              <li>das vom zugreifenden System verwendete Betriebssystem</li>
              <li>
                die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte
                Referrer)
              </li>
              <li>
                die Unterwebseiten, welche über ein zugreifendes System auf unserer Internetseite angesteuert werden
              </li>
              <li>das Datum und die Uhrzeit eines Zugriffs auf die Internetseite</li>
              <li>eine Internet-Protokoll-Adresse (IP-Adresse)</li>
              <li>der Internet-Service-Provider des zugreifenden Systems und</li>
              <li>
                sonstige ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere
                informationstechnologischen Systeme dienen.
              </li>
            </ul>

            <p>
              Bei der Nutzung dieser allgemeinen Daten und Informationen zieht der Verantwortliche keine Rückschlüsse
              auf die betroffene Person. Diese Informationen werden vielmehr benötigt, um
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>die Inhalte unserer Internetseite korrekt auszuliefern</li>
              <li>die Inhalte unserer Internetseite sowie die Werbung für diese zu optimieren</li>
              <li>
                die dauerhafte Funktionsfähigkeit unserer informationstechnologischen Systeme und der Technik unserer
                Internetseite zu gewährleisten sowie
              </li>
              <li>
                um Strafverfolgungsbehörden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen
                Informationen bereitzustellen.
              </li>
            </ul>

            <p>
              Diese anonym erhobenen Daten und Informationen werden durch den Verantwortlichen daher einerseits
              statistisch und ferner mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem
              Unternehmen zu erhöhen, um letztlich ein optimales Schutzniveau für die von uns verarbeiteten
              personenbezogenen Daten sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen
              durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert.
            </p>

            {/* Continuing with the rest of the privacy policy sections */}
            <p>
              <strong>o Registrierung/Anlegen eines Nutzerkontos</strong>
            </p>
            <p>
              Sie können sich auf unserer Website mit Vorname, Nachname und Emailadresse registrieren und ein Konto
              anlegen. Ihre Registrierung ist dabei zur Erfüllung eines Vertrags mit uns bzw. zur Durchführung
              vorvertraglicher Maßnahmen erforderlich um Ihnen dauerhaften Zugriff auf die vereinbarten Leistungen zu
              gewähren.
            </p>
            <p>
              Mit den verarbeiteten Daten erstellen wir für Sie ein individualisiertes Nutzerkonto, mit dem Sie
              bestimmte Inhalte und Leistungen wie Buchung eines Probetrainings (als Interessent) oder Buchung von
              Kursen (als Mitglied) auf unserer Webseite nutzen können.
            </p>

            <p>
              <strong>o Newsletter</strong>
            </p>
            <p>Ihre Emailadresse verarbeiten wir, damit wir Ihnen Newsletter zusenden können.</p>
            <p>
              Die Verarbeitung der dargelegten personenbezogenen Daten dient nach Art. 6 Abs. 1 lit. b DSGVO der
              Erfüllung eines Vertrags zwischen Ihnen und dem Verantwortlichen oder der Durchführung vorvertraglicher
              Maßnahmen.
            </p>
            <p>
              Ihre personenbezogenen Daten werden so lange gespeichert, wie es für die Erfüllung der in dieser
              Datenschutzrichtlinie genannten Zwecke erforderlich ist (es sei denn, eine längere Speicherfrist ist
              gesetzlich vorgeschrieben). Im Allgemeinen bedeutet dies, dass wir Ihre personenbezogenen Daten so lange
              speichern, wie Sie Ihr Nutzerkonto führen. Auch nach Beendigung des Vertrags kann es erforderlich sein,
              personenbezogene Daten von Ihnen zu speichern, um vertraglichen oder gesetzlichen Verpflichtungen
              nachzukommen.
            </p>
            <p>
              Als Nutzer haben Sie jederzeit die Möglichkeit, die Registrierung aufzulösen. Die über Sie gespeicherten
              Daten können Sie jederzeit abändern lassen. Dazu verwenden Sie bitte den Link in den Mails oder
              kontaktieren uns unter themountaincampde@gmail.com
            </p>
            <p>
              Falls die verarbeiteten Daten jedoch zur Erfüllung eines Vertrages oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich sind, ist eine vorzeitige Löschung der Daten nur möglich, soweit dem nicht
              vertragliche oder gesetzliche Verpflichtungen entgegenstehen.
            </p>

            {/* Additional sections would continue here */}

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">6. Weitergabe an Dritte</h2>
            <p>Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Sie hierzu Ihre ausdrückliche Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO erteilt haben.</li>
              <li>
                dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO zur Erfüllung eines
                Vertragsverhältnisses mit Ihnen erforderlich ist
              </li>
              <li>nach Art. 6 Abs. 1 S. 1 lit. c DSGVO für die Weitergabe eine gesetzliche Verpflichtung besteht</li>
              <li>
                die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Wahrung berechtigter Unternehmensinteressen,
                sowie zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein
                Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe
                Ihrer Daten haben.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">7. Betroffenenrechte</h2>
            <p>
              Dem Betroffenen steht ein Recht auf Auskunft (Art. 15 DS-GVO) sowie ein Recht auf Berichtigung (Art. 16
              DS-GVO) oder Löschung (Art. 17 DS-GVO) oder auf Einschränkung der Verarbeitung (Art. 18 DS-GVO) oder ein
              Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DS-GVO) sowie ein Recht auf Datenübertragbarkeit
              (Art. 20 DS-GVO) zu.
            </p>
            <p>
              Der Betroffene hat das Recht, seine datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen.
            </p>
            <p>
              Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf
              erfolgten Verarbeitung nicht berührt.
            </p>
            <p>Dem Betroffenen steht ferner ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.</p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">8. Widerspruchsrecht</h2>
            <p>
              Bei der Verarbeitung Ihrer personenbezogenen Daten auf Grundlage berechtigter Interessen gemäß Art. 6 Abs.
              1 S. 1 lit. f DSGVO, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung Ihrer
              personenbezogenen Daten einzulegen, soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation
              ergeben oder sich der Widerspruch gegen Direktwerbung richtet. Im Fall der Direktwerbung besteht für Sie
              ein generelles Widerspruchsrecht, das von uns ohne Angabe einer besonderen Situation umgesetzt wird.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">9. Datensicherheit und Sicherungsmaßnahmen</h2>
            <p>
              Wir verpflichten uns, Ihre Privatsphäre zu schützen und Ihre personenbezogenen Daten vertraulich zu
              behandeln. Um eine Manipulation, einen Verlust oder einen Missbrauch Ihrer bei uns gespeicherten Daten zu
              vermeiden, treffen wir umfangreiche technische und organisatorische Sicherheitsvorkehrungen, die
              regelmäßig überprüft und dem technologischen Fortschritt angepasst werden. Hierzu gehört unter anderem die
              Verwendung anerkannter Verschlüsselungsverfahren (SSL). Wir weisen Sie jedoch darauf hin, dass es aufgrund
              der Struktur des Internets möglich ist, dass die Regeln des Datenschutzes und die o. g.
              Sicherungsmaßnahmen von anderen, nicht innerhalb unseres Verantwortungsbereichs liegenden Personen oder
              Institutionen nicht beachtet werden. Insbesondere können unverschlüsselt preisgegebene Daten – z. B. wenn
              dies per E-Mail erfolgt – von Dritten mitgelesen werden. Wir haben technisch hierauf keinen Einfluss. Es
              liegt im Verantwortungsbereich des Nutzers, die von ihm zur Verfügung gestellten Daten durch
              Verschlüsselung oder in sonstiger Weise gegen Missbrauch zu schützen.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-white">
              10. Bestehen einer automatisierten Entscheidungsfindung
            </h2>
            <p>
              Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein
              Profiling.
            </p>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-primary hover:text-primary-light hover:underline transition-colors">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
