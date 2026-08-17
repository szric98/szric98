import type { ReactNode } from "react";
import { StarCursor } from "@/components/star-cursor";
import { Starfield } from "@/components/starfield";
import "./demo.css";

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Starfield />
      <StarCursor />
      {children}
    </>
  );
}
