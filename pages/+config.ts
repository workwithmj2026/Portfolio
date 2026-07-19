import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

// Default config (can be overridden by pages)
// https://vike.dev/config

const config: Config = {
  // https://vike.dev/head-tags
  title: "Creative Developer & UX Architect — Portfolio",
  description: "Building custom digital experiences with design-first approach. Interactive portfolio showcasing web development, UI/UX design, and 3D experiences.",

  passToClient: ["user"],
  extends: [vikeReact],
};

export default config;
