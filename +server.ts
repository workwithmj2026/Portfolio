import "./server/load";
import type { Server } from "vike/types";
import { app } from "./server/hono";

const port = parseInt(
  (typeof Deno !== "undefined" ? Deno.env.get("PORT") : process.env.PORT) || "3000",
  10,
);

// https://vike.dev/server
export default {
  fetch: app.fetch,
  prod: {
    port,
  },
} satisfies Server;
