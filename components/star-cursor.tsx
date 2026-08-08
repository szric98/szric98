"use client";

import { useEffect, useRef } from "react";

export function StarCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    document.body.classList.add("star-cursor-active");

    const move = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.style.opacity = "1";
    };

    const hide = () => {
      cursor.style.opacity = "0";
    };

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.body.classList.remove("star-cursor-active");
    };
  }, []);

  return (
    <div ref={cursorRef} className="star-cursor" aria-hidden>
      <span className="star-cursor__glow" />
      <span className="star-cursor__ring" />
      <span className="star-cursor__core" />
    </div>
  );
}
