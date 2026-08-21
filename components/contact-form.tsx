"use client";

import { type FormEvent, useState } from "react";
import { CONTACT_SECTION } from "@/copy";

const fieldClassName =
  "mt-2 block w-full border border-hairline bg-transparent px-4 py-2.5 font-sans text-base tracking-normal text-foreground normal-case outline-none transition-colors placeholder:text-muted/50 focus:border-foreground";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-[1.05rem] leading-[1.75] text-muted">
        {CONTACT_SECTION.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="kicker">{CONTACT_SECTION.fields.firstName}</span>
          <input
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={fieldClassName}
          />
        </label>
        <label className="block">
          <span className="kicker">{CONTACT_SECTION.fields.lastName}</span>
          <input
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={fieldClassName}
          />
        </label>
      </div>
      <label className="block">
        <span className="kicker">{CONTACT_SECTION.fields.email}</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClassName}
        />
      </label>
      <label className="block">
        <span className="kicker">{CONTACT_SECTION.fields.message}</span>
        <textarea
          name="message"
          required
          rows={6}
          className={`${fieldClassName} resize-y`}
        />
      </label>
      <button type="submit" className="btn-primary">
        {CONTACT_SECTION.fields.submit}
      </button>
    </form>
  );
}
