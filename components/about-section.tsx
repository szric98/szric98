import Image from "next/image";
import { ABOUT_SECTION } from "@/copy";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 px-8 py-24 md:px-16 lg:px-28 lg:py-32 xl:px-36"
    >
      <div className="about-split">
        <div className="about-split__portrait-wrap">
          <div className="about-split__portrait">
            <Image
              src="/about-richard.png"
              alt="Richard outdoors in Budapest"
              fill
              sizes="(max-width: 759px) calc(100vw - 6rem), 30vw"
              className="object-cover"
            />
            <span className="about-split__corner about-split__corner--tl" />
            <span className="about-split__corner about-split__corner--br" />
          </div>
          <p className="about-split__coordinate">47.4979° N · 19.0402° E</p>
        </div>

        <div className="about-split__content">
          <p className="kicker">{ABOUT_SECTION.title}</p>
          <h2 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
            {ABOUT_SECTION.title}
          </h2>
          <div className="hairline mt-6" />

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
