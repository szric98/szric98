import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SKILLS_DEMO_VARIANTS } from "@/components/skills-demos/config";
import { SkillsDemo } from "@/components/skills-demos/skills-demo";
import { HERO_SECTION } from "@/copy";

export const dynamicParams = false;

export function generateStaticParams() {
  return SKILLS_DEMO_VARIANTS.map((variant) => ({ variant: variant.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  const meta = SKILLS_DEMO_VARIANTS.find((item) => item.slug === variant);

  return {
    title: meta
      ? `${meta.title} demo | ${HERO_SECTION.name}`
      : `Skills demo | ${HERO_SECTION.name}`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const meta = SKILLS_DEMO_VARIANTS.find((item) => item.slug === variant);

  if (!meta) {
    notFound();
  }

  return <SkillsDemo variant={meta.slug} />;
}
