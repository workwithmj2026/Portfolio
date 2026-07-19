import "./server/load";
import { defineConfig } from "drizzle-kit";

const dbUrl =
  typeof Deno !== "undefined"
    ? Deno.env.get("DATABASE_URL")
    : process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("Missing DATABASE_URL in .env file");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./database/drizzle/schema/*",
  out: "./database/migrations",
  dbCredentials: {
    url: dbUrl,
  },
});
