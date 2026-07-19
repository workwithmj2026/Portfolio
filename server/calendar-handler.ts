import { Hono } from "hono";
import { bookingsTable } from "../database/drizzle/schema/bookings";
import { getDb } from "../database/drizzle/shared";

export function calendarHandler() {
  const router = new Hono();

  router.post("/api/calendar/book", async (c) => {
    try {
      const body = await c.req.json<{
        name: string;
        email: string;
        date: string;
        time: string;
        notes?: string;
      }>();

      const { name, email, date, time, notes } = body;

      if (!name || !email || !date || !time) {
        return c.json({ error: "Missing required fields" }, 400);
      }

      const db = getDb();

      await db.insert(bookingsTable).values({
        name,
        email: email.toLowerCase().trim(),
        date,
        time,
        notes: notes || null,
      });

      // Try Google Calendar if key is configured
      const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
      if (apiKey) {
        try {
          await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                summary: `Call with ${name}`,
                description: notes || `Booking from ${email}`,
                start: {
                  dateTime: `${date}T${time}:00+05:30`,
                  timeZone: "Asia/Kolkata",
                },
                end: {
                  dateTime: `${date}T${parseInt(time.split(":")[0], 10) + 1}:${time.split(":")[1]}:00+05:30`,
                  timeZone: "Asia/Kolkata",
                },
                attendees: [{ email }],
                sendUpdates: "all",
              }),
            },
          );
        } catch {
          // Calendar API failed but DB save succeeded
        }
      }

      return c.json({
        message: "Booking confirmed! Check your email for details.",
      });
    } catch (err) {
      console.error("[Calendar] Error:", err);
      return c.json({ error: "Failed to create booking" }, 500);
    }
  });

  return router;
}
