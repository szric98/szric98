import type { Metadata } from "next";
import { BLOG_SECTION, HERO_SECTION } from "@/copy";

export const metadata: Metadata = {
  title: `Blog | ${HERO_SECTION.name}`,
  description: BLOG_SECTION.description,
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen">
      <section className="px-8 pt-28 pb-24 md:px-16 lg:px-28 lg:pt-[18vh] xl:px-36">
        <p className="kicker">blog</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
          {BLOG_SECTION.title}
        </h1>
        <div className="hairline mt-6" />
        <p className="mt-8 max-w-lg text-[1.05rem] leading-[1.75] text-muted">
          {BLOG_SECTION.empty}
        </p>
      </section>
    </main>
  );
}
