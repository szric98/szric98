export default function Home() {
  return (
    <main className="relative min-h-screen">
      <section className="flex min-h-screen items-start px-6 pt-[22vh] md:px-12 lg:px-20">
        <div className="hero-panel max-w-xl px-8 py-10 sm:px-10 sm:py-12">
          <h1 className="text-gradient-hero text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Richard Szabo
          </h1>
          <p className="text-gradient-hero mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Full Stack Engineer
          </p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Full Stack Engineer with 5 years of experience building web
            applications and GraphQL APIs using modern AI tools and workflows.
          </p>
        </div>
      </section>
    </main>
  );
}
