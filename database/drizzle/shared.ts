import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let instance: ReturnType<typeof drizzlePostgres> | null = null;

export function getDb() {
  if (instance) return instance;

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("Missing DATABASE_URL in environment");
  }

  instance = drizzlePostgres(postgres(dbUrl));
  return instance;
}
