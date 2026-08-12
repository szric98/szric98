"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/copy";

function NavLink({
  label,
  href,
  pathname,
  onClick,
}: {
  label: string;
  href: string;
  pathname: string;
  onClick?: () => void;
}) {
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        isActive ? "text-foreground" : "text-muted hover:text-star-bright"
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-4">
      <div className="hero-panel flex w-fit items-center justify-center px-5 py-3 sm:px-6">
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} pathname={pathname} />
          ))}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="hero-panel mt-2 flex w-fit flex-col items-center gap-1 px-3 py-2 md:hidden"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              pathname={pathname}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      ) : null}
    </header>
  );
}
