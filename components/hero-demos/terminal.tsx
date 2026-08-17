import Link from "next/link";
import { DemoNav } from "@/components/hero-demos/nav";
import { DemoHeroShell } from "@/components/hero-demos/shell";
import { DemoSocials } from "@/components/hero-demos/socials";
import { CONTACT_SECTION, HERO_SECTION } from "@/copy";

export function TerminalHero() {
  return (
    <DemoHeroShell
      className="demo-terminal"
      header={
        <header className="demo-terminal-header">
          <span>szric98@earth:~</span>
          <DemoNav
            className="demo-terminal-nav"
            linkClassName=""
            formatLabel={(label) => `./${label}`}
          />
        </header>
      }
    >
      <div className="demo-terminal-window">
        <div className="demo-terminal-titlebar">
          <span className="demo-terminal-dot" />
          <span className="demo-terminal-dot" />
          <span className="demo-terminal-dot" />
          <span>~/whoami.sh</span>
        </div>
        <div className="demo-terminal-body">
          <p className="demo-terminal-prompt">$ whoami</p>
          <h1>
            {HERO_SECTION.name.toLowerCase().replace(/ /g, "_")}
            <span className="demo-terminal-cursor" />
          </h1>
          <p className="demo-terminal-prompt">$ cat role.txt</p>
          <p className="demo-terminal-role">
            {HERO_SECTION.role.toLowerCase().replace(/ /g, "_")}
          </p>
          <p className="demo-terminal-prompt">$ cat bio.md</p>
          <p className="demo-terminal-bio">{HERO_SECTION.description}</p>
          <p className="demo-terminal-meta">
            uptime 5y · loc remote · status online
          </p>
          <span className="demo-terminal-scan" />
        </div>
      </div>
      <div className="demo-terminal-actions">
        <Link href="/contact" className="demo-terminal-btn">
          $ {CONTACT_SECTION.button.replace(" ", "_")}
        </Link>
        <a
          href="/#projects"
          className="demo-terminal-btn demo-terminal-btn--ghost"
        >
          ./projects
        </a>
        <DemoSocials className="demo-terminal-icon" />
      </div>
    </DemoHeroShell>
  );
}
