import { useEffect, useRef } from "react";

type EventType = keyof DocumentEventMap | keyof WindowEventMap;

export function useEventListener(
  eventType: EventType,
  callback: (event: Event) => void,
  element: HTMLElement | Window | Document = window,
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!element) return;

    const eventListener = (event: Event) => callbackRef.current(event);
    element.addEventListener(eventType, eventListener);

    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [eventType, element]);
}
