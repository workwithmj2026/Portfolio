import vike from "@vikejs/hono";
import { Hono } from "hono";
import { authjsHandler, authjsSessionMiddleware } from "./authjs-handler";
import { calendarHandler } from "./calendar-handler";
import { chatHandler } from "./chat-handler";
import { dbMiddleware } from "./db-middleware";
import { telefuncHandler } from "./telefunc-handler";
import { waitlistHandler } from "./waitlist-handler";

function getApp() {
  const app = new Hono();

  app.route("/", chatHandler());
  app.route("/", waitlistHandler());
  app.route("/", calendarHandler());

  vike(app, [
    dbMiddleware,
    authjsSessionMiddleware,
    authjsHandler,
    telefuncHandler,
  ]);

  return app;
}

export const app = getApp();
