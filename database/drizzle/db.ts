import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function dbPostgres() {
  const dbUrl =
    typeof Deno !== "undefined"
      ? Deno.env.get("DATABASE_URL")
      : process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("Missing DATABASE_URL in .env file");
  }
  return drizzlePostgres(postgres(dbUrl));
}
