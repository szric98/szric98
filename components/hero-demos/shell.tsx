import type { ReactNode } from "react";
import { HeroEarth } from "@/components/hero-earth";

export function DemoHeroShell({
  className,
  header,
  children,
  earthCaption,
}: {
  className: string;
  header?: ReactNode;
  children: ReactNode;
  earthCaption?: ReactNode;
}) {
  return (
    <main className={`relative min-h-screen ${className}`}>
      {header}
      <section className="grid min-h-screen items-center gap-8 px-8 pt-24 pb-32 md:px-16 lg:grid-cols-2 lg:gap-16 lg:px-28 xl:px-36">
        <div className="max-w-xl">{children}</div>
        <div className="flex w-full flex-col items-center justify-center">
          <HeroEarth className="w-full max-w-[18rem] sm:max-w-sm lg:max-w-md xl:max-w-lg" />
          {earthCaption}
        </div>
      </section>
    </main>
  );
}
