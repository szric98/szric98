import type { SimpleIcon } from "simple-icons";
import {
  siBruno,
  siClaude,
  siCss,
  siCursor,
  siElasticsearch,
  siExpress,
  siFigma,
  siFlutter,
  siGooglegemini,
  siGraphql,
  siHtml5,
  siJavascript,
  siJest,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVitest,
} from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  HTML: siHtml5,
  CSS: siCss,
  Tailwind: siTailwindcss,
  React: siReact,
  "Next.js": siNextdotjs,
  Figma: siFigma,
  Python: siPython,
  Node: siNodedotjs,
  Express: siExpress,
  GraphQL: siGraphql,
  Flutter: siFlutter,
  Claude: siClaude,
  Cursor: siCursor,
  Gemini: siGooglegemini,
  Jest: siJest,
  Vitest: siVitest,
  Bruno: siBruno,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  Elasticsearch: siElasticsearch,
};

function luminance(hex: string) {
  const n = Number.parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;

  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function brandHex(name: string) {
  if (name === "Playwright") {
    return "#45BA4B";
  }

  const icon = ICONS[name];

  if (!icon) {
    return "var(--star-bright)";
  }

  if (luminance(icon.hex) < 36) {
    return "var(--foreground)";
  }

  return `#${icon.hex}`;
}

function PlaywrightMark() {
  return (
    <>
      <ellipse cx="7.4" cy="12" rx="5.1" ry="6.3" fill="#45BA4B" />
      <ellipse cx="16.6" cy="12" rx="5.1" ry="6.3" fill="#D14B8F" />
      <ellipse cx="12" cy="13.1" rx="5.4" ry="6.5" fill="#E8C547" />
      <circle cx="10.15" cy="12.4" r="0.85" fill="#1b1b1d" />
      <circle cx="13.85" cy="12.4" r="0.85" fill="#1b1b1d" />
    </>
  );
}

function FigmaMark() {
  return (
    <g transform="translate(4.2, 0.4) scale(0.41)">
      <path
        fill="#1ABCFE"
        d="M19 28.5c0 5.247 4.253 9.5 9.5 9.5s9.5-4.253 9.5-9.5-4.253-9.5-9.5-9.5-9.5 4.253-9.5 9.5z"
      />
      <path
        fill="#0ACF83"
        d="M0 47.5C0 52.747 4.253 57 9.5 57S19 52.747 19 47.5V38H9.5C4.253 38 0 42.253 0 47.5z"
      />
      <path
        fill="#FF7262"
        d="M19 0v19H9.5C4.253 19 0 14.747 0 9.5S4.253 0 9.5 0H19z"
      />
      <path
        fill="#F24E1E"
        d="M38 9.5C38 14.747 33.747 19 28.5 19H19V0h9.5C33.747 0 38 4.253 38 9.5z"
      />
      <path
        fill="#A259FF"
        d="M19 19v19H9.5C4.253 38 0 33.747 0 28.5S4.253 19 9.5 19H19z"
      />
    </g>
  );
}

export function SkillIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  if (name === "Playwright") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        focusable="false"
      >
        <PlaywrightMark />
      </svg>
    );
  }

  if (name === "Figma") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        focusable="false"
      >
        <FigmaMark />
      </svg>
    );
  }

  const icon = ICONS[name];

  if (!icon) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      focusable="false"
    >
      <path d={icon.path} fill={brandHex(name)} />
    </svg>
  );
}
