import { useState, RefObject } from "react";
import { useEventListener } from "@/hooks/use-event-listener";

export function useHover(
  ref: RefObject<HTMLElement | Window | Document>,
): boolean {
  const [hovered, setHovered] = useState(false);

  if (ref.current) {
    useEventListener("mouseover", () => setHovered(true), ref.current);
    useEventListener("mouseout", () => setHovered(false), ref.current);
  }

  return hovered;
}
