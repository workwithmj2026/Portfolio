import vike from "@vikejs/hono";
import { Hono } from "hono";
import { authjsHandler, authjsSessionMiddleware } from "./authjs-handler";
import { dbMiddleware } from "./db-middleware";
import { telefuncHandler } from "./telefunc-handler";

function getApp() {
  const app = new Hono();

  vike(app, [
    // Make database available in Context as `context.db`
    dbMiddleware,
    // Append Auth.js session to context
    authjsSessionMiddleware,
    // Auth.js route. See https://authjs.dev/getting-started/installation
    authjsHandler,
    // Telefunc route. See https://telefunc.com
    telefuncHandler,
  ]);

  return app;
}

export const app = getApp();
