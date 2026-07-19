/**
 * STRUCTURE PROVISIONING ONLY
 *
 * This table defines the reference schema for the application's data model.
 * It is used at compile time by Drizzle Kit to generate migration SQL and
 * infer TypeScript types.
 *
 * AT BUILD TIME (SSG / `vike build`):
 *   All data access is mocked with lorem ipsum placeholders. No live database
 *   connection is required for the static compilation pass.
 *
 * AT RUNTIME (SSR / `vike dev` / production):
 *   A live PostgreSQL connection (DATABASE_URL) is required. This table
 *   reflects the actual database structure and is provisioned via
 *   `drizzle-kit migrate`.
 */
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 50 }).notNull(),
});

export type TodoItem = typeof todoTable.$inferSelect;
export type TodoInsert = typeof todoTable.$inferInsert;
