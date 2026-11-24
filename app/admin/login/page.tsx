const ERRORS: Record<string, string> = {
  wrong: "Passwort falsch.",
  missing: "ADMIN_PASSWORD ist in Vercel noch nicht gesetzt.",
}

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error && ERRORS[searchParams.error]
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form method="post" action="/admin/login/submit" className="w-full max-w-sm space-y-4 border border-gray-200 bg-white p-6">
        <h1 className="text-lg font-bold">Mountaincamp Admin</h1>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Passwort"
          className="w-full border border-gray-300 px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white">Anmelden</button>
      </form>
    </main>
  )
}
