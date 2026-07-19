/// <reference types="vitest/config" />
import vike from "vike/plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { telefunc } from "telefunc/vite";
import { join } from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname = typeof import.meta.dirname !== "undefined"
  ? import.meta.dirname
  : typeof __dirname !== "undefined"
    ? __dirname
    : join(new URL(".", import.meta.url).pathname);

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    vike(),
    react(),
    sentryVitePlugin({
      sourcemaps: {
        disable: false,
      },
    }),
    tailwindcss(),
    telefunc(),
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
