import type { ReactNode } from "react";

export function PageSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 px-8 py-24 md:px-16 lg:px-28 lg:py-32 xl:px-36"
    >
      <p className="kicker">{title}</p>
      <h2 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <div className="hairline mt-6" />
      <div className="mt-12 lg:mt-16">{children}</div>
    </section>
  );
}
