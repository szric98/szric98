import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HERO_DEMO_VARIANTS } from "@/components/hero-demos/config";
import { HudHero } from "@/components/hero-demos/hud";
import { NeonHero } from "@/components/hero-demos/neon";
import { OrbitalHero } from "@/components/hero-demos/orbital";
import { SpecHero } from "@/components/hero-demos/spec";
import { DemoSwitcher } from "@/components/hero-demos/switcher";
import { TerminalHero } from "@/components/hero-demos/terminal";
import { HERO_SECTION } from "@/copy";

const VARIANT_PAGES = {
  terminal: TerminalHero,
  hud: HudHero,
  neon: NeonHero,
  spec: SpecHero,
  orbital: OrbitalHero,
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return HERO_DEMO_VARIANTS.map((variant) => ({ variant: variant.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  const meta = HERO_DEMO_VARIANTS.find((item) => item.slug === variant);

  return {
    title: meta
      ? `${meta.title} demo | ${HERO_SECTION.name}`
      : `Hero demo | ${HERO_SECTION.name}`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const Page = VARIANT_PAGES[variant as keyof typeof VARIANT_PAGES];

  if (!Page) {
    notFound();
  }

  return (
    <>
      <DemoSwitcher current={variant} />
      <Page />
    </>
  );
}
