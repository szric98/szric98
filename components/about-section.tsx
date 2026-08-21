import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { ABOUT_SECTION } from "@/copy";

export function AboutSection() {
  return (
    <section id="about" className="page-gutter scroll-mt-28 py-12 lg:py-16">
      <div className="about-split">
        <div className="about-split__portrait-wrap">
          <div className="about-split__portrait">
            <Image
              src="/about-richard.png"
              alt="Richard outdoors in Budapest"
              fill
              sizes="(max-width: 767px) calc(100vw - 6rem), 30vw"
              className="object-cover"
            />
            <span className="about-split__corner about-split__corner--tl" />
            <span className="about-split__corner about-split__corner--br" />
          </div>
          <p className="about-split__coordinate">47.4979° N · 19.0402° E</p>
        </div>

        <div className="about-split__content">
          <SectionHeading title={ABOUT_SECTION.title} />

          <div className="about-split__copy">
            {ABOUT_SECTION.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <footer className="about-split__footer">
            <span>Budapest, Hungary</span>
            <span>Full-stack engineer</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
