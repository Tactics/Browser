import React from "react";

function isMouseEvent(event: Event): event is MouseEvent {
  return "clientX" in event; // Checking for a property specific to MouseEvent
}

function isTouchEvent(event: Event): event is TouchEvent {
  return "touches" in event; // Checking for a property specific to TouchEvent
}

export function useLongPress(
  callback: (event: Event) => void,
  options: {
    threshold?: number;
    onStart?: (event: Event) => void;
    onFinish?: (event: Event) => void;
    onCancel?: (event: Event) => void;
  } = {},
) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const isLongPressActive = React.useRef(false);
  const isPressed = React.useRef(false);
  const timerId = React.useRef<number>();

  return React.useMemo(() => {
    if (typeof callback !== "function") {
      return {};
    }

    const start = (event: Event) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (onStart) {
        onStart(event);
      }

      isPressed.current = true;
      timerId.current = window.setTimeout(() => {
        callback(event);
        isLongPressActive.current = true;
      }, threshold);
    };

    const cancel = (event: Event) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event);
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event);
        }
      }

      isLongPressActive.current = false;
      isPressed.current = false;

      if (timerId.current) {
        window.clearTimeout(timerId.current);
      }
    };

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    };

    return {
      ...mouseHandlers,
      ...touchHandlers,
    };
  }, [callback, threshold, onCancel, onFinish, onStart]);
}
