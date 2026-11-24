import { jsonb, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"

export const earlyBirdSignups = pgTable("early_bird_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

/** Im Admin-Bereich gepflegte Werte, ein Eintrag pro Bereich (tickets, phases, shuttles) */
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

/** Interessent:innen: Ticket-Benachrichtigung, Warteliste, Performance, Adventure */
export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    interest: text("interest").notNull(),
    locale: text("locale"),
    source: text("source"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({ emailInterest: uniqueIndex("leads_email_interest").on(t.email, t.interest) }),
)
