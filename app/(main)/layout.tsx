import { SiteHeader } from "@/components/site-header";
import { StarCursor } from "@/components/star-cursor";
import { Starfield } from "@/components/starfield";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Starfield />
      <StarCursor />
      <SiteHeader />
      {children}
    </>
  );
}
