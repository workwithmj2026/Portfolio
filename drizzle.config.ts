import { defineConfig } from "drizzle-kit";

const dbUrl =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/app";

export default defineConfig({
  dialect: "postgresql",
  schema: "./database/drizzle/schema/*",
  out: "./database/migrations",
  dbCredentials: { url: dbUrl },
});
