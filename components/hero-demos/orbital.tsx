import Link from "next/link";
import { DemoNav } from "@/components/hero-demos/nav";
import { DemoHeroShell } from "@/components/hero-demos/shell";
import { DemoSocials } from "@/components/hero-demos/socials";
import { CONTACT_SECTION, HERO_SECTION } from "@/copy";

export function OrbitalHero() {
  return (
    <DemoHeroShell
      className="demo-orbital"
      header={
        <header className="demo-orbital-header">
          <span className="demo-orbital-mark">szabo · earth</span>
          <DemoNav className="demo-orbital-nav" linkClassName="" />
        </header>
      }
      earthCaption={<p className="demo-orbital-caption">night side · live</p>}
    >
      <p className="demo-orbital-kicker">engineer</p>
      <h1>{HERO_SECTION.name}</h1>
      <p className="demo-orbital-role">{HERO_SECTION.role}</p>
      <div className="demo-orbital-rule" />
      <p className="demo-orbital-bio">{HERO_SECTION.description}</p>
      <div className="demo-orbital-actions">
        <Link href="/contact" className="demo-orbital-btn">
          {CONTACT_SECTION.button}
        </Link>
        <a
          href="/#projects"
          className="demo-orbital-btn demo-orbital-btn--ghost"
        >
          {CONTACT_SECTION.projectsButton}
        </a>
        <DemoSocials className="demo-orbital-icon" />
      </div>
    </DemoHeroShell>
  );
}
