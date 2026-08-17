import Link from "next/link";
import { DemoNav } from "@/components/hero-demos/nav";
import { DemoHeroShell } from "@/components/hero-demos/shell";
import { DemoSocials } from "@/components/hero-demos/socials";
import { CONTACT_SECTION, HERO_SECTION } from "@/copy";

export function NeonHero() {
  return (
    <DemoHeroShell
      className="demo-neon"
      header={
        <header className="demo-neon-header">
          <DemoNav className="demo-neon-nav" linkClassName="" />
        </header>
      }
    >
      <div className="demo-neon-panel">
        <p className="demo-neon-kicker">sys.ok / node_01</p>
        <h1 className="demo-neon-glitch" data-text={HERO_SECTION.name}>
          {HERO_SECTION.name}
        </h1>
        <p className="demo-neon-role">{HERO_SECTION.role}</p>
        <p className="demo-neon-bio">{HERO_SECTION.description}</p>
        <p className="demo-neon-jp">システム・オンライン</p>
      </div>
      <div className="demo-neon-actions">
        <Link href="/contact" className="demo-neon-btn">
          {CONTACT_SECTION.button}
        </Link>
        <a href="/#projects" className="demo-neon-btn demo-neon-btn--ghost">
          {CONTACT_SECTION.projectsButton}
        </a>
        <DemoSocials className="demo-neon-icon" />
      </div>
    </DemoHeroShell>
  );
}
