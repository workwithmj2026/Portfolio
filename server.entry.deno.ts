/**
 * Deno-native production server entry point.
 *
 * Replaces the srvx-wrapped dist/server/index.mjs (Node-only) with
 * Deno.serve() + @std/http/file-server for static assets.
 *
 * Usage: deno run --allow-net --allow-read=./dist,./server --allow-env server.entry.deno.ts
 */

import "./server/load.ts";
import { serveDir } from "@std/http/file-server";
import { app } from "./server/hono.ts";

const port = parseInt(Deno.env.get("PORT") || "3000", 10);

Deno.serve({ port }, async (request) => {
  // Serve static files from dist/client/ first (matches srvx/static behavior)
  const staticResponse = await serveDir(request, {
    fsRoot: "./dist/client",
    quiet: true,
  });
  if (staticResponse.ok && staticResponse.status !== 404) {
    return staticResponse;
  }
  // Fall through to Hono/Vike SSR
  return app.fetch(request);
});
