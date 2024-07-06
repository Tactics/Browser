import React from "react";
import { useEventListener } from "@/hooks/use-event-listener";
import { useThrottle } from "@/hooks/use-trottle";

export function useIdle(ms: number = 1000 * 60): boolean {
  const [idle, setIdle] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timeoutId: number;

    const handleTimeout = () => {
      setIdle(true);
    };

    const handleEvent = useThrottle((e: Event) => {
      setIdle(false);

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleTimeout, ms);
    }, 500);

    const handleVisibilityChange = (e: Event) => {
      if (!document.hidden) {
        handleEvent(e);
      }
    };

    timeoutId = window.setTimeout(handleTimeout, ms);

    useEventListener("mousemove", handleEvent);
    useEventListener("mousedown", handleEvent);
    useEventListener("resize", handleEvent);
    useEventListener("keydown", handleEvent);
    useEventListener("touchstart", handleEvent);
    useEventListener("wheel", handleEvent);
    useEventListener("visibilitychange", handleVisibilityChange);
  }, [ms]);

  return idle;
}
