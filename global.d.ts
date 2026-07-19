import type { Session } from "@auth/core/types";
import type { dbPostgres } from "./database/drizzle/db";

declare global {
  namespace Vike {
    interface PageContextServer {
      db: ReturnType<typeof dbPostgres>;
    }
    interface PageContext {
      session?: Session | null;
    }
  }
}

declare module "telefunc" {
  namespace Telefunc {
    interface Context {
      db: ReturnType<typeof dbPostgres>;
    }
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: ensure that the file is considered as a module
export {};
