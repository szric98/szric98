import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { BLOG_SECTION, HERO_SECTION } from "@/copy";

export const metadata: Metadata = {
  title: `Blog | ${HERO_SECTION.name}`,
  description: BLOG_SECTION.description,
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen">
      <section className="page-gutter page-offset pb-24">
        <SectionHeading title={BLOG_SECTION.title} kicker="blog" as="h1" />
        <p className="mt-8 max-w-lg text-body text-muted">
          {BLOG_SECTION.empty}
        </p>
      </section>
    </main>
  );
}
