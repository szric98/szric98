"use client";

import Link from "next/link";
import { HERO_DEMO_VARIANTS } from "@/components/hero-demos/config";

export function DemoSwitcher({ current }: { current: string }) {
  return (
    <nav className="demo-switcher" aria-label="Hero style demos">
      <Link href="/" className="demo-switcher__live">
        live site
      </Link>
      <span className="demo-switcher__rule" aria-hidden="true" />
      {HERO_DEMO_VARIANTS.map((variant) => (
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
