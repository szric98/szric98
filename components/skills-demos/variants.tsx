import type { CSSProperties } from "react";
import type { SkillsDemoSlug } from "@/components/skills-demos/config";
import {
  brandHex,
  type IconMode,
  SkillIcon,
} from "@/components/skills-demos/icons";
import { SkillsOrbit } from "@/components/skills-section";
import { SKILLS_SECTION } from "@/copy";

const GROUPS = SKILLS_SECTION.groups;

function accentStyle(name: string): CSSProperties {
  return { "--skill-accent": brandHex(name) } as CSSProperties;
}

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

function freq(name: string) {
  const n = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return (10 + (n % 16) + (n % 9) / 10).toFixed(3);
}

function ChipList({ mode }: { mode: IconMode }) {
  return (
    <div className="skills-cards">
      {GROUPS.map((group) => (
        <article key={group.title} className="skills-cards__panel">
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li
                key={item}
                className={`skill-chip skill-chip--${mode}`}
                style={mode === "brand" ? accentStyle(item) : undefined}
              >
                <SkillIcon name={item} mode={mode} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

type Point = { x: number; y: number };

function constellation(count: number): {
  nodes: Point[];
  edges: Array<[number, number]>;
} {
  if (count === 1) {
    return { nodes: [{ x: 50, y: 50 }], edges: [] };
  }

  if (count === 3) {
    return {
      nodes: [
        { x: 50, y: 24 },
        { x: 22, y: 74 },
        { x: 78, y: 72 },
      ],
      edges: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    };
  }

  if (count === 4) {
    return {
      nodes: [
        { x: 50, y: 18 },
        { x: 84, y: 50 },
        { x: 50, y: 82 },
        { x: 16, y: 50 },
      ],
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [0, 2],
      ],
    };
  }

  if (count === 5) {
    const nodes = Array.from({ length: 5 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;

      return { x: 50 + 34 * Math.cos(angle), y: 50 + 34 * Math.sin(angle) };
    });

    return {
      nodes,
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 0],
        [0, 2],
        [0, 3],
      ],
    };
  }

  if (count === 8) {
    return {
      nodes: [
        { x: 10, y: 42 },
        { x: 26, y: 22 },
        { x: 44, y: 30 },
        { x: 62, y: 16 },
        { x: 58, y: 48 },
        { x: 74, y: 64 },
        { x: 90, y: 46 },
        { x: 80, y: 82 },
      ],
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [5, 7],
      ],
    };
  }

  const nodes = Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;

    return { x: 50 + 34 * Math.cos(angle), y: 50 + 34 * Math.sin(angle) };
  });

  return {
    nodes,
    edges: nodes.map((_, i) => [i, (i + 1) % count]),
  };
}

function StarsMap() {
  return (
    <div className="skills-stars">
      {GROUPS.map((group, groupIndex) => {
        const { nodes, edges } = constellation(group.items.length);

        return (
          <article key={group.title} className="skills-stars__sky">
            <header>
              <span>CST-{pad(groupIndex)}</span>
              <h3>{group.title}</h3>
            </header>
            <div className="skills-stars__field">
              <svg
                className="skills-stars__lines"
                viewBox="0 0 100 100"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                {edges.map(([from, to]) => (
                  <line
                    key={`${from}-${to}`}
                    x1={nodes[from].x}
                    y1={nodes[from].y}
                    x2={nodes[to].x}
                    y2={nodes[to].y}
                  />
                ))}
              </svg>
              {group.items.map((item, index) => (
                <div
                  key={item}
                  className="skills-stars__node"
                  style={{
                    left: `${nodes[index].x}%`,
                    top: `${nodes[index].y}%`,
                    animationDelay: `${index * 0.35}s`,
                  }}
                >
                  <span className="skills-stars__mark">
                    <SkillIcon name={item} mode="theme" />
                  </span>
                  <span className="skills-stars__name">{item}</span>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function CatalogLog() {
  let running = 0;

  return (
    <div className="skills-catalog">
      <span className="skills-catalog__corner skills-catalog__corner--tl" />
      <span className="skills-catalog__corner skills-catalog__corner--br" />
      <header className="skills-catalog__head">
        <span>obs · budapest</span>
        <span>catalog · visible objects</span>
        <span>
          {GROUPS.reduce((sum, group) => sum + group.items.length, 0)} entries
        </span>
      </header>
      <ul>
        {GROUPS.flatMap((group) =>
          group.items.map((item) => {
            const id = pad(running);
            running += 1;

            return (
              <li
                key={`${group.title}-${item}`}
                className="skills-catalog__row"
              >
                <span className="skills-catalog__id">SK-{id}</span>
                <SkillIcon name={item} mode="theme" />
                <span className="skills-catalog__name">{item}</span>
                <span className="skills-catalog__class">{group.title}</span>
                <span className="skills-catalog__status">visible</span>
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}

function OrbitSystems() {
  return <SkillsOrbit />;
}

function MosaicWall() {
  return (
    <div className="skills-mosaic">
      {GROUPS.map((group) => (
        <section key={group.title} className="skills-mosaic__group">
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item} style={accentStyle(item)}>
                <SkillIcon name={item} mode="brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TelemetryReadout() {
  return (
    <div className="skills-readout">
      {GROUPS.map((group, groupIndex) => (
        <article key={group.title} className="skills-readout__panel">
          <header>
            <span>CH-{pad(groupIndex)}</span>
            <h3>{group.title}</h3>
            <span className="skills-readout__lock">lock</span>
          </header>
          <ul>
            {group.items.map((item) => (
              <li key={item}>
                <SkillIcon name={item} mode="theme" />
                <span className="skills-readout__name">{item}</span>
                <span className="skills-readout__leader" aria-hidden="true" />
                <span className="skills-readout__freq">{freq(item)}</span>
                <span className="skills-readout__live">live</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function areaSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

function PayloadBay() {
  return (
    <div className="skills-bento">
      {GROUPS.map((group) => (
        <article
          key={group.title}
          className={`skills-bento__cell skills-bento__cell--${areaSlug(group.title)}`}
        >
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>
                <SkillIcon name={item} mode="theme" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function SkillsVariant({ slug }: { slug: SkillsDemoSlug }) {
  switch (slug) {
    case "chips":
      return <ChipList mode="theme" />;
    case "brands":
      return <ChipList mode="brand" />;
    case "stars":
      return <StarsMap />;
    case "catalog":
      return <CatalogLog />;
    case "orbit":
      return <OrbitSystems />;
    case "mosaic":
      return <MosaicWall />;
    case "readout":
      return <TelemetryReadout />;
    case "bento":
      return <PayloadBay />;
  }
}
