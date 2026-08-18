export const HERO_DEMO_VARIANTS = [
  {
    slug: "veil",
    label: "veil",
    title: "Soft Veil",
    blurb: "A feathered horizontal wash behind the copy.",
  },
  {
    slug: "halo",
    label: "halo",
    title: "Radial Halo",
    blurb: "A soft elliptical shadow centered on the text.",
  },
  {
    slug: "frost",
    label: "frost",
    title: "Frosted Air",
    blurb: "Subtle backdrop blur with fully faded edges.",
  },
  {
    slug: "mist",
    label: "mist",
    title: "Layered Mist",
    blurb: "Overlapping blurred forms with a hint of blue.",
  },
  {
    slug: "vignette",
    label: "vignette",
    title: "Local Vignette",
    blurb: "A cinematic shadow that pools behind the content.",
  },
  {
    slug: "beam",
    label: "beam",
    title: "Orbital Beam",
    blurb: "A restrained diagonal light-and-shadow treatment.",
  },
  {
    slug: "quiet",
    label: "quiet",
    title: "Quiet Stars",
    blurb: "Only the starfield is softened behind the copy.",
  },
  {
    slug: "aurora",
    label: "aurora",
    title: "Blue Aurora",
    blurb: "A low-contrast blue atmospheric glow.",
  },
] as const;

export type HeroDemoSlug = (typeof HERO_DEMO_VARIANTS)[number]["slug"];
