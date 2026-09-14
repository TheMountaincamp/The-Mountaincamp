"use client"

import type React from "react"
import { useId, useState } from "react"
import { Button } from "@/components/ui/button"

type NotifySignupFormProps = {
  format: "performance" | "adventure"
  accentClassName?: string
}

export function NotifySignupForm({ format, accentClassName = "focus-visible:outline-mc-orange" }: NotifySignupFormProps) {
  const inputId = useId()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, format }),
      })

      if (!response.ok) throw new Error("Request failed")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return <p className="text-base text-mc-dust">Danke! Wir melden uns, sobald es losgeht.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor={inputId} className="sr-only">
        E-Mail-Adresse
      </label>
      <input
        id={inputId}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="deine@email.de"
        className={`w-full rounded-sm border border-mc-white/20 bg-mc-white/5 px-4 py-3 text-mc-white placeholder:text-mc-dust/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${accentClassName}`}
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="bg-mc-orange text-mc-black hover:bg-mc-orange/90 font-oswald uppercase tracking-wide"
      >
        {status === "loading" ? "Wird gesendet…" : "Benachrichtigen"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-mc-orange sm:absolute sm:mt-14" role="alert">
          Etwas ist schiefgelaufen. Bitte versuche es erneut.
        </p>
      )}
    </form>
  )
}
