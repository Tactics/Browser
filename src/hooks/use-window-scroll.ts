import React from "react";

export interface ScrollState {
  x: number;
  y: number;
}

export type ScrollToArgs = [options: ScrollToOptions] | [x: number, y: number];

export function useWindowScroll(): [
  ScrollState,
  (...args: ScrollToArgs) => void,
] {
  const [state, setState] = React.useState<ScrollState>({
    x: 0,
    y: 0,
  });

  const scrollTo = React.useCallback((...args: ScrollToArgs) => {
    if (typeof args[0] === "object") {
      window.scrollTo(args[0]);
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error(
        `Invalid arguments passed to scrollTo. See here for more info: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo`,
      );
    }
  }, []);

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [state, scrollTo];
}
