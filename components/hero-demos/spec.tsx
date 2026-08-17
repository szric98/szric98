import Link from "next/link";
import type { ReactNode } from "react";
import { DemoNav } from "@/components/hero-demos/nav";
import { DemoHeroShell } from "@/components/hero-demos/shell";
import { DemoSocials } from "@/components/hero-demos/socials";
import { CONTACT_SECTION, HERO_SECTION } from "@/copy";

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="demo-spec-row">
      <div className="demo-spec-label">{label}</div>
      <div className="demo-spec-value">{children}</div>
    </div>
  );
}

export function SpecHero() {
  return (
    <DemoHeroShell
      className="demo-spec"
      header={
        <header className="demo-spec-header">
          <span className="demo-spec-brand">rs-98 / rev 1.0</span>
          <DemoNav className="demo-spec-nav" linkClassName="" />
        </header>
      }
    >
      <div className="demo-spec-panel">
        <SpecRow label="unit">
          <h1>{HERO_SECTION.name}</h1>
        </SpecRow>
        <SpecRow label="class">{HERO_SECTION.role}</SpecRow>
        <SpecRow label="notes">
          <p className="demo-spec-bio">{HERO_SECTION.description}</p>
        </SpecRow>
        <SpecRow label="stack">web · graphql · ai</SpecRow>
        <SpecRow label="range">2021 — present</SpecRow>
      </div>
      <div className="demo-spec-actions">
        <Link href="/contact" className="demo-spec-btn">
          {CONTACT_SECTION.button}
        </Link>
        <a href="/#projects" className="demo-spec-btn demo-spec-btn--ghost">
          {CONTACT_SECTION.projectsButton}
        </a>
        <DemoSocials className="demo-spec-icon" />
      </div>
    </DemoHeroShell>
  );
}
