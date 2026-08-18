"use client";

import Link from "next/link";
import { SKILLS_DEMO_VARIANTS } from "@/components/skills-demos/config";

export function SkillsSwitcher({ current }: { current: string }) {
  return (
    <nav className="demo-switcher" aria-label="Skills style demos">
      <Link href="/" className="demo-switcher__live">
        live site
      </Link>
      <span className="demo-switcher__rule" aria-hidden="true" />
      {SKILLS_DEMO_VARIANTS.map((variant) => (
        <Link
          key={variant.slug}
          href={`/demo/${variant.slug}`}
          className={`demo-switcher__link ${
            current === variant.slug ? "is-active" : ""
          }`}
        >
          {variant.label}
        </Link>
      ))}
    </nav>
  );
}
