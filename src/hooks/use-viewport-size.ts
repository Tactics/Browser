import { useCallback, useEffect, useState } from "react";
import { useEventListener } from "@/hooks/use-event-listener";

export interface ViewportSize {
  width: number;
  height: number;
}

export function useViewportSize(): ViewportSize {
  const [windowSize, setWindowSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth || 0,
      height: window.innerHeight || 0,
    });
  }, []);

  useEffect(() => {
    setSize(); // Initial size on mount
  }, [setSize]);

  useEventListener("resize", () => setSize, window);
  useEventListener("orientationchange", () => setSize, window);

  return windowSize;
}
