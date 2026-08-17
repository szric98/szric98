"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";
import { HERO_SECTION, NAV_LINKS } from "@/copy";

const SECTION_IDS = NAV_LINKS.flatMap((link) =>
  "hash" in link ? [link.hash] : [],
);

function isHomePath(pathname: string) {
  return pathname === "/";
}

function isPagePath(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() });
}

function NavLink({
  label,
  href,
  isActive,
  onClick,
}: {
  label: string;
  href: string | { pathname: "/"; hash: string };
  isActive: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={href}
      scroll={typeof href !== "object"}
      className={`font-mono text-[0.68rem] tracking-[0.2em] uppercase transition-colors ${
        isActive ? "text-foreground" : "text-muted/70 hover:text-foreground"
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
  const [activeSection, setActiveSection] = useState("home");
  const onHome = isHomePath(pathname);

  useEffect(() => {
    if (!onHome) {
      return;
    }

    const pending =
      window.location.hash.replace("#", "") ||
      sessionStorage.getItem("pending-section") ||
      "";
    sessionStorage.removeItem("pending-section");

    if (pending) {
      const timeout = window.setTimeout(() => {
        scrollToSection(pending);
        setActiveSection(pending);
      }, 80);
      return () => window.clearTimeout(timeout);
    }
  }, [onHome]);

  useEffect(() => {
    if (!onHome) {
      return;
    }

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = "home";
        let bestRatio = 0;
        for (const id of SECTION_IDS) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0) {
          setActiveSection(bestId);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    for (const id of SECTION_IDS) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [onHome]);

  function closeMenu() {
    setOpen(false);
  }

  function handleHashClick(event: MouseEvent<HTMLAnchorElement>, hash: string) {
    closeMenu();

    if (onHome) {
      event.preventDefault();
      scrollToSection(hash);
      window.history.pushState(null, "", `#${hash}`);
      setActiveSection(hash);
      return;
    }

    sessionStorage.setItem("pending-section", hash);
  }

  function renderNavLinks() {
    return NAV_LINKS.map((link) =>
      "hash" in link ? (
        <NavLink
          key={link.hash}
          label={link.label}
          href={{ pathname: "/", hash: link.hash }}
          isActive={onHome && activeSection === link.hash}
          onClick={(event) => handleHashClick(event, link.hash)}
        />
      ) : (
        <NavLink
          key={link.href}
          label={link.label}
          href={link.href}
          isActive={isPagePath(pathname, link.href)}
          onClick={closeMenu}
        />
      ),
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/70 to-transparent px-8 pt-6 pb-8 md:px-16 lg:px-28 xl:px-36">
      <div className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-mono text-[0.68rem] tracking-[0.32em] text-muted uppercase"
        >
          {HERO_SECTION.mark}
        </Link>

        <nav
          className="hidden items-center gap-x-5 md:flex lg:gap-x-6"
          aria-label="Main"
        >
          {renderNavLinks()}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-foreground md:hidden"
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
            strokeWidth={1.5}
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
          className="mt-4 flex flex-col gap-3 border-t border-white/16 pt-4 md:hidden"
          aria-label="Main"
        >
          {renderNavLinks()}
        </nav>
      ) : null}
    </header>
  );
}
