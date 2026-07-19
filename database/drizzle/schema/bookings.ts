import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const bookingsTable = pgTable("bookings", {
  name: text("name").notNull(),
  email: text("email").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Booking = typeof bookingsTable.$inferSelect;
