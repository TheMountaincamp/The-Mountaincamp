"use client"

import { useState, type FormEvent } from "react"
import { CheckCircle2, Loader2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

type Status = "idle" | "submitting" | "success" | "error"

export default function NotifySignupForm({ className }: { className?: string }) {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting") return

    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        if (data?.error === "invalid_email") {
          setErrorMessage(t("notifyErrorInvalid"))
        } else {
          setErrorMessage(t("notifyErrorGeneric"))
        }
        setStatus("error")
        return
      }

      setStatus("success")
    } catch (error) {
      console.error("[v0] Error submitting notify form:", error)
      setErrorMessage(t("notifyErrorGeneric"))
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-foreground",
          className,
        )}
      >
        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
        <span>{t("notifySuccess")}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("notifyPlaceholder")}
            aria-label={t("notifyPlaceholder")}
            disabled={status === "submitting"}
            className="h-12 pl-10"
          />
        </div>
        <Button type="submit" size="lg" disabled={status === "submitting"} className="h-12 whitespace-nowrap">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("notifySubmitting")}
            </>
          ) : (
            t("notifyButton")
          )}
        </Button>
      </div>
      {status === "error" && errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
    </form>
  )
}
