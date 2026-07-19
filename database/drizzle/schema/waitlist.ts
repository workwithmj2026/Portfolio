import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const waitlistTable = pgTable("waitlist_signups", {
  email: text("email").notNull(),
  project: text("project").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type WaitlistSignup = typeof waitlistTable.$inferSelect;
