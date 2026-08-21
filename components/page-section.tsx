import type { ReactNode } from "react";
import { SectionHeading } from "@/components/section-heading";

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
    <section id={id} className="page-gutter py-12 lg:py-16">
      <SectionHeading title={title} />
      <div className="mt-12 lg:mt-16">{children}</div>
    </section>
  );
}
