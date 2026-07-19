import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { waitlistTable } from "../database/drizzle/schema/waitlist";
import { getDb } from "../database/drizzle/shared";

export function waitlistHandler() {
  const router = new Hono();

  router.post("/api/waitlist", async (c) => {
    try {
      const body = await c.req.json<{ email: string; project: string }>();
      const { email, project } = body;

      if (!email?.includes("@")) {
        return c.json({ error: "Invalid email" }, 400);
      }

      const db = getDb();
      const normalizedEmail = email.toLowerCase().trim();

      const existing = await db
        .select()
        .from(waitlistTable)
        .where(
          and(
            eq(waitlistTable.email, normalizedEmail),
            eq(waitlistTable.project, project),
          ),
        )
        .limit(1);

      if (existing.length > 0) {
        return c.json({
          message: "Already registered",
          alreadyRegistered: true,
        });
      }

      await db.insert(waitlistTable).values({
        email: normalizedEmail,
        project,
      });

      return c.json({ message: "Added to waitlist" });
    } catch (err) {
      console.error("[Waitlist] Error:", err);
      return c.json({ error: "Failed to register" }, 500);
    }
  });

  router.get("/api/waitlist/count", async (c) => {
    try {
      const db = getDb();
      const project = c.req.query("project");
      const rows = await db.select().from(waitlistTable);

      const counts: Record<string, number> = {};
      for (const row of rows) {
        if (!project || row.project === project) {
          counts[row.project] = (counts[row.project] || 0) + 1;
        }
      }
      return c.json(counts);
    } catch (err) {
      console.error("[Waitlist] Count error:", err);
      return c.json({ error: "Failed to get count" }, 500);
    }
  });

  return router;
}
