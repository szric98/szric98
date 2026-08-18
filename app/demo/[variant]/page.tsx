import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackgroundHeroDemo } from "@/components/hero-demos/backgrounds";
import { HERO_DEMO_VARIANTS } from "@/components/hero-demos/config";
import { DemoSwitcher } from "@/components/hero-demos/switcher";
import { HERO_SECTION } from "@/copy";

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
  const meta = HERO_DEMO_VARIANTS.find((item) => item.slug === variant);

  if (!meta) {
    notFound();
  }

  return (
    <>
      <DemoSwitcher current={variant} />
      <BackgroundHeroDemo variant={meta.slug} />
    </>
  );
}
