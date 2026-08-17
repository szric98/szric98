import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CONTACT_SECTION, HERO_SECTION } from "@/copy";

export const metadata: Metadata = {
  title: `Contact | ${HERO_SECTION.name}`,
  description: CONTACT_SECTION.description,
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <section className="px-8 pt-28 pb-24 md:px-16 lg:px-28 lg:pt-[18vh] xl:px-36">
        <p className="kicker">contact</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
          {CONTACT_SECTION.title}
        </h1>
        <div className="hairline mt-6" />
        <p className="mt-8 max-w-lg text-[1.05rem] leading-[1.75] text-muted">
          {CONTACT_SECTION.description}
        </p>
        <div className="mt-10 max-w-xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
