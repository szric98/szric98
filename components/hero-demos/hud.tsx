import Link from "next/link";
import { DemoNav } from "@/components/hero-demos/nav";
import { DemoHeroShell } from "@/components/hero-demos/shell";
import { DemoSocials } from "@/components/hero-demos/socials";
import { CONTACT_SECTION, HERO_SECTION } from "@/copy";

export function HudHero() {
  return (
    <DemoHeroShell
      className="demo-hud"
      header={
        <header className="demo-hud-header">
          <DemoNav className="demo-hud-nav" linkClassName="" />
        </header>
      }
      earthCaption={<p className="demo-hud-caption">earth / live feed</p>}
    >
      <div className="demo-hud-panel">
        <span className="demo-hud-corner demo-hud-corner--tl" />
        <span className="demo-hud-corner demo-hud-corner--tr" />
        <span className="demo-hud-corner demo-hud-corner--bl" />
        <span className="demo-hud-corner demo-hud-corner--br" />
        <span className="demo-hud-scan" />
        <p className="demo-hud-kicker">id 07-rs / operator</p>
        <h1>{HERO_SECTION.name}</h1>
        <p className="demo-hud-role">{HERO_SECTION.role}</p>
        <p className="demo-hud-bio">{HERO_SECTION.description}</p>
        <dl className="demo-hud-telemetry">
          <div>
            <dt>lat</dt>
            <dd>47.49 N</dd>
          </div>
          <div>
            <dt>lon</dt>
            <dd>19.04 E</dd>
          </div>
          <div>
            <dt>exp</dt>
            <dd>5.0 yr</dd>
          </div>
          <div>
            <dt>sys</dt>
            <dd>online</dd>
          </div>
        </dl>
      </div>
      <div className="demo-hud-actions">
        <Link href="/contact" className="demo-hud-btn">
          {CONTACT_SECTION.button}
        </Link>
        <a href="/#projects" className="demo-hud-btn demo-hud-btn--ghost">
          {CONTACT_SECTION.projectsButton}
        </a>
        <DemoSocials className="demo-hud-icon" />
      </div>
    </DemoHeroShell>
  );
}
