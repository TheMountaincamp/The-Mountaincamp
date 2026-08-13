import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const earlyBirdSignups = pgTable("early_bird_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
