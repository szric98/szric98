export const SKILLS_DEMO_VARIANTS = [
  {
    slug: "chips",
    label: "chips",
    title: "Signal Chips",
    blurb:
      "The current two-column cards, plus monochrome icons tinted to the site palette.",
  },
  {
    slug: "brands",
    label: "brands",
    title: "Brand Spectrum",
    blurb:
      "Same grid, official logo colors. Near-black marks (Next.js, Cursor, Express) invert so they stay visible.",
  },
  {
    slug: "stars",
    label: "stars",
    title: "Constellations",
    blurb:
      "Each stack becomes a star map. Icons sit on the nodes; faint lines hold the shape.",
  },
  {
    slug: "catalog",
    label: "catalog",
    title: "Observatory Log",
    blurb:
      "A single inventory: designation, icon, name, class. Same instrument language as About.",
  },
  {
    slug: "orbit",
    label: "orbit",
    title: "Orbital Systems",
    blurb:
      "Categories as cores, skills as satellites, with official logo colors. Hover a system to pause the drift.",
  },
  {
    slug: "mosaic",
    label: "mosaic",
    title: "Instrument Array",
    blurb:
      "A wall of large brand marks grouped by stack. Names stay small; the logos carry it.",
  },
  {
    slug: "readout",
    label: "readout",
    title: "Telemetry",
    blurb:
      "Mission-control rows with channel IDs and live ticks — decorative, not skill scores.",
  },
  {
    slug: "bento",
    label: "bento",
    title: "Payload Bay",
    blurb:
      "Asymmetric bento. Frontend takes the large cell; the rest nest around it.",
  },
] as const;

export type SkillsDemoSlug = (typeof SKILLS_DEMO_VARIANTS)[number]["slug"];
