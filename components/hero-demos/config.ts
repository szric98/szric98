export const HERO_DEMO_VARIANTS = [
  {
    slug: "terminal",
    label: "terminal",
    title: "Terminal",
    blurb: "CLI session, phosphor type, scanlines.",
  },
  {
    slug: "hud",
    label: "hud",
    title: "HUD",
    blurb: "Spacecraft overlay, telemetry, clipped frames.",
  },
  {
    slug: "neon",
    label: "neon",
    title: "Neon",
    blurb: "Cyberpunk glow, grid, dual-tone chrome.",
  },
  {
    slug: "spec",
    label: "spec",
    title: "Spec",
    blurb: "Engineering datasheet, labeled fields.",
  },
  {
    slug: "orbital",
    label: "orbital",
    title: "Orbital",
    blurb: "Mission-control type, hairline rules, live feed.",
  },
] as const;

export type HeroDemoSlug = (typeof HERO_DEMO_VARIANTS)[number]["slug"];
