import Link from "next/link"

export default function ImpressumPage() {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-primary">Impressum</h1>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              Jonas Westbrock e.U.
              <br />
              Im Schulgarten 28
              <br />
              49685 Hötinghausen
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Steuerliche Angaben</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              DE418715898
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Kontakt</h2>
            <p>E-Mail: themountaincampde@gmail.com</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Datenschutz</h2>
            <p>
              Informationen zum Datenschutz finden Sie in unserer{" "}
              <Link href="/datenschutz" className="text-primary hover:underline">
                Datenschutzerklärung
              </Link>
              .
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
