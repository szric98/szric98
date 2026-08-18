import type { SkillsDemoSlug } from "@/components/skills-demos/config";
import { SKILLS_DEMO_VARIANTS } from "@/components/skills-demos/config";
import { SkillsSwitcher } from "@/components/skills-demos/switcher";
import { SkillsVariant } from "@/components/skills-demos/variants";
import { SKILLS_SECTION } from "@/copy";

export function SkillsDemo({ variant }: { variant: SkillsDemoSlug }) {
  const meta = SKILLS_DEMO_VARIANTS.find((item) => item.slug === variant);

  return (
    <main className={`skills-demo skills-demo--${variant}`}>
      <SkillsSwitcher current={variant} />
      <section className="skills-demo__section">
        <p className="kicker">{SKILLS_SECTION.title}</p>
        <h2>{SKILLS_SECTION.title}</h2>
        <div className="hairline" />
        {meta ? <p className="skills-demo__blurb">{meta.blurb}</p> : null}
        <div className="skills-demo__stage">
          <SkillsVariant slug={variant} />
        </div>
      </section>
    </main>
  );
}
