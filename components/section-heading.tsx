export function SectionHeading({
  title,
  kicker = title,
  as: Tag = "h2",
}: {
  title: string;
  kicker?: string;
  as?: "h1" | "h2";
}) {
  return (
    <>
      <p className="kicker">{kicker}</p>
      <Tag className="mt-3 text-4xl font-medium tracking-display text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </Tag>
      <div className="hairline mt-6" />
    </>
  );
}
