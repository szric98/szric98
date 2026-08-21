import type { CSSProperties } from "react";
import { PageSection } from "@/components/page-section";
import { brandHex, SkillIcon } from "@/components/skill-icons";
import { SKILLS_SECTION } from "@/copy";

function satStyle(name: string, degrees: number): CSSProperties {
  return {
    "--a": `${degrees}deg`,
    "--skill-accent": brandHex(name),
  } as CSSProperties;
}

export function SkillsOrbit() {
  return (
    <div className="skills-orbit">
      {SKILLS_SECTION.groups.map((group) => (
        <article key={group.title} className="skills-orbit__system">
          <div className="skills-orbit__ring" />
          <div className="skills-orbit__core">
            <span>{group.title}</span>
          </div>
          <ul className="skills-orbit__sats">
            {group.items.map((item, index) => {
              const angle = (360 / group.items.length) * index - 90;

              return (
                <li key={item} style={satStyle(item, angle)}>
                  <div className="skills-orbit__sat-face">
                    <SkillIcon name={item} />
                    <span>{item}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function SkillsSection() {
  return (
    <PageSection id="skills" title={SKILLS_SECTION.title}>
      <SkillsOrbit />
    </PageSection>
  );
}
