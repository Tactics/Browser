import React from "react";

export function useMeasure(): [
  (node: Element) => void,
  { width: number; height: number },
] {
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const previousObserver = React.useRef<ResizeObserver | null>(null);

  const customRef = React.useCallback((node: Element) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];
          setDimensions({ width, height });
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, dimensions];
}
