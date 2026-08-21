import { Fragment } from "react";

type ExperienceItem = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  stack?: string;
  highlights: readonly string[];
};

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function ExperienceTimeline({
  timelineStart,
  timelineEnd,
  items,
}: {
  timelineStart: string;
  timelineEnd: string;
  items: readonly ExperienceItem[];
}) {
  return (
    <div className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-6 gap-y-10 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-x-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 bottom-8 left-[2.25rem] w-px -translate-x-1/2 bg-hairline md:left-[2.75rem]"
      />

      <p className="label-meta relative z-10 col-start-1 text-center text-muted">
        {timelineStart}
      </p>
      <div />

      {items.map((item) => (
        <Fragment key={`${item.company}-${item.startDate}`}>
          <div className="relative z-10 flex justify-center pt-8">
            <span aria-hidden="true" className="mt-1 h-2 w-2 bg-foreground" />
          </div>
          <article className="hero-panel px-6 py-6 sm:px-8 sm:py-8">
            <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              {item.title}
            </h3>
            <p className="label-meta mt-1 text-star-bright">
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
            {item.stack ? (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">Stack:</span>{" "}
                {item.stack}
              </p>
            ) : null}
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body text-muted">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        </Fragment>
      ))}

      <p className="label-meta relative z-10 col-start-1 text-center text-muted">
        {timelineEnd}
      </p>
    </div>
  );
}
