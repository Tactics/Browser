import { useEffect } from "react";

export function useAppleTouchFavicon(
  appleTouch: string, // 180×180
): void {
  useEffect(() => {
    // Query for the apple touch link
    const appleTouchQuery = 'link[rel="apple-touch-icon"]';
    let appleTouchLink =
      document.querySelector<HTMLLinkElement>(appleTouchQuery);
    if (!appleTouchLink) {
      appleTouchLink = document.createElement("link");
      appleTouchLink.rel = "apple-touch-icon";
      document.head.appendChild(appleTouchLink);
    }
    appleTouchLink.href = appleTouch;
  }, [appleTouch]);
}
