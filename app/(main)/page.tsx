import { AboutSection } from "@/components/about-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { HeroActions } from "@/components/hero-actions";
import { HeroEarth } from "@/components/hero-earth";
import { PageSection } from "@/components/page-section";
import { SkillsSection } from "@/components/skills-section";
import { EXPERIENCE_SECTION, HERO_SECTION, PROJECTS_SECTION } from "@/copy";

export default function Home() {
  return (
    <main className="relative">
      <section
        id="home"
        className="grid min-h-screen scroll-mt-28 items-center gap-8 px-8 pt-28 md:px-16 lg:grid-cols-2 lg:gap-16 lg:px-28 lg:pt-[18vh] xl:px-36 overflow-x-clip"
      >
        <div className="hero-copy-aurora max-w-xl">
          <p className="kicker">{HERO_SECTION.kicker}</p>
          <h1 className="mt-3 text-[clamp(3rem,9vw,5.4rem)] font-medium tracking-[-0.06em] leading-[0.92] text-foreground lg:whitespace-nowrap">
            {HERO_SECTION.name}
          </h1>
          <p className="mt-4 font-mono text-[0.82rem] tracking-[0.22em] text-star-bright uppercase">
            {HERO_SECTION.role}
          </p>
          <div className="hairline mt-6 mb-5" />
          <p className="max-w-lg text-[1.05rem] leading-[1.75] text-muted">
            {HERO_SECTION.description}
          </p>
          <HeroActions />
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <HeroEarth className="w-full max-w-100 lg:max-w-md xl:max-w-lg" />
        </div>
      </section>

      <AboutSection />

      <SkillsSection />

      <PageSection id="experience" title={EXPERIENCE_SECTION.title}>
        <div className="max-w-3xl">
          <ExperienceTimeline
            timelineStart={EXPERIENCE_SECTION.timelineStart}
            timelineEnd={EXPERIENCE_SECTION.timelineEnd}
            items={EXPERIENCE_SECTION.items}
          />
        </div>
      </PageSection>

      <PageSection id="projects" title={PROJECTS_SECTION.title}>
        <div className="grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS_SECTION.items.map((project) => (
            <article
              key={project.title}
              className="hero-panel px-6 py-6 sm:px-8 sm:py-8"
            >
              <h3 className="text-xl font-medium tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {project.description}
              </p>
              <p className="mt-4 font-mono text-[0.68rem] tracking-[0.18em] text-star-bright uppercase">
                {project.stack}
              </p>
            </article>
          ))}
        </div>
      </PageSection>
    </main>
  );
}
