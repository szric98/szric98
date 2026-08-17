import Link from "next/link";
import { NAV_LINKS } from "@/copy";

export function DemoNav({
  className,
  linkClassName,
  formatLabel,
}: {
  className: string;
  linkClassName: string;
  formatLabel?: (label: string) => string;
}) {
  return (
    <nav className={className} aria-label="Main">
      {NAV_LINKS.map((link) => {
        const href = "hash" in link ? `/#${link.hash}` : link.href;
        const label = formatLabel ? formatLabel(link.label) : link.label;

        return (
          <Link key={link.label} href={href} className={linkClassName}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
