import { HeroActions } from "@/components/hero-actions";
import type { HeroDemoSlug } from "@/components/hero-demos/config";
import { DemoNav } from "@/components/hero-demos/nav";
import { HeroEarth } from "@/components/hero-earth";
import { HERO_SECTION } from "@/copy";

export function BackgroundHeroDemo({ variant }: { variant: HeroDemoSlug }) {
  return (
    <main className={`hero-bg-demo hero-bg-demo--${variant}`}>
      <header className="hero-bg-demo__header">
        <span>szabo · earth</span>
        <DemoNav
          className="hero-bg-demo__nav"
          linkClassName="hero-bg-demo__nav-link"
        />
      </header>

      <section className="hero-bg-demo__layout">
        <div className="hero-bg-demo__copy-wrap">
          <div className="hero-bg-demo__backdrop" aria-hidden="true" />
          <div className="hero-bg-demo__copy">
            <p className="kicker">{HERO_SECTION.kicker}</p>
            <h1>{HERO_SECTION.name}</h1>
            <p className="hero-bg-demo__role">{HERO_SECTION.role}</p>
            <div className="hairline hero-bg-demo__rule" />
            <p className="hero-bg-demo__description">
              {HERO_SECTION.description}
            </p>
            <HeroActions />
          </div>
        </div>

        <div className="hero-bg-demo__earth">
          <HeroEarth className="w-full max-w-[18rem] sm:max-w-sm lg:max-w-md xl:max-w-lg" />
          <p>{HERO_SECTION.earthCaption}</p>
        </div>
      </section>
    </main>
  );
}
