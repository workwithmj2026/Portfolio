/**
 * Load a `.env` file into the runtime environment.
 * Works on both Deno and Node.js — detects the runtime automatically.
 *
 * - Deno: reads `.env` manually and sets Deno.env
 * - Node: uses process.loadEnvFile() (native, since Node 20.12)
 * - Bun: auto-loads `.env`, so the parseEnv fallback fills in gaps
 *
 * Environment variables already set take precedence (shell/CI wins).
 */

const isDeno = typeof Deno !== "undefined";

function loadEnvFileDeno(file: string) {
  try {
    const text = Deno.readTextFileSync(file);
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let value = trimmed.slice(eqIdx + 1).trim();
      // Strip surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      // Don't override already-set env vars
      const existing = Deno.env.get(key);
      if (existing === undefined) {
        Deno.env.set(key, value);
      }
    }
  } catch {
    // .env is optional — fall back to ambient environment
  }
}

async function loadEnvFileNode(file: string) {
  try {
    if (typeof process.loadEnvFile === "function") {
      process.loadEnvFile(file);
    } else {
      // Fallback for older Node or Bun
      const { readFileSync } = await import("node:fs");
      const { parseEnv } = await import("node:util");
      const text = readFileSync(file, "utf8");
      for (const [key, value] of Object.entries(parseEnv(text))) {
        if (!(key in process.env)) {
          process.env[key] = value as string;
        }
      }
    }
  } catch {
    // .env is optional
  }
}

if (isDeno) {
  loadEnvFileDeno(".env");
} else {
  await loadEnvFileNode(".env");
}
