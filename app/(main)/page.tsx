import { AboutSection } from "@/components/about-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { HeroActions } from "@/components/hero-actions";
import { HeroEarth } from "@/components/hero-earth";
import { PageSection } from "@/components/page-section";
import { Reveal } from "@/components/reveal";
import { SkillsSection } from "@/components/skills-section";
import { EXPERIENCE_SECTION, HERO_SECTION, PROJECTS_SECTION } from "@/copy";

export default function Home() {
  return (
    <main className="relative">
      <section
        id="home"
        className="hero-enter page-gutter page-offset grid min-h-screen scroll-mt-28 items-center gap-8 overflow-x-clip lg:grid-cols-2 lg:gap-16"
      >
        <div className="hero-copy-aurora lg:max-w-xl">
          <p className="kicker hero-enter__item">{HERO_SECTION.kicker}</p>
          <h1 className="hero-enter__item mt-3 text-[clamp(3rem,9vw,5.5rem)] font-medium tracking-display leading-[0.9] text-foreground lg:whitespace-nowrap">
            {HERO_SECTION.name}
          </h1>
          <p className="label-meta hero-enter__item mt-4 text-star-bright">
            {HERO_SECTION.role}
          </p>
          <div className="hairline hero-enter__item mt-6 mb-5" />
          <p className="hero-enter__item text-body text-muted lg:max-w-lg">
            {HERO_SECTION.description}
          </p>
          <div className="hero-enter__item">
            <HeroActions />
          </div>
        </div>
        <div className="hero-enter__globe flex w-full flex-col items-center justify-center">
          <HeroEarth className="w-full max-w-100 lg:max-w-md xl:max-w-lg" />
        </div>
      </section>

      <Reveal>
        <AboutSection />
      </Reveal>

      <Reveal>
        <SkillsSection />
      </Reveal>

      <Reveal>
        <PageSection id="experience" title={EXPERIENCE_SECTION.title}>
          <div className="max-w-4xl">
            <ExperienceTimeline items={EXPERIENCE_SECTION.items} />
          </div>
        </PageSection>
      </Reveal>

      <Reveal>
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
                <p className="mt-3 text-body text-muted">
                  {project.description}
                </p>
                <p className="label-meta mt-4 text-star-bright">
                  {project.stack}
                </p>
              </article>
            ))}
          </div>
        </PageSection>
      </Reveal>
    </main>
  );
}
