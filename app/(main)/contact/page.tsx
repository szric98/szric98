import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { CONTACT_SECTION, HERO_SECTION } from "@/copy";

export const metadata: Metadata = {
  title: `Contact | ${HERO_SECTION.name}`,
  description: CONTACT_SECTION.description,
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <section className="page-gutter page-offset pb-24">
        <SectionHeading title={CONTACT_SECTION.title} kicker="contact" as="h1" />
        <p className="mt-8 max-w-lg text-body text-muted">
          {CONTACT_SECTION.description}
        </p>
        <div className="mt-10 max-w-xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
