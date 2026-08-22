import Image from "next/image";
import type { CSSProperties } from "react";
import { Fragment } from "react";

type ExperienceItem = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  stack?: string;
  highlights: readonly string[];
  logo: string;
  brand: string;
};

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function startYear(startDate: string) {
  return startDate.replace(/^[A-Za-z]+\s/, "");
}

export function ExperienceTimeline({
  items,
}: {
  items: readonly ExperienceItem[];
}) {
  return (
    <div className="relative grid grid-cols-[4.75rem_0.75rem_minmax(0,1fr)] gap-y-12 md:grid-cols-[6rem_1.25rem_minmax(0,1fr)]">
      <div
        aria-hidden="true"
        className="experience-stations__spine pointer-events-none absolute top-10 bottom-10 left-9.5 w-0.5 -translate-x-1/2 md:left-12"
      />

      {items.map((item) => {
        const live = item.endDate === "present";

        return (
          <Fragment key={`${item.company}-${item.startDate}`}>
            <div className="relative z-10 flex flex-col items-center gap-2 pt-6">
              <span
                className={`experience-stations__logo${live ? " experience-stations__logo--live" : ""}`}
                style={{ "--brand": item.brand } as CSSProperties}
              >
                <Image alt="" fill sizes="6rem" src={item.logo} />
              </span>
              <p className="label-meta text-center text-muted">
                {startYear(item.startDate)}
              </p>
            </div>
            <div aria-hidden="true" className="experience-stations__leader" />
            <article className="experience-role">
              <header className="experience-role__head px-6 py-5 sm:px-8">
                {live ? <p className="label-meta text-accent">live</p> : null}
                <h3
                  className={`text-xl font-medium tracking-display text-foreground sm:text-2xl${live ? " mt-2" : ""}`}
                >
                  {item.title}
                </h3>
                <p className="label-meta mt-2 text-star-bright">
                  {item.company}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                  <p className="inline-flex items-center gap-1.5">
                    <CalendarIcon />
                    <span>
                      {item.startDate} – {item.endDate}
                    </span>
                  </p>
                  <p className="inline-flex items-center gap-1.5">
                    <LocationIcon />
                    <span>{item.location}</span>
                  </p>
                </div>
              </header>
              <div className="px-6 py-6 sm:px-8 sm:py-7">
                {item.stack ? (
                  <p className="text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-foreground">
                      Stack:
                    </span>{" "}
                    {item.stack}
                  </p>
                ) : null}
                <ul
                  className={`list-disc space-y-3 pl-5 text-body text-foreground${item.stack ? " mt-5" : ""}`}
                >
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Fragment>
        );
      })}
    </div>
  );
}
